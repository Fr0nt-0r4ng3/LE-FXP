// Faqs
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.closest('.faq-item').classList.toggle('active');
        });
    });
});

// Slider 
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all sliders on page
    const sliders = document.querySelectorAll('.cb-slider-001, .cb-slider-002');

    sliders.forEach(slider => {
        const sliderType = slider.classList.contains('cb-slider-001') ? 'v1' : 'v2';
        const container = slider.querySelector('.slider-container');
        const track = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('.slide');
        const indicators = slider.querySelectorAll('.indicator');
        let currentIndex = 0;
        let autoplayInterval;
        let isHovering = false;
        const totalSlides = slides.length;

        // Common transition function
        function goToSlide(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateActiveStates();
        }

        // Update active states
        function updateActiveStates() {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentIndex);
            });

            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }

        // Autoplay control
        function startAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                if (!isHovering) goToSlide(currentIndex + 1);
            }, 5000);
        }

        // Initialize slider
        function initSlider() {
            // Version-specific setup
            if (sliderType === 'v1') {
                // Arrow navigation for v1
                const prevArrow = slider.querySelector('.prev-arrow');
                const nextArrow = slider.querySelector('.next-arrow');

                prevArrow?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToSlide(currentIndex - 1);
                    resetAutoplay();
                });

                nextArrow?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToSlide(currentIndex + 1);
                    resetAutoplay();
                });

            } else if (sliderType === 'v2') {
                // Floating button for v2
                const floatingBtn = slider.querySelector('.floating-next-btn');

                floatingBtn?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToSlide(currentIndex + 1);
                    resetAutoplay();
                });
            }

            // Common indicator navigation
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToSlide(index);
                    resetAutoplay();
                });
            });

            // Mouse events for autoplay pause
            container.addEventListener('mouseenter', () => {
                isHovering = true;
            });

            container.addEventListener('mouseleave', () => {
                isHovering = false;
            });

            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                if (touchEndX < touchStartX - 50) {
                    goToSlide(currentIndex + 1); // Swipe left
                } else if (touchEndX > touchStartX + 50) {
                    goToSlide(currentIndex - 1); // Swipe right
                }
            }

            // Initialize first slide
            updateActiveStates();
            startAutoplay();
        }

        initSlider();
    });
});