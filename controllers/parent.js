const express=require('express');
const router=express.Router();
const Parent=require('../models/parent');


/** Get All Parents */
router.get('/',(req,res)=>
{
   
    Parent.findAll().
then(p=>{
    
    res.status(200).send(p);

}).catch(err=>{
    
    res.status(400).send(new Error(err));
})
});

/** Get Parent By Id */
router.get('/:parent_id',(req,res)=>
{
   Parent.findAll({
        where:{
            id:req.params.parent_id
        }
    }).
    then(t=>{
    if(p.length>0)
    {
        res.status(200).send(p);
    }else{
        res.status(404).send("No parent Found!");
    }
   
}).catch(err=>{
    res.status(400).send(new Error(err));
})
});

/** Post Parent */
router.post('/',(req,res)=>
{
   Parent.create({
    number:req.body.number,
    password:req.body.password
   })
   .then(p=>{
       res.status(200).send(p);
   })
   .catch(err=>{
    res.status(400).send(err);
   });
});

/** Update Parent */
router.put('/:parent_id', (req, res)=> {
    Parent.update(
      {
          number:req.body.number,
          password:req.body.password
        },
      {returning: true, where: {id: req.params.parent_id} }
    )
    .then((p)=> {
      res.status(200).send(p);
    })
    .catch(err=>{res.status(400).send(err)});
   });

/** Delete Parent */
router.delete('/:parent_id',(req,res)=>
{
   
    Parent.destroy({
        where:{
            id:req.params.parent_id
        }
    }).
then(p=>{
    
    res.status(200).send("Deleted the Parent");

}).catch(err=>{
    
    res.status(400).send(new Error(err));
})
});
module.exports=router;