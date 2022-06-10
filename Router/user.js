const express = require('express')
const sqldatabase = require('../db/database')
const router = express.Router()
const sql = require('mssql')

router.post('/products', async (req, res) => {
    // console.log(req.body)

    let query = {
        addproduct: "INSERT INTO StudentDetails (S_ID, Name,Address) values(@S_ID,@Name,@Address)"
    }

    const querydata = await sqldatabase.request()
    .input("S_ID", sql.Int, req.body.S_ID)
    .input("Name", sql.NVarChar, req.body.Name)
    .input("Address", sql.NVarChar, req.body.Address)
    .query(query.addproduct)

    res.status(201).send(querydata.rowsAffected)
})

router.get('/allusers', async(req, res) =>{
    const data = await sqldatabase.request().query('Select * from StudentDetails')
    res.send(data.recordsets)
})

router.put('/updateuser/:id', async(req, res) =>{
    const querydata = "UPDATE StudentDetails SET S_ID = @S_ID, Name = @Name, Address = @Address Where S_ID = @S_ID"

    const userid = "SELECT * FROM StudentDetails Where S_ID = @S_ID"
    const updatedata = await sqldatabase.request().input("S_ID", req.params.id).query(userid)
    // console.log(updatedata.recordset[0].Name)

    const userinfo = {
        Name: req.body.Name ? req.body.Name : updatedata.recordset[0].Name,
        Address: req.body.Address ? req.body.Address : updatedata.recordset[0].Address
    }
    // console.log(userinfo)

    const data = await sqldatabase.request()
    .input("S_ID", sql.Int, req.params.id)
    .input("Name", sql.NVarChar, userinfo.Name)
    .input("Address", sql.NVarChar, userinfo.Address)
    .query(querydata)
    res.status(200).send(data)
})

router.delete('/deleteuser/:id', async(req, res) =>{
    const data1 = req.params.id
    const data = await sqldatabase.request()
    .query('DELETE FROM Persons Where PersonID =' + data1)
    res.send(data.recordsets[0])
})


module.exports = router