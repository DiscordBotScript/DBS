export default {
  async execute(utils) {    
      return {
        code: utils.source.targetId ?? utils.source?.message?.id ?? utils.source.id
      }
    }
  }
  