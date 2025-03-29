export default {
    async execute(utils) {
        let [name, value, guild = utils.source.guildId] = utils.inside.split(';')
        try {
            let gv = utils.db.prepare(`
                INSERT INTO guilds (name, value)
                VALUES (?, ?)
            `); 
            gv.run(name + "_" + guild, value);
        } catch (err) {
            console.error("Database Error:", err);
        }
        return {
            code : ""
        }
    }
}
