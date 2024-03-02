import Express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import Link from "./models/Link.js";
import path from "path";
import { postApiLogin } from "./controllers/Login.js";
import { getApiUserLinks } from "./controllers/Link.js";



const app = Express();
app.use(Express.json());
const __dirname = path.resolve();

const connnectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (conn) {
        console.log('MongoDB connected ')
    }
  }
  catch(e){
    console.log(e.message);
  }
}

connnectDB();

app.post("/api/link", async (req, res) => {
  const {url, slug, } = req.body;
 const randomSlug = Math.random().toString(36).substring(2,7);
  const link = new Link({
    url: url,
    slug : slug || randomSlug ,
  });

  try{
    const saveLink = await link.save();
    return res.json({
      success: true,
      data: {
        shortUrl: `${process.env.BASE_URL_LINK}/ak/${saveLink.slug}`
      },
      message: "Link saved successfuly"
    });
  }
  catch(e){
    res.json({
      success: false,
      message: e.message
    });
  }
})

app.get("/ak/:slug", async (req, res) => {
 const {slug} = req.params;

const linkOne = await Link.findOne({slug: slug});

if(!linkOne){
  return res.json({
    success: false,
    message: "Link not found"
  })
 }

try{
  await Link.updateOne({slug: slug}, 
    {$set: {click: linkOne.click + 1}}
    )
}
catch(e){
  console.log(e.message)
}

 
 const redirectUrl = linkOne.url;
 res.redirect(redirectUrl);

})

app.get("/api/fetch/links", async (req, res) => {
  try{
    const  linksdata = await Link.find().maxTimeMS(30000);

   res.json({
    success:true,
    data:linksdata,
    message: "succesfully all links fetched"
  })
  
  }
  catch(e){
    res.json({
      success: false,
      message: e.message
    })
  }
})

app.post("/api/login",  postApiLogin )
app.get("/api/link/user/:id", getApiUserLinks )

if(process.env.NODE_ENV === "production"){
 app.use(Express.static(path.join(__dirname, '..', 'client', 'build'))); 

 app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
 });
}

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})
