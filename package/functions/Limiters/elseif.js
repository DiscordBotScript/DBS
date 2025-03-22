export default {
    execute: async (utils) => {
        if(!utils.inside) throw new Error(`Missing condition`)
        if (!utils.conditionStack || utils.conditionStack.length === 0) {
            throw new Error('Missing initial $if statement');
        }
        const module = await import('Dbot.js/package/main/interpreter.js');
        const interpret = module.default;

        
        let condition = utils.inside.preprocessCondition();

        const {code:thisCondition} = await interpret({
            ...utils,
            command: {
                name: utils.command.name,
                code: `$checkCondition[${condition}]`,
            },
            inside: null,
        });

        const lastCondition = utils.conditionStack.pop();
        const conditionResult = !lastCondition.result && thisCondition;

        utils.conditionStack.push({func: '$elseif', cond: condition, result:conditionResult==='true'});
        return { code: conditionResult==='true' };
    }
};
