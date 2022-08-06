require('dotenv').config()
const axios = require("axios")

const client={
    client: process.env.CLIENT,
    connection: {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE,
        port: process.env.MYSQLPORTR
    }
}

const knex = require("knex")(client)


knex.schema.hasTable('Courses').then(exists => {
    if (!exists) {
        return knex.schema.createTable('Courses', table => {
            table.integer("id").primary()
            table.string("name")
            table.text("logo")
            table.text('notes')
            table.integer("days_to_complete")
            table.text('short_description')
            table.string("type")
            table.string("course_type")
            table.string("lang_available")
        }).then(()=>{
            axios.get("https://api.merakilearn.org/courses").then((data)=>{
                data.data.map((s)=>{
                    knex('Courses').insert({ id: s["id"], name: s['name'], logo: s['logo'], notes: s['notes'], days_to_complete: s["days_to_complete"], short_description: s["short_description"], type: s['type'], course_type: s["course_type"], lang_available: (s["lang_available"]).join() }).then((d)=>{
                        console.log(s['id'], 'Inserted succefully...');
                    }).catch((err)=>{
                        console.log(s['id'], "Error while inserting...", err);
                    })
                })
            })
            
        }).catch((err)=>{
            console.log(err);
        });
    }
});


module.exports = knex