const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const Book = require("../models/Book.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware"); 


router.get("/", async (req, res) => {
  
       try {
              const books=await Book.find()
      
              return res.status(201).json({ books });

       } catch (error) {
        return res.status(500).json({ message: error });
       }


});
//search
router.get("/search/:searchString", async (req, res) => {
  
 const searchString=req.params.searchString
 const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
 const searchRgx = rgx(searchString);
  try {
         const books=await Book.find({
          

             $or: [
              { author: { $regex: searchRgx, $options: "i" } },
              { title: { $regex: searchRgx, $options: "i" } },
            ],
         })
 
         return res.status(201).json({ books });

  } catch (error) {
   return res.status(500).json({ message: error });
  }


});


router.post("/book/new", fileUploader.single('image'), async(req, res) => {
  
  const payload = { ...req.body }

if (req.file) {
   payload.image = req.file.path;
}
else{
  delete payload.image;
}

try {
  const response=await Book.create(payload)
  return res.status(201).json({ message: "Book Created" });
} catch (error) {
  return res.status(500).json({ message: error });
}
   
});

module.exports = router;
