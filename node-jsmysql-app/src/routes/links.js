const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res)=> {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const {title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link seved successfully');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list',{links});
});

router.get('/delete/:id', async (req, res)=> {
    console.log(req.params.id);
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE id = ?',[id]);
    req.flash('success', 'Link removed successfully');
    res.redirect('/links');

});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link updated successfully');
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const {title, description, url} = req.body;
    const newLink = {title, description, url};
    await  pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');

});
// mi personalizacion para examenes
router.get('/addquiz', (req, res)=> {
    res.render('links/addquiz');
});

//guardar quiz en base de datos. 
router.post('/addquiz', async (req, res) => {
    const {title,description } = req.body;
    const newQuiz = {
        title,        
        description
    }
    await pool.query('INSERT INTO examen set ?', [newQuiz]);
    req.flash('success', 'Quiz seved successfully');
    res.redirect('/links/quiz');
});

//mostrar todos los examenes guardados   GET /links/quiz

router.get('/links/quiz', async (req, res) => {
    const links = await pool.query('SELECT * FROM examen');
    res.render('/links/quiz',{links});
});

//eliminar un quiz 
router.get('/deletequiz/:id', async (req, res)=> {
    console.log(req.params.id);
    const {id} = req.params;
    await pool.query('DELETE FROM examen WHERE id = ?',[id]);
    req.flash('success', 'Quiz removed successfully');
    res.render('links/quiz');
});


module.exports = router;