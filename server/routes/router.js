const express = require('express');
const router = new express.Router();
const Products = require("../models/productSchema");
const Users = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")


//get products data API

router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        // console.log("console"+productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log(error.message);
    }
});

//get individual 
router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const individualdata = await Products.findOne({ id: id });
        // console.log(individualdata);
        res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(individualdata);
        console.log(error.message);
    }
});

//register data 

router.post("/register", async (req, res) => {
    const { fname, email, mobile, password, cpassword } = req.body;
    // console.log(fname+email+mobile+password+cpassword);
    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "Fill the all data" });
        console.log("No Data Available");
    }
    try {
        const preuser = await Users.findOne({ email });
        if (preuser) {
            res.status(422).json({ error: "This user is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and cpassword not match" });
        } else {
            const finalUser = new Users({
                fname, email, mobile, password, cpassword
            });

            const storedata = await finalUser.save();
            // console.log(storedata);
            res.status(201).json(storedata);
        }
    } catch (error) {
        res.status(422).json({ error: "Error!!!" });
    }
})

//login user API

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Fill the All Data" });
    }
    try {
        const userLogin = await Users.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            //generate TOKEN
            const token = await userLogin.generateAuthtoken();
            // console.log(token);

            //generate Cookie
            res.cookie("Amazonweb", token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });


            if (!isMatch) {
                res.status(400).json({ error: "Invalid Password" });
            } else {
                res.status(201).json(userLogin);
            }
        } else {
            res.status(400).json({ error: "Invalid Details" });

        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details" });
    }
})

//Adding the data into carts

router.post("/adddata/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        // console.log(cart + "Cart Value");

        const userContact = await Users.findOne({ _id: req.userID });
        // console.log(userContact);

        if (userContact) {
            const cartData = await userContact.addToCart(cart);
            await userContact.save();
            // console.log(cartData);
            res.status(201).json(userContact);
        } else {
            res.status(401).json({ error: "Invalid" });
        }


    } catch (error) {
        res.status(401).json({ error: "Invalid" });
    }
})

//cart details

router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyuser = await Users.findOne({ _id: req.userID });
        res.status(201).json(buyuser);
    } catch (error) {
        console.log({ error: "Invalid" });
    }
})

//get valid user
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validuserone = await Users.findOne({ _id: req.userID });
        res.status(201).json(validuserone);
    } catch (error) {
        console.log({ error: "Invalid" });
    }
})

//remove item 

router.delete("/remove/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((cVal) => {
            return cVal.id != id;
        });
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item remove");
    } catch (error) {
        res.status(400).json(req.rootUser);
    }
})

//logout

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((cEle) => {
            return cEle.token !== req.token;
        });
        res.clearCookie("Amazonweb", { path: "/" })
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("Logout");
    } catch (error) {
        console.log("Error");
    }
})



module.exports = router;