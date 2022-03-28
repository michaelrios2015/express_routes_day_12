const { getStudents, getClasses, createStudent, deleteStudent } = require("../db");
// so we built the data layer which is just to say the database including inseration and deletion 
// now we use express to send HTML the front end 
// first time using router 
const { head, nav } = require("../templates.js");
const app = require('express').Router();

// so this does a lot of magic 
module.exports = app;


// so I don't really understand forms and this might be a problem,
// PK so GET, POST, and DLETE are all different requests... Seems strange I can see why a get and post would
// be differnt... seems strange oh well  
app.get('/', async(req, res, next)=> {
    try{
        const [students, classes]  = await Promise.all([
            getStudents(),
            getClasses()
        ]);
        // we have the famous list going on 
        res.send(`
            <html>
            ${head({title:'students'})}
            <body>
                ${nav({students, classes})}
                <h1>Students</h1>
                <form method='POST'>
                    <input name='name' />
                    <button> Create </button>
                </form>
                ${
                    students.map( student => `
                    <li> 
                        ${ student.name }
                        <form method='POST' action='/students/${student.id}?_method=DELETE'>
                            <button>x</button>
                        </form>  
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

// so this is the magic POST method
// pk so ussually we have done GET and Get pretty much just ask the servre to send something
// but presumably with a PUT we can send information back to the server  
app.post('/', async (req, res, next)=> {
    // ok so a post at it's most simple 
    try {
        // that's amazing so yes a post let's me send information back to the server
        // createStudent can intereact with the database 
        await createStudent(req.body);
        // this just sends us back to students where the new information is displayed 
        res.redirect('/students');
    }
    catch (ex){
        next(ex);
    }
});

// so express defnitely wants a delete 
// at some point I think we handle it much differently but apperently this is the more basic way of
// handling these requests
app.delete('/:id', async (req, res, next)=> {
    // ok so a delet at it's most simple
    try {
        // so what is req.body then?? it is pretty amazing 
        await deleteStudent(req.params.id);
        // this just sends us back to students where the new information is displayed 
        res.redirect('/students');
    }
    catch (ex){
        next(ex);
    }
});

