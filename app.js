const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const keys = require("./config/keys")
const stripe = require("stripe")(keys.stripeSecretKey)

const app = express();
// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));


//index route
app.get("/", (req, res) => {
    res.render("index", {
        stripePublishabaleKey: keys.stripePublishabaleKey
    });
});
app.get("/success", (req, res) => {
    res.render("success");
});

//change route
app.post("/charge", (req, res) => {
    const amount = 2500
    // console.log(req.body)
    // res.send("test")
    // Create a new customer and then create an invoice item then invoice it:
    stripe.customers
        .create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        .then((customer) => {
            stripe.charges.create({
                amount,
                description: "Web developmen EBook",
                currency: 'usd',
                customer: customer.id

            })
        }).then(charge => res.render('success'));

})





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`port started on ${port}`);
});