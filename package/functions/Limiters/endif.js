export default {
    execute: async (utils) => {
        if (!utils.conditionStack || utils.conditionStack.length === 0) {
            throw new Error('$endif without $if');
        }
        utils.conditionStack.pop();
        return { code: '' };
    }
};
