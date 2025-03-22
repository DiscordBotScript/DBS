export default {
    async execute (utils) {
     //if(!utils.inside) throw new Error(`Missing params in $httpResult[${utils.inside}].`)
     //                  if(!(utils.inside in utils.client.httpCalls.get(utils.source.id))) throw new Error(`Parameter not found in $httpResult[${utils.inside}]`)
        return {
            code: JSON.stringify(utils.inside && utils.inside !== undefined ? utils.client.httpCalls.get(utils.source.id).result[utils.inside] : utils.client.httpCalls.get(utils.source.id).result,null,2)
        }

    }
}