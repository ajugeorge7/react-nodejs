const axios = require('axios');

class BookingPad {
    static async getRules(accessToken, params) {
        return axios.get('https://sydc02p81y1g3qc.sea.corp.expecn.com:9443/acm/config/ProviderIdentifierSetting', {
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });
    }

    static async updateRule(accessToken, data) {
        return axios.post('https://airbookservice-amadeus-service.us-west-2.test.expedia.com/acm/add-update-configurations', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });
    }
}

module.exports = BookingPad;
