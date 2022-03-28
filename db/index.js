// so we built everything in the server just to make our lives easier now we have started to seperate it
// this will only continue

// we just need client from pg (postgress driver) 
const { Client } = require('pg');

// it's pretty neat you can put an or statement in an assignment (??) statement
const postgresUrl = process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/students_classes'

// intializing client (forget if that is the right way to say it) 
// client seems to be an object and we are also telling it which database to connect to 
const client = new Client({
    connectionString: postgresUrl
    // this lets me use heroku that's all i really now
    // but seems to stop me from using local host... I am sure that can be dealt with for the moment 
    // I will just use the commmand lin thingy when deploying
    // ssl: {
    //     rejectUnauthorized: false
    // }
}); 

// I ussualy just keep the database open and check in there but this does the dame thing
const getStudents = async() => {
    return (await client.query('SELECT * FROM students;')).rows
}


const getClasses = async() => {
    return (await client.query('SELECT * FROM classes;')).rows
}

// the creat function which is just some simple SQL... but getting closer to a CRUD 
// Maybe this works slightly different on a mac??
const createStudent = async({ name }) => {
    // using the (column) VALUES($!) which seems to be safer in terms of SQL injection 
    return (await client.query('INSERT INTO students(name) VALUES($1)', [name])).rows[0]
}

// not sure why we use an object in the last one and just pass the id in this one
const deleteStudent = async (id) => {
    await client.query('DELETE FROM students WHERE id=$1', [ id ])
}

// we are using SQL to create tables and add some intial data
const synchAndSeed = async() => {
    const SQL = `
        DROP TABLE IF EXISTS students;
        DROP TABLE IF EXISTS classes;

        CREATE TABLE students (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL UNIQUE
        );

        CREATE TABLE classes (
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL UNIQUE
        );

        INSERT INTO students(name) VALUES('moe');
        INSERT INTO students(name) VALUES('larry');
        INSERT INTO students(name) VALUES('currly');

        INSERT INTO classes(name) VALUES('C++');
        INSERT INTO classes(name) VALUES('JavaScript');
        INSERT INTO classes(name) VALUES('Painting');
        `;
        await client.query(SQL);
}


module.exports = {
    client,
    synchAndSeed,
    getStudents,
    getClasses,
    createStudent,
    deleteStudent
}

