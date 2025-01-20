document.addEventListener('DOMContentLoaded', () => {
    let typed;
    let particlesInstance;

    // Typed.js effect for intro text
    function initTyped() {
        typed = new Typed('#typed-text', {
            strings: [
                'Football Tactician ⚽',
                'Code Adventurer 💻',
                'History Buff 🏛️',
                'Geography Explorer 🌍',
                'One Piece Pirate at Heart 🏴‍☠️',
                'Guitar Strummer 🎸',
                'Future Tech Innovator 🚀',
                'Curious Mind Always Learning 🔍'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // Portfolio Easter Egg
    const portfolioLink = document.querySelector('a[href="https://nonvegetable.github.io/portfolio-website/"]');
    if (portfolioLink) {
        portfolioLink.addEventListener('click', (e) => {
            e.preventDefault();
            const messages = [
                "BRUH... you're literally ON the website right now! 🤦‍♂️",
                "Loading brain.exe... Error 404: Common Sense Not Found 💀",
                "Congratulations! You just played yourself! 🎭",
                "Tell me you're not paying attention without telling me you're not paying attention 😩",
                "This is peak 'trying to find your phone while using its flashlight' energy 🔦",
                "Maximum Facepalm Achievement Unlocked! 🏆",
                "Sir/Ma'am... I'm concerned about your observation skills 🧐",
                "Did you also try to push a pull door today? 🚪",
                "This is it. This is the moment you question all your life decisions 😵‍💫"
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Create overlay for dramatic effect
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '9999';
            overlay.style.opacity = '0';
            
            // Create message container
            const messageBox = document.createElement('div');
            messageBox.style.backgroundColor = 'var(--card-background)';
            messageBox.style.border = '3px solid var(--primary-color)';
            messageBox.style.borderRadius = '15px';
            messageBox.style.padding = '30px 40px';
            messageBox.style.maxWidth = '90%';
            messageBox.style.textAlign = 'center';
            messageBox.style.position = 'relative';
            messageBox.style.transform = 'scale(0.5)';
            
            // Add message text
            const messageText = document.createElement('div');
            messageText.style.fontSize = '1.8rem';
            messageText.style.marginBottom = '20px';
            messageText.style.color = 'var(--text-color)';
            messageText.textContent = randomMessage;
            
            // Add shame counter
            const shameCounter = document.createElement('div');
            shameCounter.style.fontSize = '1.2rem';
            shameCounter.style.color = 'var(--secondary-color)';
            shameCounter.textContent = "Your shame counter has been increased by 1 point";
            
            // Add close button
            const closeButton = document.createElement('button');
            closeButton.textContent = "I'll reflect on my actions...";
            closeButton.style.marginTop = '25px';
            closeButton.style.padding = '12px 25px';
            closeButton.style.backgroundColor = 'var(--primary-color)';
            closeButton.style.color = '#fff';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '8px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontSize = '1.1rem';
            closeButton.style.transition = 'background-color 0.3s ease';
            
            closeButton.addEventListener('mouseover', () => {
                closeButton.style.backgroundColor = 'var(--secondary-color)';
            });
            
            closeButton.addEventListener('mouseout', () => {
                closeButton.style.backgroundColor = 'var(--primary-color)';
            });

            // Assemble the message box
            messageBox.appendChild(messageText);
            messageBox.appendChild(shameCounter);
            messageBox.appendChild(closeButton);
            overlay.appendChild(messageBox);
            document.body.appendChild(overlay);
            
            // Animate the overlay and message
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(messageBox, {
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
            
            // Shake animation for extra emphasis
            gsap.to(messageBox, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.5,
                ease: 'power1.inOut'
            });

            // Close animation
            const closeOverlay = () => {
                gsap.to(messageBox, {
                    scale: 0,
                    duration: 0.3,
                    ease: 'back.in(1.7)'
                });
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => overlay.remove()
                });
            };

            closeButton.addEventListener('click', closeOverlay);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeOverlay();
            });
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

    animateSections('.hackathon-card', {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2
    });
});