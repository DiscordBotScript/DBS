import util from 'util';
export default {
    async execute(utils) {
    if(!utils.inside) throw new Error('No input provided')
        let [code, depth=0] = utils.inside.split(';')
        return {
            code: util.inspect(eval(code.replace(/a2008E/gm, "[").replace(/a2008A/gm, "]").replace(/;/gm, ":").replace(/:/gm, ";")), {
                "depth": depth
            })
        }
    }
}