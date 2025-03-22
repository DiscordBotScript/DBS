export default {
    async execute(utils) {
        let res;
        if (!utils.inside) {
            res = "0";
        } else {
            let matches = utils.inside.match(/[a-z]/g);
            res = matches ? matches.length.toString() : "0";
        }
        return {
            code: res
        };
    }
};
