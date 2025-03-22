import moment from 'moment'
export default {
  async execute(utils) {
    if(!utils.inside) throw new Error("Missing format")
        if(!['month', 'week', 'year'].includes(utils.inside.toLowerCase())) throw new Error(`Invalid date format used`)
              let result;
      switch(utils.inside.toLowerCase()){
        case "month":
          result = moment(Date.now()).format("D")
      break;
        case"week":
        result = moment(Date.now()).format("E")
      break;
        case"year":
        result = moment(Date.now()).format("DDDD")
      break;
      }
      return {
        code:  moment(Date.now()).format(result)
      }
  }
}