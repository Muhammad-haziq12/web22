var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

const films = [
  {
    id: 1,
    title: 'Star Wars: The Phantom Menace (Episode I)',
    duration: 136,
    budget: '115',
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
  },
  {
    id: 2,
    title: 'Star Wars: Episode II – Attack of the Clones',
    duration: 142,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
  },
  {
    id: 3,
    title: "Zack Snyder's Justice League",
    duration: 242,
    budget: 70,
    link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
  },
];

// Read all the films
router.get('/', (req, res, next) => {
  
  res.json(films);
});


router.get('/:id', (req, res) => {
  console.log(`GET /Films/${req.params.id}`);
  const filmsjsn = parse(jsonDbPath, films);

  const indexOfMovieFound = filmsjsn.findIndex((movie) => movie.id == req.params.id);

  if (indexOfMovieFound < 0) return res.sendStatus(404);

 return res.json(filmsjsn[indexOfMovieFound]);
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

  console.log('POST /pizzas');

  if (!title || !link || !duration || !budget) return res.json('Bad request');


  const filmsjsn = parse(jsonDbPath, films);
  const lastItemIndex = filmsjsn?.length !== 0 ? filmsjsn.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? filmsjsn[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newMovie = {
    id: nextId, title, link, duration, budget
  };

  filmsjsn.push(newMovie);

  serialize(jsonDbPath, filmsjsn);

  return res.json(newMovie);
});


// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;

  if (minimumFilmDuration === undefined) return res.json(films);

  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.json('Wrong minimum duration'); // bad practise (will be improved in exercise 1.5)

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});



router.delete('/:id', (req, res) =>{
  console.log(`DELETE /films/${req.params.id}`);
  

  const filmsjsn = parse(jsonDbPath, films);
  const fountindex = filmsjsn.findIndex(film => film.id == req.params.id);
  if (fountindex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = filmsjsn.splice(fountindex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  serialize(jsonDbPath, filmsjsn);

  return res.json(itemRemoved);
})

router.patch('/:id', (req, res) =>{
  console.log(`PATCH /films/${req.params.id}`);
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title && !title.trim()) ||
    (link && !link.trim()) ||
    (duration && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

    const filmsjsn = parse(jsonDbPath, films);

    const indexOfFilmFound = filmsjsn.findIndex((film) => film.id == req.params.id);
    if (indexOfFilmFound < 0) return res.sendStatus(404);

  const filmPriorToChange = filmsjsn[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  filmsjsn[indexOfFilmFound] = updatedFilm;

  serialize(jsonDbPath, filmsjsn);

    return res.json(updatedFilm);

})




module.exports = router;