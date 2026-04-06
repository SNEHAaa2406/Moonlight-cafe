import './style.css';

// Animations setup
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach((el) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    // Reservation Formspree Logic (Now WhatsApp Logic)
    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const button = form.querySelector('button[type="submit"]');
            button.innerText = 'Redirecting...';
            button.disabled = true;

            try {
                const name = formData.get('name');
                const phone = formData.get('phone');
                const date = formData.get('date');
                const time = formData.get('time');
                const guests = formData.get('guests');

                let text = `*New Table Reservation!*\n`;
                text += `*Name:* ${name}\n`;
                text += `*Phone:* ${phone}\n`;
                text += `*Date:* ${date}\n`;
                text += `*Time:* ${time}\n`;
                text += `*Guests:* ${guests}`;

                // Encode the text for URL compatibility
                const encodedText = encodeURIComponent(text);
                const whatsappUrl = `https://wa.me/918208945122?text=${encodedText}`;

                // Open WhatsApp in a new tab smoothly
                window.open(whatsappUrl, '_blank');
                
                // Show Success / Reset Form
                form.reset();
                button.innerText = 'Reserve Now';
                button.disabled = false;
                
            } catch(e) {
                alert('Oops! There was a problem. Please contact us directly.');
                button.innerText = 'Reserve Now';
                button.disabled = false;
            }
        });
    }

    // Mobile Navigation logic
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Hide on nav click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

});

// Smooth tab switching
window.filterMenu = (category) => {
    if (typeof gsap === 'undefined') return;
    
    const sections = document.querySelectorAll('.menu-section');
    const tabs = document.querySelectorAll('.menu-tab');

    // Update tab styles
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.innerText.toLowerCase() === category || (category === 'all' && tab.innerText === 'All') || (category === 'combos' && tab.innerText === 'Combos & Snacks')) {
            tab.classList.add('active');
        }
    });

    // Animate filter
    gsap.to(sections, {
        opacity: 0,
        scale: 0.98,
        duration: 0.2,
        onComplete: () => {
            sections.forEach(section => {
                if (category === 'all' || section.classList.contains(category)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            gsap.to(sections, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.05
            });
        }
    });
};
