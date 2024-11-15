const express = require("express")
const {
  getGroups,
  postGroup,
  putGroup,
  deleteGroup,
  getGroupbyName,
  getGroupWithPassword,
  getInGroup,
  sortSecretSanta,
} = require("../controllers/groups.controllers");
const { isAdmin, isAuth } = require("../../middleware/auth")
const router = express.Router()

router.get("/allgroups", [isAuth], getGroups);
router.post("/create", [isAuth], postGroup);
router.get("/:nameGroup",[isAuth], getGroupbyName);
router.put("/:id", [isAuth], putGroup);
router.delete("/:id", [isAuth], deleteGroup);
router.post("/private/:nameGroup", [isAuth], getGroupWithPassword);
router.get("/inGroup/:nameGroup", [isAuth], getInGroup);
router.get("/sort/:nameGroup", [isAuth], sortSecretSanta);



module.exports = router;