import bodyParser from "body-parser";
import http from 'http';
import cors from 'cors';
import getApiSearchController from './controllers/getApiSearchController';

require('dotenv').config();
const express = require('express');

function clearCache() {
    const redis = require('redis');
    const REDIS_PORT = 6379; 
    const client = redis.createClient(REDIS_PORT);
    client.flushall('ASYNC');
    return true;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = new http.Server(app);
server.listen(process.env.PORT);


app.post('/api/search', getApiSearchController);
app.get('/api/clear-cache', clearCache);
