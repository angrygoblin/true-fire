const TrueFireDB = require('./TrueFireDB');

class TrueFireMenu {
    db;

    constructor() {
        this.db = TrueFireDB.instance().db();
    }

    jazz() {
        return new Promise((resolve) => {
            TrueFireDB.instance().db().all('SELECT * FROM courses LEFT JOIN paths_courses ON course_id = courses.id WHERE path_id = 1 ORDER BY `index`', (err, rows) => {
                resolve(rows);
            });
        })
    }

    acoustic() {
        return [];
    }

}

module.exports = TrueFireMenu