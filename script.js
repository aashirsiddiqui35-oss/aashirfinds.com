// ==========================================
// AASHIR FINDS - AFFILIATE JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // ==========================================
    // SEARCH BAR TOGGLE
    // ==========================================
    const searchBtn = document.getElementById('searchBtn');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');

    searchBtn.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            document.getElementById('searchInput').focus();
        }
    });

    searchClose.addEventListener('click', () => {
        searchBar.classList.remove('active');
    });

    // ==========================================
    // FLOATING PARTICLES
    // ==========================================
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Random colors
        const colors = ['#00E5FF', '#A855F7', '#3B82F6', '#EC4899'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.product-card, .category-card, .feature-card, .section-header');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ==========================================
    // ANIMATED COUNTERS
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    // ==========================================
    // COUNTDOWN TIMER
    // ==========================================
    function updateCountdown() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const diff = tomorrow - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // TESTIMONIAL SLIDER
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    // Auto slide
    slideInterval = setInterval(nextSlide, 5000);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    // ==========================================
    // SAVED ITEMS SIDEBAR (replaces Cart)
    // ==========================================
    let savedItems = [];
    const wishlistBtnNav = document.getElementById('wishlistBtnNav');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotal = document.getElementById('cartTotal');
    const savedCount = document.getElementById('savedCount');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function openSavedItems() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSavedItems() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    wishlistBtnNav.addEventListener('click', openSavedItems);
    cartClose.addEventListener('click', closeSavedItems);
    cartOverlay.addEventListener('click', closeSavedItems);

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function updateSavedItems() {
        savedCount.textContent = savedItems.length;
        
        if (savedItems.length === 0) {
            cartItems.innerHTML = '';
            cartItems.appendChild(cartEmpty);
            cartEmpty.style.display = 'block';
            cartTotal.textContent = '0';
        } else {
            cartEmpty.style.display = 'none';
            cartItems.innerHTML = '';
            
            savedItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="images/product${getProductIndex(item.name) + 1}.jpg" alt="${item.name}" class="cart-item-image" onerror="this.src='web2 products/projector.jpg'">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price" style="color: var(--text-muted); font-size: 0.85rem;"><i class="fas fa-clock" style="margin-right: 4px;"></i>Link Coming Soon</div>
                        <div class="cart-item-remove" data-index="${index}"><i class="fas fa-trash"></i> Remove</div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Add remove listeners
            document.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.currentTarget.getAttribute('data-index'));
                    const removedName = savedItems[index].name;
                    savedItems.splice(index, 1);
                    updateSavedItems();
                    showToast(`"${removedName}" removed from saved items`);
                });
            });
            
            cartTotal.textContent = savedItems.length;
        }
    }

    function getProductIndex(name) {
        const products = ['Mini Portable Projector', 'Sunset Projection Lamp', 'Portable Blender Bottle', 
                         'Smart Water Bottle', 'Pocket Thermal Printer', 'Handheld Vacuum Cleaner',
                         'Electric Coffee Mixer', 'Rechargeable Mini Fan', 'Automatic Stirring Mug'];
        return products.indexOf(name);
    }

    // ==========================================
    // AFFILIATE BUTTON (replaces Add to Cart)
    // ==========================================
    document.querySelectorAll('.affiliate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            
            // For now, show "Coming Soon" toast since links aren't added yet
            // Later, you can replace this with: window.open('YOUR_AFFILIATE_LINK', '_blank');
            showToast(`"${product}" - Affiliate link coming soon!`);
            
            // Button animation
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-clock"></i> Soon';
            this.classList.add('added');
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('added');
            }, 2000);
        });
    });

    // ==========================================
    // WISHLIST / SAVE FOR LATER TOGGLE
    // ==========================================
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            const productCard = this.closest('.product-card');
            const productName = productCard.getAttribute('data-product');
            
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                
                // Add to saved items
                if (!savedItems.find(item => item.name === productName)) {
                    savedItems.push({ name: productName });
                    updateSavedItems();
                }
                showToast(`"${productName}" saved for later!`);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                
                // Remove from saved items
                const index = savedItems.findIndex(item => item.name === productName);
                if (index > -1) {
                    savedItems.splice(index, 1);
                    updateSavedItems();
                }
                showToast(`"${productName}" removed from saved`);
            }
        });
    });

    // ==========================================
    // NEWSLETTER FORM
    // ==========================================
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSubmitBtn = document.getElementById('newsletterSubmitBtn');
    const newsletterBtnText = document.getElementById('newsletterBtnText');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        
        // Show loading state
        newsletterSubmitBtn.disabled = true;
        const originalIcon = newsletterSubmitBtn.querySelector('i').className;
        newsletterSubmitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        newsletterBtnText.textContent = 'Sending...';
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            // Reset button
            newsletterSubmitBtn.disabled = false;
            newsletterSubmitBtn.querySelector('i').className = originalIcon;
            
            // Hide form, show success
            newsletterForm.style.display = 'none';
            newsletterSuccess.style.display = 'flex';
            
            showToast('Thanks for subscribing! Check your email.');
            newsletterForm.reset();
        }, 1500);
    });

    // ==========================================
    // SCROLL TO TOP
    // ==========================================
    const scrollTop = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // TRENDING PARTICLES
    // ==========================================
    const trendingParticles = document.getElementById('trendingParticles');
    if (trendingParticles) {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.width = `${Math.random() * 6 + 2}px`;
            p.style.height = p.style.width;
            p.style.background = Math.random() > 0.5 ? '#00E5FF' : '#A855F7';
            p.style.borderRadius = '50%';
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.opacity = '0.4';
            p.style.animation = `float-particle ${Math.random() * 10 + 5}s linear infinite`;
            p.style.animationDelay = `${Math.random() * 5}s`;
            trendingParticles.appendChild(p);
        }
    }

    // ==========================================
    // PARALLAX EFFECT FOR HERO
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.getElementById('heroImage');
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ==========================================
    // CURSOR GLOW EFFECT (Desktop only)
    // ==========================================
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
        `;
        document.body.appendChild(cursorGlow);

        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });
    }

    console.log('🚀 Aashir Finds - Affiliate Site Loaded Successfully!');
});