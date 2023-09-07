const express = require("express");

const mongoose = require("mongoose");
const User = require("./user.model");

const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("hello");
});

//ADD USER
app.post("/add-user", async (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  if (
    firstname.trim() === "" ||
    lastname.trim() === "" ||
    email.trim() === ""
  ) {
    return res.send ({ success: false, message: "Please all fields required" });
  }

  const user = new User({
    firstname,
    lastname,
    email,
  });

  const savedUser = await user.save();
  console.log(savedUser)
  if (savedUser) 
  return res.send({success: true, message: "user added", savedUser });
});

//GET ALL USERS
app.get("/get-all-users",async (req, res, next) => {
  const users = await User.find();
  if(user) res.send({success: true, users })
})

//GET A USER
app.get("/get-user", async(req, res, next) => {
  const {_id} = req.query;
  
  const user = await User.findById(_id);

  if(user) res.send({success: true, user })
})

//DELETE USER
app.post("/delete-user", async(req, res, next) => {
  const {_id} = req.query;

  const deletedUser = await User.findByIdAndDelete(_id);

  if(deletedUser) return res.send({success:true, message: "user deleted successfully", deletedUser})
})


//CONNECT DATABASE
mongoose
  .connect(
    "mongodb+srv://nanabekoe89:Academy1@cluster0.jxh91hq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on PORT 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
