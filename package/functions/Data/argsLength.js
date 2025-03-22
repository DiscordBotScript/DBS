export default {
    async execute(utils) {  
        return {
            code: utils.inside.split(" ").length

        }
    }
}