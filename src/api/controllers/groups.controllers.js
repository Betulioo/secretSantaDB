const Group = require("../models/group.model");
const { addUserGroup } = require("../controllers/user.controller.js");
const bycrypt = require("bcrypt");
const User = require("../models/user.model");
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("usersList");
    console.log(groups);
    return res.status(200).json(groups);
  } catch (error) {
    return res.json(error);
  }
};

const postGroup = async (req, res) => {
  try {
    const { name, quantity, password } = req.body;
      const userId = req.userProfile._id.toString().replace(/^.*"(.*)".*$/, "$1");
      const username = req.userProfile.username;

    if (password) {
      console.log("entro");

      const hashpassword = bycrypt.hashSync(password, 10);
      const group = new Group({
        name,
        usersList: [userId],
        owner: userId,
        quantity,
        password: hashpassword,
        isPrivate: true,
      });
      const createdGroup = await group.save();
      const groupId = createdGroup._id.toString().replace(/^.*"(.*)".*$/, "$1");

      await addUserGroup(userId, groupId);
      return res.json(createdGroup);
    } else {
      const group = new Group({
        name,
        usersList: [userId],
        owner: userId,
        quantity,
      });
      const createdGroup = await group.save();
      const groupId = createdGroup._id.toString().replace(/^.*"(.*)".*$/, "$1");
      await addUserGroup(userId, groupId);
      return res.json(createdGroup);
    }
  } catch (error) {
    return res.json(error);
  }
};

const putGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const groupBody = new Group(req.body);
    groupBody._id = id;
    const updateGroup = await Shop.findByIdAndUpdate(id, groupBody, {
      new: true,
    });
    if (!updateGroup) {
      return res.status(404).json({ message: "Esta tienda no existe" });
    }
    return res.status(200).json(updateGroup);
  } catch (error) {}
};
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteGroup = await Group.findByIdAndDelete(id);
    if (!deleteGroup) {
      return res.status(404).json({ message: "Esta tienda no existe" });
    }
    return res.status(200).json(deleteGroup);
  } catch (error) {}
};

const getGroupbyName = async (req, res) => {
  try {
    const { nameGroup } = req.params;
    const group = await Group.find({ name: nameGroup });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
      console.log(group);
    if (group[0].isPrivate) {
        console.log("entro");
      return res.status(401).json({ message: "group is private" });
    }
    return res.status(200).json(group);
  } catch {
    return res.json(error);
  }
};
const getGroupWithPassword = async (req, res) => {
  try {
      const { password } = req.body;
      const { nameGroup } = req.params;
    const group = await Group.findOne({ name: nameGroup });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.isPrivate) {
      const isMatch = bycrypt.compareSync(password, group.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }
    }

    return res.status(200).json(group);
  } catch (error) {
    return res.json(error);
  }
};

const getInGroup = async (req, res) => {
    try {
        const { nameGroup } = req.params;
        const userId = req.userProfile._id.toString().replace(/^.*"(.*)".*$/, "$1");
        const username = req.userProfile.username;
        const group = await Group.find({ name: nameGroup });
        console.log(group);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        const isInGroup = group[0].usersList.includes(userId);
        console.log(isInGroup);
        if (isInGroup) {
            return res.status(401).json({ message: "You are in this group" });
        }
        if (group[0].usersList.length >= group[0].quantity) {
            return res.status(403).json({ message: "Group is full" });
        }
        const groupId = group[0]._id.toString().replace(/^.*"(.*)".*$/, "$1");
        const groupUpdate = await Group.findByIdAndUpdate(
          groupId,
          { $push: { usersList: userId } },
          { new: true }
        );
        await addUserGroup(userId, groupId);
        return res.status(200).json(groupUpdate);
        
    } catch (error) {
        return res.json(error);
    }
}

const sortSecretSanta = async (req, res) => {
  try {
    const { nameGroup } = req.params;
    const group = await Group.find({ name: nameGroup });

    if (!group || group.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    const users = [...group[0].usersList]; // Copia de la lista de usuarios
    const usersPool = [...users]; // Otra copia para elegir secretSanta
    const secretSanta = [];
    const secretSantaList = [];

    let random, randomUser;

    for (let i = 0; i < users.length; i++) {
      // Elegir un usuario aleatorio de usersPool que no sea el mismo
      do {
        random = Math.floor(Math.random() * usersPool.length);
        randomUser = usersPool[random];
      } while (users[i] === randomUser);

      // Asignar el "Amigo Secreto" y eliminarlo del pool
      secretSanta.push({ user: users[i], secretSanta: randomUser });
      usersPool.splice(random, 1); // Eliminar de usersPool
    }

    for (let i = 0; i < secretSanta.length; i++) {
      const user = await User.findById(secretSanta[i].user);
      const secretSantaUser = await User.findById(secretSanta[i].secretSanta);

      // Actualizar en la base de datos
      const updatedUser = await User.findByIdAndUpdate(
        secretSanta[i].user,
        { secretSanta: secretSantaUser.username },
        { new: true }
      );

      secretSantaList.push({ user, secretSanta: secretSantaUser });
    }

    console.log(secretSantaList);
    return res.status(200).json(secretSantaList);
  } catch (error) {
    return res.json(error);
  }
};


module.exports = {
  getGroups,
  postGroup,
  putGroup,
  deleteGroup,
  getGroupbyName,
  getGroupWithPassword,
  getInGroup,
  sortSecretSanta,
};
