const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // لو مفيش Authorization header
    if (!authHeader) {
      return res.status(403).send("Access denied. No token provided.");
    }

    // تأكد من صيغة الهيدر (لازم يكون "Bearer token")
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(403).send("Invalid authorization format. Use: Bearer <token>");
    }

    const token = parts[1];
    const decodedToken = jwt.verify(token, "secretKey");

    req.user = decodedToken;
    next();

  } catch (err) {
    console.log("🚀 ~ err:", err);
    res.status(400).send("Invalid token");
  }
};
