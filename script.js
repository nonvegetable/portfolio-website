document.addEventListener('DOMContentLoaded', () => {
    let typed;
    let particlesInstance;

    // Typed.js effect for intro text
    function initTyped() {
        typed = new Typed('#typed-text', {
            strings: [
                'Pokemon Enthusiast 🌟',
                'Aspiring Code Wizard ☕',
                'Tech Enthusiast',
                'Curious Learner 🔍',
                'Problem Solver in Training 🐛',
                'Future Keyboard Warrior ⌨️',
                'Stack Overflow Explorer 🏆'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections
    const animateSections = (selector, animation) => {
        gsap.utils.toArray(selector).forEach((element) => {
            gsap.from(element, {
                ...animation,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%'
                }
            });
        });
    };

    // Animate fun facts
    animateSections('.fun-fact', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });

    // Animate project cards
    animateSections('.project-card', {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });

    // Particle.js configuration optimized for dark background
    function initParticles() {
        particlesInstance = particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: { enable: true, value_area: 800 }
                },
                color: {
                    value: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6A5ACD']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 4, size_min: 0.3, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4ECDC4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // Initialize everything
    initTyped();
    initParticles();

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            typed.stop();
            particlesInstance.fn.particlesEmpty();
            particlesInstance.fn.canvasClear();
            gsap.globalTimeline.pause();
        } else {
            // Resume animations when tab becomes visible
            typed.start();
            initParticles();
            gsap.globalTimeline.resume();
        }
    });

    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        alert('You found the secret! Here\'s a virtual high five! ✋');
        gsap.to('body', {
            rotation: 360,
            duration: 1,
            ease: 'power2.inOut'
        });
    }
});