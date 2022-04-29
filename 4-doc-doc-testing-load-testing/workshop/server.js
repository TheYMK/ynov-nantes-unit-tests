const app = require('./app')
const PORT = process.env.PORT || 5002;


const start = () => {
  const mongoose = require('mongoose');
  const DB_URI = 'mongodb+srv://ynov:ynov@cluster0.kilx6.mongodb.net/toDoApp?retryWrites=true&w=majority';
  mongoose.connect(DB_URI).then(() => {
    console.log('Listening on port: ' + PORT);
  });
  app.listen(PORT);
}

start()

