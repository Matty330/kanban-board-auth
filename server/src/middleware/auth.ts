import jwt from 'jsonwebtoken';

const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;  // Attach decoded user info to the request object
    next();
  } catch (error) {
    return res.status(400).send({ error: 'Invalid token.' });
  }
};

export default authenticateToken;
