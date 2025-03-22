export default {
    async execute (utils) {
        if(!utils.inside) throw new Error(`Missing url in $httpAddHeader[${utils.inside}].`)
        let [name, value] = utils.inside.split(';')
        if(!name) throw new Error(`Missing header name in $httpAddHeader[${utils.inside}].`)
        if(!value) throw new Error(`Missing header value in $httpAddHeader[${utils.inside}].`)


            let http = utils.client.httpCalls.get(utils.source.id) || {}
            if(!http.headers) http.headers = {}
            http.headers[name] = value;
            utils.client.httpCalls.set(utils.source.id, http)
        return {
            code: "",
        }
    }
}