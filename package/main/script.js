import { Client, GatewayIntentBits, Collection, ActivityType, ApplicationCommandType, ApplicationCommandOptionType, REST, Routes, Partials} from 'discord.js';
import fs from 'fs';
import { readdir } from 'fs/promises';
import chalk from 'chalk';
//import moment from 'moment';
import data from "better-sqlite3"
import path from "path"
import { fileURLToPath, pathToFileURL } from 'url';
let exists 
let db
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const events = {}; 
    const eventsDir = path.join(__dirname, '../events');
    const files = await readdir(eventsDir);
    for (const file of files) {
        const filePath = pathToFileURL(path.join(eventsDir, file)).href;
        const module = await import(filePath);
        events[file.split('.js')[0]] = module.default;
    }

class Dbotjs {
    constructor(ops) {
        if(!ops.token) throw new Error(chalk.redBright('Please Provide a Bot Token.'));
        if(!ops.prefix) throw new Error(chalk.redBright('Please Provide a Prefix.'));
        if(!ops.intents) throw new Error(chalk.redBright('Please Provide Intents.'));
        if(ops.status) console.log(chalk.yellow(`Parameter 'status' in client constructor is deprecated, Use bot.Status()`));


        this.prefix = ops.prefix;
        this.intents = ops.intents;
        this.partials = ops.partials;
        this.token = ops.token;
         
        this.client = new Client({
            partials: (this.partials||[]).map(e => {
                if(!(e in Partials)) throw new Error(chalk.redBright(`Invalid partial bitfield flag or number: ${e}`))
                return Partials[e]
        }),
            intents: this.intents.map(e => {
                if(!(e in GatewayIntentBits)) throw new Error(chalk.redBright(`Invalid intent bitfield flag or number: ${e}`))
                return GatewayIntentBits[e]
        }), 
        sweepers: {
            Bans: {
                interval: 86400,
                lifetime: 172800
            },

            GuildMembers: {
                interval: 86400,
                lifetime: 172800
            },

            Messages: {
                interval: 86400,
                lifetime: 172800
            },

            Users: {
                interval: 86400,
                lifetime: 172800
            },

        }
            
        });

        this.loadUsed = false;
        this.isReady = false;
        this.client.isInteractionEphemeral = false; //sets ephemeral to false by default. only usable on interactions.
        this.client.login(this.token);
        this.client.prefix = this.prefix;
        this.client.commands = new Collection();
        this.client.applicationcommands = new Collection();
        this.client.embeds = new Collection();
        this.client.httpCalls = new Collection()
        this.client.attachments = new Collection()
        this.client.ReadyCommand = new Collection();
        this.client.MsgDeleteCommand = new Collection();
        this.fs = fs
        


        this.client.on("ready", () => {
            fs.access('file', err => err ? exists = "true" : exists = "false")
            if(exists = "false") { 
            db = new data('database.db') 
            db.exec(`CREATE TABLE IF NOT EXISTS base ( name TEXT, value TEXT)`);
            db.exec(`CREATE TABLE IF NOT EXISTS users ( name TEXT, value TEXT)`);
            db.exec(`CREATE TABLE IF NOT EXISTS guilds ( name TEXT, value TEXT)`);
            db.exec(`CREATE TABLE IF NOT EXISTS channels ( name TEXT, value TEXT, type TEXT)`);
            }
             this.db = db
             this.isReady = true;
            console.log(chalk.green('[Dbot.js] Logged in as ' + this.client.user.tag));
            if (this.client.ReadyCommand.size) {
                events['ReadyCommand'].execute({...this});
            }
        });
    }


    async loadCommands(route, myCallback) {        
        if(this.loadUsed) {
            throw new Error(chalk.redBright('To avoid API ratelimits, loadCommands/registerApplicationCommands can only be used once!'))
        }
            this.loadUsed = true
        const commandFiles = fs.readdirSync(path.join(route)).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = pathToFileURL(path.join(route, file)).href;
            const command = await import(filePath);
            if(!command?.default || !command?.default?.name) console.error(`Missing Command Data at ${filePath}`)
            const commandName = command?.default?.name;
            const commandData = command?.default;
            if (commandData.type && ApplicationCommandType[commandData.type]) {
                commandData.type = ApplicationCommandType[commandData.type];
                commandData.options = commandData.options || [] //converts to empty array if non-existent

                commandData.options.forEach(o=> {
                    if(!o) return;
                    if (o.name && o?.name !== o?.name.toLowerCase()) throw new Error(chalk.redBright('ApplicationCommandOption name must be all-lowercase: ', o.name))
                    if (o.type in ApplicationCommandOptionType) o.type = ApplicationCommandOptionType[o.type]
                    else throw new Error(chalk.redBright('ApplicationCommandOption type is invalid: ', o.type))
                })
                this.client.applicationcommands.set(commandName, commandData);
            } else {
                if (this.client.commands.has(commandName)) {
                    const existingCommands = this.client.commands.get(commandName);
                    existingCommands.code.push(commandData.code);
                } else {
                    commandData.code = [commandData.code];
                    this.client.commands.set(commandName, commandData);
                }
            }
        }

        myCallback(this.client.commands);

        if (this.client.applicationcommands.size > 0) {
            await this.registerApplicationCommands(myCallback);
        }
    }

    async registerApplicationCommands(myCallback) {   
    //    if(this.loadUsed){
    //        throw new Error(chalk.redBright('To avoid API ratelimits, loadCommands/registerApplicationCommands can only be used once!'))
    //    }
     //       this.loadUsed = true   
        if (!this.isReady) {
            // Wait for the client to be ready before registering commands
            await new Promise(resolve => this.client.once("ready", resolve));
        }
    const rest = new REST({ version: '10' }).setToken(this.token);
    (async()=>{
    try {
        await rest.put(Routes.applicationCommands(this.client.user.id), {
            body: this.client.applicationcommands
        });
    } catch (error) {
        console.error(chalk.redBright(error));
    }
})()
myCallback(this.client.applicationcommands)
};
    async onMessage() {
        this.client.on("messageCreate", async message => {
//            if (!this.client.botReply && message.author.bot) return;
            events['MessageCreate'].execute({...this, message});
        });
    }
    async onInteraction() {
        this.client.on("interactionCreate", async interaction => {
            events['InteractionCreate'].execute({...this, interaction});
        });
    }
    async ReadyCommand(ops) {
        if (!ops.name) return console.error(chalk.redBright('ReadyCommand needs a Name!'));
        if (!ops.code) return console.error(chalk.redBright('ReadyCommand needs some Code!'));
        this.client.ReadyCommand.set(ops.name, ops);
    }

    async Command(ops) {
        ops = Array.from(arguments);
        if (!ops) return;
        ops.forEach(x => {
        if (!x.name) return console.error(chalk.redBright('Command needs a Name!'));
        x.name = x.name.toLowerCase()
        if (!x.code) return console.error(chalk.redBright('Command needs some Code!'));

        let cmdCheck = this.client.commands.get(x.name);
        if (cmdCheck) {
            cmdCheck.code.push(x.code);
        } else {
            x.code = [x.code]
            this.client.commands.set(x.name, x)
    }
        })
    }
    async ApplicationCommand (ops) {
        if (!ops.name) return console.error(chalk.redBright('ApplicationCommand needs a Name!'));
        if (!ops.code) return console.error(chalk.redBright('ApplicationCommand needs some Code!'));

        let cmdCheck = this.client.applicationcommands.get(ops.name);
        if(cmdCheck) return console.error(chalk.redBright('ApplicationCommand name must be unique! '+ ops.name))

        if (!ops.type) return console.error(chalk.redBright('ApplicationCommand needs a CommmandType!'));
        let guild;
        if(ops.guild) {
            guild = await this.client.guilds.fetch(ops.guild).catch(e=>{})
            if(!guild?.id && ops.guild.toLowerCase()!=='global') return console.error(chalk.redBright('ApplicationCommand GuildType is invalid!'))
        }

        ops.options = ops.options || [] //converts to empty array if non-existent
        ops.options.forEach(o=> {
            if(!o) return;
            if (o?.type) o.type = Discord.ApplicationCommandOptionType[o.type]
        })
        if(!ApplicationCommandType[ops.type]) return console.error(chalk.redBright('ApplicationCommand CommmandType is invalid!'));
        ops.type = ApplicationCommandType[ops.type]
        this.client.applicationcommands.set(ops.name, ops)
    }


    

    async MessageDeleteCommand(ops) {
            if (!ops.name) return console.error(chalk.redBright('MessageDeleteCommand needs a name!'))
            if (!ops.code) return console.error(chalk.redBright('MessageDeleteCommand needs some code!'))
            this.client.MsgDeleteCommand.set(ops.name, ops)
                this.client.on("messageDelete", async (message) => {
                    events['MessageDelete'].execute({...this, message});
                })
    }

}

export default Dbotjs;
