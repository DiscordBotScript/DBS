export default {
    async execute(utils) {
        if (!utils.inside) throw new Error(`No option provided`)
        let res
        switch(utils.inside.toLowerCase()) {
            case "name":
                res - utils.command.name
                break; 
            case "aliases":
                res = utils.command.aliases
                break;
            case "type":
                res = utils.command.type
                break;
                case "usage":
                res = utils.command.usage
                break;
            case "description":
                res = utils.command.description
                break;
        }
        return {
            code : res 
               }
    }
}