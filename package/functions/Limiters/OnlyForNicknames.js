export default {
    async execute(utils) {
        let nicks = utils.inside.split(";"); 
        let person = utils.source.author;

    
        if (!nicks.length || !utils.inside.trim()) {
            throw new Error("No channel provided");
        }

    
        if (!nicks.includes(person.displayName)) {
            await utils.source.channel.send(`This command cannot be used by you!`);
            
            
            return { exit: "stop" };
        }

        return { code: "" }; 
    }
};
