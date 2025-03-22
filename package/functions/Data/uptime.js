export default {
    async execute(utils) {
        
        let ts = Math.floor(utils.client.uptime / 1000);
    
        let w = Math.floor(ts / 604800);
        let d = Math.floor((ts % 604800) / 86400);
        let h = Math.floor((ts % 86400) / 3600);
        let m = Math.floor((ts % 3600) / 60);
        let s = ts % 60;
    
        let res = [
            w ? `${w} Week${w>1?'s':''}` : null,
            d ? `${d} ${d>1?'s':''}`: null,
            h ? `${h} Hour${h>1?'s':''}` : null,
            m ? `${m} Minute${m>1?'s':''}` : null,
            s ? `${s} Second${s>1?'s':''}` : null
        ].filter(Boolean).join(utils.inside ||  ", ");
    
        return {
            code: res
             }
        }
    }
    