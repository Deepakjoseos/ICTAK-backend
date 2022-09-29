const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartnershipSchema = new Schema({
    appNo: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    firm: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    district: {
        type: String
    },
    officeSpace: {
        type: Number,
    },
    noOfEmployees: {
        type: Number,
        required: true
    },
    briefReport: {
        type: String
    },
    expects: {
        type: String
    },
    promoters: {
        type: String
    }
});

//Generate App No.
PartnershipSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            let total = await Partnership.find().sort({ appNo: -1 }).limit(1);
            this.appNo = total.length === 0 ? 1 : Number(total[0].appNo) + 1;
        }
        next()
    } catch (error) {
        next(error)
    }
})

const Partnership = mongoose.model("partnership", PartnershipSchema);
module.exports = Partnership;