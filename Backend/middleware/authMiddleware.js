const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Almacenamos el ID del usuario en la solicitud
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token no válido' });
  }
};

module.exports = verifyToken;
