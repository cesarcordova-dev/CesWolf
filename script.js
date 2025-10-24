// Datos de las categorías
const categories = {
    deportes: ['https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800','https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800','https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800','https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800'],
    book: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800','https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800'],
    retrato: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800','https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800'],
    editorial: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800','https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800'],
    alimentos: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800','https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800'],
    arquitectura: ['https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800','https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800'],
    street: ['https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800','https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'],
    fineart: ['https://images.unsplash.com/photo-1518991043280-1da0c82f93c6?w=800','https://images.unsplash.com/photo-1549887534-1541e9326642?w=800'],
    naturaleza: ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800']
};

let currentCategory = '';
let currentImageIndex = 0;
let currentImages = [];
let isZoomed = false;

const homeSection = document.querySelector('.hero');
const galleryGrid = document.querySelector('.gallery-grid');
const photoGallery = document.querySelector('.photo-gallery');
const scrollTopBtn = document.querySelector('.scroll-top');
const categoryTransition = document.querySelector('.category-transition');
const aboutPage = document.getElementById('about');
const contactPage = document.getElementById('contact');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');

function hideAllSections() {
    homeSection.style.display = 'none';
    galleryGrid.style.display = 'none';
    photoGallery.classList.add('hidden');
    aboutPage.classList.add('hidden');
    contactPage.classList.add('hidden');
}

function showPage(page) {
    hideAllSections();
    if (page === 'about') aboutPage.classList.remove('hidden');
    else if (page === 'contact') contactPage.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        showCategoryTransition(category);
    });
});

function showCategoryTransition(category) {
    const title = category.charAt(0).toUpperCase() + category.slice(1);
    categoryTransition.querySelector('.transition-title').textContent = title.toUpperCase();
    categoryTransition.classList.add('active');
    setTimeout(() => {
        categoryTransition.classList.remove('active');
        showGallery(category);
    }, 1000);
}

function showGallery(category) {
    currentCategory = category;
    hideAllSections();
    photoGallery.classList.remove('hidden');
    const title = category === 'alimentos' ? 'ALIMENTOS Y BEBIDAS' : category === 'naturaleza' ? 'NATURALEZA Y PAISAJE' : category.toUpperCase();
    photoGallery.querySelector('.gallery-title').textContent = title;
    const photosGrid = photoGallery.querySelector('.photos-grid');
    photosGrid.innerHTML = '';
    currentImages = categories[category];
    categories[category].forEach((imgUrl, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `<img src="${imgUrl}" alt="${category}">`;
        photoItem.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(imgUrl);
        });
        photosGrid.appendChild(photoItem);
    });
    renderOtherWorks(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderOtherWorks(currentCat) {
    const otherWorksGrid = photoGallery.querySelector('.other-works-grid');
    otherWorksGrid.innerHTML = '';
    const otherCategories = Object.keys(categories).filter(cat => cat !== currentCat);
    const shuffled = otherCategories.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 3);
    selected.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'other-work-item';
        item.dataset.category = cat;
        const label = cat === 'alimentos' ? 'ALIMENTOS Y BEBIDAS' : cat === 'naturaleza' ? 'NATURALEZA Y PAISAJE' : cat.toUpperCase();
        item.innerHTML = `<img src="${categories[cat][0]}" alt="${cat}"><div class="work-label">${label}</div>`;
        item.addEventListener('click', () => showCategoryTransition(cat));
        otherWorksGrid.appendChild(item);
    });
}

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('.logo').addEventListener('click', () => {
    hideAllSections();
    homeSection.style.display = 'flex';
    galleryGrid.style.display = 'grid';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) {
            showPage(page);
        } else {
            hideAllSections();
            homeSection.style.display = 'flex';
            galleryGrid.style.display = 'grid';
            setTimeout(() => {
                const gallerySection = document.getElementById('gallery');
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = gallerySection.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }, 50);
        }
    });
});

document.getElementById('contactBtn').addEventListener('click', () => showPage('contact'));

document.getElementById('scrollDown').addEventListener('click', () => {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
});

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    isZoomed = false;
}

function closeLightbox() {
    lightbox.classList.remove('active');
    isZoomed = false;
    lightboxImg.classList.remove('zoomed');
}

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

lightboxImg.addEventListener('click', () => {
    isZoomed = !isZoomed;
    lightboxImg.classList.toggle('zoomed');
});

lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentImageIndex];
    isZoomed = false;
    lightboxImg.classList.remove('zoomed');
});

lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    lightboxImg.src = currentImages[currentImageIndex];
    isZoomed = false;
    lightboxImg.classList.remove('zoomed');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});