export default {
    async execute(utils) {
        let emojis = utils.inside.split(';')
        emojis = emojis.filter(emoji=>emoji)
        emojis.forEach(async emoji => {
             (await utils.source.react(emoji)).fetch(e=>{utils.source.channel.send(`Failed to react with ${emoji}`)})
        })
        return {
            code: ""
        }
    }
}
