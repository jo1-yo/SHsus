document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize book interaction
    const book = document.querySelector('.book');
    const pageTurnSound = document.getElementById('pageTurnSound');
    let isBookOpen = false;

    // Function to play page turn sound
    function playPageTurnSound() {
        if (pageTurnSound) {
            pageTurnSound.currentTime = 0;
            pageTurnSound.volume = 0.5;
            pageTurnSound.play().catch(e => console.log("Audio play failed:", e));
        }
    }

    // Toggle book open/close
    function toggleBook() {
        isBookOpen = !isBookOpen;
        playPageTurnSound();
        
        if (isBookOpen) {
            book.classList.add('open');
            // Force reflow to ensure the transition happens
            void book.offsetWidth;
            book.style.transform = 'rotateY(180deg)';
        } else {
            book.classList.remove('open');
            // Force reflow to ensure the transition happens
            void book.offsetWidth;
            book.style.transform = 'rotateY(0deg)';
        }
    }

    // Add click event to the book
    if (book) {
        book.style.cursor = 'pointer';
        book.addEventListener('click', toggleBook);
        
        // Add hover effect
        book.addEventListener('mouseenter', function() {
            if (!isBookOpen) {
                book.style.transform = 'scale(1.02)';
            }
        });

        book.addEventListener('mouseleave', function() {
            if (!isBookOpen) {
                book.style.transform = 'scale(1)';
            }
        });
    }

    // Initialize animations
    const initAnimations = () => {
        const aboutContainer = document.querySelector('.about-container');
        const bookContainer = document.querySelector('.book-container');

        // Set initial states
        if (aboutContainer) {
            aboutContainer.style.opacity = '0';
            aboutContainer.style.transform = 'translateY(20px)';
            aboutContainer.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        }

        if (bookContainer) {
            bookContainer.style.opacity = '0';
            bookContainer.style.transform = 'translateY(20px)';
            bookContainer.style.transition = 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s';
        }
    };

    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-container, .book-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Make the about image larger
    const aboutImg = document.querySelector('.about-img');
    if (aboutImg) {
        aboutImg.style.maxWidth = '120%';
        aboutImg.style.height = 'auto';
        aboutImg.style.transform = 'scale(1.1)';
        aboutImg.style.transition = 'transform 0.3s ease';
        
        // Optional: Add hover effect
        aboutImg.parentElement.style.overflow = 'hidden';
        aboutImg.parentElement.style.borderRadius = '8px';
        
        aboutImg.parentElement.addEventListener('mouseenter', () => {
            aboutImg.style.transform = 'scale(1.05)';
        });
        
        aboutImg.parentElement.addEventListener('mouseleave', () => {
            aboutImg.style.transform = 'scale(1.1)';
        });
    }

    // Initialize and add event listeners
    initAnimations();
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    window.dispatchEvent(new Event('scroll'));
});
