const express = require('express')
const sqldatabase = require('../db/database')
const router = express.Router()
const sql = require('mssql')


router.post('/createsp', async(req, res) =>{
    const data = await sqldatabase.request()
    .input('Id', sql.Int,req.body.Id)
    .input('Name', sql.NVarChar,req.body.Name)
    .input('EmpID', sql.Int,req.body.EmpID)
    .input('City', sql.NVarChar,req.body.City)
    .input('Role', sql.NVarChar,req.body.Role)
    .execute('insert_table')

    res.send(data)

})

router.get('/getinfo', async(req, res) =>{

    if(req.query.Id){
        const data = await sqldatabase.request().input('Id', sql.Int, req.query.Id).execute('getempinfobyId')
        return res.send(data.recordsets)
    }else{
        const getemp = await sqldatabase.request().execute('getempinfo')
        res.send(getemp.recordsets)
    }
   
})

router.put('/updateinfo/:id', async(req, res) =>{

    const getemp = await sqldatabase.request().input('Id', sql.Int, req.params.id).execute('getempinfobyId')

    const userinfo = {
        Name: req.body.Name ? req.body.Name : getemp.recordset[0].Name,
        EmpID: req.body.EmpID ? req.body.EmpID : getemp.recordset[0].EmpID,
        City: req.body.City ? req.body.City : getemp.recordset[0].City,
        Role: req.body.Role ? req.body.Role : getemp.recordset[0].Role
    }

    const data = await sqldatabase.request()
    .input('Id', sql.NVarChar,req.params.id)
    .input('Name', sql.NVarChar,userinfo.Name)
    .input('EmpID', sql.Int,userinfo.EmpID)
    .input('City', sql.NVarChar,userinfo.City)
    .input('Role', sql.NVarChar,userinfo.Role)
    .execute('Updatetable')
    res.send(data)
})

router.get('/getoutputinfo', async(req, res) =>{
    const data = await sqldatabase.request()
    .output('Count', sql.Int)
    .execute('getemp')
    const result = {
        count: data.output.Count
    }

    res.send(result)
})

router.delete('/deletebyid/:id', async(req, res) =>{
    const data = await sqldatabase.request().input('Id', sql.Int, req.params.id).execute('deleterowbyid')
    res.send(data.recordsets[0])
})

module.exports = router