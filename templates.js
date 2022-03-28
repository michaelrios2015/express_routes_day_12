// since I am using these over and over again we just seprate them out so we only need to update it one
// place 

const head = ({ title }) => `
    <head>
        <link rel='stylesheet' href='/assets/styles.css' />
        <title>${ title }</title>
    </head>
`

// I am not entirely sure why prof like sending objects, but if that is what you are using you need to be
// consistent 
const nav = ({ students, classes}) =>`
    <ul id='nav'>
        <li><a href='/'>Home</a></li>
        <li><a href='/students'>Students (${students.length})</a></li>
        <li><a href='/classes'>Classes (${classes.length})</a></li>
    </ul>
`;

module.exports = {
    head,
    nav
}