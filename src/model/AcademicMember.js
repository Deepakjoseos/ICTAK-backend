const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcademicMemberSchema = new Schema({
    appNo: {
        type: Number,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    institution: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dateOfEstablishment: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    principalName: {
        type: String,
        required: true
    },
    principalEmail: {
        type: String,
        required: true
    },
    principalPhone: {
        type: String,
        required: true
    },
    pocName: {
        type: String,
        required: true
    },
    pocEmail: {
        type: String,
        required: true
    },
    pocPhone: {
        type: String,
        required: true
    },
    totalEligibleIntake: {
        type: Object,
        required: true
    },
    actualIntake: {
        type: Object,
        required: true
    },
    passPercent: {
        type: Object,
        required: true
    },
    totalNoOfFaculty: {
        type: Number,
        required: true
    },
    percentPHD: {
        type: Number,
        required: true
    },
    percent3YrIE: {
        type: Number,
        required: true
    },
    internetSpeed: {
        type: String,
        required: true
    },
    totalComputers: {
        type: Number,
        required: true
    },
    accreditation: {
        type: String,
        required: true
    },
    prizesAwards: {
        type: String,
        required: true
    },
    papersPublished: {
        type: String,
        required: true
    },
    uniqueness: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
});

//Generate App No.
AcademicMemberSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            let total = await PremiumMember.find().sort({ appNo: -1 }).limit(1);
            this.appNo = total.length === 0 ? 1 : Number(total[0].appNo) + 1;
        }
        next()
    } catch (error) {
        next(error)
    }
})

const PremiumMember = mongoose.model("academicmember", AcademicMemberSchema);
module.exports = PremiumMember;