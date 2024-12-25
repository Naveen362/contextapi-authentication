const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const jwt=require('jsonwebtoken')
const authRoutes=require("./routes/authRoutes");
require('dotenv').config();
const User=require("./models/User");



const app = express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);


const mongos= async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/authentication");
        console.log("Data base connected sucessfullly....")
    }
    catch(err){
        console.log("Data Base errors------------")
    }

}
mongos();

app.post('/register',async (req,res)=>{

  const {username,password}=req.body;
  try {
    const existingUser =await User.findOne({username});
    if (existingUser){
        return res.status(400).json({message:"Username Already exists"});
    }
    const user=new User({username,password});
    await user.save();
    res.status(201).json({message:"User Registered Successfully..."});
  }
  catch(error){
    res.status(500).json({message:"Server Error"})
  }

});

app.post('/login', async(req,res)=>{
  const { username, password } = req.body;
  try {
    // Check if user exists
    console.log('Received login request:', { username, password });
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
 
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, "qwertyuiopasdfghjklzxcvbnm", {
      expiresIn: '1h',
    });
    console.log(token,"data")

    res.status(200).json({ message: 'Login successful', user: { username: user.username }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


