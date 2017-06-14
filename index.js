/**
 * Created by tc949 on 2017/4/24.
 */

const rd = require('rd');
module.exports = function routeloader(app, path) {
    return new Promise(function (resolve, reject) {
        rd.each(path, function (f, s, next) {
            if (s.isFile() && f.lastIndexOf('.js') + 3 === f.length) {
                let route = require(f);
                app.use(route.routes()).use(route.allowedMethods());
            }
            next();
        }, function (err) {
            if (err) reject(err);
            resolve();
        })
    })

};