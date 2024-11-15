const User = require("../models/user.model");
const { validateEmailDB, validatePassword, validateUsernameDB } = require("../../utils/validator");
const bycrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");

const getUser = async (req, res) => {
  try {
    const user = await User.find().populate("collection");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const {id} = req.params;
    // console.log(id);
    const user = await User.findById(id);
       return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);

  }
};

const register = async (req, res) => {
  try {
    const userBody = new User(req.body);
    const valUsername = await validateUsernameDB(req.body.username);
    const valEmail = await validateEmailDB(req.body.email);
    if (!valUsername && !valEmail) {
      if (validatePassword(req.body.password)) {
        userBody.password = bycrypt.hashSync(userBody.password, 10);
        const createduser = await userBody.save();
        return res.json({ success: true, message: "Succes", data: createduser });
      } else {
        return res.json({
          success: false,
          message: "Password does not match the pattern",
        });
      }
    }
    return res.json({ success: false, message: "Email already exists" });
  } catch (error) {
    return res.status(500).json(error);

  }
};
const login = async (req, res) => {
  try {
    const userInfo = req.body;
    const userDB = await validateUsernameDB(userInfo.username);
    console.log(userDB);

    if (!userDB) {
      return res.json({ success: false, message: "Username does not exist" });
    }
    if (!bycrypt.compareSync(userInfo.password, userDB.password)) {
      return res.json({ success: false, message: "Password does not match" });
    }

    const token = generateToken(userDB._id, userDB.email, userDB.roll, userDB.collection, userDB.username);
    // console.log(token);

    return res.json({
      success: true,
      message: "Log in successfully completed",
      token: token,
      userInfo: userDB,
    });

  } catch (error) {
    return res.status(500).json(error);

  }
};
const profile = async (req, res) => {
  try {
    // console.log(req.userProfile);

    return res.status(200).json(req.userProfile);
  } catch (error) {
    return res.status(500).json(error);

  }
};

const putUser = async (req, res) => {
  try {
    //---- This is for cloudinary route -----
    // console.log(req.file.path);
    // if (req.file.path) {
    //   videogameBody.image = req.file.path;
    // }
    //---- here ends This is for cloudinary route -----
    // console.log("hello");
    const { id } = req.params;
    const putUser = new User(req.body);
    putUser._id = id;
    const updateUser = await User.findByIdAndUpdate(
      id,
      putUser,
      { new: true }
    );
    if (!updateUser){
        return res.status(404).json({ message: `No User with ID: ${id} was found! :(` })
    }
    return res.status(200).json(updateUser);
  } catch (error) {
    return res.status(500).json(error, {message: `There was an error: ${error}`})
  }
};

const addUserGroup = async (userId, groupId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID: ${userId} not found`);
    }

    user.groups.push(groupId);
    await user.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { register, login, profile, getUser, getUserById, putUser, addUserGroup };