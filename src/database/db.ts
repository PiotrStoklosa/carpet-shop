import mongoose from 'mongoose';

const dbName = 'carpet-shop';

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(`mongodb://localhost:27017/${dbName}`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

module.exports = new Database();