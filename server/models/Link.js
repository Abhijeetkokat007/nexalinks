import { Schema, model } from "mongoose";

const linkSchema = new Schema({
    // user:{
    //     type : Schema.Types.ObjectId,
    //     ref : "Login",
    //     required : true
    // },
    url : {
        type :String,
        required : true,
    },
    slug : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
    },
    click : {
       type :Number,
       required : true,
       default: 0,
    },
    
},
{
    timestamps: true,
}

);

const Link = model('Link', linkSchema);


export default Link;