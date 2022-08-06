const express = require("express")
const app = express()
require('dotenv').config()
const course_route = require("./Routes/courses_routes.js")

app.use(express.json())
app.use(course_route)

const port = process.env.PORT||4000;
app.listen(port, ()=>{
    console.log(`Your server is running on: http://localhost:${port}`);
})