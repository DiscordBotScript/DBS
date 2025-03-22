import fetch from 'node-fetch'
export default {
    async execute (utils) {
        if(!utils.inside) throw new Error(`Missing url in $httpGet[${utils.inside}].`)
            let http = utils.client.httpCalls.get(utils.source.id) || {}
            http.url = utils.inside;
            utils.client.httpCalls.set(utils.source.id, http)

            http.result = await fetch(http.url, {headers: http['headers']}).then(res=>res.json()).catch(e=>{throw new Error(e)})
            utils.client.httpCalls.set(utils.source.id, http)
        return {
            code: "",
        }
    }
}