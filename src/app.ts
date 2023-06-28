import createServer from "./utils/server"
const PORT = process.env.PORT || 3000;
import sequelize from './config/database';


// create the Express app
const app = createServer()




sequelize.sync()
  .then(() => {
    console.log('Database connection established and models synced.');
    // Start the Express server
   // start the server
app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });