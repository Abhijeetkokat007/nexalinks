import Login from "./../models/Link.js";

const getApiUserLinks = async (req, res) => {
    const { id} = req.params;
   try{
    const order1 = await Login.find({user:{ _id: id }}).populate("user")
  
    res.json({
      success:true,
      data:order1,
      message: "User Links fatch  successfully"
    });
   }
   catch(e){
    res.json({
        success:false,
        message: e.message
      });
   }
  }

  export {getApiUserLinks}