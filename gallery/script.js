// script.js

const domain = "https://giantblur.com/mrglitch/gallery/images/";
const grid = document.querySelector('#image-grid');

// Initialize Masonry immediately
const msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    percentPosition: true,
    gutter: 15
});

// Fetch the image list from your PHP script
fetch('get-images.php')
    .then(response => response.json())
    .then(imageFiles => {
        imageFiles.forEach(fileName => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            
            const img = document.createElement('img');
            img.src = `${domain}${fileName}`;
            
            div.appendChild(img);
            grid.appendChild(div);

            // Lightbox functionality
            div.addEventListener('click', () => {
                basicLightbox.create(`<img src="${img.src}">`).show();
            });
        });

        // Ensure Masonry refreshes after images load
        imagesLoaded(grid).on('always', function() {
            msnry.reloadItems();
            msnry.layout();
        });
    })
    .catch(error => console.error('Error loading images:', error));

// (Keep the Back-to-Top code from the previous step below this)