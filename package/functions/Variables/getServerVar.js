export default {
    async execute(utils) {
        let [name, guild = utils.source.guildId] = utils.inside.split(';')
        let gv
        try {
             gv = utils.db.prepare(`
                SELECT value from guilds 
                WHERE name = ?      
            `);  
        } catch (err) {
            console.error("Database Error:", err);
        }
        return {
            code : gv.get(name + '_' + guild).value
        }
    }
}
