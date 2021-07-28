import express from 'express';
import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import bcrypt from "bcrypt";
import db from "../lib/db";

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    db.query("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    });
});

/* GET user by ID. */
router.get('/:id', (req, res) => {

    const { id } = req.params;

    db.query(`SELECT * FROM users WHERE userId='${id}'`, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(...rows);
        }
    });
});

/* GET user posts by ID. */
router.get('/:id/posts', (req, res) => {

    const { id } = req.params;

    db.query(`SELECT * FROM posts WHERE userId='${id}' ORDER BY postId DESC`, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    });
});

/* User Log In Validation */
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            try {
                const passwordHash = result[0].password;
                bcrypt.compare(password, passwordHash, (err, isMatch) => {
                    if (isMatch) {
                        res.send({ userData: result[0], message: "Credentials Match." });
                    }
                    else {
                        res.send({ message: "Password Does Not Match!!!" });
                    }
                })
            }
            catch (e) {
                res.send({ message: "E-mail Does Not Exists!!!" });
            }
        }
    })
});

/* Register user */
router.post('/signup', (req, res) => {
    const getFile = () => {
        if (req.files) {
            const { file } = req.files;
            return file;
        }
        return null;
    }

    const { firstName, lastName, email, password, photo } = req.body;

    const removeRecord = (email, hash) => {
        db.query(`DELETE FROM users WHERE email='${email}' and password='${hash}'`, err => {
            if (err) {
                console.log('record is not removed from database!!!');
            }
        });
    }

    const insertFile = (id, rows, file = getFile()) => {
        console.log(`inserting ${id}`);
        mkdirp(path.join(__dirname, `../uploads/photos/${id}`)).
            then(
                (made) => {
                    console.log("file made " + made);
                    file.mv(path.join(__dirname, `../uploads/photos/${id}/${photo}`), err => {
                        if (err) {
                            console.log(file);
                            console.log(err);
                            console.log("unable to upload the picture");
                            res.send({ message: "unable to upload the picture" });
                        }
                        else {
                            console.log("file moved");
                            res.send({ userData: rows[0], message: "data added successfully!!!" });
                        }
                    })
                }
            ).
            catch(
                err => {
                    console.log(err);
                    res.send({ message: "folder is not created!!!" });
                }
            );
    }

    const insertQuery = (hash) => (
        photo === undefined ?
            `INSERT INTO users (firstname, lastname, email, password) 
                VALUES ('${firstName}', '${lastName}', '${email}', '${hash}')`
            : `INSERT INTO users (firstname, lastname, email, password, photo) 
                VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${photo}')`
    );

    const insertCondition = firstName !== undefined && lastName !== undefined && email !== undefined && password !== undefined;

    const insertRecord = (uploadPhoto) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                console.log("unable to generate salt");
                res.send({ message: "unable to generate salt" });
            }
            else {
                console.log("salt is generated");
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        console.log("unable to generate hash");
                        res.send({ message: "unable to generate hash" });
                    }
                    else {
                        console.log("hash is generated");
                        db.query(insertQuery(hash), err => {
                            if (err) {
                                console.log("unable to insert data in database", err);
                                res.send({ message: "unable to insert data in database \n email you have entered might already exists" });
                            }
                            else {
                                console.log("insert query is executed");
                                db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, rows) => {
                                    if (err) {
                                        console.log("unable to get data of new user");
                                        removeRecord(email, hash);
                                        res.send({ message: "unable to get data of new user" });
                                    }
                                    else {
                                        console.log(rows);
                                        if (uploadPhoto === true) {
                                            insertFile(rows[0].userId, rows);
                                        }
                                        else {
                                            res.send({ userData: rows[0], message: 'data added successfully!!!' });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    insertRecord(insertCondition && photo !== undefined);

});

/* Update user by ID */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const data = { ...req.body };
    console.log(data);

    const getFile = () => {
        if (req.files) {
            const { file } = req.files;
            return file;
        }
        return null;
    }

    const updateDatabase = (id, data) => {
        db.query(`UPDATE users SET ? WHERE userId='${id}'`, data, err => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                db.query('SELECT * FROM users', (err, rows) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(rows);
                    }
                });
            }
        });
    }

    const file = getFile();


    if (file && data.photo) {
        file.mv(path.join(__dirname, `../uploads/photos/${id}/${data.photo}`), err => {
            if (err) {
                console.log(file);
                console.log(err);
                console.log("unable to upload the picture");
                res.json({ message: "unable to upload the picture" });
            }
            else {
                updateDatabase(id, data);
            }
        });
    }
    else {
        updateDatabase(id, data);
    }
});

/* Delete user by ID */
router.delete('/:id', req => {
    const { id } = req.params;
    db.query(`DELETE FROM users WHERE userId='${id}'`);
});

export default router;
