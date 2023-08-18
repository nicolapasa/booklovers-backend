const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true
    },
    author: {
      type: String,
      lowercase: true,
      trim: true
    },
    plot: {
        type: String,
        lowercase: true,
        trim: true
      },
     image: {
        type: String
     } ,
     likes:{
        type: Number,
        default: 0
     },
     owner:{
        type: Schema.ObjectId,
        ref: 'User'
     }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;