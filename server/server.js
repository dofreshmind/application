const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const session = require("express-session");
const port = process.env.PORT || 5000;
const authMiddleware = require("./Middlewares/authmiddleware");
const Authroute = require("./router/Authroute");
const Subscriptionroute = require("./router/Subscriptionroute");

require("dotenv").config();

// middelwares
// const whitelist = process.env.WHITELISTHOST;
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   if (!whitelist.includes(req.headers.origin)) {
//     return res.status(403).json("Not allowed by CORS");
//   }
//   next();
// });

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(
  session({
    secret: process.env.SECRETSESSIONID,
    resave: false,
    saveUninitialized: false,
  })
);

// local test

app.set("view-engine", "ejs");
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/userregister", (req, res) => {
  res.render("userregister.ejs");
});

app.get("/userlogin", (req, res) => {
  res.render("userlogin.ejs");
});

// authMiddleware
app.use("/api", Authroute);

app.use("/api", authMiddleware, Subscriptionroute);

app.get("/api", authMiddleware, (req, res) => {
  res.json({ msg: "working good" });
});

const _dburl =
  process.env.SERVER === "dev"
    ? process.env.MONGODBURILOCAL
    : process.env.MONGODBURISERVER;

// mongodb connect
mongoose.connect(_dburl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// app listen port
app.listen(port, () => {
  console.log(`app start at ${port}`);
});
