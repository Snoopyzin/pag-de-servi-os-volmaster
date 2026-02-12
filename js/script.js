// ===================================
// Mobile Optimizations & Performance
// ===================================
// Detectar se é mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

// Otimizar viewport height para mobile (evitar problemas com barra de endereço)
if (isMobile) {
    const setVH = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

// Desabilitar hover em mobile para melhor performance
if (isMobile) {
    document.body.classList.add('mobile-device');
}

// Prevenir double-tap zoom no iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===================================
// Smooth Scroll
// ===================================
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

// ===================================
// Sidebar Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarClose = document.getElementById('sidebarClose');

menuToggle.addEventListener('click', () => {
    sidebarMenu.classList.add('active');
});

sidebarClose.addEventListener('click', () => {
    sidebarMenu.classList.remove('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebarMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebarMenu.classList.remove('active');
    }
});

// Close sidebar when clicking on a link
document.querySelectorAll('.menu-list a').forEach(link => {
    link.addEventListener('click', () => {
        sidebarMenu.classList.remove('active');
    });
});

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Header Background on Scroll
// ===================================
const header = document.querySelector('.header-main');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ===================================
// News Carousel/Slider Simulation
// ===================================
const dots = document.querySelectorAll('.dot');
const newsCards = document.querySelectorAll('.news-card');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from all dots
        dots.forEach(d => d.classList.remove('active'));
        // Add active class to clicked dot
        dot.classList.add('active');
        
        // Simple animation effect
        newsCards.forEach((card, cardIndex) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, cardIndex * 100);
        });
    });
});

// ===================================
// Product Cards Hover Effect
// ===================================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===================================
// User Type Cards Interaction
// ===================================
const userTypeCards = document.querySelectorAll('.user-type-card');

userTypeCards.forEach(card => {
    // Click/Tap para abrir modal
    card.addEventListener('click', function() {
        const title = this.querySelector('.user-type-title').textContent;
        
        if (title.includes('NOVO')) {
            openUserModal('modalNovo');
        } else if (title.includes('PROFISSIONAL')) {
            openUserModal('modalProfissional');
        }
    });
    
    // Efeito ripple para mobile/touch
    card.addEventListener('touchstart', function(e) {
        this.classList.add('ripple');
        this.classList.add('tapped');
        
        // Vibração háptica (se disponível)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        setTimeout(() => {
            this.classList.remove('ripple');
        }, 600);
    });
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('tapped');
        }, 300);
    });
    
    // Efeito ripple para mouse (desktop)
    card.addEventListener('mousedown', function(e) {
        this.classList.add('ripple');
        
        setTimeout(() => {
            this.classList.remove('ripple');
        }, 600);
    });
    
    // Prevenir scroll acidental durante toque
    card.addEventListener('touchmove', function(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });
});

// Funções para abrir e fechar modais
function openUserModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Scroll para o topo do modal
        setTimeout(() => {
            const modalContent = modal.querySelector('.user-modal-content');
            if (modalContent) {
                modalContent.scrollTop = 0;
            }
        }, 100);
        
        // Vibração ao abrir (mobile)
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }
    }
}

function closeUserModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Vibração leve ao fechar (mobile)
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
}

// Tornar funções globais
window.openUserModal = openUserModal;
window.closeUserModal = closeUserModal;

// Fechar modal ao clicar no overlay
document.querySelectorAll('.user-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
        const modal = this.closest('.user-modal');
        if (modal) {
            closeUserModal(modal.id);
        }
    });
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.user-modal.active').forEach(modal => {
            closeUserModal(modal.id);
        });
    }
});

// User Type Section - Parallax Effect
const userTypeSection = document.querySelector('.user-type-section');
const dividerImage = document.querySelector('.user-types-divider');

// Parallax apenas em desktop
if (userTypeSection && dividerImage && window.innerWidth > 768) {
    userTypeSection.addEventListener('mousemove', (e) => {
        const rect = userTypeSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 30;
        const moveY = (y - centerY) / 30;
        
        dividerImage.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    });
    
    userTypeSection.addEventListener('mouseleave', () => {
        dividerImage.style.transform = 'translate(-50%, -50%)';
    });
}

// Animação de entrada quando seção entra na viewport (mobile-friendly)
const observerUserType = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            
            // Adicionar delay escalonado aos cards
            const cards = entry.target.querySelectorAll('.user-type-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${0.2 + (index * 0.2)}s`;
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-50px'
});

if (userTypeSection) {
    observerUserType.observe(userTypeSection);
}

// Prevenir comportamento padrão de long press no mobile
document.querySelectorAll('.user-type-card').forEach(card => {
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===================================
// News Cards Animation on Scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to news cards
newsCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Apply animation to product cards
productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===================================
// Info Slider Navigation
// ===================================
const sliderLeft = document.querySelector('.slider-arrow.left');
const sliderRight = document.querySelector('.slider-arrow.right');
const infoContent = document.querySelector('.info-content p');

const infoTexts = [
    "Há mais de 14 anos, a Volmaster Tech é referência em treinamento automotivo no Brasil. Oferecemos cursos completos de injeção eletrônica, especialização em diesel e linha pesada, diagnóstico automotivo avançado e muito mais. Nossa missão é formar profissionais de excelência para o mercado automotivo.",
    "Nossa infraestrutura moderna e completa oferece aos alunos acesso a equipamentos de última geração, veículos para prática real e uma equipe de instrutores altamente qualificados e experientes no mercado automotivo.",
    "Com mais de 3 mil alunos formados, a Volmaster Tech está presente em todo o Brasil, oferecendo treinamentos presenciais e online com certificação reconhecida pelo mercado. Invista no seu futuro profissional!"
];

let currentIndex = 0;

sliderRight.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % infoTexts.length;
    updateInfoText();
});

sliderLeft.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + infoTexts.length) % infoTexts.length;
    updateInfoText();
});

function updateInfoText() {
    infoContent.style.opacity = '0';
    setTimeout(() => {
        infoContent.textContent = infoTexts[currentIndex];
        infoContent.style.opacity = '1';
    }, 300);
}

// ===================================
// Newsletter Form (Simulation)
// ===================================
const btnAssinar = document.querySelector('.btn-assinar');

btnAssinar.addEventListener('click', () => {
    const email = prompt('Digite seu e-mail para receber nossa newsletter:');
    if (email && email.includes('@')) {
        alert('Obrigado por se inscrever! Você receberá nossas novidades em breve.');
    } else if (email) {
        alert('Por favor, digite um e-mail válido.');
    }
});

// ===================================
// Login Button (Simulation)
// ===================================
const btnLogin = document.querySelector('.btn-login');

btnLogin.addEventListener('click', () => {
    alert('Área de login em desenvolvimento.\nEm breve você poderá acessar sua área reservada.');
});

// ===================================
// Lista de Aplicativos Button
// ===================================
const btnListaAplicativos = document.querySelector('.btn-lista-aplicativos');

btnListaAplicativos.addEventListener('click', () => {
    alert('Ótimo! Entre em contato conosco:\n\nTelefone: (11) 0000-0000\nWhatsApp: (11) 90000-0000\nE-mail: contato@volmastertech.com.br\n\nHorário de atendimento:\nSegunda a Sexta: 8h às 18h\nSábado: 8h às 12h');
});

// ===================================
// Shopping Cart (Simulation)
// ===================================
const cartIcon = document.querySelector('.header-icons i');
const cartBadge = document.querySelector('.cart-badge');

cartIcon.addEventListener('click', () => {
    alert('Matrícula em desenvolvimento.\nEm breve você poderá se matricular diretamente pelo site!');
});

// ===================================
// Parallax Effect on Hero Section
// ===================================
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// ===================================
// Discover More Button
// ===================================
const btnDiscover = document.querySelector('.btn-discover');

if (btnDiscover) {
    btnDiscover.addEventListener('click', () => {
        const newsSection = document.querySelector('.news-section');
        newsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c� VOLMASTER TECH - Centro de Treinamento Automotivo', 'color: #FDB915; font-size: 20px; font-weight: bold;');
console.log('%cWebsite desenvolvido com tecnologia de ponta', 'color: #fff; font-size: 14px;');

// ===================================
// Hero Logo Animation on Scroll
// ===================================
const heroLogo = document.querySelector('.logo-img');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;
    
    if (scrollPosition < heroHeight) {
        // Parallax effect on logo
        const parallaxValue = scrollPosition * 0.3;
        if (heroLogo) {
            heroLogo.style.transform = `translateY(${parallaxValue}px) scale(${1 - scrollPosition / heroHeight * 0.1})`;
            heroLogo.style.opacity = 1 - (scrollPosition / heroHeight * 0.8);
        }
    }
});

// ===================================
// Scroll Indicator Click Handler
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const newsSection = document.querySelector('.news-section');
        if (newsSection) {
            newsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===================================
// Social Icons Hover Effect Enhancement
// ===================================
const socialIcons = document.querySelectorAll('.social-icon, .social-icon-center');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

// ===================================
// CTA Button Click Effect
// ===================================
if (btnDiscover) {
    btnDiscover.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
            animation: ripple 0.6s;
            pointer-events: none;
        `;
        btnDiscover.style.position = 'relative';
        btnDiscover.style.overflow = 'hidden';
        btnDiscover.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add your action here (e.g., open contact form, redirect, etc.)
        console.log('CTA Button Clicked - Acessar Agenda');
    });
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// ===================================// Auto-slide News Dots
// ===================================
let autoSlideIndex = 0;

function autoSlide() {
    dots.forEach(d => d.classList.remove('active'));
    dots[autoSlideIndex].classList.add('active');
    autoSlideIndex = (autoSlideIndex + 1) % dots.length;
}

// Auto-slide every 5 seconds
setInterval(autoSlide, 5000);

// ===================================
// Video Carousel
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const videoPrev = document.getElementById('videoPrev');
    const videoNext = document.getElementById('videoNext');
    const videoSlides = document.querySelectorAll('.video-slide');
    const carouselDots = document.querySelectorAll('.carousel-dots .dot');
    const slidesPerView = 3; // 3 vídeos por vez no desktop
    const totalSlides = Math.ceil(videoSlides.length / slidesPerView);
    
    console.log('Video carousel initialized');
    console.log('Total video slides:', videoSlides.length);
    console.log('Total pages:', totalSlides);
    console.log('Prev button:', videoPrev);
    console.log('Next button:', videoNext);

    function updateCarousel() {
        const windowWidth = window.innerWidth;
        
        // Skip carousel on mobile
        if (windowWidth < 768) {
            videoSlides.forEach(slide => {
                slide.style.display = 'block';
            });
            return;
        }
        
        console.log('Updating carousel - slide:', currentSlide, 'slidesPerView:', slidesPerView);
        
        // Hide all slides using inline style
        videoSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show slides for current page
        const startIndex = currentSlide * slidesPerView;
        const endIndex = Math.min(startIndex + slidesPerView, videoSlides.length);
        
        console.log('Showing slides from', startIndex, 'to', endIndex - 1);
        
        for (let i = startIndex; i < endIndex; i++) {
            videoSlides[i].style.display = 'block';
            console.log('Showing slide:', i);
        }
        
        // Update dots
        carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        if (videoPrev) videoPrev.disabled = currentSlide === 0;
        if (videoNext) videoNext.disabled = currentSlide === totalSlides - 1;
    }

    if (videoPrev) {
        videoPrev.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Prev clicked, current slide:', currentSlide);
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });
    }

    if (videoNext) {
        videoNext.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Next clicked, current slide:', currentSlide, 'total:', totalSlides);
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateCarousel();
            }
        });
    }

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Responsive adjustments
    function adjustCarousel() {
        updateCarousel();
    }

    // Initialize carousel immediately
    updateCarousel();
    
    // Call on resize
    window.addEventListener('resize', adjustCarousel);
});

// ===================================
// Mobile Optimizations
// ===================================
(function() {
    // Detectar se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Adicionar classe mobile ao body
        document.body.classList.add('is-mobile');
        
        // Otimizar scroll performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    // Código de scroll otimizado
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Prevenir zoom duplo-toque em botões
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Lazy loading para imagens (melhor performance mobile)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observar todas as imagens com data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Melhorar performance de scroll em mobile
    if (isMobile) {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-tap-highlight-color: transparent;
            }
            body {
                -webkit-overflow-scrolling: touch;
                overflow-scrolling: touch;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ajustar altura do viewport em mobile (fix para barra de endereço)
    function setMobileVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    if (isMobile) {
        setMobileVH();
        window.addEventListener('resize', setMobileVH);
        window.addEventListener('orientationchange', setMobileVH);
    }
})();

// ===================================
// FAQ Accordion
// ===================================
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    
    // Fechar todos os outros itens
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-question i');
            const otherButton = item.querySelector('.faq-question');
            
            otherAnswer.classList.remove('active');
            otherButton.classList.add('collapsed');
            otherIcon.classList.remove('fa-minus');
            otherIcon.classList.add('fa-plus');
        }
    });
    
    // Toggle do item atual
    const isActive = answer.classList.contains('active');
    
    if (isActive) {
        answer.classList.remove('active');
        button.classList.add('collapsed');
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    } else {
        answer.classList.add('active');
        button.classList.remove('collapsed');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    }
}

// Inicializar FAQs - primeiro item aberto por padrão
document.addEventListener('DOMContentLoaded', function() {
    const firstFAQ = document.querySelector('.faq-question');
    if (firstFAQ) {
        const firstAnswer = firstFAQ.parentElement.querySelector('.faq-answer');
        firstAnswer.classList.add('active');
    }
});
