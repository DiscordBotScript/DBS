import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import chalk from 'chalk';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const funcs = [];

const functionsDir = path.join(__dirname, '../functions');
const extensionsDir = path.join(__dirname, '../../../../dbs.ext');

const dirsToCheck = [functionsDir, extensionsDir];

for (const dir of dirsToCheck) {
    try {
        const subDirs = await fs.readdir(dir, { withFileTypes: true });

        for (const subDir of subDirs) {
            if (subDir.isDirectory()) {
                const subDirPath = path.join(dir, subDir.name);
                const files = await fs.readdir(subDirPath);

                for (const file of files) {
                    const filePath = pathToFileURL(path.join(subDirPath, file)).href;
                    const module = await import(filePath);

                    if (typeof module.default?.execute !== 'function') {
                        console.warn(`Warning: ${file} does not export a default 'execute' function.`);
                        continue; 
                    }

                    funcs.push({
                        name: '$' + file.split('.js')[0],
                        type: subDir.name.toLowerCase(),
                        execute: module.default.execute
                    });
                }
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
    }
}
const parseFunctions = async (inputString, utils, inner = false) => {
    const fu = inputString.split('$');
    funcs.sort((a, b) => b.name.length - a.name.length); // Sort functions by name length

    for (let ck = 1; ck < fu.length; ck++) {
        const split = `$${fu[ck]}`;
        const funct = funcs.find(func => split.startsWith(func.name));
        if (!funct) continue;

        let functionCall, functionName;
        if (!utils.conditionStack) utils.conditionStack = [];
        let funcArr = ['$if', '$elseif', '$else', '$endif', '$stop'];

        try {
            if (split.slice(funct.name.length).startsWith('[')) {
                let startIdx = inputString.indexOf(`${funct.name}[`);
                let endIdx = findClosingBracket(inputString, startIdx + funct.name.length + 1);

                if (endIdx !== -1) {
                    let innerContent = inputString.substring(startIdx + funct.name.length + 1, endIdx);
                    if (funct.name === '$c') {
                        utils.inside = innerContent;
                        functionName = `$c[${utils.inside}]`;
                    } else {
                        let rsp = await parseFunctions(innerContent, utils, true);
                        utils.inside = [undefined, 'undefined'].includes(rsp) ? undefined : rsp;
                    }

                    let fullFunctionCall = inputString.slice(startIdx, endIdx + 1);
                    functionName = `${funct.name}[${utils.inside}]`;

                    functionCall = await funct.execute(utils, funct);
                    if (functionCall.exit === 'stop') return;

                    if (funcArr.includes(funct.name)) {
                        handleConditionalFunctions(funct, functionCall, inputString, fullFunctionCall);
                    } else {
                        utils.array = functionCall?.array || [];
                        inputString = inputString.replaceFirst(fullFunctionCall, functionCall?.code);
                    }
                } else {
                    utils.inside = null;
                    functionName = `${funct.name}[]`;
                }
            } else {
                utils.inside = null;
                functionName = funct.name;
                if (funcArr.includes(funct.name)) {
                    if (funct.name === '$stop' && inputString.includes('$stop')) {
                        inputString = inputString.replace(inputString.substring(inputString.indexOf('$stop')), '');
                        break;
                    }

                    if (funct.name === '$else') {
                        inputString = removeElseSection(inputString, funct);
                    }
                }
            }

            if (inputString.indexOf(funct.name) < 0) continue;

            functionCall = await funct.execute(utils, funct);
            utils.array = functionCall?.array || [];
            inputString = inputString.replaceFirst(functionName, functionCall?.code);
        } catch (e) {
            utils.client.embeds.delete(utils.source.id);
            utils.client.attachments.delete(utils.source.id);

            if (inner) {
                throw new Error(`${e.message} in ${functionName}`);
            } else {
                let functt = funcs.find(func => functionName.split('[')[0] === func.name);            
                return `\`\`\`js\n❌ ${(e.message.includes(`in ${functionName}`) ? `${e.message}` : `${e.message} in ${functionName}`)}\`\`\`\n>>> Documentation: https://dbot.rickyjs.xyz/${functt.type}/${functt.name.split('$')[1]}`;
            }
        }
    }

    let embeds = utils.client.embeds.get(utils.source.id) || [];
    if (embeds) {
        embeds.forEach((embed, idx) => {
            if (embed && embed.data) {
                Object.entries(embed.data).forEach(([x, y]) => {
                    if (typeof embed.data[x] === 'string') {
                        embed.data[x] = embed.data[x].split('a2008E').join('[').split('a2008A').join(']').split('#COLON#').join(';');
                    }
                });
            }
            embeds[idx] = embed;
        });
        utils.client.embeds.set(utils.source.id, embeds);
    }

    return inner ? inputString : inputString.split('a2008E').join('[').split('a2008A').join(']').split('#COLON#').join(';');
}

const handleConditionalFunctions = (funct, functionCall, inputString, fullFunctionCall) => {
    if (funct.name === '$if') {
        if (!functionCall?.code) {
            inputString = inputString.replace(inputString.slice(inputString.indexOf(fullFunctionCall), inputString.indexOf('$elseif') === -1 ? inputString.indexOf('$else') : (inputString.indexOf('$endif') > inputString.indexOf('$elseif')) ? inputString.indexOf('$elseif') : inputString.indexOf('$endif')), '');
        } else {
            inputString = inputString.replace(inputString.slice(inputString.indexOf('$elseif') === -1 ? inputString.indexOf('$else') : inputString.indexOf('$elseif'), inputString.indexOf('$endif')), '');
        }
    }
    if (funct.name === '$elseif') {
        if (!functionCall?.code) {
            inputString = inputString.replace(inputString.slice(inputString.indexOf(fullFunctionCall) - fullFunctionCall.length, inputString.indexOf('$elseif', inputString.indexOf(fullFunctionCall)) === -1 ? inputString.indexOf('$else') : inputString.indexOf('$elseif', inputString.indexOf(fullFunctionCall))), '');
        } else {
            inputString = inputString.replace(inputString.slice(inputString.indexOf('$elseif') === -1 ? inputString.indexOf('$else') : inputString.indexOf('$elseif'), inputString.indexOf('$endif')), '');
        }
    }
    inputString = inputString.replaceFirst(fullFunctionCall, '');
}

const removeElseSection = (inputString, funct) => {
    const elseIndex = inputString.indexOf('$else');
    const endifIndex = inputString.indexOf('$endif');

    if (elseIndex !== -1 && endifIndex !== -1) {
        inputString = inputString.replace(inputString.slice(inputString.indexOf('$else'), inputString.indexOf('$endif')), '');
    }
    return inputString.replaceFirst(funct.name, '');
}

const findClosingBracket = (text, startIdx) => {
    let depth = 1;
    for (let i = startIdx + 1; i < text.length; i++) {
        if (text[i] === '[') {
            depth++;
        } else if (text[i] === ']') {
            depth--;
        }
        if (depth === 0) {
            return i;
        }
    }
    return -1;
};

const findLine = (search, string) => {
    const lines = string.trim().split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(search)) {
            return i + 1;
        }
    }
    return -1;
}

String.prototype.preprocessCondition = function() {
    return this.replace(/([a-zA-Z_$][\w$]*)/g, (match) => {
        if (['true', 'false', 'null', 'undefined'].includes(match) ||
            /^[0-9]+$/.test(match) ||
            /^[!=<>+*/%-]+$/.test(match)) {
            return match;
        }
        return `"${match}"`;
    });
};

String.prototype.replaceFirst = function (search, replacement) {
    const index = this.indexOf(search);
    if (index === -1) return this;
    return this.slice(0, index) + replacement + this.slice(index + search.length);
};

export default async function interpreter(utils) {
    if (!utils.source) {
        utils.source = utils.message ?? utils.interaction;
        utils.isInteraction = !!utils.interaction;
        delete utils.message;
        delete utils.interaction;
    }
    return {
        code: await parseFunctions(utils.command.code, utils),
        name: await parseFunctions(utils.command.name, utils)
    };
}
