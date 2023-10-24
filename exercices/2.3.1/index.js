const form = document.querySelector('form');
const wish = document.querySelector('#wish');
const messageDiv = document.querySelector('#message');

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    form.style.display = 'none';
    messageDiv.innerHTML =  `Your current wish is :
    ${wish.value}`;
})