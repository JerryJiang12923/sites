document.addEventListener('DOMContentLoaded', function() {

    // --- Scroll Animations ---
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) { // Trigger when 80% of the element is in view
                displayScrollElement(el);
            }
            // Optional: To make animation replay if scrolled up and then down again
            // else {
            //     hideScrollElement(el);
            // }
        });
    };

    // Initial check in case elements are already in view on load
    handleScrollAnimation();
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });


    // --- Virtual Hug Animation ---
    const hugButton = document.getElementById('hugButton');
    const animationContainer = document.getElementById('hugAnimationContainer');

    if (hugButton && animationContainer) {
        hugButton.addEventListener('click', () => {
            // Create a few hearts
            for (let i = 0; i < 10; i++) { // Create 10 hearts
                createHeart();
            }
        });
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Randomize horizontal spread and animation delay/duration for variety
        heart.style.left = `${40 + Math.random() * 20}%`; // Spread around center
        heart.style.animationDuration = `${2 + Math.random() * 2}s`; // Vary duration
        heart.style.animationDelay = `${Math.random() * 0.5}s`; // Stagger start

        // Randomize size slightly
        const scale = 0.8 + Math.random() * 0.7;
        heart.style.transform = `translateX(-50%) scale(${scale})`;


        animationContainer.appendChild(heart);

        // Remove heart from DOM after animation to prevent buildup
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

});
