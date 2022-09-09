const db = require('../../database')
const { InternalServerError } = require('http-errors')

module.exports = {
    create: user => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users(
                    name,
                    email,
                    password
                ) VALUES(?,?,?)`,
                [user.name, user.email, user.password],
                error => {
                    if (error) {
                        reject(new InternalServerError("Error adding user"))
                    }
                    return resolve();
                }
            )
        })
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.get(`
                SELECT * FROM
                users
                WHERE email = ?
            `, [email],
                (error, user) => {
                    if (error)
                        return reject("User not found");
                    return resolve(user)
                })
        })
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get(`
                SELECT * 
                FROM users
                WHERE id = ?
            `,
                [id],
                (error, user) => {
                    if (error) return reject("User not found")
                    return resolve(user)
                })
        })
    },

    list: () => {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT * FROM users 
            `, (error, users) => {
                if (error || !users) return reject(`Error: ${error.message}`)
                return resolve(users)
            })
        })
    },
    delete: (user) => {
        return new Promise((resolve, reject) => {
            db.run(`
            DELETE FROM users
            where id = ?
        `,
                [user.id],
                (error) => {
                    if (error)
                        return reject("Deleting error: " + error.message)
                    return resolve()
                })
        })
    }
}