export default {
  async execute(utils) {        

        if(!utils.inside) throw new Error(`No option provided`)
        if(!utils.array) throw new Error(`No array was found`)
        if(isNaN(utils.inside)|| Number(utils.inside) < 0) throw new Error(`Invalid number provided`)

      return {
        code: utils.array[utils.inside]
      }
    }
  }
  