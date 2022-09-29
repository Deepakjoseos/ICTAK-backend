const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CorporateMembership = new Schema({
    appNo: {
        type: Number,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    organisation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    orgHead: {
        type: String,
        required: true
    },
    orgNature: {
        type: String,
        required: true
    },
    companyType: {
        type: String,
        required: true
    },
    corpID: {
        type: String,
        required: true
    },
    GSTN: {
        type: String,
        required: true
    },
    dateOfIncorp: {
        type: String,
        required: true
    },
    pocName: {
        type: String,
        required: true
    },
    pocPhone: {
        type: String,
        required: true
    },
    pocEmail: {
        type: String,
        required: true
    },
    skilset: {
        type: String,
        required: true
    },
    noOfEmployees: {
        type: Number,
        required: true
    },
    avgYrFrHiring: {
        type: String,
        required: true
    },
    noOfPatents: {
        type: String,
        required: true
    },
    collaborate: {
        type: Object,
        required: true
    },
    details: {
        type: String,
        required: true
    }
})

//Generate App No.
CorporateMembership.pre("save", async function (next) {
    try {
        if (this.isNew) {
            let total = await CorporateMember.find().sort({ appNo: -1 }).limit(1);
            this.appNo = total.length === 0 ? 1 : Number(total[0].appNo) + 1;
        }
        next()
    } catch (error) {
        next(error)
    }
})

const CorporateMember = mongoose.model("corporatemember", CorporateMembership);
module.exports = CorporateMember;