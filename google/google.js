module.exports = require('../common/imports')
                 .express
                 .Router()
                 .get("/",(req,res)=>{
                     console.log("Entered into google");
                    return res.status(201).json({"feroz":"shaik"});
                 })