const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Cannot be empty'],
        },
        fullname: {
            type: String,
            required: [true, 'Cannot be empty'],
        },
        email: {
            type: String,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'is invalid'],
        },
        phone: {
            type: String,
            required: [true, 'Cannot be empty'],
            match: [/\d/, 'is invalid'],
        },
        address: {
            type: String,
            required: [true, 'Cannot be empty'],
        },
        password: {
            type: String,
            required: [true, 'Cannot be empty'],
        },
        confirmpassword: {
            type: String,
            required: [true, 'Cannot be empty'],
        },
        products: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
            },
          ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Customer', CustomerSchema);
