const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWTSECRETKEY);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
