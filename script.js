document.addEventListener('DOMContentLoaded', () => {
  // Smooth fade in animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);
  
  // Add click interactions to list items
  const listItems = document.querySelectorAll('.list-item');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      // Simple interaction feedback
      item.style.transform = 'scale(0.98)';
      setTimeout(() => {
        item.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Dynamic year update
  const yearElement = document.querySelector('.year');
  const currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;
  
  // Keep asterisk static (no parallax effect)
  const asterisk = document.querySelector('.asterisk');
  
  // Add staggered animation to list items
  const typingElements = document.querySelectorAll('.list-item');
  typingElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.5s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    }, index * 50); // Reduced delay for smoother animation with more items
  });
  
  // Add hover sound effect (optional - requires user interaction)
  // const addHoverSound = () => {
  //   try {
  //     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
  //     listItems.forEach(item => {
  //       item.addEventListener('mouseenter', () => {
  //         // Create a subtle beep sound
  //         const oscillator = audioContext.createOscillator();
  //         const gainNode = audioContext.createGain();
          
  //         oscillator.connect(gainNode);
  //         gainNode.connect(audioContext.destination);
          
  //         oscillator.frequency.value = 800;
  //         oscillator.type = 'sine';
          
  //         gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  //         gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.01);
  //         gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
          
  //         oscillator.start(audioContext.currentTime);
  //         oscillator.stop(audioContext.currentTime + 0.1);
  //       });
  //     });
  //   } catch (e) {
  //     console.log('Audio context not supported');
  //   }
  // };
  
  // Enable sound on first user interaction
  // document.addEventListener('click', addHoverSound, { once: true });
  
  // // Add subtle animation to section titles
  // const sectionTitles = document.querySelectorAll('.section-title');
  // sectionTitles.forEach((title) => {
  //   title.addEventListener('mouseenter', () => {
  //     title.style.letterSpacing = '2px';
  //     title.style.transition = 'letter-spacing 0.3s ease';
  //   });
    
  //   title.addEventListener('mouseleave', () => {
  //     title.style.letterSpacing = '1px';
  //   });
  // });
  
  // Add click-to-copy functionality for contact info
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailLink.href.replace('mailto:', '');
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showNotification('Email copied to clipboard!');
        }).catch(() => {
          fallbackCopyTextToClipboard(email);
        });
      } else {
        fallbackCopyTextToClipboard(email);
      }
    });
  }
  
  // Fallback copy function for older browsers
  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showNotification('Email copied to clipboard!');
      } else {
        showNotification('Copy failed - please copy manually');
      }
    } catch (err) {
      showNotification('Copy not supported - please copy manually');
    }
    
    document.body.removeChild(textArea);
  }

  
  // Add accessibility improvements
  listItems.forEach(item => {
    // Make items focusable
    item.setAttribute('tabindex', '0');
    
    // Add keyboard interaction
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
  
  // Add smooth scrolling to internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe sections for scroll animation
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Performance optimization: removed scroll event handler for asterisk
  // Asterisk now remains static as requested
  
  // Add loading states and error handling
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    showNotification('Portfolio loaded successfully!');
  });
  
  // Handle errors gracefully
  window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
  });
});
