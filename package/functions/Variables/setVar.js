export default {
    async execute(utils) {
        if(!utils.inside) throw new Error('Missing Parameters')
        let [name, value] = utils.inside.split(';')
        if(!name || name  === 'undefined') throw new Error('Missing Var Name')
        if(!value || value === 'undefined') throw new Error('Missing Var Value')
            let db;
            try {
         db = JSON.parse(await utils.fs.readFileSync(`${utils.dbFile}/Base.json`, 'utf8'))
        } catch {
            fs.writeFileSync(`${utils.dbFile}/Base.json`, JSON.stringify([]), () => { })
            db = JSON.parse(await utils.fs.readFileSync(`${utils.dbFile}/Base.json`, 'utf8'))
        }

            let result = await setNestedProperty(db, name, value)
            await utils.fs.writeFileSync(`${utils.dbFile}/Base.json`, JSON.stringify(result,null,2))

            let n = `${name}`.split('.')
            let nm = (n.length>1) ? n[0] : name 
        return {
            code: ""//(typeof db.filter(f=>f.ID === nm)[0].data === 'object') ? JSON.stringify(db.filter(f=>f.ID === nm)[0].data) : db.filter(f=>f.ID === nm)[0].data
        }
    }
}

function setNestedProperty(obj, path, value) {
    if (!path.includes('.')) {
        if(!obj.filter(f=>f.ID===path)[0]) obj.push({ID: path, data: value});
        else obj.filter(f=>f.ID===path)[0].data = value
        return obj;
    }
    const keys = path.split('.');
    if(!obj.filter(f=>f.ID===keys[0])[0]) obj.push({ID: keys[0], data: {}});
    let current = obj.filter(f=>f.ID===keys[0])[0].data
    for(let i=1; i<keys.length; i++) {
        if (keys[i] === keys[keys.length - 1]) {
            current[keys[i]] = value;
            return obj;
        } else {
            current[keys[i]] = current[keys[i]] || {};
            current = current[keys[i]];
        }
    };
    return obj
}