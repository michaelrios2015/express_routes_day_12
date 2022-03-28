const { client, synchAndSeed, getStudents, getClasses, createStudent, deleteStudent } = require("./db");

const { head, nav } = require('./templates');
// so we built the data layer which is just to say the database including inseration and deletion 
// now we use express to send HTML the front end 

const express = require('express');
const app = express()
const path = require('path');

// the magic that lets us put in a css file
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// some magic middle wear that helps us post I think we stop using it at some point
app.use(express.urlencoded({ extended: false }));

// so this seems to be some sort of magic middle ware that lets me turn a POST request into a DELETE
app.use(require('method-override')('_method'));

// nice and simple before react enters the picture
app.get('/', async(req, res, next)=> {
    try{
        // a proto state type if thing 
        // now with Promise.all
        // now all in one function(??)
        const [students, classes]  = await Promise.all([
            getStudents(),
            getClasses()
        ]);

        res.send(`
            <html>
            ${head({title:'Main page'})}
            <body>
                ${nav({students, classes})}
                <h1>Welcome to Fordham Students and Classes</h1>
            </body>
            </html>`)

    }
    catch(ex){
        // using the magic next
        next(ex);
    }
})

// even though I am using the middle ware I guess this just bring in the code so we don't need the 
// middleware twice and it lets me rename the route 
app.use('/students', require('./routes/students'));

// a continuation of making it like legos.. very neat 
app.use('/classes', require('./routes/classes'));



// here we name a function to connect connecting in not fast so we make it async
// honestly a bit curious what would happen if we did not 
const init = async() => {
    // can you use try catch out of a function I am not sure
    try {
        await client.connect();
        await synchAndSeed();
        // just checking to make sure it works
        // not really sure if you need to assign this too a variable
        // does not look like you need too..
        // await createStudent({name: 'moe 2'});
        const moeTwo = await createStudent({name: 'moe 2'});
        console.log(moeTwo);
        await deleteStudent(2);
        console.log(await getStudents());
        console.log(await getClasses());
        
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`))
    
    }
    catch(ex){
        console.log(ex);
    }
}

// calling the function
init();

// interesting a look under the hood
// console.log(Client);

