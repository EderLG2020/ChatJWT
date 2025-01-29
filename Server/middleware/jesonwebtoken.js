const jwt = require('jsonwebtoken');
const secretKey= process.env.SECRETKEY

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(secretKey);
    
    if (!token) {
        return res.status(401).json({ message: 'Token no valido.' });
    }

    try {
        const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

        const decoded = jwt.verify(actualToken, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token invalido, Acceso denegado.' });
    }
};

module.exports = verifyToken;
