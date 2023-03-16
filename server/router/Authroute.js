const route = require("express").Router();
const UserAuth = require("../controller/auth/UserAuth");
const DoctorAuth = require("../controller/auth/DocterAuth");
const ClientAuth = require("../controller/auth/ClientAuth");
const AuthApprove = require("../controller/auth/AuthApprove");

// command user auth register and login
route.post("/ur/login", UserAuth.Login);
route.post("/ur/register", UserAuth.Register);

// doctor auth requet and login
route.post("/dt/login", DoctorAuth.Login);
route.post("/dt/register", DoctorAuth.Register);

// client auth requet and login
route.post("/ct/login", ClientAuth.Login);
route.post("/ct/register", ClientAuth.Register);

// admin approve
route.post("/admin/approve/client", AuthApprove.VerifyAndLoginAllowedforClient);
route.post("/admin/approve/doctor", AuthApprove.VerifyAndLoginAllowedforDoctor);

module.exports = route;
