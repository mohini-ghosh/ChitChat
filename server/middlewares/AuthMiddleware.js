// import jwt from 'jsonwebtoken';



// export const verifyToken = (request, response, next) => {
//    const token = request.cookies.jwt; // Assuming the token is stored in cookies

//   if (!token) {
//     return response.status(401).json({ message: ' You are not authenticated!' });
//   }

//   jwt.verify(token, process.env.JWT_KEY, async (err,payload) => {
//     if (err)
//       return response.status(403).send('Token is not valid!');
//     request.userId = payload.id; // Attach user info to request object
//     next(); 
//   });
// };

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(403).send("Invalid token.");
  }
};
