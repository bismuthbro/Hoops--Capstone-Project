const express = require("express");
const stream = require('stream')
const fs = require('fs')
const app = express();
const connector = require('./DBConnect.js')
const cors = require('cors')
const path = require('path')
app.use(cors())
app.use(express.json());
app.use('/games',require('./routes/GameRoutes.js'))
app.use('/locations',require('./routes/LocationRoutes.js'))
app.use('/users',require('./routes/UserRoutes.js'))
const PORT = 3000;
app.get('/image/:imagepath', (req, res) => {
    const imagepath = req?.params?.imagepath;
    try {
        const filepath = path.resolve('userimages', imagepath)

        const readableStream = fs.createReadStream(filepath)
        const passthroughStream = new stream.PassThrough()

        stream.pipeline(
            readableStream, //Input stream (data source)
            passthroughStream, //Data destination (where the data will go),
            (err) => { //Handle errors
                if (err) {
                    console.error(err)
                    res.status(500).json({err})                    
                }
            }
        )
        passthroughStream.pipe(res) //Send data to user
    } catch(error) {
        console.error(error)
        res.status(500).json({error})
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});