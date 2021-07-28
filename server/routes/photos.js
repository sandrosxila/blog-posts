import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/:id/:name', (req, res) => {
    const { id, name } = req.params;
    console.log(id, name)
    res.sendFile(path.join(__dirname, `../uploads/photos/${id}/${name}`));
});

router.delete('/:id/:name', (req, res) => {
    const { id, name } = req.params;
    fs.unlink(path.join(__dirname, `../uploads/photos/${id}/${name}`), (err) => {
        if (err) {
            console.log("file is not deleted or not found");
            res.json({ success: false });
        }
        else {
            db.query(`UPDATE users SET photo=NULL WHERE userId='${id}'`, (err) => {
                if (err) {
                    res.json({ success: false });
                }
                else res.json({ success: true });
            })
        }
    });
});

export default router;