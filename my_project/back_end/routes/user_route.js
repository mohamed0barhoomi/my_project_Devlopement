const { register, login, reserver_vol, get_user_vol, get_historique, delete_historique, conserve_user } = require("../controllers/user_cont")
const router = require("express").Router()

const {check}=require("express-validator")
const { middlware } = require("../middleware/middleware")

//login && register
router.post("/register",
    [ check("email","email is not valide ").isEmail(),
      check("pass"," your password must be stronger ").isStrongPassword(
       { minLength:6,minLowercase:1,minNumbers:2}
      ),
      check("NP","num passport must be 8 number").isNumeric().isLength({ min: 8, max: 8 })
    
    ]
    ,register)

router.post("/login",login)

router.get("/conserve",middlware,conserve_user)

// manipilation des vol

router.post("/reserver/:id",middlware,reserver_vol)
router.get("/get_vol",middlware,get_user_vol)
router.get("/historique",middlware,get_historique)
router.delete("/delete_history",middlware,delete_historique)

module.exports = router
