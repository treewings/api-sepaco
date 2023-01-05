require('dotenv').config();
const bodyParser = require('body-parser');
import express from 'express';
import http from 'http';
// import oracledb from 'oracledb'
import { init as OracleConnect } from '@/commons/config/database/oracle';
//  oracledb.initOracleClient({
//     //libDir: "C:\\instantclient_19_11", 
//     libDir: "../usr/lib/instantclient",
//  });
import routes from './routes';

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/api`, routes);

server.listen(process.env.PORT || 4512, () => {
  console.log(`server started, port: ${process.env.PORT || 4512}`);
  
  OracleConnect();
});