export default {
    async execute(utils) {
        if(!utils.inside) throw new Error('Missing input')
        let abb = n => {
            if (n < 1e3) return n;
            if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(3) + "K";
            if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(3) + "M";
            if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(3) + "B";
            if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(3) + "T";
            if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(3) + "Qa";
            if (n >= 1e18 && n < 1e21) return +(n / 1e18).toFixed(3) + "Qi";
            if (n >= 1e21 && n < 1e24) return +(n / 1e21).toFixed(3) + "Sx";
            if (n >= 1e24 && n < 1e27) return +(n / 1e24).toFixed(3) + "Sp"
            if (n >= 1e27 && n < 1e30) return +(n / 1e27).toFixed(3) + "Oc"
            if (n >= 1e30 && n < 1e33) return +(n / 1e30).toFixed(3) + "No"
            if (n >= 1e33 && n < 1e36) return +(n / 1e33).toFixed(3) + "Dc";
            if (n >= 1e36 && n < 1e39) return +(n / 1e36).toFixed(3) + "Ud";
            if (n >= 1e39) return +(n / 1e39).toFixed(3) + "Dd";
        }
        return {
            code: abb(utils.inside)
        }
    }
}