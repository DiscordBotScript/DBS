export default {
  async execute(utils) {        
      return {
        code: utils.source[utils.source.author ? 'author' : 'user'].id
      }
    }
  }
  