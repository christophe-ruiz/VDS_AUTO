const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.TOKEN_SECRET.toString());
        console.log(decoded);
        next();
    } catch (e) {
        console.error(e.message);
        return res.status(401).json("Auth Failed: " + e.message);
    }
}
