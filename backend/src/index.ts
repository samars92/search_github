import http from 'http';
import cors from 'cors';
import getApiSearchController from './controllers/getApiSearchController';

require('dotenv').config();
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const server = new http.Server(app);
server.listen(process.env.PORT);
const redis = require('redis');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Github Search API",
        version: '1.0.0',
      },
    },
    apis: ["./src/index.ts"],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

function clearCache() {
    const client = redis.createClient(process.env.REDIS_PORT);
    client.flushall('ASYNC');
    return true;
}

/**
 * @swagger
 * /api/search:
 *   post:
 *     description: Get Github repos or users 
 *     parameters:
 *      - name: type
 *        description: type of search repo or user
 *        in: formData
 *        required: true
 *        type: string
 *      - name: searchq
 *        description: search term
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.post('/api/search', getApiSearchController);

/**
 * @swagger
 * api/clear-cache:
 *   get:
 *     description: clear redis cache 
 *     responses:
 *       200:
 *         description: Success
 * 
 */
app.get('/api/clear-cache', clearCache);
