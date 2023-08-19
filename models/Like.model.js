const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const likeSchema = new Schema(
  {
    book:{
        type: Schema.ObjectId,
        ref: 'Book'
     },

     booklovers:{
        type: Schema.ObjectId,
        ref: 'User'
     }
     ,
     like:{
        type: Boolean,
        default: false
     }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Like = model("Like", likeSchema);

module.exports =Like