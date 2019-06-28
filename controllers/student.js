const express=require('express');
const router=express.Router();
const Student=require('../models/student');


/** Get All Student */
router.get('/',(req,res)=>
{
    Student.findAll({
        limit: 100
    })
    .then(s=>{
    
    res.status(200).send(s);

    })
    .catch(err=>{
    
    res.status(400).send(new Error(err));
})
});

/** Get Student By Id */
router.get('/:student_id',(req,res)=>
{
   Student.findAll({
        where:{
            id:req.params.student_id
        }
    }).
    then(t=>{
    if(s.length>0)
    {
        res.status(200).send(s);
    }else{
        res.status(404).send("No student Found!");
    }
   
}).catch(err=>{
    res.status(400).send(new Error(err));
})
});

/** Post Student */
router.post('/',(req,res)=>
{
   Student.create({
    name:req.body.name,
    isActive:req.body.isActive,
    parent_id:req.body.parent_id
   })
   .then(s=>{
       res.status(200).send(s);
   })
   .catch(err=>{
    res.status(400).send(err);
   });
});

/** Update Student */
router.put('/:student_id', (req, res)=> {
    Student.update(
      {
        name:req.body.name,
        isActive:req.body.isActive,
        parent_id:req.body.parent_id
        },
      {returning: true, where: {id: req.params.student_id} }
    )
    .then((s)=> {
      res.status(200).send(s);
    })
    .catch(err=>{res.status(400).send(err)});
   });

/** Delete Student */
router.delete('/:student_id',(req,res)=>
{
   
    Student.destroy({
        where:{
            id:req.params.student_id
        }
    }).
then(p=>{
    
    res.status(200).send("Deleted the Student");

}).catch(err=>{
    
    res.status(400).send(new Error(err));
})
});
module.exports=router;