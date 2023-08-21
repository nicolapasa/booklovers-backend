const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const Book = require("../models/Book.model");
const Like= require("../models/Like.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware"); 


router.get("/", async (req, res) => {
  
       try {
              const books=await Book.find()
      
              return res.status(201).json({ books });

       } catch (error) {
        return res.status(500).json({ message: error });
       }


});

//get single book
router.get("/book/:id", async (req, res) => {
  


  try {
         const book=await Book.findById(req.params.id)
 
         return res.status(201).json({ book });

  } catch (error) {
   return res.status(500).json({ message: error });
  }


});
//get favourite books
router.get("/books/:userid", async (req, res) => {
  


  try {
    
         const likeBooks=await Like.find({booklovers: req.params.userid, like: true}).populate('book')
        // console.log(likeBooks)
  
         return res.status(201).json({ likeBooks });

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


router.put("/book/:id", fileUploader.single('image'), async(req, res) => {
  
  
  const payload = { ...req.body }

if (req.file) {
   payload.image = req.file.path;
}
else{
  delete payload.image;
}

try {
  const response=await Book.findByIdAndUpdate(req.params.id, payload)
  return res.status(201).json({ message: "Book Updated" });
} catch (error) {
  return res.status(500).json({ message: error });
}
   
});


router.delete("/book/:id",  async(req, res) => {
  

try {
  const response=await Book.findByIdAndDelete(req.params.id)
  return res.status(201).json({ message: "Book deleted" });
} catch (error) {
  return res.status(500).json({ message: error });
}
   
});


router.post("/book/like/:id", async (req, res) => {
  
const payload={...req.body}

  try {
         const foundLike=await Like.find({book: req.params.id, booklovers: payload.userid})
      
         if(foundLike.length>0){
           let like=false
            //update like
            if(foundLike[0].like===false){
              like=true
            }
            else{
              like=false
            }
           console.log(foundLike[0])
       const updatedLike= await Like.findByIdAndUpdate(foundLike[0]._id, { like}, {new: true})
            return res.status(201).json({ updatedLike });
         }
         else{
       const newLike=   await Like.create({like: true, book: req.params.id, booklovers: payload.userid })
       console.log(newLike)
       return res.status(201).json({ newLike });
         }
     
       

  } catch (error) {
   return res.status(500).json({ message: error });
  }


});
router.get("/like/:id", async (req, res) => {
  


  try {
         const likes=await Like.find({book: req.params.id, like: true})
 
         return res.status(201).json({ likes });

  } catch (error) {
   return res.status(500).json({ message: error });
  }


});
module.exports = router;
