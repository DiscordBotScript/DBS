export default {
    async execute(utils) {
    if(!utils.inside) throw new Error('Missing option provided')
    let res
    let f = utils.source.guild.channels.cache.filter
    let ch = channel => utils.Discord.ChannelType[channel.type];
    switch (utils.inside.toLowerCase()) {
    case "text-channels":
    res = f(c => ch(c) === "GuildText").size
    break;
    case "voice-channels":
    res = f(c => ch(c) === "GuildVoice").size
    break;
    case "stage-channels":
    res = f(c => ch(c) === "GuildStageVoice").size
    break;
    case "categories":
    res = f(c => ch(c) === "GuildCategory").size
    break;
    case "news-channels":
    res = f(c => ch(c) === "GuildAnnouncement").size
    break;
    case "media-channels":
    res = f(c => ch(c) === "GuildMedia").size
    break;
    case "threads":
    res = f(c => ch(c) === "PublicThread").size + f(c => ch(c) === "PrivateThreads").size
    break;
    case "all":
    res = utils.source.guild.channels.cache.size
    }
    return { code : res }
}
}