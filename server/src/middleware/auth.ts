import jwt from 'jsonwebtoken';

const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;  // Attach the decoded user info to the request object
    next();  // Call the next handler
  } catch (error) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

export default authenticateToken;
