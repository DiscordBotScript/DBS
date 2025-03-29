export default {
    async execute(utils) {
        let [name, value, user = utils.source.author.id] = utils.inside.split(';')
        try {
            let uv = utils.db.prepare(`
                INSERT INTO users (name, value)
                VALUES (?, ?)
            `); 
            uv.run(name + "_" + user, value);
        } catch (err) {
            console.error("Database Error:", err);
        }
        return {
            code : ""
        }
    }
}
