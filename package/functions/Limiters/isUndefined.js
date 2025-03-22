export default {
    async execute(utils) {        
      return {
        code: utils.inside === undefined || utils.inside === 'undefined'
      }
    }
  }
  