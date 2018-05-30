const ticketingPad = require('../services/ticketingPad');
const AuthProvider = require('../services/authProvider');

class RulesController {
    static async getRules(qualifiers) {
        const accessToken = await AuthProvider.getAccessToken();
        return ticketingPad.getRules(accessToken, qualifiers);
    }
}

module.exports = RulesController;
