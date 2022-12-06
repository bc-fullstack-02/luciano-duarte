const {
    client
} = require('pg')
const client = new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/postgres"
})
nodule.exports = client
    .connect()
    .then(() => client.query('SELECT s1::text as message',['Hello world!']))
    .then(res => {
        console.log(res.rows[0].message) // Hello World!
    })
    .catch(err =>{
        console.error(`postgres error: (${err.errno}) code: ${err.code} on postgresgl://${err.address}:$`)
    })
    .finally(() => {
        console.log("close connection")
        client.end()
    })