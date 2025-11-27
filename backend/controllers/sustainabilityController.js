const fs = require('fs');
const path = require('path');
const db = require('../config/database');
const syncData=require('./syncData')
const normalizeData=require('./normalizeData')
const getAllData=require('./getAllData')
const getLatestData=require('./getLatestData')



await  normalizeData(sources) 
await syncData(req,res,next);


await getAllData(req, res, next) ;

await getLatestData(req, res, next) ;



