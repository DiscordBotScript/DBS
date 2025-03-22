export default {
  async execute(utils) {        
        if (!utils.inside) throw new Error(`No input provided`)
        console.log(utils.inside)
      return {
        code: ""
      }
    }
  }
  