const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('superSecret', config.secret);

const middlewares = {

    protectedClientRoute: function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.json({
                'success': 'false',
                'message': 'No token provided.'
            });

        }
        

    }
};
module.exports = middlewares;