const express = require("express"); 
const {
    postPartnershipAppl,
    partnerAppl2Xlsx,
    viewPartnerAppl
} = require("../controller/partnershipController");
const partnershipRouter = express.Router();
const auth = require("../helpers/auth")


//Partnership Registration Application
partnershipRouter.post("/partnerinfo", (req, res) => {
    postPartnershipAppl(req, res);
})

//Partnership application export to xslx
partnershipRouter.get("/export-partner", auth, async (req, res) => {
    partnerAppl2Xlsx(req, res);
})

//View partnership applications
partnershipRouter.get("/view-partner", auth, async (req, res) => {
    viewPartnerAppl(req, res);
})


module.exports = partnershipRouter;