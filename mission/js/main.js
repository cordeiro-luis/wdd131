
let selectElem = document.querySelector('#select');
let logo = document.querySelector('#logo');

selectElem.addEventListener('change', changeTheme);



// This does not feel right, css should control presentation not the js. I saw a toggle method in the video and I had an idea.
// (...a few reading later) This is a select, so I opted for an add and remove off the dark mode; the toggle does not quite work,
// if the user selects light first; meaning, I would have to add code to evaluate the current state of the page, and then add or remove
// the dark mode class accordingly. Too much work.

// the original code is still below

/*
function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        // to make the subheading look better in dark mode
        document.getElementById('subheading').style.color = '#6fb4e9';
        logo.setAttribute('src', 'images/byui-logo-white.png');
    } else if (current == 'light') { 
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        document.getElementById('subheading').style.color = '#035f9c';
        logo.setAttribute('src', 'images/byui-logo-blue.webp');

    } else {
        // do nothing, let the user pick an explicit option, and keep the last option active
    }

}           
*/

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        document.body.classList.add('dark-mode');
        logo.src = 'images/byui-logo-white.png';
    } else if (current == 'light') { 
        document.body.classList.remove('dark-mode');
        logo.src = 'images/byui-logo-blue.webp';
    } else {
        // do nothing, let the user pick an explicit option, and keep the last option active
    }

} 