const dotEnv = require('dotenv')
const dbPool = require('../config/db.config');

dotEnv.config();

function authenticateToken(req, res, next) {
    const token = req.headers.token
    const userId = req.headers.userid
    if (token == null) return res.status(401).send({ message: 'Token not provided', status: 0 });
    if (userId == null || userId == undefined) return res.status(401).send({ message: 'User Invalid', status: 0 });
    let userQuery = `select token,intId,name,email from userslist where intId='${userId}' AND token = '${token}'`;
    console.log(userQuery)
    dbPool.query(userQuery, (err, result) => {
        if (err || result.length == 0) res.status(401).send({ message: 'User Invalid', status: 0 });
        console.log(result)
        let user = result[0];
        if (user.token == token) {
            req.user = user;
            next();
        } else {
            res.status(401).send({ message: 'Unauthorized', status: 0 })
        }
    })
}
module.exports = authenticateToken;