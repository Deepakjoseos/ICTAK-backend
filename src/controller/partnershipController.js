const Partnership = require("../model/PartnershipInfo");
const sendEmail = require("../helpers/sendmail");
const convertJsonToExcel = require("../helpers/convertToExcel");

//Partnership reg. application posting
const postPartnershipAppl = (req, res) => {
    try {
        var item = {
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            firm: req.body.firm,
            address: req.body.address,
            district: req.body.district,
            officeSpace: req.body.officeSpace,
            noOfEmployees: req.body.noOfEmployees,
            briefReport: req.body.briefReport,
            expects: req.body.expects,
            promoters: req.body.promoters
        }
        if (item.fullname !== "" && item.email !== "" && item.phone !== "" && item.firm !== "" && item.noOfEmployees > 0) {
            const partner = new Partnership(item);
            partner.save()
                .then(() => {
                    res.json({ status: "Success" });
                    sendEmail(item.email,
                        "ICTAK Partnership Application Confirmation",
                        "This email message is a computer generated message to confirm the receipt of your partnership application." +
                        "<br/><br/> Thanks & Regards, <br/> <b>ICT Academy of Kerala</b>"
                    );
                })
                .catch((er) => {
                    console.log(er);
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
}

//Partnership reg. application to xlsx
const partnerAppl2Xlsx = async (req, res) => {
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
            "Full Name": "$fullname",
            "Email ID": "$email",
            "Phone": "$phone",
            "Est Date": "$firm",
            "Address": "$address",
            "District": "$district",
            "Office Space in Sq m": "$officeSpace",
            "No of employees": "$noOfEmployees",
            "Brief Report": "$briefReport",
            "Expectation from partnership": "$expects",
            "Promoter profile": "$promoters"
        };
        let partnerAppl = await Partnership.find(filter, projection);
        if (partnerAppl.length > 0) {
            convertJsonToExcel(partnerAppl, "Partnership Applications", res);
        } else {
            res.json({ status: "Error", message: "No records found" });
        }
    
    } catch (err) {
        console.log(err);
        if (!res.headersSent)
            res.json({ status: "Error", message: err.message });
    }
}

//View Partnership Applications in a date range
const viewPartnerAppl = async (req, res) => {
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
            "Full Name": "$fullname",
            "Email ID": "$email",
            "Phone": "$phone",
            "Est Date": "$firm",
            "Address": "$address",
            "District": "$district",
            "Office Space in Sq m": "$officeSpace",
            "No of employees": "$noOfEmployees",
            "Brief Report": "$briefReport",
            "Expectation from partnership": "$expects",
            "Promoter profile": "$promoters"
        };
        let partnerAppl = await Partnership.find(filter, projection);
        if (partnerAppl.length > 0) {
            res.json(partnerAppl);
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
    postPartnershipAppl,
    partnerAppl2Xlsx,
    viewPartnerAppl
}