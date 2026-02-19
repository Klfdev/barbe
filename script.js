const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Counter
let counter = 1;
let size;

// Wait for images to load to get correct width & Hide Preloader
window.addEventListener('load', () => {
    // Hide Preloader
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';

    // Carousel Logic
    size = carouselImages[0].clientWidth;
    // Initial transform to show first actual image (not clone)
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

// Listen for resize to adjust size
window.addEventListener('resize', () => {
    if (!size) return; // Guard against resizing before load
    size = carouselImages[0].clientWidth;
    carouselSlide.style.transition = 'none'; // Disable transition on resize to prevent weird jumping
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

// Button Listeners
nextBtn.addEventListener('click', () => {
    if (!size) return;
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
    if (!size) return;
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

// Loop Logic
carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});

// Auto Play
setInterval(() => {
    if (!size) return;
    if (counter >= carouselImages.length - 1) {
        // Reset logic handled in transitionend
    }
    if (counter < carouselImages.length - 1) {
        carouselSlide.style.transition = "transform 0.4s ease-in-out";
        counter++;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
}, 5000);

// Mobile Menu Toggle (Basic)
const menuIcon = document.getElementById('mobile-menu-icon');
const navList = document.querySelector('.nav-list');

menuIcon.addEventListener('click', () => {
    if (navList.style.display === 'flex') {
        navList.style.display = 'none';
        // Reset inline styles so CSS media query can take over if resized
        navList.style.removeProperty('flex-direction');
        navList.style.removeProperty('position');
        navList.style.removeProperty('top');
        navList.style.removeProperty('left');
        navList.style.removeProperty('width');
        navList.style.removeProperty('background-color');
        navList.style.removeProperty('padding');
    } else {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
        navList.style.position = 'absolute';
        navList.style.top = '70px';
        navList.style.left = '0';
        navList.style.width = '100%';
        navList.style.backgroundColor = 'rgba(18,18,18,0.95)';
        navList.style.padding = '20px';
    }
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach(el => {
    observer.observe(el);
});

// Cursor Logic
const cursor = document.querySelector('.cursor');

if (cursor) {
    document.addEventListener('mousemove', e => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
    });

    // Hover effect for links and buttons
    const hoverables = document.querySelectorAll('a, button, .service-card, .testimonial-card, .carousel-slide');

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('grow');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('grow');
        });
    });
}
