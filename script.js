document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 1000);
    }, 2000);

    // Scroll reveal animations
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    sr.reveal('.about .section-container', { origin: 'left' });
    sr.reveal('.socials .section-container', { origin: 'right' });
    sr.reveal('.gallery .section-container', { origin: 'left' });
    sr.reveal('.disclaimer .section-container', { origin: 'right' });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const header = document.querySelector('header');
        header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Gallery item hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(212, 175, 55, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
    });

    // Social card hover effect
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(212, 175, 55, 0.2)';
            this.style.borderColor = '#D4AF37';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
            this.style.borderColor = 'transparent';
        });
    });

    // Title animation
    const title = document.querySelector('.title-animation');
    setInterval(() => {
        title.style.textShadow = `0 0 ${10 + Math.random() * 10}px rgba(212, 175, 55, ${0.3 + Math.random() * 0.3})`;
    }, 1000);
});

// Simple ScrollReveal implementation for compatibility
function ScrollReveal(options) {
    const defaults = {
        origin: 'bottom',
        distance: '20px',
        duration: 500,
        delay: 0,
        reset: false
    };

    const config = { ...defaults, ...options };

    return {
        reveal: function(selector, customConfig = {}) {
            const elements = document.querySelectorAll(selector);
            const finalConfig = { ...config, ...customConfig };

            elements.forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transition = `all ${finalConfig.duration}ms ease ${finalConfig.delay + (i * 100)}ms`;
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translate(0)';
                            if (!finalConfig.reset) {
                                observer.unobserve(entry.target);
                            }
                        } else if (finalConfig.reset) {
                            entry.target.style.opacity = '0';
                            entry.target.style.transform = getTransform(finalConfig.origin, finalConfig.distance);
                        }
                    });
                }, { threshold: 0.1 });

                el.style.transform = getTransform(finalConfig.origin, finalConfig.distance);
                observer.observe(el);
            });
        }
    };

    function getTransform(origin, distance) {
        switch(origin) {
            case 'top': return `translateY(-${distance})`;
            case 'bottom': return `translateY(${distance})`;
            case 'left': return `translateX(-${distance})`;
            case 'right': return `translateX(${distance})`;
            default: return `translateY(${distance})`;
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // ... (código anterior permanece igual)
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDesc = document.querySelector('.lightbox-desc');
    const imageCounter = document.querySelector('.image-counter');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentImageIndex = 0;
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(-1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        } else if (e.key === 'ArrowRight') {
            navigate(1);
        }
    });
    
    function navigate(direction) {
        currentImageIndex += direction;
        
        // Circular navigation
        if (currentImageIndex >= galleryItems.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = galleryItems.length - 1;
        }
        
        updateLightbox();
    }
    
    function updateLightbox() {
        const activeItem = galleryItems[currentImageIndex];
        const imgSrc = activeItem.querySelector('.image-container').style.backgroundImage
            .replace('url("', '').replace('")', '');
        const title = activeItem.querySelector('.image-title').textContent;
        const desc = activeItem.querySelector('.image-desc').textContent;
        
        lightboxImage.src = imgSrc;
        lightboxImage.alt = title;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        imageCounter.textContent = `${currentImageIndex + 1} / ${galleryItems.length}`;
    }
});