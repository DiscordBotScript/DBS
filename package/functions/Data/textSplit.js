export default {
  async execute(utils) {        
        if (!utils.inside) throw new Error(`No option provided`)
        let [string, splitter] = utils.inside.split(';')

        let arr = string.split(splitter||',')
      return {
        code: "",
        array: arr
      }
    }
  }
  