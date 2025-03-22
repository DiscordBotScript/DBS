export default {
    async execute(utils) {        
      return {
        code: utils.inside === null || utils.inside === 'null'
      }
    }
  }
  