export default {
    async execute(utils) {
        let [name, url, returnEmoji = "yes"] = utils.inside.split(";");
        let res
        if (!name || !url) throw new Error(`Invalid arguments provided in $createEmoji${name};${url}].`);
        try {
            let emoji = await utils.source.guild.emojis.create({ attachment: url.toString(), name: name });
            if (returnEmoji === "yes") {
                res = emoji.toString();
            }
            else {
                res = "";
            }
            return {
                code: res
            }
        }
        catch (e) {
            throw new Error(`Failed to create emoji: ${e}`);
        }
    }
}