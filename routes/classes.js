const { getStudents, getClasses } = require("../db");
const { head, nav } = require("../templates.js");
// so we built the data layer which is just to say the database including inseration and deletion 
// now we use express to send HTML the front end 
const app = require('express').Router();

// so this does a lot of magic 
module.exports = app;


app.get('/', async(req, res, next)=> {
    try{
        const [students, classes]  = await Promise.all([
            getStudents(),
            getClasses()
        ]);
        // we have the famous list going on 
        res.send(`
            <html>
            ${head({title:'classes'})}
            <body>
                ${nav({students, classes})}
                <h1>Classes</h1>
                ${
                    classes.map( course => `
                    <li>
                        ${ course.name }
                    </li>
                    `).join('')
                }
            </body>
            </html>`)

    }
    catch(ex){
        // using the magic next
        next(ex);
    }
})

