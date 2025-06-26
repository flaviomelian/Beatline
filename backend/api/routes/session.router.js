const router = require("express").Router();
//const { checkAuth, checkAdmin } = require("../middlewares/auth.js");
const {
  getAllSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
} = require("../controllers/session.controller.js");

router.get("/", getAllSessions);
router.get("/:id", getSession);
router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);

module.exports = router;