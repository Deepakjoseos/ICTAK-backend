const mongoose = require ("mongoose");

const courceSchema =  mongoose.Schema (
    {
    
     title : {
         type : String ,
         required : true ,
     },
      
     Description : {
         type : String ,
          Required : true ,
     },
     },
     {
         timeStamps : true 
     },
);

const Cource  = mongoose.model("cource", courceSchema);

module.exports = Cource ; 