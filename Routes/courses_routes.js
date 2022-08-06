const express = require("express");
const {listCourses,courseById,addCourse,updateCourse,deleteCouse} = require("../Controllers/course_controller.js")
const router = express.Router()


router.get("/courses", listCourses)


router.get('/courses/:id',courseById)



router.post("/courses", addCourse)



router.put("/courses/:id", updateCourse )



router.delete("/courses/:id",deleteCouse )





module.exports = router