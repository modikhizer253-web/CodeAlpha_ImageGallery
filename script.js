// Get elements
const gallery = document.querySelector('.gallery');
const images = Array.from(gallery.querySelectorAll('img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let filteredImages = images; // Start with all images

// Open lightbox
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = filteredImages[currentIndex].src;
    lightboxImg.alt = filteredImages[currentIndex].alt;
    lightbox.classList.add('show');
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('show');
}

// Navigate to next/prev
function navigate(direction) {
    currentIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length;
    lightboxImg.src = filteredImages[currentIndex].src;
    lightboxImg.alt = filteredImages[currentIndex].alt;
}

// Filter images
function filterImages(category) {
    filteredImages = category === 'all' ? images : images.filter(img => img.dataset.category === category);
    images.forEach(img => img.classList.toggle('hidden', !filteredImages.includes(img)));
    filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));
}

// Event listeners
images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigate(-1));
nextBtn.addEventListener('click', () => navigate(1));

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterImages(btn.dataset.category));
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'Escape') closeLightbox();
});

// Close on outside click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});