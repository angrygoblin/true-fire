const sqlite3 = require('sqlite3').verbose();

class TrueFireDB {
    static _instance = null;
    static _db = null;
    constructor(db) {
        if (TrueFireDB._instance) {
            throw new Error('The constructor should not be called directly');
        }
        TrueFireDB._db = new sqlite3.Database(db);
        console.log('init', TrueFireDB._db)
    }

    static instance() {
        if (!TrueFireDB._instance) {
            TrueFireDB._instance = new TrueFireDB('truefire.db');
        }
        return TrueFireDB._instance
    }

    db() {
        return TrueFireDB._db
    }
}

module.exports = TrueFireDB