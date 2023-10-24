const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

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


  function readAllmovies(){
    const filmsjsn = parse(jsonDbPath, films);
    return filmsjsn; 
  }

  function readOneFilm(id){
    const idnumer = parseInt(id, 10);
    const filmsjsn = parse(jsonDbPath, films);
    // eslint-disable-next-line eqeqeq
    const indexOffilmfound  = filmsjsn.findIndex((film) => film.id === idnumer);
    if(indexOffilmfound < 0) return undefined;

    return filmsjsn[indexOffilmfound];
  }

  function getNextId() {
    const filmsjsn = parse(jsonDbPath, films);
    const lastItemIndex = filmsjsn?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = filmsjsn[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
  }

  function createOneFilm(title, duration, budget, link){

    const createFilm = {
        id : getNextId,
        title,
        duration,
        budget, link,
      };

        films.push(createFilm);

        serialize(jsonDbPath, films);

        return createFilm;
    }

    function deleteOnefilm(id) {
        const idNumber = parseInt(id, 10);
        const filmsjsn = parse(jsonDbPath, films);
        const foundIndex = filmsjsn.findIndex((film) => film.id === idNumber);
        if (foundIndex < 0) return undefined;
        const deletedPizzas = filmsjsn.splice(foundIndex, 1);
        const deletedPizza = deletedPizzas[0];
        serialize(jsonDbPath, filmsjsn);
    
        return deletedPizza;
      }


      function updateOneFilm(id, propertiesToUpdate) {
        const idAsNumber = parseInt(id, 10);
        const filmsjson = parse(jsonDbPath);
        const foundIndex = filmsjson.findIndex((film) => film.id === idAsNumber);
        if (foundIndex < 0) return undefined;
      
        const updatedPizza = { ...filmsjson[foundIndex], ...propertiesToUpdate };
        filmsjson[foundIndex] = updatedPizza;
        serialize(jsonDbPath, filmsjson);
        return updatedPizza;
      }
      
module.exports = {
    readOneFilm,
    readAllmovies,
    updateOneFilm,
    deleteOnefilm,
    createOneFilm
}



