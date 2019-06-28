const express=require('express');
const router=express.Router();
const User=require('../models/user');
const joi=require('@hapi/joi');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const _=require('lodash')
const _a=require('lodash/fp/object');
require('dotenv').config();

/** Get All Users */
router.get('/',async(req,res)=>
{
   let users=await User.findAll();
   let arr=[];
   for(let i=0;i<users.length;i++){
        let u=_.pick(users[i],['id','number','userType']);
        arr.push(u);
   }

   res.status(200).send(arr);

});

/** Get User By Id */
router.get('/:user_id',async(req,res)=>
{
    let user=await User.findAll({
                where:{
                    id:req.params.user_id
                }
            });
            
   res.status(200).send({
       number:user[0].number,
       id:user[0].id
   });

});

/** Post User */
router.post('/',async(req,res)=>
{
    let pass=req.body.password;
    const salt=await bcrypt.genSalt(10);
    pass=await bcrypt.hash(pass,salt);
   
    let user=await User.create({
        number:req.body.number,
        password:pass,
        userType:req.body.userType
       });

    const valid=validate(user);
    if(!valid){
        User.destroy({
            where:user.id
        })
        .then(c=>{console.log(destroyed)})
        .catch(e=>{console.log("Connot destroy")});
        return res.status(400).send('Not valid inputs');
    } 
   // const token=jwt.sign({_id:user._id , number:user.number},process.env.JWT_SECRET);
    res.status(200).send({
        id:user.id,
        number:user.number,
        userType:user.userType
    });
   });


/** Update User */
router.put('/:user_id', async(req, res)=> {
    let user=User({
        number:req.body.number,
          password:req.body.password,
          userType:req.body.userType
    });
    let valid=validate(user);
    if(!valid) return res.status(400).send("Not valid updates");

    user = await User.update(
      {password:req.body.password,
        userType:req.body.userType},
      {returning: true, where: {id: req.params.user_id} }
    );
    res.send({
        id:user.id,
        number:user.number,
        userType:user.userType
    })
});
/** Delete User */
router.delete('/:user_id',(req,res)=>
{
   
    User.destroy({
        where:{
            id:req.params.user_id
        }
    }).
then(t=>{
    
    res.status(200).send("Deleted the User");

}).catch(err=>{
    
    res.status(400).send(new Error(err));
})
});

function validate(user){
 const schema={
     number:joi.string().min(5).required(),
     password:joi.string().min(5).required(),
     userType:joi.string().required()
 }
    return joi.validate(user,schema);
};
module.exports=router;