const TrueFireDB = require('./TrueFireDB');

class TrueFireMenu {
    db;

    constructor() {
        this.db = TrueFireDB.instance().db();
    }

    category(id) {
        return new Promise((resolve) => {
            TrueFireDB.instance().db().all('SELECT * FROM courses LEFT JOIN categories_courses ON course_id = courses.id WHERE category_id = ? ORDER BY `index`', [id], (err, rows) => {
                resolve(rows);
            });
        })
    }

}

module.exports = TrueFireMenu