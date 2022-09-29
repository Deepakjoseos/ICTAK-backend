const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactUsSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    respondedBack: {
        type: Boolean,
        default: false
    }

})

const Contact = mongoose.model("contact", ContactUsSchema);
module.exports = Contact;