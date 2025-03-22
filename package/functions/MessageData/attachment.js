export default {
    async execute(utils) {
        if(!utils.inside) throw new Error(`No method inserted in $attachment[${utils.inside}]`)
        if(!['size', 'url'].includes(utils.inside.toLowerCase())) throw new Error(`Invalid data format used in $attachment[${utils.inside}].`)
            let res 
            console.log(utils.source)
            switch(utils.inside.toLowerCase()) {
                case 'url' : res = utils.source.attachments.map(g => g.attachments.url)
                break;
                case 'size' : res = utils.source.attachments.map(g => g.attachments.size)
                break;
        }
        return {
            code: res
        }
    }
}

