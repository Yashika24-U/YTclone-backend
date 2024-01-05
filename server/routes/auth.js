import express from 'express'
import {googleAuth, signup} from "../controller/auth.js"
import {signin} from "../controller/auth.js"

const router = express.Router()

// CREATE A USER
 router.post("/signup",signup)


// SIGN IN
router.post("/signin", signin)



// GOOGLE AUTH
router.post("/google",googleAuth)




export default router;