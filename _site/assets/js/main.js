// TakeAway Pro - Main JavaScript
// Minimal vanilla JS for performance and micro-interactions

(function() {
    'use strict';

    // Performance monitoring
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
            if (entry.entryType === 'first-input') {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }
    });

    if (typeof PerformanceObserver !== 'undefined') {
        perfObserver.observe({entryTypes: ['largest-contentful-paint', 'first-input']});
    }

    // Lazy loading fallback for older browsers
    function lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-placeholder');
                        img.classList.add('fade-in-up');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Enhanced hover effects for cards
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.product-card, .card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
            });
        });
    }

    // Animate elements on scroll
    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.product-card, .card').forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    // Preload critical resources
    function preloadCriticalResources() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;900&display=swap';
        fontLink.as = 'style';
        fontLink.onload = function() {
            this.onload = null;
            this.rel = 'stylesheet';
        };
        document.head.appendChild(fontLink);
    }

    // Image format detection and optimization
    function optimizeImages() {
        // Check for WebP support
        function supportsWebP() {
            return new Promise(resolve => {
                const webP = new Image();
                webP.onload = webP.onerror = () => resolve(webP.height === 2);
                webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            });
        }

        // Check for AVIF support
        function supportsAVIF() {
            return new Promise(resolve => {
                const avif = new Image();
                avif.onload = avif.onerror = () => resolve(avif.height === 2);
                avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
            });
        }

        // Apply optimal image format
        Promise.all([supportsWebP(), supportsAVIF()]).then(([webp, avif]) => {
            document.querySelectorAll('img').forEach(img => {
                if (img.dataset.src) {
                    let src = img.dataset.src;
                    if (avif && src.includes('.jpg')) {
                        src = src.replace('.jpg', '.avif');
                    } else if (webp && src.includes('.jpg')) {
                        src = src.replace('.jpg', '.webp');
                    }
                    img.dataset.src = src;
                }
            });
        });
    }

    // Mobile menu toggle (if needed)
    function initMobileMenu() {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.header__nav');
        
        if (window.innerWidth <= 768 && nav) {
            const menuButton = document.createElement('button');
            menuButton.className = 'header__menu-toggle';
            menuButton.innerHTML = '☰';
            menuButton.style.cssText = `
                background: none;
                border: 3px solid #111111;
                font-size: 1.5rem;
                padding: 0.5rem;
                cursor: pointer;
                font-weight: bold;
            `;
            
            header.querySelector('.header__container').appendChild(menuButton);
            
            menuButton.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.backgroundColor = '#FFFFFF';
                nav.style.border = '3px solid #111111';
                nav.style.borderTop = 'none';
                nav.style.flexDirection = 'column';
                nav.style.padding = '1rem';
            });
        }
    }

    // Initialize all functionality
    function init() {
        // Core functionality
        lazyLoadImages();
        initSmoothScroll();
        initCardHoverEffects();
        initScrollAnimations();
        optimizeImages();
        
        // Performance optimizations
        preloadCriticalResources();
        
        // Responsive features
        initMobileMenu();
        
        // Re-initialize on resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                initMobileMenu();
            }, 250);
        });
    }

    // DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for debugging
    window.TakeAwayPro = {
        init,
        lazyLoadImages,
        initSmoothScroll,
        initCardHoverEffects,
        initScrollAnimations
    };

})();

