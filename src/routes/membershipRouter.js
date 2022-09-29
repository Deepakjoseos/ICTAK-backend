const express = require("express");
const membershipRouter = express.Router();
const auth = require("../helpers/auth");
const {
    premiumMemberReg,
    corporateMemReg,
    premiumMemApplXlsx,
    viewAcademicMemAppl,
    corporateMemApplXlsx,
    viewCorpMemRegAppl
} = require("../controller/membershipController");


//Premium Member Registration
membershipRouter.post("/academic-member", (req, res) => {
    premiumMemberReg(req, res);
})

//Corporate Membership Registration
membershipRouter.post("/corporate-member", (req, res) => {
    corporateMemReg(req, res);
})

//Academic member application export to xslx
membershipRouter.get("/export-academic", auth, async (req, res) => {
    premiumMemApplXlsx(req, res);
})

//View academic member application details
membershipRouter.get("/view-academic", auth, async (req, res) => {
    viewAcademicMemAppl(req, res);
})

//Corporate member application export to xslx
membershipRouter.get("/export-corporate", auth, async (req, res) => {
    corporateMemApplXlsx(req, res);
})

//View corporate member applications
membershipRouter.get("/view-corporate", auth, async (req, res) => {
    viewCorpMemRegAppl(req, res);
})

module.exports = membershipRouter;
