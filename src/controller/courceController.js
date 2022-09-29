const Cource = require ("../model/courceModel");
const asyncHandler = require ("express-async-handler");


const getCource = asyncHandler(async (req,res)=> {
    const cource = await Cource.find();
    console.log(cource);
    res.json(cource);
});

const createCource = asyncHandler(async (req , res ) =>{
    const {title , Description } =req.body;

    if(!title || !Description ){
        res.status(400);
    throw new Error("Please Fill all the fields");    
}else {
    const postCource = new Cource({ title , Description})

    const createdCource = await postCource.save();
    
    res.status (201).json(createdCource);
}

});
const getCourceByID = asyncHandler(
    async (req,res)=> {
        const cource = await Cource.findById(req.params.id);

        if (cource) {
            res.json(cource);

        }else{
            res.status(404).json({message:"Cource not found"});

        }
        res.json(cource);
    }
);

const updateCource = asyncHandler(
    async (req,res)=> {
        const {title , Description} = req.body;
        
        const cource = await Cource.findById(req.params.id);

        if (cource) {
            cource.title = title;
            cource.Description = Description;

            const updatedCource = await cource.save();
            res.json(updatedCource);

        }else{
            res.status (404);
            throw new Error("Cource not found")
        }
        
    }
);

const deleteCource = asyncHandler(async(req,res)=>{
    const cource = await Cource.findById(req.params.id);
    if(cource){
        await cource.remove();
        res.json({ message: "Cource Removed"})
    }
    else{
            res.status (404);
            throw new Error("Cource not found")
    }
});

module.exports = {
  getCource,
  createCource,
  getCourceByID,
  updateCource,
  deleteCource,
};
