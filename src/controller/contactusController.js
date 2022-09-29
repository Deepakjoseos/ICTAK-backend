const sendEmail = require("../helpers/sendmail");
const Contact = require("../model/ContactUs");
const convertJsonToExcel = require("../helpers/convertToExcel");

//Contact us message posting
const postMessage2DB = (req, res) => {
    try {
        var item = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        }
        if (item.name !== "" && item.email !== "" && item.message !== "") {
            const message = new Contact(item);
            message.save()
                .then(() => {
                    res.json({ status: "Success" });
                    sendEmail(item.email,
                        "Thank you for contacting ICT Academy of Kerala",
                        "This email message is a computer generated message to confirm the receipt of your message." +
                        "Someone will get back to you as soon as possible." +
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
};

//Get messages as xlsx
const getMsgsAsXlsx = async (req, res) => {
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
            name: 1,
            email: 1,
            message: 1
        };
        let messages = await Contact.find(filter, projection);
        if (messages.length > 0) {
            convertJsonToExcel(messages, "Contact Messages", res);
        } else {
            res.json({ status: "Error", message: "No records found" });
        }
    } catch (err) {
        console.log(err);
    }
}

//View all messages in a date range
const viewMessages = async (req, res) => {
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
            name: 1,
            email: 1,
            message: 1
        };
        let messages = await Contact.find(filter, projection);

        res.json(messages);
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    postMessage2DB,
    getMsgsAsXlsx,
    viewMessages
}