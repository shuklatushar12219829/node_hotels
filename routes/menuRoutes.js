const express=require('express');
const router=express.Router();
const menuItem=require('../models/menuItem.js')

router.post('/',async (res,req)=>{
    try{
      const data=req.body;
      const newMenuItem=new menuItem(data);
      const repsonse=await newMenuItem.save();
      res.status(200).json(response);
      console.log("data saved successfully");
    }catch(err){
      console.log(err);
      res.status(500).json({error:"Internal server error"})
    }
  })
  
  router.get('/',async (req,res)=>{
    try{
      const data=await menuItem.find();
      console.log("data fetched successfully");
      res.status(200).json(data);
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:"Internal server error"})
    }
  })
  
  router.get('/:tasteType',async (req,res)=>{
    try{
      const tasteType=res.params.tasteType;
      if(tasteType=='sour' || tasteType=='sweet' || tasteType=='spicy'){
          const data=await menuItem.find({taste:tasteType})
          console.log("Request fetched");
          res.status(200).json(data);
      }else{
          res.status(404).json({error:"Invalid taste type"});
      }
    }catch(err){
        res.status(500).json({error:"Internal server error"});
    }
  })
  
  router.put('/:id',async (req,res)=>{
    try {
      const itemId=req.params.id;
      const menuUpdated=req.body;
      const response=await menuItem.findByIdAndUpdate(itemId,menuUpdated,{
        new:true,
        runValidators:true
      })
      if(!response){
        res.status(404).json({error:"Item not found"})
      }
      console.log("data updated successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"Internal server error"})
    }
  })

  router.delete('/:id',async (req,res)=>{
    try {
      const itemId=req.params.id;
      const response=await menuItem.findByIdAndDelete(itemId);
      if(!response){
        res.status(404).json({error:"Item not found"});
      }
      console.log("data deleted successfully");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:"Internal server error"})
    }
  })
  module.exports=router;