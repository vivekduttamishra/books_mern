import express from 'express';
import path from 'path';

const app = express();
const staticFilePath=path.join(`${process.cwd()}/dist`)

//step #1 configure your static file server
app.use(express.static(staticFilePath));


//step #2 configure any other routes that you need
app.get('/api/users', (req, res) => {

    let users=["user1", "user2", "user3", "user4", "user5"]
    res.json(users);

})

//example all your api routes.


//step #3 if we reach here that means we have no maching route
//send the index.html file

app.use( (req, res) => {
    res.sendFile(path.join(staticFilePath, 'index.html'));
})

//step #4 start the server
const port =process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
})