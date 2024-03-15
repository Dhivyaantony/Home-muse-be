const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Validate the URL format here if needed
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`,
    },
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoUrl:String
});

 const RecipesModel = mongoose.model('RecipesModel', recipeSchema);
 module.exports = RecipesModel;