const express = require("express");
const {
  getCource,
  createCource,
  getCourceByID,
  updateCource,
  deleteCource,
} = require("../controller/courceController");

const router = express.Router();

router.route("/").get(getCource);

 router.route("/create").post(createCource);
router.route("/:id").get(getCourceByID).put(updateCource).delete(deleteCource);


module.exports = router ;