const knex = require("../Database/db_connection")


const listCourses = (req, res) => {
    knex("*").from("Courses").then((data) => {
        if (data.length==0){
            console.log("data is not avaleble");
            res.send({
                "status": "error",
                "message": "Courses nod availeble"
            })
        }else{

        console.log('showing data');
        res.send({
            "status": "success",
            "count": data.length,
            "data": data
        })}
    }).catch((err) => {
        console.log(err);
        res.send(err.message)
    })
}





const courseById=  (req, res) => {
    const para_id = req.params.id
    knex('Courses').where({ id: para_id }).then((data) => {
        if (data.length == 0) {
            res.send({
                "status": "error",
                "message": "Inavalid ID."
            })
        } else {
            res.send({
                "status": "success",
                "data": data
            })
        }
        console.log("data showed by id");
    }).catch((err) => {
        console.log(err);
        res.send(err.message)
    })
}







const addCourse= async  (req, res) => {
    const info = req.body
    if (Object.keys(info).length === 0) {
        res.send({
            "status": "error",
            "message": "you can not add empty course"
        })
    }
    else {
        await knex('Courses').insert(info)
        res.send({
            "status": "success",
            "data": info
        })
        console.log("course added sucssefully");
    }

} 


const updateCourse= async (req, res) => {
    const para_id = req.params.id
    const data = await knex('Courses').where({ id: para_id })
    if (data.length == 0) {
        res.send({
            "status": "error",
            "message": "Inavalid ID."
        })
    } else {
        await knex('Courses').where({ id: para_id }).update(req.body)
        res.send({
            "status": "success",
            "data": req.body
        })

        console.log("updated successfully");
    }
}




const deleteCouse= async (req, res) => {
    const para_id = req.params.id
    const data = await knex('Courses').where({ id: para_id })
    if (data.length == 0) {
        res.send({
            "status": "error",
            "message": "Inavalid ID."
        })
    } else {
        await knex('Courses').where({ id: para_id }).del()
        console.log(para_id);
        res.send({
            "status": "success",
            "data": data
        })

        console.log("Courses deleted");
    }
}





module.exports = {listCourses,courseById,addCourse,updateCourse,deleteCouse}