const express = require('express');
const router = express.Router();
const {updatearticle,
    deletearticle,
    addarticle,
    findarticlebyid,
    filterarticles,
    deletearticlebytitle} = require('../controllers/articlescontroller');


 router.get('/',filterarticles);
 router.get('/:id',findarticlebyid);
 router.put('/update/:id',updatearticle);
 router.post('/add',addarticle);
 router.delete('/delete/title',deletearticlebytitle);

 router.delete('/delete/:id',deletearticle);
 
 module.exports = router;