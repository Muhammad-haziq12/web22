import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';



import stormtrooperImage from './img/stormtrooper.jpg';
import images from './img/images.jpg';

const homePage = `
<div class="container text-center">
        <div class="row">
          <div class="col">
            <h3>Welcome to myMovies !</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-lg-6">
            <img class="img-thumbnail" src="${images}" alt="Groot" />
          </div>

          <div class="col-12 col-lg-6">
            <img class="img-thumbnail" src="${stormtrooperImage}" alt="Stormtrooper" />
          </div>
        </div>
</div>`;


const main = document.querySelector('main');
main.innerHTML = homePage;





/*

function renderImage(url){
    const image = new Image();
    image.src = url;
    const main = document.querySelector('main');
    main.appendChild(image);
    
}
*/
