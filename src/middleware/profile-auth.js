const { verifyToken } = require("../utils/jwt");

const isAuthProfile = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(400).json({ message: "No tienes permisos" });
    }
    const token = auth.split(" ")[1];
    const tokenVerified = verifyToken(token);
    //   console.log(tokenVerified);
    if (!tokenVerified.id) {
      return res
        .status(400)
        .json({ message: "No tienes permisos", message: tokenVerified });
    }
    //   const userProfile = await User.findById(tokenVerified.id);

    req.userProfile = tokenVerified.id;
    console.log(req.userProfile);

    next();
  } catch (error) {}
};

module.exports = { isAuthProfile };
