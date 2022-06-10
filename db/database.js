const sql = require('mssql')

const sqlconfig = {
    user: 'sa',
    password:'karthi',
    database: 'student',
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 10000
    },
    trustServerCertificate: true
}

const sqldatabase = sql.connect(sqlconfig, (err) =>{

    if(err){
        console.log(err)
    }
    console.log('connected successfully!')
})



module.exports = sqldatabase