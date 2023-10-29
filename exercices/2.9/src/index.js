import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';



import stormtrooperImage from './img/stormtrooper.jpg';
import images from './img/images.jpg';

const main = document.querySelector('main');


renderHomepage();

function renderHomepage(){

const homePage = `
<div class="container text-center">
        <div class="row">
          <div class="col">
            <h3>Welcome to myMovies !</h3>
          </div>
        </div>

        <div class="row mb-3">
        <div class="col">
          <button type="button" class="btn btn-dark">About</button>
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

main.innerHTML = homePage;
const button  = document.querySelector('button');
button.addEventListener('click',renderzeb )


}

function renderzeb() {
  const about = `
  <p> MY NAME IS HAZIQ MUHAMMAD </p> 

  <div class="row mb-3">
            <div class="col">
              <button type="button" class="btn btn-dark">Back</button>
            </div>
  </div>   
  `;

  main.innerHTML = about;
  const button = document.querySelector('button');
  button.addEventListener('click', renderHomepage);
  
}













/*

function renderImage(url){
    const image = new Image();
    image.src = url;
    const main = document.querySelector('main');
    main.appendChild(image);
    
}
*/
