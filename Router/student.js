const express = require('express')
const sqldatabase = require('../db/database')
const router = express.Router()
const sql = require('mssql')

router.post('/createstudent', async (req, res) => {
    let query = "INSERT INTO StudentMark(ID,NAME,MARK,AGE) VALUES(@ID,@NAME,@MARK,@AGE)"

    await sqldatabase.request()
        .input('ID', sql.Int, req.body.ID)
        .input('NAME', sql.NVarChar, req.body.Name)
        .input('MARK', sql.Int, req.body.Mark)
        .input('AGE', sql.Int, req.body.Age)
        .query(query)

    res.status(201).send('created')

})

router.post('/createview', async (req, res) => {
    let query = "SELECT StudentDetails.Name, StudentDetails.Address, StudentMark.MARK FROM StudentDetails, StudentMark Where StudentDetails.Name = StudentMark.NAME"

    const viewinfo = await sqldatabase.request().query(`CREATE VIEW Studentview AS ${query}`)
    res.send(viewinfo)

})

router.get('/getview', async(req, res) =>{
    const viewinfo = await sqldatabase.request().query(`select * from StudentView`)
    res.send(viewinfo)
})

router.put('/updateview', async(req, res) =>{
    let query = "SELECT StudentDetails.Name,StudentDetails.Address, StudentMark.MARK, StudentMark.AGE FROM StudentDetails, StudentMark Where StudentDetails.Name = StudentMark.NAME"

    const viewinfo = await sqldatabase.request().query(`CREATE OR ALTER VIEW Studentview AS ${query}`)
    res.send(viewinfo)
})


module.exports = router