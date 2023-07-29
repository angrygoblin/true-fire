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
    }

    async updateProgress(id, status) {
        console.log('update progress id: ' + id + ', status: ' + status)
        return new Promise((resolve) => {
            this.db.run('DELETE FROM progress WHERE lesson_id = ?', [id], (err, row) => {
                this.db.run('INSERT INTO progress (lesson_id, status) VALUES (?, ?)', [id, status], (err, row) => {
                    resolve()
                })
            })
        });
    }

    async getLastOpenedLesson() {
        return new Promise((resolve) => {
            this.db.get(`SELECT lessons.* FROM progress LEFT JOIN lessons ON progress.lesson_id = lessons.id ORDER BY id DESC LIMIT 1`, (err, row) => {
                resolve(row)
            })
        })
    }

    async getCourse(id) {
        console.log('get course ' + id)
        const course = new Promise((resolve) => {
            this.db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
                resolve(row)
            })
        })
        const lessons = new Promise((resolve) => {
            this.db.all(`
                SELECT lessons.*, progress.status FROM lessons 
                LEFT JOIN progress ON lessons.id = progress.lesson_id 
                WHERE course_id = ? 
                ORDER BY number`,
                [id],
                (err, rows) => {
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