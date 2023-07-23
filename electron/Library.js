const TrueFireDB = require('./TrueFireDB');

class Library {
    db;
    AssetsTypes = {
        video: 1,
        tab: 2,
        chart: 3,
    }
    constructor() {
        this.db = TrueFireDB.instance().db();
        console.log(this.db)
    }

    async getCourse(id) {
        const course = new Promise((resolve) => {
            this.db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
                resolve(row)
            })
        })
        const lessons = new Promise((resolve) => {
            this.db.all('SELECT * FROM lessons WHERE course_id = ? ORDER BY number', [id], (err, rows) => {
                resolve(rows)
            })
        })
        const content = new Promise((resolve) => {
            this.db.all('SELECT * FROM content WHERE lesson_id IN (SELECT id FROM lessons WHERE course_id = ?)', [id], (err, rows) => {
                resolve(rows)
            })
        })
        const rquestResult = await Promise.all([course, lessons, content])
        const result = rquestResult[0];
        result.lessons = [];
        for (const lessonRow of rquestResult[1]) {
            const lesson = {
                ...lessonRow,
                assets: {
                    video: '',
                    chart: [],
                    tabs: []
                }
            }
            for (const asset of rquestResult[2]) {
                if (+asset.lesson_id !== +lessonRow.id) {
                    continue
                }
                if (asset.type === this.AssetsTypes.video) {
                    lesson.assets.video = asset.file
                }
                if (asset.type === this.AssetsTypes.tab) {
                    lesson.assets.tabs.push(asset.file);
                }
                if (asset.type === this.AssetsTypes.chart) {
                    lesson.assets.chart.push(asset.file);
                }
            }
            result.lessons.push(lesson)
        }
        return result;
    }

}

module.exports = Library