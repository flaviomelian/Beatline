const router = require("express").Router();
//const { checkAdmin } = require("../middlewares/auth.js");
const {
  getAllAudios,
  getAudio,
  createAudio,
  updateAudio,
  deleteAudio,
} = require("../controllers/audio.controller.js");

router.get("/", getAllAudios);
router.get("/:id", getAudio);
router.post("/", createAudio);
router.put("/:id", updateAudio);
router.delete("/:id", deleteAudio);

module.exports = router;