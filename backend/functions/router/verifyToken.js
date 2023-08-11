const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Not valid Token");
      }
      req.user = user;
    
      next();
    });
  } else { 
    return res.status(401).json(authHeader);
  }
};
const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      
      next();
    } else {
      res.status(403).json({ message: "You Are Not Allowed" });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      console.log(req.user);
      res.status(403).json({ message: "You Are Not Allowed" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
