document.addEventListener('DOMContentLoaded', () => {
    // Create dynamic background container
    const bgContainer = document.createElement('div');
    bgContainer.classList.add('bg-dynamic');
    document.body.appendChild(bgContainer);
  
    // Quote text to be repeated (no attribution)
    const quoteText = "I'm gonna be King of the Pirates! When do you think people die? When they are shot with a bullet? No! When they eat a soup made from a poisonous mushroom? No! It's when they are forgotten. Risking it all for your dreams is the only way to truly live. The pain you feel now will be the strength you feel tomorrow. Chase your dreams relentlessly. Don't give up, because that is just the place and time that the tide will turn. ";
  
    // Append the quote repeatedly until bgContainer's height exceeds the document's height
    while (bgContainer.scrollHeight < document.documentElement.scrollHeight) {
      bgContainer.innerText += quoteText;
    }
  
    // Animate the background text on scroll using GSAP ScrollTrigger
    gsap.to(".bg-dynamic", {
      y: "-50%",           // Adjust this value to control how much the background moves relative to the scroll
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
  
    // --- Rest of your interactive JavaScript (Typed.js, GSAP animations, Easter eggs, etc.) ---
  
    let typed;
  
    // Initialize Typed.js for the intro text effect
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
        closeButton.style.backgroundColor = 'var(--accent-color-1)';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '8px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '1.1rem';
        closeButton.style.transition = 'background-color 0.3s ease';
  
        closeButton.addEventListener('mouseover', () => {
          closeButton.style.backgroundColor = 'var(--accent-color-2)';
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
        gsap.to(overlay, { opacity: 1, duration: 0.3 });
        gsap.to(messageBox, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
        gsap.to(messageBox, { x: [-10, 10, -10, 10, 0], duration: 0.5, ease: 'power1.inOut' });
  
        // Close animation
        const closeOverlay = () => {
          gsap.to(messageBox, { scale: 0, duration: 0.3, ease: 'back.in(1.7)' });
          gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => overlay.remove() });
        };
  
        closeButton.addEventListener('click', closeOverlay);
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) closeOverlay();
        });
      });
    }
  
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    const animateSections = (selector, animation) => {
      gsap.utils.toArray(selector).forEach((element) => {
        gsap.from(element, {
          ...animation,
          scrollTrigger: { trigger: element, start: 'top 80%' }
        });
      });
    };
  
    // Animate fun facts and project cards
    animateSections('.fun-fact', { opacity: 0, y: 50, duration: 0.8, ease: 'back.out(1.7)' });
    animateSections('.project-card', { opacity: 0, y: 100, scale: 0.8, duration: 0.8, ease: 'back.out(1.7)' });
  
    // Initialize Typed.js
    initTyped();
  
    // Handle visibility change (pause/resume animations)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        typed.stop();
        gsap.globalTimeline.pause();
      } else {
        typed.start();
        gsap.globalTimeline.resume();
      }
    });
  
    // Easter egg: Konami code
    const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
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
      gsap.to('body', { rotation: 360, duration: 1, ease: 'power2.inOut' });
    }
    
    // Additional GSAP animations (if needed)
    animateSections('.hackathon-card', { opacity: 0, y: 100, scale: 0.8, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.2 });
  });
  