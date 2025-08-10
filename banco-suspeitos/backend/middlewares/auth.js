const jwt = require('jsonwebtoken');
module.exports = {
  auth: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ msg: 'Token ausente!' });
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ msg: 'Token inválido!' });
      req.user = user;
      next();
    });
  },
  permit: (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ msg: 'Sem permissão' });
    next();
  }
};
