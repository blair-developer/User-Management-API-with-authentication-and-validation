const dotenv = require("dotenv").config();

const express = require("express");
const app = express();

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const path = require("path");

// TEMPLATE ENGINE
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");

// DB CONNECTION
const connectDB = require("./config/databaseConnection");
connectDB();

// STATIC FILES
app.use(express.static("public"));

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.use(expressLayouts);

// =======================
// SESSION (connect-mongo@3 FIX)
// =======================
const MongoStore = require("connect-mongo");

// IMPORTANT: v3 uses NEW keyword
const sessionStore = new MongoStore({
  url: process.env.MONGODB_CONNECTION_STRING,
  collection: "mySessions",
});

// SESSION MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
  })
);

// FLASH
app.use(flash());

// GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.validation_error = req.flash("validation_error");
  res.locals.success_message = req.flash("success_message");

  res.locals.email = req.flash("email");
  res.locals.name = req.flash("name");
  res.locals.surname = req.flash("surname");
  res.locals.password = req.flash("password");
  res.locals.repassword = req.flash("repassword");

  res.locals.login_error = req.flash("error");

  next();
});

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// ROUTES
const authRouter = require("./routes/authRoute");
const roomRouter = require("./routes/roomRoute");
const adminRouter = require("./routes/adminRoute");

app.use("/", authRouter);
app.use("/rooms", roomRouter);
app.use("/admin", adminRouter);

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    message: "Hotel System Running 🚀",
    time: new Date(),
  });
});

// START SERVER
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`server run on ${PORT}`);
});