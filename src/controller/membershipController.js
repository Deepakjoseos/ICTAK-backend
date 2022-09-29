const sendEmail = require("../helpers/sendmail");
const premiumMember = require("../model/AcademicMember");
const corporateMember = require("../model/CorporateMember");
const convertJsonToExcel = require("../helpers/convertToExcel");

//Register premium academic member
const premiumMemberReg = (req, res) => {
    try {
        var item = {
            institution: req.body.institution,
            category: req.body.category,
            dateOfEstablishment: req.body.dateOfEstablishment,
            university: req.body.university,
            address: req.body.address,
            principalName: req.body.principalName,
            principalEmail: req.body.principalEmail,
            principalPhone: req.body.principalPhone,
            pocName: req.body.pocName,
            pocEmail: req.body.pocEmail,
            pocPhone: req.body.pocPhone,
            totalEligibleIntake: req.body.totalEligibleIntake,
            actualIntake: req.body.actualIntake,
            passPercent: req.body.passPercent,
            totalNoOfFaculty: req.body.totalNoOfFaculty,
            percentPHD: req.body.percentPHD,
            percent3YrIE: req.body.percent3YrIE,
            internetSpeed: req.body.internetSpeed,
            totalComputers: req.body.totalComputers,
            accreditation: req.body.accreditation,
            prizesAwards: req.body.prizesAwards,
            papersPublished: req.body.papersPublished,
            uniqueness: req.body.uniqueness,
            reason: req.body.reason
        }
        if (item.institution !== "" && item.pocEmail !== "" && item.pocPhone !== "" && item.principalName !== "" && item.principalPhone !== "") {
            const member = new premiumMember(item);
            member.save()
                .then(() => {
                    res.json({ status: "Success" });
                    sendEmail(item.pocEmail,
                        "ICTAK Membership Application Confirmation",
                        "This email message is a computer generated message to confirm the receipt of your membership application." +
                        "<br/><br/> Thanks & Regards, <br/> <b>ICT Academy of Kerala</b>"
                    );
                })
                .catch((er) => {
                    console.log(er)
                    if (!res.headersSent)
                        res.sendStatus(500).json({ status: "Error" });
                });
        } else {
            res.json({ status: "Error", message: "Invalid inputs" });
        }
    } catch (error) {
        if (!res.headersSent)
            res.json({ status: "Error", message: error.message });
    }
};

//Corporate member registration
const corporateMemReg = (req, res) => {
    try {
        var item = {
            organisation: req.body.organisation,
            address: req.body.address,
            website: req.body.website,
            orgHead: req.body.orgHead,
            orgNature: req.body.orgNature,
            companyType: req.body.companyType,
            corpID: req.body.corpID,
            GSTN: req.body.GSTN,
            dateOfIncorp: req.body.dateOfIncorp,
            pocName: req.body.pocName,
            pocEmail: req.body.pocEmail,
            pocPhone: req.body.pocPhone,
            skilset: req.body.skilset,
            noOfEmployees: req.body.noOfEmployees,
            avgYrFrHiring: req.body.avgYrFrHiring,
            noOfPatents: req.body.noOfPatents,
            collaborate: req.body.collaborate,
            details: req.body.details
        }
        if (item.organisation !== "" && item.pocEmail !== "" && item.pocPhone !== "" && item.orgHead !== "" && item.orgNature !== "") {
            const member = new corporateMember(item);
            member.save()
                .then(() => {
                    res.json({ status: "Success" });
                    sendEmail(item.pocEmail,
                        "ICTAK Membership Application Confirmation",
                        "This email message is a computer generated message to confirm the receipt of your membership application." +
                        "<br/><br/> Thanks & Regards, <br/> <b>ICT Academy of Kerala</b>"
                    );
                })
                .catch((er) => {
                    console.log(er)
                    if (!res.headersSent)
                        res.sendStatus(500).json({ status: "Error" });
                });
        } else {
            res.json({ status: "Error", message: "Invalid inputs" });
        }
    } catch (error) {
        if (!res.headersSent)
            res.json({ status: "Error", message: error.message });
    }
};

//Academic member reg. application to xlsx
const premiumMemApplXlsx = async (req, res) => {
    try {
        let fromDate = new Date(req.query.fromDate);
        let toDate = new Date(req.query.toDate);
        toDate.setDate(toDate.getDate() + 1);

        let filter = {
            date: {
                $gte: fromDate,
                $lt: toDate
            }
        }
        let projection = {
            _id: 0,
            "Appl No": "$appNo",
            "Inst Name": "$institution",
            "Category": "$category",
            "Est Date": "$dateOfEstablishment",
            "University": "$university",
            "Address": "$address",

            "Princ Name": "$principalName",
            "Princ Email": "$principalEmail",
            "Princ Phone": "$principalPhone",

            "POC Name": "$pocName",
            "POC Email": "$pocEmail",
            "POC Phone": "$pocPhone",
            
            "Actual Intake Yr 1": "$actualIntake.yr1",
            "Actual Intake Yr 2": "$actualIntake.yr2",
            "Actual Intake Yr 3": "$actualIntake.yr3",
            
            
            "Eligible Intake Yr 1": "$totalEligibleIntake.yr1",
            "Eligible Intake Yr 2": "$totalEligibleIntake.yr2",
            "Eligible Intake Yr 3": "$totalEligibleIntake.yr3",

           
            "Pass % Yr1": "$passPercent.yr1",
            "Pass % Yr2": "$passPercent.yr2",
           
            "Total No of Faculty": "$totalNoOfFaculty",
            "PHD %": "$percentPHD",
            "Faculty with 3 years Industry Exp%": "$percent3YrIE",
            "Internet Speed": "$internetSpeed",
            "Total Computers": "$totalComputers",
            "Accreditation": "$accreditation",
            "Prizes & Awards Won": "$prizesAwards",
            "Papers Published": "$papersPublished",
            "Uniqueness about your inst": "$uniqueness",
            "Reason for membership appl": "$reason"
        };
        let academicAppl = await premiumMember.find(filter, projection);
        if (academicAppl.length > 0) {
            convertJsonToExcel(academicAppl, "Premium Member Applications", res);
        } else {
            res.json({ status: "Error", message: "No records found" });
        }
    
    } catch (err) {
        console.log(err);
        if (!res.headersSent)
            res.json({ status: "Error", message: err.message });
    }
};

//View academic reg. applications
const viewAcademicMemAppl = async (req, res) => {
    try {
        let fromDate = new Date(req.query.fromDate);
        let toDate = new Date(req.query.toDate);
        toDate.setDate(toDate.getDate() + 1);

        let filter = {
            date: {
                $gte: fromDate,
                $lt: toDate
            }
        }
        let projection = {
            _id: 0,
            "Appl No": "$appNo",
            "Inst Name": "$institution",
            "Category": "$category",
            "Est Date": "$dateOfEstablishment",
            "University": "$university",
            "Address": "$address",

            "Princ Name": "$principalName",
            "Princ Email": "$principalEmail",
            "Princ Phone": "$principalPhone",

            "POC Name": "$pocName",
            "POC Email": "$pocEmail",
            "POC Phone": "$pocPhone",
        };
        let academicAppl = await premiumMember.find(filter, projection);
        if (academicAppl.length > 0) {
            res.json(academicAppl);
        } else {
            res.json({ status: "Error", message: "No records found" });
        }
    
    } catch (err) {
        console.log(err);
        if (!res.headersSent)
            res.json({ status: "Error", message: err.message });
    }
}

//Corporate member applications to xlsx
const corporateMemApplXlsx = async (req, res) => {
    try {
        let fromDate = new Date(req.query.fromDate);
        let toDate = new Date(req.query.toDate);
        toDate.setDate(toDate.getDate() + 1);

        let filter = {
            date: {
                $gte: fromDate,
                $lt: toDate
            }
        }
        let projection = {
            _id: 0,
            "Org Name": "$organisation",
            "Address": "$address",
            "Website": "$website",
            "Org Head": "$orgHead",
            "Nature of org": "$orgNature",
            "Type of company": "$companyType",
            "Corporate ID": "$corpID",
            "GSTN": "$GSTN",
            "Date of incorp": "$dateOfIncorp",
            "POC Name": "$pocName",
            "POC Email": "$pocEmail",
            "POC Phone": "$pocPhone",
            "Tech skills used": "$skilset",
            "No of employees": "$noOfEmployees",
            "Avg yearly fresher hiring": "$avgYrFrHiring",
            "No of patents filed": "$noOfPatents",
            "Provide experts for skill sessions": "$collaborate.experts4SkillSessions",
            "Fresher Hiring": "$collaborate.fresherHiring",
            "Internships": "$collaborate.internships",
            "Employee training in technologysoft skills": "$collaborate.employeeTraining",
            "Capstone Projects assistance": "$collaborate.projectAssistance",
            "Academic activities": "$details"
        };
        let corporateAppl = await corporateMember.find(filter, projection);
        if (corporateAppl.length > 0) {
            convertJsonToExcel(corporateAppl, "Corporate Member Applications", res);
        } else {
            res.json({ status: "Error", message: "No records found" });
        }
    
    } catch (err) {
        console.log(err);
        if (!res.headersSent)
            res.json({ status: "Error", message: err.message });
    }
}

//View corporate reg. applications
const viewCorpMemRegAppl = async (req, res) => {
    try {
        let fromDate = new Date(req.query.fromDate);
        let toDate = new Date(req.query.toDate);
        toDate.setDate(toDate.getDate() + 1);

        let filter = {
            date: {
                $gte: fromDate,
                $lt: toDate
            }
        }
        let projection = {
            _id: 0,
            "Org Name": "$organisation",
            "Address": "$address",
            "Website": "$website",
            "Org Head": "$orgHead",
            "Nature of org": "$orgNature",
            "Type of company": "$companyType",
            "Corporate ID": "$corpID",
            "GSTN": "$GSTN",
            "Date of incorp": "$dateOfIncorp",
            "POC Name": "$pocName",
            "POC Email": "$pocEmail",
            "POC Phone": "$pocPhone",
            "Tech skills used": "$skilset"
        };
        let corporateAppl = await corporateMember.find(filter, projection);
        if (corporateAppl.length > 0) {
            res.json(corporateAppl);
        } else {
            res.json({ status: "Error", message: "No records found" });
        }
    
    } catch (err) {
        console.log(err);
        if (!res.headersSent)
            res.json({ status: "Error", message: err.message });
    }
}

module.exports = {
    premiumMemberReg,
    corporateMemReg,
    premiumMemApplXlsx,
    viewAcademicMemAppl,
    corporateMemApplXlsx,
    viewCorpMemRegAppl
};