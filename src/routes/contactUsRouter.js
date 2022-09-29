const express = require("express");
const { postMessage2DB, getMsgsAsXlsx, viewMessages } = require("../controller/contactusController");
const contactRouter = express.Router();
const auth = require("../helpers/auth")

//Post contact messages to DB
contactRouter.post("/contact-us", (req, res) => {
    postMessage2DB(req, res);
})

//Export contact messages as xlsx
contactRouter.get("/export-msg", auth, async (req, res) => {
    getMsgsAsXlsx(req, res);
})

//view all messages between dates
contactRouter.get("/messages", auth, async (req, res) => {
    viewMessages(req, res);
})

module.exports = contactRouter;