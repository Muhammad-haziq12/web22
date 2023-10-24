const express = require('express');

const {
    readOneFilm,
    readAllmovies,
    updateOneFilm,
    deleteOnefilm,
    createOneFilm
} = require('../models/films');

const router = express.Router();


router.get('/', (req, res) =>{
    const allfilms = readAllmovies();
    return res.json(allfilms);
});

router.get('/:id', (req, res) => {
    const foundmovie = readOneFilm(req.params.id);
  
    if (!foundmovie) return res.sendStatus(404);
  
    return res.json(foundmovie);
  });

  router.post('/', (req, res) => {
    const title =
    req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const link =
    req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0
      ? undefined
      : req.body.budget;
  
    if (!title || !link || !duration || !budget) return res.json('Bad request');
    const createdFilm = createOneFilm(title, duration, budget, link);
    return res.json(createdFilm);
  });

 
  router.delete('/:id', (req, res) => {
    const deletedPizza = deleteOnefilm(req.params.id);
  
    if (!deletedPizza) return res.sendStatus(404);
  
    return res.json(deletedPizza);
  });

  router.patch('/:id', (req, res) => {
    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;

  
    if ((!title && !link && !duration && !budget)) {
      return res.sendStatus(400);
    }
  
    const updatedMovie = updateOneFilm(req.params.id, { title, link, duration, budget });
  
    if (!updatedMovie) return res.sendStatus(404);
  
    return res.json(updatedMovie);
  });






module.exports = router;