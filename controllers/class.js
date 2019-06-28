const express=require('express');
const router=express.Router();
const ClassRoom=require('../models/class');


/** Get All Classes */
router.get('/',(req,res)=>
{
   
    ClassRoom.findAll().
then(c=>{
    
    res.status(200).send(c);

}).catch(err=>{
    
    res.status(400).send(new Error(err));
})
});

/** Get Class By Id */
router.get('/:class_id',(req,res)=>
{
   console.log(req.params.class_id);
   ClassRoom.findAll({
        where:{
            id:req.params.class_id
        }
    }).
    then(recs=>{
    if(recs.length>0)
    {
        res.status(200).send(recs);
    }else{
        res.status(404).send("No such class Found!");
    }
   
}).catch(err=>{
    res.status(400).send(new Error(err));
})
});

/** Post Class */
router.post('/',(req,res)=>
{
   ClassRoom.create({
    name:req.body.name
   })
   .then(c=>{
       res.status(200).send(c);
   })
   .catch(err=>{
    res.status(400).send(err);
   });
});

/** Update Class */
router.put('/:class_id', (req, res)=> {
    ClassRoom.update(
      {name: req.body.name},
      {returning: true, where: {id: req.params.class_id} }
    )
    .then((c)=> {
      res.status(200).send(c);
    })
    .catch(err=>{res.status(400).send(err)});
   });

/** Delete Class */
router.delete('/:id',(req,res)=>
{
   
    ClassRoom.destroy({
        where:{
            id:req.params.id
        }
    }).
then(d=>{
    
    res.status(200).send("Deleted the Class");

}).catch(err=>{
    
    res.status(400).send(new Error(err));
})
});
module.exports=router;