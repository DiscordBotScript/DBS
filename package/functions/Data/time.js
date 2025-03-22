import moment from "moment";
export default {
    async execute(utils) {
    let res
    switch(utils.inside) {
        case "year":
            res = moment(Date.now()).format("YYYY");
            break;
        case "week":
            res = moment(Date.now()).format("w");
            break;
        case "quarter":
            res = moment(Date.now()).format("Q");
            break;
        case "month":
            res = moment(Date.now()).format("MM");
            break;
        case "day":
            res = moment(Date.now()).format("DD");
            break;
        case "hour":
            res = moment(Date.now()).format("HH");
            break;
        case "minute":
            res = moment(Date.now()).format("mm");
            break;
        case "second":
            res = moment(Date.now()).format("ss");
            break;
        case "time":
            res = moment().format("LTS");
            break;
        
    }
    return {
        code: res
    }
    }
    }