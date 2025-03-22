export default {
    async execute(utils) {        
              let [url, index=0] = utils.inside.split(';');
  
              if (!url) throw new Error(`No url provided`);
              if (index < 0 || index > 9) throw new Error(`Invalid embed index used. You can only use index from 0 to 9`);
              let embeds = utils.client.embeds.get(utils.source.id) || []
              if (!embeds[index]) embeds[index] = new utils.Discord.EmbedBuilder();
          embeds[index].setImage(url)
          utils.client.embeds.set(utils.source.id, embeds)
      
          return {
              code: ""
          };
      }
    }
    