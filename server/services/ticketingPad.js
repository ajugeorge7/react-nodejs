const axios = require('axios');

class TicketingPad {
    static async getRules(accessToken, qualifiers) {
        const data = {
            statusCode: 'ACTIVE',
            exactMatch: 'false',
            auditTrailRequired: 'true',
            configurations: {
                configuration: [
                    {
                        configName: 'TicketingDelays',
                        qualifiers: {
                            qualifier: Object.keys(qualifiers)
                                .map(key => ({
                                    name: key,
                                    values: {
                                        value: [qualifiers[key]],
                                    },
                                })),
                        },
                    },
                ],
            },
        };
        return axios.post('https://air-ticket-service.us-west-2.int.expedia.com/acm/read-configurations', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });
    }
}

module.exports = TicketingPad;
