# Drone-Medication-Delivery-System-API-Implementation
In this task, we have a fleet of 10 drones that are capable of carrying devices and delivering small loads, specifically medications. Each drone has unique attributes such as a serial number, model, weight limit, battery capacity, and state. Medications are characterized by their name, weight, code, and an image.


# Brief Summary of this Task
Drones
Introduction
Drones are an innovative and disruptive technology in the transportation field. Similar to how mobile phones revolutionized communication, drones have the potential to transform traditional transportation infrastructure. They are especially valuable for delivering small items to locations with difficult access.

Task Description
In this task, we have a fleet of 10 drones that are capable of carrying devices and delivering small loads, specifically medications. Each drone has unique attributes such as a serial number, model, weight limit, battery capacity, and state. Medications are characterized by their name, weight, code, and image.

The goal is to develop a REST API service, known as the dispatch controller, that enables clients to interact with the drones. The API should provide the functionality to register a drone, load medication items onto a drone, check the loaded medication items for a specific drone, view available drones for loading, and check the battery level of a given drone. Design assumptions are allowed.



# To run and start the server, follow these steps:
```
1. Clone the repository from GitHub:
   git clone git@github.com:maximmajor/Drone-Medication-Delivery-System-API.git

3. run yarn (to Install dependencies)

4. Set environment variables:
   Create a .env file at the root of the project directory and add the following environment variables:
   for postgres
   DB_NAME=your-database
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   

5. run yarn tsc
   (This compiles the TypeScript code into JavaScript code. and create a dist folder where it is stored.)

6. run yarn start
   (This will start the server and listen for incoming requests.)

   FOR DEVELOPEMENT ENVIRONMENT
7. run yarn watch
   (This will start the server and listen for incoming requests.)
```


# TO INTERACT WITH THE SERVER:
Once the server is running, you can interact with it using a tool like Postman 
or a browser extension. Here are some of the requests:

# Drone Service
```
1. Register Drone:
   POST localhost:3000/drone/
   Content-Type: application/json
  {
    "serialNumber": "SD25Y3",
    "model": "Lightweight",
    "weightLimit": 500,
    "batteryCapacity": 100,
    "state": "IDLE"
}

2. Get All Drones:
   GET localhost:3000/drone/
 

4. Get Drone By ID:
   GET localhost:3000/drone/:droneId

3. Update Drone:
   PUT localhost:3000/drone/:droneId
   Content-Type: application/json
 {  
    "state": "LOADING",
    "batteryCapacity": 500
}
 you can update either the state, battery capacity etc

4. Get Drone by the State
   GET localhost:3000/drone/by/state?name=DELIVERED
   The query should be any of these 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'

5. Get Drone by Battery Level
   GET localhost:3000/drone/by/level?word=above
   The query should be any of these "above" to get all drones with batteries above 25% and "below"  to get all the Drones with batteries levels below 25%
```


# Medication Service
```
1. Create Medication:
   POST localhost:3000/medication/
   Content-Type: application/json
  {
 "name": "glucose",
  "weight": 50,
  "code": "SE_17",
  "image": "https://www.image.png"
}


2. Get All MedicationS:
   GET localhost:3000/medication/
   Content-Type: application/json
 

3. Get Medication by Id
   GET localhost:3000/medication/:medicationId


4. Update Medication
   PUT localhost:3000/medication/:medicationId
   Content-Type: application/json
   {
 "name": "vatamin C",
  "weight": 60,
  "code": "AF6S_7",
  "image": "https://www.image.png"
}


3. Delete Medication
   DELETE localhost:3000/medication/:medicationId
```



# Activity Service
```
1. Load Drone:
   POST localhost:3000/activity/:droneId
   Content-Type: application/json
  {
  "location": "Sample Location",
  "status": "Open",
  "conveyComment": "Sample Comment",
  "medicationIds": [1, 2]
}



3. Get All Activities:
   GET localhost:3000/activity/
   RESPONSE:
{
        "id": 6,
        "location": "Sample Location",
        "status": "Open",
        "timeLeft": "not yet",
        "WeightOfLoadAdded": 500,
        "timeReached": "not yet",
        "timeReturned": "not yet",
        "conveyComment": "Sample Comment",
        "droneId": 2,
        "MedicationItems": [
            {
                "code": "SE_7",
                "weight": 50,
                "itemName": "glucose"
            },
            {
                "code": "SE_17",
                "weight": 50,
                "itemName": "glucose"
            }
        ],
        "createdAt": "2023-06-29T12:22:02.571Z",
        "updatedAt": "2023-06-29T12:38:05.244Z"
    },
    {
        "id": 7,
        "location": "Sample Location",
        "status": "Open",
        "timeLeft": "not yet",
        "WeightOfLoadAdded": 500,
        "timeReached": "not yet",
        "timeReturned": "not yet",
        "conveyComment": "Sample Comment",
        "droneId": 3,
        "MedicationItems": [
            {
                "code": "SE_7",
                "weight": 50,
                "itemName": "glucose"
            },
            {
                "code": "SE_4",
                "weight": 50,
                "itemName": "glucose"
            },
            {
                "code": "SE_6",
                "weight": 50,
                "itemName": "glucose"
            }
        ],
        "createdAt": "2023-06-29T12:41:34.343Z",
        "updatedAt": "2023-06-29T12:42:07.304Z"
    },
```




# File Structure:
```
├── src/
│   │   ├── models/
│   │   │   └── droneModel.ts
│   │   │   └── medicationModel.ts
│   │   │   └── activityModel.ts
│   │   ├── controllers/
│   │   │   └── droneController.ts
│   │   │   └── medicationController.ts
│   │   │   └── activityController.ts
│   │   ├── repositories/
│   │   │   └── droneRepository.ts
│   │   │   └── medicationRepository.ts
│   │   │   └── activityRepository.ts
│   │   ├── service/
│   │   │   └── droneServices.ts
│   │   │   └── medicationServices.ts
│   │   │   └── activityServices.ts
│   │   ├── routes/
│   │   │   └── droneRoute.ts
│   │   │   └── medicationRoute.ts
│   │   │   └── activityRoute.ts
│   │   ├── middlewares/
│   │   │   └── HttpException.ts
│   │   │   └── errorHandlers.ts
│   │   │   └── joiValidation.ts
│   │   ├── config/
│   │   │   └── db.ts
│   │   └── utils/
│   │       └── server.ts
│   ├── app.ts
│  
└──
```




# Breakdown of what each folder and file contains:
```
1. src/:
   This directory contains all the source code for the project.

3. controllers/:
   This sub-directory contains code related to handling requests and responses from the client.

4. Controller.ts:
   This contains functions to handle CRUD (Create, Read, Update, Delete) operations.

5. repositories/:
   This sub-directory contains code related to interacting with the database

6. Repository.ts:
   This contains functions to read from and write to the database for short links.

7. routes/:
   This sub-directory contains code related to defining and handling HTTP routes for the feature.

8. Routes.ts:
   This contains functions to define the routes for the short link feature.

11. middlewares/:
    This sub-directory contains code related to handling middleware logic for the feature.

12. errorHandlers.ts and HttpException.ts:
    These contain code to handle errors and exceptions that may occur during the handling of HTTP requests.

13. config/:
    database.ts:
    This contains configuration settings for connecting to the database.

14. utils/:
    This sub-directory contains utility functions/other miscellaneous code related to the feature.

15. server.ts:
    This contains code to set up and start the HTTP server for the feature.

16. app.ts:
    This file contains code to start the entire application and tie together the various features and modules.

```



# TECHNOLOGY USE
```
1. Node.js: a JavaScript runtime environment that allows running JavaScript code outside of a web browser

2. Express.js: a popular web application framework for Node.js used for building APIs and web applications

3. TypeScript: a superset of JavaScript that adds optional static typing and other features to JavaScript code

4. POSTGRES: SQL document database used for storing and retrieving data

5. Sequelize: a Node.js library/ ORM used for modeling and interacting with POSTGRES databases
```