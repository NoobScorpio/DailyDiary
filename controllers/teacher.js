const express=require('express');
const router=express.Router();
const Teacher=require('../models/teacher');


/** Get All Teachers */
router.get('/',(req,res)=>
{
   
    Teacher.findAll().
then(t=>{
    
    res.status(200).send(t);

}).catch(err=>{
    
    res.status(400).send(new Error(err));
})
});

/** Get Teacher By Id */
router.get('/:teacher_id',(req,res)=>
{
   Teacher.findAll({
        where:{
            id:req.params.teacher_id
        }
    }).
    then(t=>{
    if(t.length>0)
    {
        res.status(200).send(t);
    }else{
        res.status(404).send("No teacher Found!");
    }
   
}).catch(err=>{
    res.status(400).send(new Error(err));
})
});

/** Post Teacher */
router.post('/',(req,res)=>
{
   Teacher.create({
    name:req.body.name,
    number:req.body.number,
    password:req.body.password,
    isActive:req.body.isActive
   })
   .then(t=>{
       res.status(200).send(t);
   })
   .catch(err=>{
    res.status(400).send(err);
   });
});

/** Update Teacher */
router.put('/:teacher_id', (req, res)=> {
    Teacher.update(
      {
          name: req.body.name,
          number:req.body.number,
          password:req.body.password,
          isActive:req.body.isActive
        },
      {returning: true, where: {id: req.params.teacher_id} }
    )
    .then((t)=> {
      res.status(200).send(t);
    })
    .catch(err=>{res.status(400).send(err)});
   });

/** Delete Teacher */
router.delete('/:teacher_id',(req,res)=>
{
   
    Teacher.destroy({
        where:{
            id:req.params.teacher_id
        }
    }).
then(t=>{
    
    res.status(200).send("Deleted the Teacher");

}).catch(err=>{
    
    res.status(400).send(new Error(err));
})
});
module.exports=router;