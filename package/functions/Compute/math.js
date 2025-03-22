export default {
    async execute(utils) {
        let [option, num1, num2] = utils.inside.split(";");
        let res;
        let n1 = parseFloat(num1);
        let n2 = parseFloat(num2);

        switch (option) {
            case "addition":
            case "add":
                res = n1 + n2;
                break;
            case "subtract":
            case "sub":
                res = n1 - n2;
                break;
            case "multiply":
            case "mult":
            case "multiplication":
                res = n1 * n2;
                break;
            case "divide":
            case "div":
            case "division":
                res = n1 / n2;
                break;
            case "power":
            case "pow":
                res = Math.pow(n1, n2);
                break;
            case "root":
                res = Math.pow(n1, 1 / n2);
                break;
            case "modulus": // remainder
            case "mod":
                res = n1 % n2;
                break;
            case "round":
                res = Math.round(n1);
                break;
            case "floor":
                res = Math.floor(n1);
                break;
            case "ceil":
                res = Math.ceil(n1);
                break;
            case "abs":
                res = Math.abs(n1);
                break;
            case "random":  // random number between n1 and n2  (inclusive)
                res = Math.floor(Math.random() * (n2 - n1 + 1) + n1);
                break;
            case "min":
                res = Math.min(n1, n2);
                break;
            case "max":
                res = Math.max(n1, n2);
                break;                      
            default:
                res = "Invalid option";
        }

        return {
            code: res
        };
    }
}
