import { Schema, model } from "mongoose";

const signupschema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
       
    },
    image: {
        type: String, 
        require: true
    },
    
    
},
    {
        timestamps: true,
    }
)

const Login = model('Login', signupschema)

export default Login