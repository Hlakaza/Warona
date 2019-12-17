import { connect } from 'mongoose';
const config = require('../../config/config.js');
/*
*   Database connection to mongoDB
*/
export const connectMongoDB = () => {
    connect(config.dbUrl, (err) => {
        if (err) {
            console.log('Failed to connect to DB');
        } else {
            console.log('Successfully connected to MongoDB');
        }
    });

};
