require('dotenv').config();

const https = require('https');
const fs = require('fs'); //to read key and certificate.
const path = require('path');
require('./injector_config');
const app = require('./app');
const db= require('./repositories/mongoose/connect');

//request handler
const defaultHandler=(request,response)=>{
    response.end('Welcome to the Server:'+ request.url);
}

let basePath = path.join(process.cwd());
let sslOption= {
    key: fs.readFileSync(path.join(basePath, 'key.pem')),
    cert: fs.readFileSync(path.join(basePath, 'cert.pem')),
    passphrase: 'password'
}

//let server = https.createServer(sslOption, defaultHandler);
let server = https.createServer(sslOption, app);

async function startServer(){

    await db.connect();
    server.on('error',error=>console.log('error',error));
    let port = 4000;
    server.listen(port,()=>console.log(`server started on https://localhost:${port}`))

}    

startServer();