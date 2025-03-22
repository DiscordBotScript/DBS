export default {
    execute: async (utils) => {
        if(!utils.inside) throw new Error(`Missing condition`)
        if (!utils.conditionStack) utils.conditionStack = [];
        const module = await import('Dbot.js/package/main/interpreter.js');
        const interpret = module.default;

        
        let condition = utils.inside.preprocessCondition();

        const {code:conditionResult} = await interpret({
            ...utils,
            command: {
                name: utils.command.name,
                code: `$checkCondition[${condition}]`,
            },
            inside: null,
        });

        utils.conditionStack.push({func: '$if', cond: condition, result:conditionResult==='true'});

        return { code: conditionResult==='true' };
    }
};
