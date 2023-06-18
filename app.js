import express from 'express'
import cors from 'cors'
import session from "express-session";
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits-controller.js";
import AuthController from "./users/auth-controller.js";

const app = express()
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:4000", "https://a5--remarkable-fudge-b8f54b.netlify.app/", "https://tuiter-node-server-app-bobj.onrender.com/api/tuits"]
    })
);
app.use(express.json());
TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app);
app.listen(process.env.PORT || 4000)