const bookingPad = require('../services/bookingPad');
const AuthProvider = require('../services/authProvider');

class RulesController {
    static async getRules(qualifiers) {
        const accessToken = await AuthProvider.getAccessToken();
        return bookingPad.getRules(accessToken, qualifiers);
    }

    static async updateRule(data) {
        const accessToken = await AuthProvider.getAccessToken();
        return bookingPad.updateRule(accessToken, data);
    }
}

module.exports = RulesController;
