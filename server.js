var app = require('./common/imports').express();
var bodyparser = require("./common/imports").bodyParser;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
var password = require("passport");
const passwordSetup = require("./config/passport-setup");
app.set('view engine', 'ejs');
// app.use(require("./common/imports").cors({
//     origin:['http://localhost:4200','https://www.google.com'],
//     credentials :true
// }));

app.use(require("./common/imports").cors({
    origin: 'http://localhost:4200',
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials :true
}));

app.options('http://localhost:4200', require("./common/imports").cors())


app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});




// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()
//   })
app.use("/login",require("./login/login"));
app.use("/register",require("./register/register"));
app.get("/test",(req,res)=>{console.log("Test Page");res.send("Testing the webpage")});
app.get("/",(req,res)=>{console.log("Home Page");res.render("home")});
app.get("/google",password.authenticate('google',{scope:['profile']}),(req,res)=>{console.log("Befor Call Back");return res.status(201).json({"feroz":"alla"})});
app.get("/google/redirect",password.authenticate('google'),(req,res)=>{console.log("After Call Back");return res.status(201).json({"mobeena":"shaik"})});
app.listen(8080);
console.log("Server Listening the port no.8080");