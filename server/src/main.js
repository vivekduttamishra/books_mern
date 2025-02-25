require('dotenv').config();



let path=require('path');
process.env.ROOT_PATH =path.join(__dirname,'..');

require('./injector_config.js'); //configure all the services.

let db  = require('./repositories/mongoose/connect.js');
let app = require('./app.js')


const httpx = require('./utils/httpx.js');


httpx.runApp({
        protocol:'http',
        requestHandler:app, //express app
        initializer: async()=>{
            await db.connect();
        }
    
    }); 