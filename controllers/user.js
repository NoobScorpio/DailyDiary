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
   if(users<1) return res.status(400).send('No such user!!');
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
    if(user.length<1) return res.status(400).send('No such user!!');
   res.status(200).send({
       number:user[0].number,
       id:user[0].id
   });

});

/** Post User */
router.post('/',async(req,res)=>
{
    //define user
    let user={
        number:req.body.number,
        password:req.body.password,
        userType:req.body.userType
       };

       //validate schema
       validateUser(user)
       .then(c=>{console.log("VALID")})
       .catch(err=>{
           return res.status(400).send("Enter valid requirements")
        });

       //hash password
       const salt=await bcrypt.genSalt(10);
       let pass=await bcrypt.hash(req.body.password,salt);
       user={
        number:req.body.number,
        password:pass,
        userType:req.body.userType
       };

       //find for existing user
        user=await User.findOne({
        where:{
            number:req.body.number
        }
        });
        if(user) return res.status(400).send('User already present!!');
        
        //create new user
        user=await User.create({
            number:req.body.number,
            password:pass,
            userType:req.body.userType
           });
    
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
    let valid=validateUser(user);
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

async function validateUser(user){
 const schema={
     number:joi.string().min(5).required(),
     password:joi.string().min(5).required(),
     userType:joi.string().required()
 }
    return await joi.validate(user,schema);
};
module.exports=router;