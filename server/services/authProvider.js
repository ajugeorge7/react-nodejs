const axios = require('axios');

class AuthProvider {
    static async getAccessToken() {
        const config = {
            method: 'post',
            url: 'https://air-ticket-service.us-west-2.int.expedia.com/oauth/token',
            headers: {
                username: 'sea\\s-airmate',
                password: '}9qAsk@"^V9.%W)/',
            },
        };

        return axios.request(config).then(res => res.data.access_token);
    }
}

module.exports = AuthProvider;
