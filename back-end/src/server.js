const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const routes = require('./router');
const port = process.env.port || 8000 ;

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

try {
	mongoose.connect(process.env.MONGO_DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDb connected successfully!')
} catch (error) {
	console.log(error)
}

app.use("/files", express.static(path.resolve(__dirname, "..", "files")))
app.use(routes);

app.listen(port , () => 
{
    console.log(`listenning to alaa ${port}`)
})
//EDU2K6vf98zcFiDT