const {Prietenii}=require('../models')

exports.trimiteCerere= async (req,res)=>{
    try{
        const{id_eu, id_prieten}=req.body;

        if(!id_eu || !id_prieten){
            return res.status(400).json({message:"Lipsesc ID-urile necesare!"})
        }

        await Prietenii.create({
            id_utilizator_1: id_eu,
            id_utilizator_2: id_prieten,
            status_prietenie: 0
        
        })

        return res.status(201).json({message:"Inregistare realizata cu succes!"})
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Eroare la trimiterea cererii", error: error.message });

    }
}