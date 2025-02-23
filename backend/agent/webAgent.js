const { createAction } = require("./actions.js");  

/**  
 * Minimal JS version of a web agent that calls a remote endpoint  
 * to get a list of actions based on a prompt.  
 */  
class ApifiedWebAgent {  
    /**  
     * @param {string} host  
     * @param {number} port  
     * @param {string} [id]  
     * @param {string} [name]  
     * @param {number} [timeout] - in ms  
     */  
    constructor(host, port, id = null, name = null, timeout = 60000) {  
        this.host = host;  
        this.port = port;  
        this.id = id || Math.random().toString(36).slice(2);  
        this.name = name || `Agent-${this.id}`;  
        this.timeout = timeout;  
    }  

    /**  
     * Calls the remote /solve_task endpoint with a simple JSON body: { prompt }  
     * Expects response JSON to include { actions: [...] }  
     * @param {string} prompt  
     * @returns {Promise<Object[]>} - A list of action objects  
     */  
    async solveTask(prompt) {  
        const url = `http://${this.host}:${this.port}/solve_task`;  
        const controller = new AbortController();  
        const id = setTimeout(() => controller.abort(), this.timeout);  

        try {  
            const resp = await fetch(url, {  
                method: "POST",  
                headers: { "Content-Type": "application/json" },  
                body: JSON.stringify({ prompt }),  
                signal: controller.signal  
            });  
            clearTimeout(id);  

            if (!resp.ok) {  
                throw new Error(`Request failed with status ${resp.status}`);  
            }  

            const jsonResp = await resp.json();  
            const actionsData = jsonResp.actions || [];  
            return actionsData.map(a => createAction(a));  
        } catch (err) {  
            clearTimeout(id);  
            console.error("Error while calling solveTask:", err.message);  
            return [];  
        }  
    }  
}  

// Export the ApifiedWebAgent class using CommonJS syntax  
module.exports = ApifiedWebAgent;