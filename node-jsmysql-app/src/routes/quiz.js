const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/quiz', async (req, res) => {
    const quiz = await pool.query('SELECT * FROM examen');
    //res.send('recibido');
    res.render('quiz/quiz',{quiz});
});
//agregar quiz
router.post('/quiz/add', async(req, res)=>{
    const {title, description} = req.body;
    const newQuiz = {title, description}
    await pool.query('INSERT INTO examen set ?', [newQuiz]);
    req.flash('success', 'Quiz added successfully');
    res.redirect('/quiz');

});
//eliminar un cuestionario 
router.get('/quiz/delete/:id', async (req, res) =>{
    console.log(req.params.id);
    const {id } = req.params;
    await pool.query('DELETE FROM examen WHERE id = ?', [id]);
    req.flash('success', 'quiz removed successfully');
    res.redirect('/quiz');
});

//agregar cuestioinario.
router.get('/quiz/add', (req, res) =>{
    res.render('quiz/add');
});

//editar cuestionario. 
router.get('/quiz/edit/:id', async (req,res)=> {
    const {id} = req.params;
    const quiz = await pool.query('SELECT * FROM examen WHERE id = ?', [id]);
    res.render('quiz/edit', {quiz:quiz[0]});
});
router.post('/quiz/edit/:id', async (req, res)=> {
    const {id} = req.params;
    const quiz = {title, description} = req.body;
    await pool.query('UPDATE examen set ? WHERE id = ?', [quiz, id]);
    req.flash('success', 'Quiz Updated Successfully');
    res.redirect('/quiz');
});


module.exports = router;