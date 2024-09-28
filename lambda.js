const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const binaryMimeTypes = [
    'application/json',
    'application/octet-stream',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/svg+xml',
    'image/jpeg',
    'image/png',
]

let serverlessExpressInstance;

async function setup(event,context){
    serverlessExpressInstance = awsServerlessExpress.createServer(app,null,binaryMimeTypes);
    return awsServerlessExpress.proxy(serverlessExpressInstance, event, context);
}

exports.handler = async function(event,context){
    global.lambdaContext = context;
    return new Promise(async (resolve,reject)=>{
        if(serverlessExpressInstance){
            return awsServerlessExpress.proxy(serverlessExpressInstance, event, context)
        }
        return await setup(event,context);
    })
}