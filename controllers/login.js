const adminModel = require('../models/adminModel');

const login = async function (req, res) {
    let userId = req.body.userId;
    let password = req.body.password;
    let areValid = true;
    let validation = {
        errMessage: "Invalid Input ☺",
        userError: "",
    };
    let userName;

    try {
        if (userId == null || userId == "") {
            areValid = false;
            validation.userError = "Invalid input ☺";
            throw false;
        }

        try {
            await adminModel.areValidCredentials(userId, password);
        } catch (err) {
            console.log("inside controllers/login.js  arevlidCredentials  " + err);
            validation.errMessage = "Invalid User ID or Password ☺";
            areValid = false
            throw err;
        }
    } catch (err) {
        console.log(err + " first outer");
    }
    try {
        if (!areValid) {
            console.log('check out');
            throw false;
        }
        try {
            let result = await adminModel.read(userId);
            userName = result[0].name
        } catch (err) {
            console.log("inside controllers/login.js  read   " + err);
            validation.errMessage = "Sorry for delay. Try again ☺";
            throw err;
        }
        res.locals.userId = userName;
        res.redirect('/adminLogin/adminView');

    } catch (err) {
        console.log(err);
        validation.userId = userId;
        let locals = JSON.stringify(validation);
        res.render('loginForm', { locals: locals });
    }
};

module.exports = login;