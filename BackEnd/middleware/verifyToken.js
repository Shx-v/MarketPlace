import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req?.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    req.userId = data._id;

    next();
  });
};

export { verifyToken };
