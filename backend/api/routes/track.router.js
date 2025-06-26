const router = require("express").Router();
//const { checkAdmin } = require("../middlewares/auth.js");
const {
  getAllTracks,
  getTrack,
  createTrack,
  updateTrack,
  deleteTrack,
} = require("../controllers/track.controller.js");

router.get("/", getAllTracks);
router.get("/:id", getTrack);
router.post("/", createTrack);
router.put("/:id", updateTrack);
router.delete("/:id", deleteTrack);

module.exports = router;