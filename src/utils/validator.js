const User = require("../api/models/user.model");

const validatePassword = (pass) => {

    const regex = /[A-Za-z\d$@$!%*?&]{8,15}/; 
    return regex.test(pass)
}

const validateEmailDB = async (emailUser) => {
    try {
        const validateEmail = await User.findOne({ email: emailUser })
        return validateEmail;
    } catch (error) {
        console.log(error)
    }

}
const validateUsernameDB = async (usernameUser) => {
    try {
        const validateUserName = await User.findOne({ username: usernameUser })
        return validateUserName;
    } catch (error) {
        console.log(error)
    }

}
module.exports = { validateEmailDB, validatePassword, validateUsernameDB}