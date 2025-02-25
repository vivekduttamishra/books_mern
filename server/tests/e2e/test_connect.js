const mongoose = require('mongoose');

const connect =()=> mongoose.connect(process.env.MONGODB_TEST_URL||'mongodb://localhost:27017/test_temp_db' );

const close =()=> mongoose.disconnect();

module.exports={
    connect,
    close
}