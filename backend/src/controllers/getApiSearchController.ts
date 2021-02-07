import { Request, Response } from 'express';

const getApiSearchController = (request: Request, response: Response) => {
    
    const fetch = require("node-fetch");
    const redis = require('redis');
    const REDIS_PORT = 6379; 
    const client = redis.createClient(REDIS_PORT);
    console.log(request.body);
    var data = '';
    var url = '';
    switch(request.body.type) {
        case 'user': {
            url = `https://api.github.com/search/users?page=1&q=${request.body.q}&sort=stars&order=desc`;
            break;
        }
        case 'repositories': {
            url = `https://api.github.com/search/repositories?page=1&q=${request.body.q}&sort=stars&order=desc`;
            break;
        }
    }

    const key = request.body.q;
    client.get(key, (err:any, data:any) => {
        if (err) throw err;
    
        if (data !== null) {
            response.send({
                data : JSON.parse(data)
            });
        } else {
            fetch(url)
            .then(function(response: any) {
                return response.json();
            })
            .then(function(myJson) {
                data=JSON.stringify(myJson);
                client.setex(request.body.q, 7200, data);
                response.statusCode = 200;
                response.send({
                    data : JSON.parse(data)
                });
            });
        }
    });
}

export default getApiSearchController;