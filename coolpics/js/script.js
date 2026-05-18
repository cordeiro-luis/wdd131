// Select all relevant elements

const gallery = document.querySelector('#pic-gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

const btn = document.querySelector("#menu-btn");
const menu = document.querySelector("nav");


function ToggleMenu() {
    menu.classList.toggle("open");
}

function openModal(e) {
    console.log(e.target);

    const img = e.target;
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');

    // If the clicked element doesn't have a src, exit the function,
    // this prevents errors when clicking on non-image elements in the gallery
    if (!src) return;

    const full = src.replace('sm', 'full');
    modalImage.src = full;
    modalImage.alt = alt;
    modal.showModal();
}

// Event listener for the menu button
btn.addEventListener("click", ToggleMenu);


// Event listener for opening the modal
gallery.addEventListener('click', openModal);


// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

