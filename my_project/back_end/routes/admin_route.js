const { get_pilote,get_avion,get_vol,
        create_pilote, create_avion, create_vol,
        update_pilote, update_avion, update_vol,
        delete_pilote, delete_avion, delete_vol, 
        register_admin
    } = require("../controllers/admin_cont")


const router = require("express").Router()


const {check} =require("express-validator")
// regiter && login
router.post("/register",
    [ check("email","email is not valide ").isEmail(),
      check("pass"," your password must be stronger ").isStrongPassword(
       { minLength:6,minLowercase:1,minNumbers:2}
      )
    
    ],register_admin)


// router get
router.get("/get_pilote",get_pilote)
router.get("/get_avion",get_avion)
router.get("/get_vol",get_vol)


// router create
router.post("/create_pilote",create_pilote)
router.post("/create_avion",create_avion)
router.post("/create_vol",create_vol)


// route update
router.put("/up_pilote/:id",update_pilote)
router.put("/up_avion/:id",update_avion)
router.put("/up_vol/:id",update_vol)



// router Delete
router.delete("/del_pilote/:id",delete_pilote)
router.delete("/del_avion/:id",delete_avion)
router.delete("/del_vol/:id",delete_vol)




module.exports = router