import express from "express";
import path from 'path';
import fs from 'fs';
import db from "../lib/db";

const router = express.Router();

/* GET posts */
router.get('/', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY postId DESC', (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    })
});

/* GET post by Id */
router.get('/:id', (req, res) => {
    const {id : postId} = req.params;

    db.query(`SELECT * FROM posts WHERE postId='${postId}'`, (err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(...rows);
        }
    })
});

/* POST a post */
router.post('/', (req, res) => {
    const { title, content, userId } = req.body;
    console.log(req.files);
    console.log(req.body);

    if (req.files !== null) {
        const { file } = req.files;
        file.mv(path.join(__dirname, `../uploads/images/${file.name}`), err => {
            if (err) {
                console.log(err);
            }
        });
    }

    const image = req.files.file.name || '';

    if (title !== undefined && image !== undefined && content !== undefined && userId !== undefined) {
        if (req.files === null) {
            try {
                db.query(`INSERT INTO posts (title, content, userId) VALUES ?`, [[[title, content, userId]]], err => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    }
                    res.send("Data Added Successfully!!!");
                })
            }
            catch (err) {
                res.status(500).send(err);
            }
        }
    }
    else {
        try {
            db.query(`INSERT INTO posts (title, image, content, userId) VALUES ?`, [[[title, content, userId]]], err => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                res.send("Data Added Successfully!!!");
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { prevImage, title, content } = req.body;

    const data = { title, content };

    if (req.files !== null) {
        const { file } = req.files;

        fs.unlink(path.join(__dirname, `../uploads/images/${prevImage}`), err => {
            if (err) {
                console.log(err);
            }
        });

        file.mv(path.join(__dirname, `../uploads/images/${file.name}`), err => {
            if (err) {
                console.log(err);
            }

            data.image = file.name;

            db.query(`UPDATE posts SET ? WHERE postId='${id}'`, data, err => {
                if (err) {
                    res.send(err);
                    console.log(err);
                }
                else {
                    db.query('SELECT * FROM posts', (err, rows) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.json(rows);
                        }
                    })
                }
            })
        })
    }
    else {
        db.query(`UPDATE posts SET ? WHERE postId='${id}'`, data, (err) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                db.query('SELECT * FROM posts', (err, rows) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(rows);
                    }
                });
            }
        });
    }
});

/* DELETE POST */
router.delete('/', (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    db.query(`DELETE FROM posts WHERE postId='${id}')`, (err) => {
        if (err) {
            res.json({ success: false });
        }
        else res.json({ success: true });
    });
});

export default router;