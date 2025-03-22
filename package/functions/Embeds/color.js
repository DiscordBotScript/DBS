export default {
    async execute(utils) {
        if(!utils.inside) throw new Error(`Missing option`)
        let [color='Default', index=0] = utils.inside.split(';')
        if (index < 0 || index > 9) throw new Error(`Invalid embed index used. You can only use index from 0 to 9`);

        let embeds = utils.client.embeds.get(utils.source.id) || []
        if (!embeds[index]) embeds[index] = new utils.Discord.EmbedBuilder();
        utils.Discord.Colors['Random'] = 'Random' //allows for D.js Random Color.

        function isHex(h) {
            return (parseInt(h, 16).toString(16) === h.toLowerCase())
        }

        if (!isHex(color.replace('#',''))) {
            if(!(color in utils.Discord.Colors)) {
                throw new Error(`Invalid color provided`);
            } else {
                embeds[index].setColor(utils.Discord.Colors[color]);
            }
        } else {
            embeds[index].setColor(color.replace('#',''));
        }

       utils.client.embeds.set(utils.source.id, embeds)

        return {
            code: '',
        };
    }
};