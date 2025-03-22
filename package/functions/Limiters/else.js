export default {
    execute: async (utils) => {
        if (!utils.conditionStack || utils.conditionStack.length === 0) {
            throw new Error('$else without $if');
        }
        const lastCondition = utils.conditionStack.pop();
        utils.conditionStack.push({func: '$else', result:lastCondition.result ? false : true});
        return { code: lastCondition.result ? false : true };
    }
};
