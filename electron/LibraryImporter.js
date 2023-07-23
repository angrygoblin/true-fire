const fs = require('fs');
const { exec } = require('child_process');
const TrueFireDB = require('./TrueFireDB');

class LibraryImporter {
    #dir;
    #db;
    AssetsTypes = {
        video: 1,
        tab: 2,
        chart: 3,
    }
    constructor(dir) {
        this.#dir = dir;
        this.#db = TrueFireDB.instance().db();
    }

    async importCourses() {
        const courseDirsList = fs.readdirSync(this.#dir);
        for (const courseDir of courseDirsList) {
            const row = await this.findCourse(courseDir);
            if(row) {
                await this.importCourse(courseDir, row.id)
            } else {
                await this.importCourse(courseDir)
            }
        }
    }

    async importCourse(courseDir, courseId = null) {
        const coursePath = this.#dir + '/' + courseDir;
        const courseInfo = this.readInfoFile( coursePath + '/info.json');
        if (!courseId) {
            console.log('create course: ' + courseDir);
            courseId = await this.createCourse(courseDir, coursePath + '/poster.jpg')
            this.addSupplementary(courseId, courseInfo.parent);
            this.addCourseToLearningPath(courseInfo.path, courseInfo.number, courseId)
        }
        const lessonsDirsList = fs.readdirSync(coursePath);
        for (const lessonDir of lessonsDirsList) {
            const lessonPath = coursePath + '/' + lessonDir
            if (!this.isDir(lessonPath)) {
                continue;
            }
            const lessonInfo = this.readInfoFile(lessonPath + '/info.json');
            const row = await this.findLesson(courseId, lessonInfo.title)
            if(row) {
                continue;
            }
            const lessonId = await this.importLesson(lessonPath, courseId)
            await this.importLessonAssets(lessonId, lessonPath)
        }
    }

    importLesson(lessonDir, courseId) {
        console.log('create lesson: ' + lessonDir + ' course = ' + courseId);
        const lessonInfo = this.readInfoFile(lessonDir + '/info.json');
        const dirNameParts = /^([\d]+) - (.*)$/.exec(lessonDir.substring(lessonDir.lastIndexOf('/') + 1))
        return this.createLesson(+dirNameParts[1], lessonInfo.title, lessonInfo.subTitle, lessonInfo.overview, courseId)
    }

    async importLessonAssets(lessonId, lessonDir) {
        const lessonFiles = fs.readdirSync(lessonDir);
        for(const lessonFile of lessonFiles) {
            console.log('add assets: ' + lessonFile)
            if(lessonFile.includes('lesson')) {
                await this.convertLessonVideo(lessonDir + '/' + lessonFile, lessonDir + '/tutorial.mp4')
                this.createLessonAsset(lessonId, this.AssetsTypes.video, lessonDir + '/tutorial.mp4')
            }
            if(lessonFile.includes('tabs') || /\.(gp[345]+|ptb)$/.test(lessonFile)) {
                await this.createLessonAsset(lessonId, this.AssetsTypes.tab, lessonDir + lessonFile)
            }
            if(lessonFile.includes('chart') || /\.pdf$/.test(lessonFile)) {
                await this.createLessonAsset(lessonId, this.AssetsTypes.chart, lessonDir + lessonFile)
            }
        }
    }

    createLesson(number, title, subTitle, overview, courseId) {
        return new Promise((resolve) => {
            this.#db.get('INSERT INTO lessons (number, title, subtitle, overview, course_id) VALUES (?, ?, ?, ?, ?) RETURNING id', [number, title, subTitle, overview, courseId], (err, row) => {
                resolve(row.id)
            })
        })
    }

    createLessonAsset(lessonId, type, file) {
        this.#db.run('INSERT INTO content (lesson_id, type, file) VALUES (?, ?, ?)', [lessonId, type, file])
    }

    addCourseToLearningPath(path, number, courseId) {
        const pathId = (path === 'Jazz' ? 1 : 2);
        this.#db.run('INSERT INTO paths_courses (path_id, `index`, course_id) VALUES (?, ?, ?)', [pathId, number, courseId])
    }

    createCourse(name, poster) {
        return new Promise((resolve) => {
            this.#db.get('INSERT INTO courses (name, poster) VALUES (?, ?) RETURNING id;', [name, poster], (err, row) => {
                console.log(row)
                resolve(row.id)
            })
        })
    }

    addSupplementary(courseId, parent) {
        if (parent === 0) {
            return;
        }
        this.#db.run('INSERT INTO supplementary (course_id, parent_id) VALUES (?, ?)', [courseId, parent])
    }

    convertLessonVideo(from, to) {
        const command = `ffmpeg -y -i "${from}" -map 0:v -c:v copy -map 0:a -c:a copy "${to}"`;
        return new Promise((resolve) => {
            if (!fs.existsSync(from)) {
                resolve()
            }
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    // console.log(error.message);
                }
                if (stderr) {
                    // console.log(stderr);
                }
                // console.log(stdout)
                fs.unlinkSync(from)
                resolve(stdout)
            });
        })
    }

    readInfoFile(path) {
        if (!fs.existsSync(path)) {
            throw new Error(`Lesson folder does not contain file ${path}`)
        }
        const info = fs.readFileSync(path, 'utf8')
        return JSON.parse(info);
    }

    isDir(path) {
        return fs.lstatSync(path).isDirectory()
    }

    findCourse(name) {
        return new Promise((resolve) => {
            this.#db.get('SELECT * FROM courses WHERE name = ? LIMIT 1', [name], (err, row) => {
                resolve(row)
            })
        })
    }

    findLesson(courseId, title) {
        return new Promise((resolve) => {
            this.#db.get('SELECT * FROM lessons WHERE course_id = ? AND title = ? LIMIT 1', [courseId, title], (err, row) => {
                resolve(row)
            })
        })
    }
}

module.exports = LibraryImporter