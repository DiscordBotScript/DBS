export default {
    async execute(utils) {
        let res
        if((utils.inside = "true") || (utils.inside = "false") || (utils.inside = "on") || (utils.inside = "off") || (utils.inside == "yes") || (utils.inside == "no") || (utils.inside == "1") || (utils.inside == "0")) res = "true";
        else res = "false";
        return { code : res}
    }
}