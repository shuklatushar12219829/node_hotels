const express=require('express');
const router=express.Router();
const Person=require('./../models/Person.js');


router.get('/',async (req,res)=>{
    try{
      const data=await Person.find();
      console.log("data fetched successfully");
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"})
    }
  })
  router.post('/',async (req,res)=>{
    try{
      const data=req.body;
  
      const newPerson=new Person(data);
  
      const response=await newPerson.save();
      console.log("data saved successfully");
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"})
    }
  })

  router.get('/:workType',async (req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef' || workType=='waiter' || workType=='manager'){
            const data=await Person.find({work:workType});
            console.log("response fetched");
            res.status(200).json(data);
    }
        else{
          res.status(404).json({error:"Invalid work type"})
        }  
  }catch(err){
      res.status(500).json({error:"Internal server error"});
    }
  })

  router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        });
        if(!response){
            res.status(404).json({error:"person not found"});
        }
        console.log("data updated successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
  })

router.delete('/:id',async (res,req)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error:"person not found"});
        }
        console.log("data deleted successfully");
        res.status(200).json({message:"person deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
  module.exports=router;