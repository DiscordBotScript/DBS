export default {
    async execute(utils) {
        let users = utils.inside.split(";"); 
        let person = utils.source.author;

    
        if (!users.length || !utils.inside.trim()) {
            throw new Error("No user provided");
        }

    
        if (!users.includes(person.id)) {
            await utils.source.channel.send(`This command cannot be used by you!`);
            
            
            return { exit: "stop" };
        }

        return { code: "" }; 
    }
}