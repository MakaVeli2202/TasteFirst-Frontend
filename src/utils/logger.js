export const logger = {
info: (...args) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE){
        console.log('[INFO] :',...args);
    }
},
 error: (...args) => { // <--- THIS IS THE MISSING METHOD IN YOUR PASTE
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true') { // Errors should ideally always be logged
      console.error('[ERROR]', ...args);
    }
  },
debug: (...args) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE){
        console.log('[DEBUG] :',...args);
    }
},
warn: (...args) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE){
        console.log('[WARN] :',...args);
    }
},
api: (method,url,status,time) => {
    if (import.meta.env.VITE_ENABLE_DEBUG_MODE){
        console.log(`[API]: Method ${method} URL:${url} Status: ${status} TimeToExcute: ${time} `);
    }
},

}