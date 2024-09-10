const { json } = require("body-parser")
const { create } = require("domain")
const express=require("express")
const mysql2 =require("mysql2")
const cors=require("cors")
const app=express()
app.use(json({}),cors())

const connection= mysql2.createConnection({

    host:"localhost",
    user:"root",
    database:"crud_ds"
})

app.get("/products",(req,res,next)=>{
const query= 'select * from products'
connection.execute(query,(err,result)=>{
if(err){
    res.json({mesaage:"error in query",err })
}
res.json({message:"done",result})

})

})
app.post("/products",(req,res,next)=>{
    const {prodectName,price,descrption}=req.body
    const query=`insert into products (prodectName , price,descrption)
                             values('${prodectName}','${price}','${descrption}')`

    connection.execute(query,(err,result)=>{
        if(err){
            res.json({mesaage:"error in query",err })
          }
          res.json({message:"done",result})
    })
})
app.put("/products",(req,res,next)=>{
    const {id,prodectName,price,descrption}=req.body//id,trueName,newprice,desc
    const query=`UPDATE products set 
    prodectName='${prodectName}', price='${price}', descrption='${descrption}' where id ='${id}' `

    connection.execute(query,(err,result)=>{
        if(err){
            res.json({mesaage:"error in query",err })
          }
         return result.affectedRows? res.json({message:"done",result}):res.json({message:"id not excist"})
    })

})
app.delete("/products",(req,res,next)=>{
        const{id}=req.body
    const query=`delete from products where id='${id}' `
    connection.execute(query,(err,result)=>{
        if(err){
            res.json({mesaage:"error in query",err })
          }
         return result.affectedRows? res.json({message:"done",result}):res.json({message:"id not excist"})
    })


})

app.get("/products/:id",(req,res,next)=>{
    const{id}=req.params
    const query=`select * from products where id='${id}' `
    connection.execute(query,(err,result)=>{
        if(err){
            res.json({mesaage:"error in query",err })
        }
        return result.affectedRows? res.json({message:"done", result}):res.json({message:"id not excist"})
        
        })
})




app.listen(3000,()=>{
    console.log("servar active at port 3000")
})