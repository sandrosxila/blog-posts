import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/:id/:name', (req,res) => {
    const {id,name} = req.params;
    console.log(id,name)
    res.sendFile(path.join(__dirname, `../uploads/photos/${id}/${name}`));
});

export default router;