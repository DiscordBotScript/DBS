export default {
    execute: async (utils) => {
        if(!utils.inside) throw new Error(`Missing condition`)
        
        let condition = utils.inside.preprocessCondition();

let opts = ["==", "<", ">", "!=", ">=", "<="];
let opt = opts.find(op => condition.includes(op));
if (!opt) throw new Error(`Invalid or Missing operator`);

let [left, right] = condition.split(opt).map(x => x.trim());

let opfs = {
  "==": (a, b) => a === b,
  "!=": (a, b) => a !== b,
  "<=": (a, b) => Number(a) <= Number(b),
  ">=": (a, b) => Number(a) >= Number(b),
  "<": (a, b) => Number(a) < Number(b),
  ">": (a, b) => Number(a) > Number(b),
};
        return { 
            code: opfs[opt]?.(left, right)
        };
    }
};
