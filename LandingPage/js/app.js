/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/* ---------- Global Variables ---------- */
const main = document.body.querySelector('main');
const allSections = main.querySelectorAll('section');
const navBar = document.body.querySelector('#navbar__list');
const fragment = document.createDocumentFragment();


/* ---------- Build the Navigation Bar ---------- */
allSections.forEach((currentSection, index) => {
    //Create Elements
    const navItem = document.createElement('li');
    const link = document.createElement('a');
    //Set Anchor Attributes
    link.className = `menu__link`;
    link.href = `#section${index+1}`;
    //Set the Navigation Item text
    link.innerHTML = `${currentSection.getAttribute('data-nav')}`;
    //Append the Elements into the Fragment
    fragment.appendChild(navItem);
    navItem.append(link);
});
//Append the Fragment into the DOM
navBar.appendChild(fragment);


/* ---------- Scroll to Section on link click ---------- */
navBar.querySelectorAll('.menu__link').forEach(currentLink => {
    currentLink.addEventListener('click', event => {
        event.preventDefault();
        main.querySelector(currentLink.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
    });
});


/* ---------- Update the Section active state ---------- */
document.addEventListener('scroll', () => {
    allSections.forEach(currentSection => {
        let sectionTop = currentSection.getBoundingClientRect().top;
        if (sectionTop > 0 && sectionTop < 300) {
            main.querySelector('.your-active-class').removeAttribute('class');
            currentSection.className = 'your-active-class';
        }
    });
});