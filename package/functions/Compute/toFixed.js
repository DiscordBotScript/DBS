export default {
  async execute(utils) {
let [integer, decimalPlace = 2] = utils.inside.split(';')
if(isNaN(integer)) throw new Error("Integer needs to be a number")
if(isNaN(decimalPlace)) throw new Error("Decimal place needs to be a number")    
  return { 
    code: Number(integer).toFixed(decimalPlace)
    }
  }
}