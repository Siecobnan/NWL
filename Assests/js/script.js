/* ===================================
   New World Link - Professional JavaScript
   Solutions Numériques et Sécurité IT
   =================================== */

'use strict';

// ============ CONFIGURATION ============
const CONFIG = {
    scrollOffset: 80,
    animationDuration: 300,
    debounceDelay: 100,
    cookieExpireDays: 30
};

// ============ UTILITY FUNCTIONS ============

/**
 * Fonction de debounce pour optimiser les performances
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Vérifier si un élément est visible dans le viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Animation de scroll fluide
 */
function smoothScroll(target, duration = 800) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - CONFIG.scrollOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// ============ HEADER FUNCTIONALITY ============

class HeaderManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.isScrollingDown = false;
        this.init();
    }

    init() {
        if (!this.header) return;

        // Effet de réduction du header au scroll
        window.addEventListener('scroll', debounce(() => {
            this.handleScroll();
        }, CONFIG.debounceDelay));

        // Gestion du menu mobile
        this.setupMobileMenu();
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        // Ajouter une classe quand on scroll
        if (currentScroll > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Détection de la direction du scroll
        if (currentScroll > this.lastScroll && currentScroll > 200) {
            this.isScrollingDown = true;
            this.header.style.transform = 'translateY(-100%)';
        } else {
            this.isScrollingDown = false;
            this.header.style.transform = 'translateY(0)';
        }

        this.lastScroll = currentScroll;
    }

    setupMobileMenu() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        // Créer le bouton hamburger pour mobile
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        
        // Insérer le bouton avant la navigation
        nav.parentNode.insertBefore(menuToggle, nav);

        // Toggle du menu mobile
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Fermer le menu au clic sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ============ SMOOTH SCROLL NAVIGATION ============

class SmoothScrollNav {
    constructor() {
        this.init();
    }

    init() {
        // Gérer les liens d'ancrage
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href.length === 1) return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    smoothScroll(target);
                    
                    // Mettre à jour l'URL sans scroll
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }
}

// ============ SCROLL ANIMATIONS ============

class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Sélectionner tous les éléments à animer
        this.elements = [
            ...document.querySelectorAll('.grid > div'),
            ...document.querySelectorAll('.section')
        ];

        // Observer pour les animations au scroll
        this.setupObserver();
        
        // Vérifier immédiatement les éléments visibles
        this.checkVisibility();
    }

    setupObserver() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        // Observer seulement une fois
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            this.elements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
                observer.observe(el);
            });
        } else {
            // Fallback pour les navigateurs sans IntersectionObserver
            window.addEventListener('scroll', debounce(() => {
                this.checkVisibility();
            }, CONFIG.debounceDelay));
        }
    }

    checkVisibility() {
        this.elements.forEach((el, index) => {
            if (isInViewport(el, 100)) {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 100);
            }
        });
    }
}

// ============ FORMULAIRE DE CONTACT ============

class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
            
            // Validation en temps réel
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        this.validateField(input);
                    }
                });
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Validation selon le type de champ
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'Ce champ est requis';
        } else if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Email invalide';
            }
        } else if (field.type === 'tel' && value !== '') {
            const phoneRegex = /^[0-9\s\-\+\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Numéro de téléphone invalide';
            }
        }

        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }

    showFieldError(field, isValid, message) {
        const errorElement = field.parentElement.querySelector('.error-message') || 
                           this.createErrorElement();
        
        if (!isValid) {
            field.classList.add('error');
            errorElement.textContent = message;
            if (!field.parentElement.querySelector('.error-message')) {
                field.parentElement.appendChild(errorElement);
            }
        } else {
            field.classList.remove('error');
            errorElement.remove();
        }
    }

    createErrorElement() {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
        return error;
    }

    handleSubmit(e, form) {
        e.preventDefault();
        
        // Valider tous les champs
        const fields = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(form);
        } else {
            this.showNotification('Veuillez corriger les erreurs', 'error');
        }
    }

    submitForm(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Désactiver le bouton pendant l'envoi
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
        }

        // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
        setTimeout(() => {
            this.showNotification('Message envoyé avec succès !', 'success');
            form.reset();
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#06D6A0' : type === 'error' ? '#dc3545' : '#3E92CC'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ============ BACK TO TOP BUTTON ============

class BackToTop {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.innerHTML = '↑';
        this.button.setAttribute('aria-label', 'Retour en haut');
        this.button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #3E92CC, #00D9FF);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 20px rgba(0, 217, 255, 0.3);
        `;

        document.body.appendChild(this.button);
    }

    init() {
        // Afficher/masquer le bouton selon le scroll
        window.addEventListener('scroll', debounce(() => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        }, CONFIG.debounceDelay));

        // Scroll vers le haut au clic
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Effet hover
        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'translateY(-5px) scale(1.1)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// ============ PERFORMANCE MONITORING ============

class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Charger les images lazy
        this.lazyLoadImages();
        
        // Précharger les liens importants
        this.prefetchLinks();
    }

    lazyLoadImages() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        } else {
            // Fallback pour les navigateurs sans support natif
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }
    }

    prefetchLinks() {
        const importantLinks = document.querySelectorAll('a[href$=".html"]');
        importantLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = link.href;
                document.head.appendChild(prefetchLink);
            }, { once: true });
        });
    }
}

// ============ EASTER EGG / KONAMI CODE ============

class EasterEgg {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.position = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            
            if (key === this.konamiCode[this.position].toLowerCase()) {
                this.position++;
                
                if (this.position === this.konamiCode.length) {
                    this.activate();
                    this.position = 0;
                }
            } else {
                this.position = 0;
            }
        });
    }

    activate() {
        // Effet visuel surprise
        document.body.style.animation = 'rainbow 2s linear';
        
        // Ajouter l'animation CSS si elle n'existe pas
        if (!document.getElementById('rainbow-animation')) {
            const style = document.createElement('style');
            style.id = 'rainbow-animation';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Message secret
        console.log('🎉 Bravo ! Vous avez trouvé le code secret de New World Link ! 🚀');
        
        // Retirer l'effet après 2 secondes
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
}

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 New World Link - Initialisation...');

    // Initialiser tous les modules
    new HeaderManager();
    new SmoothScrollNav();
    new ScrollAnimations();
    new FormHandler();
    new BackToTop();
    new PerformanceMonitor();
    new EasterEgg();

    console.log('✅ Toutes les fonctionnalités sont chargées !');
});

// ============ ANIMATIONS CSS SUPPLÉMENTAIRES ============

// Ajouter les animations nécessaires au CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    .back-to-top:hover {
        transform: translateY(-5px) scale(1.1) !important;
        box-shadow: 0 8px 30px rgba(0, 217, 255, 0.5) !important;
    }

    .header {
        transition: transform 0.3s ease;
    }

    .header.scrolled {
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    }

    /* Menu Mobile Toggle Button */
    .menu-toggle {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        z-index: 1001;
    }

    .menu-toggle span {
        width: 25px;
        height: 3px;
        background: white;
        border-radius: 3px;
        transition: all 0.3s ease;
    }

    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(7px, 7px);
    }

    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: flex;
        }

        .nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            max-width: 300px;
            height: 100vh;
            background: linear-gradient(135deg, #0A2463 0%, #0D1B2A 100%);
            flex-direction: column;
            padding: 5rem 2rem 2rem;
            transition: right 0.3s ease;
            box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
        }

        .nav.active {
            right: 0;
        }

        .nav a {
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    }

    body.menu-open {
        overflow: hidden;
    }

    /* Styles pour les champs de formulaire avec erreur */
    input.error,
    textarea.error {
        border-color: #dc3545 !important;
        background-color: #fff5f5 !important;
    }
`;

document.head.appendChild(styleSheet);