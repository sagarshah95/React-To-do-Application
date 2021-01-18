import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import routes from './routes';

// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/todoDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Enabling CORS
app.use(function(req, res, next){
    res.header("Access-Control-Allow","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", 
    "GET, POST, PUT, DELETE");
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
routes(app);

export default app;
