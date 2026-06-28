const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '0ajnhadsfbnikjlsadfhjkln&*(*3wldafskljbfsda;l');
            req.user = decoded; 
            next();
        } catch (error) {
            res.status(401).json({ message: "টোকেন কার্যকর নয়!" });
        }
    } else {
        res.status(401).json({ message: "টুকেন পাওয়া যায়নি" });
    }
};

module.exports = { protect };