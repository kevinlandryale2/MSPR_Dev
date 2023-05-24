 
const mongoose = require('mongoose');


mongoose
  .connect("mongodb://localhost:27017/msprapi")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });




// mongoose.connect("mongodb+srv://"+process.env.DB_USER_PASS+"@cluster0.t0rheg4.mongodb.net/msprapi",
//  {
//      useNewUrlParser: true, useUnifiedTopology: true,
//      useUnifiedTopology: true,
//     })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Could not connect to MongoDB', err));
