const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return jwt.verify(token, "kmcdolfsohs");
}

const generateToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, "kmcdolfsohs", { expiresIn: '3h' })
}



module.exports = { generateToken, verifyToken }