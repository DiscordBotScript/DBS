export default { 
    async execute(utils) {
        let u = utils.inside;
        let res ;
        if (isNaN(u)) res = "undefined";
        else if (u.endsWith("11")) res = u + "th";
        else if (u.endsWith("12")) res = u + "th";
        else if (u.endsWith("13")) res = u + "th";
        else if (u.endsWith("1")) res = u + "st";
        else if (u.endsWith("2")) res = u + "nd";
        else if (u.endsWith("3")) res = u + "rd";
        else res = u + "th";
        return {
            code: res
        }
    }}