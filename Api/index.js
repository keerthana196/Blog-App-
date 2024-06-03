const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routerAuth = require("./routes/auth")
const routerUser = require("./routes/users");
const routerPost = require("./routes/posts");
const routerCategories = require("./routes/categories");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
app.use(cors());
dotenv.config();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGODB_URL)
 .then(() => console.log("Connected to MongoDB"))
 .catch((err) => console.error("MongoDB connection error:", err));

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name); 
    },
  });

  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });


app.use("/api/aut",routerAuth);
app.use("/api/user",routerUser);
app.use("/api/post",routerPost);
app.use("/api/categories",routerCategories);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

