
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/zeb .json');

    
const textedacto = [];

function getNextId() {
    const filmsjsn = parse(jsonDbPath, textedacto);
    const lastItemIndex = filmsjsn?.length !== 0 ? textedacto.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = filmsjsn[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
  }

function readAll(level){
    const txto = parse(jsonDbPath, textedacto);
    if(level === undefined) return txto;
    if(!validatedLevel(level)) return undefined;
    const textsFiltered = txto.filter((text) => text.level === level);
    return textsFiltered;
}

function validatedLevel(level) {
    const existingLevels = ['easy', 'medium', 'hard'];
    return existingLevels.some((existingLevel) => existingLevel === level);
  }

  function readOne(id) {
    const texts = parse(jsonDbPath);
    const indexOfFilmFound = texts.findIndex((text) => text.id === id);
    if (indexOfFilmFound < 0) return undefined;
  
    return texts[indexOfFilmFound];
  }

  function createOne(content, level) {
    const texts = parse(jsonDbPath);
  
    const createdText = {
      id: getNextId(),
      content,
      level,
    };
  
    texts.push(createdText);
  
    serialize(jsonDbPath, texts);
  
    return createdText;
  }


  function deleteOne(id) {
    const texts = parse(jsonDbPath);
    const foundIndex = texts.findIndex((text) => text.id === id);
    if (foundIndex < 0) return undefined;
    const deletedtexts = texts.splice(foundIndex, 1);
    const deletedText = deletedtexts[0];
    serialize(jsonDbPath, texts);
  
    return deletedText;
  }

  function updateOne(id, textProps) {
    const texts = parse(jsonDbPath);
    const indexOfTextFound = texts.findIndex((text) => text.id === id);
  
    if (indexOfTextFound < 0) {
      return undefined;
    }
  
    const textPriorToChange = texts[indexOfTextFound];
  
    const updatedText = {
      ...textPriorToChange,
      ...textProps,
    };
  
    texts[indexOfTextFound] = updatedText;
  
    serialize(jsonDbPath, texts);
  
    return updatedText;
  }

  module.exports = {
    readAll,
    readOne,
    createOne,
    deleteOne,
    updateOne,
    validatedLevel,
  };
  