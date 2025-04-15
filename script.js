// ========== DOM Elements ==========
// Navigation
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-menu a');
const backToTopBtn = document.getElementById('backToTop');

// Menu
const categoryBtns = document.querySelectorAll('.category-btn');
const menuCategories = document.querySelectorAll('.menu-category');

// Gallery
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Testimonials
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

// Forms
const bookingForm = document.getElementById('bookingForm');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Modal
const confirmationModal = document.getElementById('confirmationModal');
const closeModal = document.querySelector('.close-modal');
const modalBtn = document.querySelector('.modal-btn');
const modalMessage = document.getElementById('modalMessage');

// Download Menu Button
const downloadMenuBtn = document.getElementById('downloadMenuBtn');

// ========== Global Variables ==========
let currentTestimonial = 0;
const testimonialCount = testimonials.length;

// ========== Event Listeners ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize active navigation link
    setActiveNavLink();
    
    // Show back to top button when scrolled down
    window.addEventListener('scroll', handleScroll);
    
    // Navigation toggle for mobile
    navToggle.addEventListener('click', toggleNavbar);
    
    // Close navbar when clicking a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            setActiveNavLink();
        });
    });
    
    // Back to top button click
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Menu category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            changeMenuCategory(btn, category);
        });
    });
    
    // Gallery filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterGallery(btn, filter);
        });
    });
    
    // Testimonial controls
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    
    // Testimonial dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
    });
    
    // Form submissions
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Modal close events
    if (closeModal) {
        closeModal.addEventListener('click', closeConfirmationModal);
    }
    
    if (modalBtn) {
        modalBtn.addEventListener('click', closeConfirmationModal);
    }
    
    // Download menu button
    if (downloadMenuBtn) {
        downloadMenuBtn.addEventListener('click', handleMenuDownload);
    }
    
    // Start auto cycling testimonials
    setInterval(nextTestimonial, 5000);
});

// ========== Functions ==========

// Handle scroll events
function handleScroll() {
    // Header styling on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Set active nav link based on scroll position
    setActiveNavLink();
}

// Set active navigation link based on scroll position
function setActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        
        if (sectionId.charAt(0) === '#' && sectionId !== '#') {
            const section = document.querySelector(sectionId);
            
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        }
    });
}

// Toggle mobile navigation
function toggleNavbar() {
    navbar.classList.toggle('active');
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Change menu category
function changeMenuCategory(clickedBtn, category) {
    // Update active button
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    clickedBtn.classList.add('active');
    
    // Show selected category
    menuCategories.forEach(menuCat => {
        menuCat.classList.remove('active');
        if (menuCat.id === category) {
            menuCat.classList.add('active');
        }
    });
}

// Filter gallery items
function filterGallery(clickedBtn, filter) {
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    clickedBtn.classList.add('active');
    
    // Filter gallery items
    galleryItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Go to previous testimonial
function prevTestimonial() {
    goToTestimonial((currentTestimonial - 1 + testimonialCount) % testimonialCount);
}

// Go to next testimonial
function nextTestimonial() {
    goToTestimonial((currentTestimonial + 1) % testimonialCount);
}

// Go to specific testimonial
function goToTestimonial(index) {
    // Remove active class from current testimonial and dot
    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');
    
    // Update current testimonial index
    currentTestimonial = index;
    
    // Add active class to new testimonial and dot
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

// Handle booking form submission
function handleBookingSubmit(e) {
    e.preventDefault();
    
    // In a real application, this would send data to a server
    // For this frontend-only version, we'll just show a confirmation
    
    modalMessage.textContent = 'Your reservation request has been received. We will contact you shortly to confirm your booking.';
    openConfirmationModal();
    bookingForm.reset();
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    // In a real application, this would send data to a server
    // For this frontend-only version, we'll just show a confirmation
    
    modalMessage.textContent = 'Thank you for your message! We will get back to you as soon as possible.';
    openConfirmationModal();
    contactForm.reset();
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    // In a real application, this would send data to a server
    // For this frontend-only version, we'll just show a confirmation
    
    modalMessage.textContent = 'Thank you for subscribing to our newsletter!';
    openConfirmationModal();
    newsletterForm.reset();
}

// Open confirmation modal
function openConfirmationModal() {
    confirmationModal.classList.add('show');
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Close confirmation modal
function closeConfirmationModal() {
    confirmationModal.classList.remove('show');
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

// Handle menu download
function handleMenuDownload(e) {
    e.preventDefault();
    
    // In a real application, this would download a PDF
    // For this frontend-only version, we'll just show a message
    
    modalMessage.textContent = 'Menu download functionality would be implemented in a backend system. This is a frontend-only demonstration.';
    openConfirmationModal();
}

// Close the modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
        closeConfirmationModal();
    }
});

// Close the navbar when clicking outside of it (for mobile)
window.addEventListener('click', (e) => {
    if (navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        e.target !== navToggle && 
        !navToggle.contains(e.target)) {
        navbar.classList.remove('active');
    }
});
