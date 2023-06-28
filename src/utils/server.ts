import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler, notFoundHandler } from '../middlewares/errorHandlers';
import droneRoutes from '../routes/droneRoute'
import medicationRoutes from '../routes/medicationRoute'



function createServer() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    // use middlewares
    app.use(cors());
    app.use(morgan('tiny'));
    app.use(bodyParser.json());

    //Home page
    app.get('/', (req, res) => {
        res.send('Welcome to the Drone API!');
    });


    // use routes
     // use routes
     app.use('/drone', droneRoutes);
     app.use('/medication', medicationRoutes);
   


    // handle 404 errors
    app.use(notFoundHandler);

    // handle errors
    app.use(errorHandler);

    


    return app;
}

export default createServer;