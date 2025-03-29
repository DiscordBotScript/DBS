export default {
    async execute(utils) {
        let [name, user = utils.source.author.id] = utils.inside.split(';')
        let uv
        try {
             uv = utils.db.prepare(`
                SELECT value from users 
                WHERE name = ?      
            `);  
        } catch (err) {
            console.error("Database Error:", err);
        }
        return {
            code : uv.get(name + '_' + user).value
        }
    }
}
