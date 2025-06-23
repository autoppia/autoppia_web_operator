const axios = require('axios');

module.exports = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) {
            return res.status(401).json({ error: 'Unauthorized: Missing API key' });
        }

        const response = await axios.post('https://api.autoppia.com/api-keys/verify', {
            credential: apiKey,
        });
        const { is_valid } = response.data;
        if (!is_valid) {
            return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }
}