const session = require('express-session');
const Customer = require('../models/customer.model');

exports.create = (req, res) => {
    const customer = new Customer({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone ,
        address: req.body.address,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
    });
    if(req.body.password===req.body.confirmpassword){
        customer.save((err, data) => {
            if (err) {
                return res.status(500).send({ err });
            }
            res.json({ customer: data });
        });
    } else {
        return res
        .status(500)
        .send({ err: 'Confirm password incorrect' });
    }
};

exports.login = (req, res) => {
    Customer.findOne({ username: req.body.username }).exec((err, customer) => {
        if (err) {
            return res.status(500).send({ err });
        } else if (!customer) {
            return res
                .status(500)
                .send({ err: 'Username and Password are incorrect' });
        } else if (req.body.password === customer.password) {
            // req.session.customer = customer;
            res.json({
                customer: customer,
                login: 'success',
            });
        } else {
            return res
                .status(500)
                .send({ err: 'Password are incorrect' });
        }
    });
};

exports.logout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send({ err });
            } else {
                res.json({ logout: 'success' });
            }
        });
    }
};
