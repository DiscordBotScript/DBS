export default {
    async execute(utils) {
        let res;
        let [integer, x, y] = utils.inside.split(';');

        // Convert to lowercase for consistent comparisons
        x = x.toLowerCase();
        y = y.toLowerCase();
        integer = parseFloat(integer);

        // Validate the time units
        let validMeasures = ["picosecond", "nanosecond", "microsecond", "millisecond", "second", "minute", "hour", "day", "week", "fortnight", "month", "year", "decade", "century", "millennium"];
        if (!validMeasures.includes(x)) throw new Error("Please insert a valid measure for 'x'");
        if (!validMeasures.includes(y)) throw new Error("Please insert a valid measure for 'y'");

        let timeConversions = {
            picosecond: 1e-12,
            nanosecond: 1e-9,
            microsecond: 1e-6,
            millisecond: 1e-3,
            second: 1,
            minute: 60,
            hour: 3600,
            day: 86400,
            week: 604800,
            fortnight: 1209600,
            month: 2.628e6,  
            year: 3.154e7,
            decade: 3.154e8,
            century: 3.154e9,
            millennium: 3.154e10
        };

        let timeInSeconds = integer * timeConversions[x];

        switch (y) {
            case "picosecond":
                res = timeInSeconds / timeConversions.picosecond;
                break;
            case "nanosecond":
                res = timeInSeconds / timeConversions.nanosecond;
                break;
            case "microsecond":
                res = timeInSeconds / timeConversions.microsecond;
                break;
            case "millisecond":
                res = timeInSeconds / timeConversions.millisecond;
                break;
            case "second":
                res = timeInSeconds;
                break;
            case "minute":
                res = timeInSeconds / timeConversions.minute;
                break;
            case "hour":
                res = timeInSeconds / timeConversions.hour;
                break;
            case "day":
                res = timeInSeconds / timeConversions.day;
                break;
            case "week":
                res = timeInSeconds / timeConversions.week;
                break;
            case "fortnight":
                res = timeInSeconds / timeConversions.fortnight;
                break;
            case "month":
                res = timeInSeconds / timeConversions.month;
                break;
            case "year":
                res = timeInSeconds / timeConversions.year;
                break;
            case "decade":
                res = timeInSeconds / timeConversions.decade;
                break;
            case "century":
                res = timeInSeconds / timeConversions.century;
                break;
            case "millennium":
                res = timeInSeconds / timeConversions.millennium;
                break;
            default:
                throw new Error("Conversion failed due to invalid target measure.");
        }

        // Convert decimal to fraction if necessary
        let toFraction = (decimal) => {
            let tolerance = 1.0E-6; // tolerance for the fractional approximation
            let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
            let b = decimal;
            do {
                let a = Math.floor(b);
                let aux = h1;
                h1 = a * h1 + h2;
                h2 = aux;
                aux = k1;
                k1 = a * k1 + k2;
                k2 = aux;
                b = 1 / (b - a);
            } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

            return `${h1}/${k1}`;
        };

        // Check if the result is a decimal and convert to fraction if necessary
        if (!Number.isInteger(res)) {
            res = toFraction(res);
        }

        // Log the result or send it back via utils
        return {
            code: res
        }
    }
};