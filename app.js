const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
// const stripe = require("stripe")(
//   "sk_test_51Hp8swCIaZnxCRUH7xN5nB5b1yCR4epngHj2BZHqQrH7b1EDWdNxiAL25QbDXKOpmpI2aL4r4WvG4XFARPauwSJU00EYtgNhip"
// );

const app = express();
// Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));


//index route
app.get("/", (req, res) => {
    res.render("index");
});





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`port started on ${port}`);
});