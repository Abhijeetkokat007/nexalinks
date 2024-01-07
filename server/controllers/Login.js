import Login from "../models/login.js";

const postApiLogin = async (req, res) => {

    const{name, email, timestamps, image} = req.body

    const login = new Login ({
        name,
        email,
       image,
        timestamps,
    })

   try{
    const saveData = await login.save();

    res.status(201).json({
        success: true,
        data: saveData,
        message: "user Login successfull"
    })
   }
   catch(e){
    return res.json({
        success: false,
        message: e.message
    })
   }
}

export {postApiLogin} ;