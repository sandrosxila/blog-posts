import express from 'express';
import fs from 'fs';
import path from 'path';
import db from "../lib/db";

const router = express.Router();

/* GET Image By Name */
router.get('/:name', (req, res) => {
    const { name } = req.params;
    res.sendFile(path.join(__dirname, `../uploads/images/${name}`));
});

/* DELETE Image By Name FROM SERVER*/
router.delete('/remove/:name', (req, res) => {
    console.log("I'm in REMOVE");
    const { name } = req.params;
    console.log("IMAGE NAME:", name);
    fs.unlink(path.join(__dirname, `../uploads/images/${name}`), (err) => {
        if (err) {
            console.log("file is not deleted or not found");
            res.json({ success: false });
        }
        else res.json({ success: true });
    });
});

/* DELETE Image By Name FROM SERVER and DATABASE*/
router.delete('/:name', (req, res) => {
    const { name } = req.params;
    console.log(name);
    fs.unlink(path.join(__dirname, `../uploads/images/${name}`), (err) => {
        if (err) {
            console.log("file is not deleted or not found");
            res.json({ success: false });
        }
        else {
            db.query(`UPDATE posts SET image=NULL WHERE image='${name}'`, (err) => {
                if (err) {
                    res.json({ success: false });
                }
                else res.json({ success: true });
            })
        }
    });

})

export default router;