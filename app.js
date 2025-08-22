// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initScrollAnimations();
    initNavigation();
    initContactFunctionality();
    initParallaxEffect();
    initScrambleTextEffect();
    initDynamicBackground();
    initEnhancedInteractions();
    addScrollProgress();
    initProfileImageEffects();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Email functionality - Global function
function openEmail() {
    const email = 'junaidmohammad232@gmail.com';
    const subject = 'Hello Mohammed! Let\'s connect';
    const body = 'Hi Mohammed,\n\nI came across your portfolio and would love to discuss potential opportunities.\n\nBest regards,';
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    
    // Add success animation
    const emailCard = document.getElementById('email-card');
    if (emailCard) {
        emailCard.style.transform = 'scale(1.08) translateY(-8px)';
        setTimeout(() => {
            emailCard.style.transform = '';
        }, 300);
    }
}

// Phone functionality - Global function
function showPhone() {
    const phoneDisplay = document.getElementById('phone-number');
    const phoneCard = document.getElementById('phone-card');
    
    if (phoneDisplay && phoneCard) {
        if (phoneDisplay.classList.contains('show')) {
            phoneDisplay.classList.remove('show');
        } else {
            phoneDisplay.classList.add('show');
            
            // Add success animation
            phoneCard.style.transform = 'scale(1.08) translateY(-8px)';
            setTimeout(() => {
                phoneCard.style.transform = '';
            }, 300);
        }
    }
}

// Enhanced Scramble Text Effect for Hero Subtitle
function initScrambleTextEffect() {
    const animatedText = document.querySelector('.animated-text');
    if (!animatedText) return;
    
    const originalText = animatedText.textContent;
    const scrambleChars = 'ₓ∀ⱼ€£¥₹₽₨₩♠♣♥♦αβγδεζηθικλμνξπρσταυφχψωАБВГДЕЖИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ你好こんにちは안녕하세요مرحباสวัสดีοχάρειꚳꚨꚩꚭ';
    
    // Wait for hero name animation to complete
    setTimeout(() => {
        startScrambleAnimation(animatedText, originalText, scrambleChars);
    }, 1200);
}

function startScrambleAnimation(element, targetText, scrambleChars) {
    const duration = 2000; // 2 seconds total animation
    const iterations = 50; // Number of scramble iterations
    const iterationDuration = duration / iterations;
    
    let currentIteration = 0;
    
    const scrambleInterval = setInterval(() => {
        let displayText = '';
        
        for (let i = 0; i < targetText.length; i++) {
            if (targetText[i] === ' ') {
                displayText += ' ';
                continue;
            }
            
            // Calculate progress for each character
            const characterProgress = Math.max(0, (currentIteration / iterations) - (i * 0.02));
            
            if (characterProgress >= 1) {
                // Character is fully resolved
                displayText += targetText[i];
            } else if (characterProgress > 0) {
                // Character is partially resolved (mix of scramble and target)
                if (Math.random() > characterProgress) {
                    displayText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                } else {
                    displayText += targetText[i];
                }
            } else {
                // Character is still scrambled
                displayText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
        }
        
        element.textContent = displayText;
        element.classList.add('scramble');
        
        currentIteration++;
        
        if (currentIteration >= iterations) {
            clearInterval(scrambleInterval);
            element.textContent = targetText;
            element.classList.remove('scramble');
        }
    }, iterationDuration);
}

// Enhanced Profile Image Effects
function initProfileImageEffects() {
    const profileWrapper = document.querySelector('.profile-image-wrapper');
    const profileImage = document.querySelector('.profile-image');
    const bubbles = document.querySelectorAll('.bubble');
    
    if (!profileWrapper || !profileImage) return;
    
    // Enhanced hover effect for profile image
    profileWrapper.addEventListener('mouseenter', function() {
        profileImage.style.transform = 'scale(1.15)';
        profileImage.style.boxShadow = '0 20px 60px rgba(6, 182, 212, 0.6)';
        
        // Activate bubbles
        bubbles.forEach((bubble, index) => {
            bubble.style.opacity = '1';
            bubble.style.animationDuration = '2s';
            bubble.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    profileWrapper.addEventListener('mouseleave', function() {
        profileImage.style.transform = '';
        profileImage.style.boxShadow = '';
        
        // Deactivate bubbles
        bubbles.forEach(bubble => {
            bubble.style.opacity = '0';
            bubble.style.animationDuration = '4s';
        });
    });
    
    // Add click effect
    profileWrapper.addEventListener('click', function() {
        profileImage.style.transform = 'scale(1.25)';
        setTimeout(() => {
            profileImage.style.transform = profileWrapper.matches(':hover') ? 'scale(1.15)' : '';
        }, 200);
    });
}

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToObserve = document.querySelectorAll([
        '.about-card',
        '.interests-card', 
        '.skills-card',
        '.contact-card',
        '.social-card',
        '.project-card',
        '.experience-card',
        '.education-card',
        '.resume-button'
    ].join(', '));
    
    elementsToObserve.forEach(el => {
        if (el) observer.observe(el);
    });
    
    // Stagger animations for different card types
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    const aboutCards = document.querySelectorAll('.about-card, .interests-card, .skills-card');
    aboutCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Special staggered animation for interest tags and skill items
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';
        tag.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        tag.style.transitionDelay = `${index * 0.05}s`;
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
        }, 1000 + index * 50);
    });
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.8)';
        item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        item.style.transitionDelay = `${index * 0.05}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, 1200 + index * 50);
    });
}

// Enhanced Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.glass-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!nav) return;
    
    // Enhanced scroll effect for navigation
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.12)';
            nav.style.backdropFilter = 'blur(25px)';
            nav.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.08)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }
        
        // Hide/show nav on scroll (mobile only)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateX(-50%) translateY(-100px)';
                nav.style.opacity = '0';
            } else {
                nav.style.transform = 'translateX(-50%) translateY(0)';
                nav.style.opacity = '1';
            }
        }
        
        lastScrollY = currentScrollY;
        updateActiveNavLink();
    });
    
    // Enhanced navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = link.getAttribute('href');
            
            if (targetId) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Add click animation to nav link
                    this.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    // Smooth scroll to target
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL hash
                    setTimeout(() => {
                        window.location.hash = targetId;
                    }, 100);
                }
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Contact functionality
function initContactFunctionality() {
    // Make functions globally available
    window.openEmail = openEmail;
    window.showPhone = showPhone;
    
    // Enhanced resume button functionality
    const resumeButton = document.querySelector('.resume-button');
    if (resumeButton) {
        resumeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Enhanced click animation
            this.style.transform = 'translateY(-2px) scale(1.08)';
            this.style.boxShadow = '0 20px 60px rgba(147, 51, 234, 0.5)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 200);
            
            // Open resume in new tab
            const resumeUrl = this.getAttribute('href') || 'Mohammed-Junaid-Resume.pdf';
            const newWindow = window.open(resumeUrl, '_blank', 'noopener,noreferrer');
            
            // Fallback if popup blocked
            if (!newWindow) {
                const link = document.createElement('a');
                link.href = resumeUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }
    
    // Enhanced CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Enhanced Parallax effect for dynamic background
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    const lines = document.querySelectorAll('.line');
    
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollProgress = scrollY / (documentHeight - windowHeight);
        
        // Enhanced parallax for shapes
        shapes.forEach((shape, index) => {
            const speed = 0.15 + (index * 0.05);
            const yPos = -(scrollY * speed);
            const rotation = scrollY * (0.05 + index * 0.01);
            const scale = 1 + (scrollProgress * 0.2);
            
            shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg) scale(${scale})`;
        });
        
        // Enhanced parallax for flowing lines
        lines.forEach((line, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrollY * speed);
            
            line.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Enhanced Dynamic Background with Color Shifts
function initDynamicBackground() {
    const shapes = document.querySelectorAll('.shape');
    let colorPhase = 0;
    
    function updateColors() {
        shapes.forEach((shape, index) => {
            const hue1 = (colorPhase + index * 60) % 360;
            const hue2 = (hue1 + 60) % 360;
            const saturation = 70 + Math.sin(colorPhase * 0.01) * 10;
            const lightness = 60 + Math.cos(colorPhase * 0.01 + index) * 5;
            
            shape.style.background = `linear-gradient(135deg, 
                hsl(${hue1}, ${saturation}%, ${lightness}%), 
                hsl(${hue2}, ${saturation}%, ${lightness}%))`;
        });
        
        colorPhase += 0.5;
    }
    
    // Update colors every 100ms for smooth transitions
    setInterval(updateColors, 100);
    
    // Add scroll-based color intensity
    window.addEventListener('scroll', () => {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const intensity = 0.5 + (scrollProgress * 0.3);
        
        shapes.forEach(shape => {
            shape.style.opacity = intensity;
        });
    });
}

// Enhanced Interactivity for ALL Elements
function initEnhancedInteractions() {
    
    // Universal hover effects for glass elements
    const allGlassElements = document.querySelectorAll('.glass-element, .interest-tag, .skill-item, .tech-tag, .feature');
    
    allGlassElements.forEach(element => {
        if (!element.classList.contains('processed-hover')) {
            element.classList.add('processed-hover');
            
            element.addEventListener('mouseenter', function() {
                if (!this.style.transform.includes('scale')) {
                    this.style.transform += ' scale(1.05) translateY(-4px)';
                }
                this.style.background = 'rgba(255, 255, 255, 0.12)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.25)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.05) translateY(-4px)', '');
                this.style.background = '';
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        }
    });
    
    // Enhanced button interactions with ripple effect
    const allButtons = document.querySelectorAll('button, .cta-button, .resume-button, .project-button, a[class*="button"]');
    
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // Enhanced card interactions
    const allCards = document.querySelectorAll('.project-card, .about-card, .interests-card, .skills-card, .contact-card, .social-card, .experience-card, .education-card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Magnetic effect for important buttons
    const magneticButtons = document.querySelectorAll('.resume-button, .cta-button, .contact-button');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Enhanced scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, 
            var(--accent-purple), 
            var(--accent-pink), 
            var(--accent-cyan), 
            var(--accent-blue));
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(147, 51, 234, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    let ticking = false;
    
    function updateProgress() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
        
        // Add glow effect when scrolling
        if (scrollProgress > 0) {
            progressBar.style.boxShadow = '0 2px 20px rgba(147, 51, 234, 0.6)';
        } else {
            progressBar.style.boxShadow = '0 2px 10px rgba(147, 51, 234, 0.3)';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    });
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    const sections = ['home', 'about', 'projects', 'contact'];
    let currentIndex = -1;
    
    // Find current section
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
                currentIndex = index;
            }
        }
    });
    
    if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        e.preventDefault();
        const nextSection = document.getElementById(sections[currentIndex + 1]);
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        const prevSection = document.getElementById(sections[currentIndex - 1]);
        if (prevSection) {
            prevSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add enhanced CSS animations
const enhancedAnimationStyle = document.createElement('style');
enhancedAnimationStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        color: var(--color-primary) !important;
        background: var(--glass-hover-bg) !important;
        transform: scale(1.05) !important;
    }
    
    /* Enhanced bubble animations */
    @keyframes bubbleFloat {
        0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
        }
        25% {
            transform: translateY(-15px) translateX(8px) scale(1.1);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-25px) translateX(15px) scale(1.3);
            opacity: 1;
        }
        75% {
            transform: translateY(-20px) translateX(-5px) scale(1.2);
            opacity: 0.9;
        }
    }
    
    /* Ensure sections are accessible */
    section {
        scroll-margin-top: 100px;
    }
    
    /* Enhanced glass effects */
    .glass-element {
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
    }
    
    /* Special effects for skill items and interest tags */
    .interest-tag:hover, .skill-item:hover {
        transform: scale(1.1) translateY(-2px) !important;
        background: var(--glass-hover-bg) !important;
        color: var(--color-primary) !important;
    }
    
    .skill-item::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent-gradient-2);
        transform: scaleX(0);
        transition: transform var(--duration-normal) ease;
    }
    
    .skill-item:hover::after {
        transform: scaleX(1);
    }
    
    /* Profile image enhancements */
    .profile-image {
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: visible;
    }
    
    .profile-image::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: conic-gradient(
            var(--accent-cyan),
            var(--accent-blue),
            var(--accent-purple),
            var(--accent-pink),
            var(--accent-cyan)
        );
        border-radius: var(--radius-full);
        opacity: 0;
        transition: opacity var(--duration-normal) ease;
        z-index: -1;
        animation: rotate 3s linear infinite;
    }
    
    .profile-image-wrapper:hover .profile-image::before {
        opacity: 0.6;
    }
    
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    /* Enhanced text scramble effect */
    .scramble {
        font-family: 'Courier New', monospace;
        letter-spacing: 1px;
    }
`;
document.head.appendChild(enhancedAnimationStyle);