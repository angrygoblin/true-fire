const sqlite3 = require('sqlite3').verbose();

class TrueFireDB {
    static #instance = null;
    static #db = null;
    constructor(db) {
        if (TrueFireDB.#instance) {
            throw new Error('The constructor should not be called directly');
        }
        TrueFireDB.#db = new sqlite3.Database(db);
    }

    static instance() {
        if (!TrueFireDB.#instance) {
            TrueFireDB.#instance = new TrueFireDB('truefire.db');
        }
        return TrueFireDB.#instance
    }

    db() {
        return TrueFireDB.#db
    }
}

module.exports = TrueFireDB