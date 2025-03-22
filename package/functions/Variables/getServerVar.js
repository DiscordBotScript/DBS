export default {
    async execute(utils) {
        let [name, guildId = utils.source.guild.id] = utils.inside.split(';')
        if (!name) throw new Error('Missing Var Name')
            let db;
        try {
     db = JSON.parse(await utils.fs.readFileSync(`${utils.dbFile}/Servers.json`, 'utf8'))
    } catch {
        fs.writeFileSync(`${utils.dbFile}/Servers.json`, JSON.stringify([]), () => { })
        db = JSON.parse(await utils.fs.readFileSync(`${utils.dbFile}/Servers.json`, 'utf8'))
    }
        let n = `${guildId}.${name}`.split('.');
        db = (n.length > 1) ? db.filter(d => d.ID === n[0]).map(g => g.data)[0] : db.filter(d => d.ID === utils.inside).map(g => g.data)[0]
        let result;
        if (n.length > 1) {
            try {
                for (let i = 1; i < n.length; i++) {
                    db = db[n[i]]
                }
                result = db
            } catch {
                result = undefined
            }
        } else {
            result = db
        }
        return {
            code: (typeof result === 'object') ? JSON.stringify(result) : result
        }
    }
}
