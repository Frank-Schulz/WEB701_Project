const jwt = require("jsonwebtoken");

const { JWT_SECRET, } = process.env;
const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[ 1 ];
    const decodedToken = jwt.verify(
      token,
      JWT_SECRET,
    );
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

module.exports = { checkAuth };