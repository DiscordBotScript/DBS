export default {
    async execute(utils) {
        let [to, from, value] = utils.inside.split(";");
        
        if (!to || !from || !value) return utils.error(`Invalid parameters in $convert[${to};${from};${value}]`);

        value = parseFloat(value);
        if (isNaN(value)) return utils.error("Invalid number in $convert[]");

        let units = ["kb", "mb", "gb", "tb", "pb"];
        let fromIndex = units.indexOf(from.toLowerCase());
        let toIndex = units.indexOf(to.toLowerCase());

        if (fromIndex === -1 || toIndex === -1) {
            return utils.error(`Invalid unit in $convert[]: ${from} to ${to}`);
        }

        let exponent = toIndex - fromIndex;
        let res = value * Math.pow(10, exponent * 3); // Adjust based on SI prefixes

        return {code : res};
    }
};
