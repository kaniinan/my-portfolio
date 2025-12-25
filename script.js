document.addEventListener('DOMContentLoaded', () => {
    // 1. Simple Navigation Scroll Effect
    // Adds a subtle shadow to the header when the user scrolls down
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });

    // 2. Filter/Sorting (If you combine all projects onto one page)
    /* const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter; // e.g., 'travel'

            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    */
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.highlight-card');
    let index = 0;

    function nextSlide() {
        index++;
        
        // Reset to first card if we reach the end
        if (index >= cards.length - 1) { 
            index = 0;
        }

        const cardWidth = cards[0].offsetWidth + 30; // Card width + gap
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    // Slide automatically every 3 seconds
    setInterval(nextSlide, 3000);
});



//for hidden photo section
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    if (!gallery) return; // Exit if no gallery is found on the page

    const items = gallery.querySelectorAll('.photo-item');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const body = document.body;
    let currentIndex = 0;

    // --- 1. Infographic Logic (Only if 'has-more' style is needed) ---
    // We check if the gallery is NOT the art gallery to apply the "+X" overlay
    if (!gallery.classList.contains('art-gallery-grid')) {
        if (items.length > 3) {
            const thirdItem = items[2];
            thirdItem.classList.add('has-more');
            thirdItem.setAttribute('data-more', `+${items.length - 3}`);
        }
    }

    // --- 2. Universal Modal Logic ---
    const updateModalImage = () => {
        const imgElement = items[currentIndex].querySelector('img');
        if (imgElement) {
            modalImg.src = imgElement.src;
            modalImg.classList.remove('zoomed');
            modal.scrollTo(0, 0); // Reset scroll to top
        }
    };

    const openModal = () => {
        modal.style.display = 'block';
        body.classList.add('modal-open'); // Freeze background scroll
    };

    const closeModal = () => {
        modal.style.display = 'none';
        body.classList.remove('modal-open'); // Restore background scroll
        modalImg.classList.remove('zoomed');
    };

    // Attach click events to all items
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateModalImage();
            openModal();
        });
    });

    // Navigation Buttons
    document.querySelector('.modal-next').onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % items.length;
        updateModalImage();
    };

    document.querySelector('.modal-prev').onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateModalImage();
    };

    document.querySelector('.close-modal').onclick = closeModal;

    // Zoom Logic
    modalImg.onclick = (e) => {
        e.stopPropagation();
        modalImg.classList.toggle('zoomed');
        if (modalImg.classList.contains('zoomed')) {
            modal.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Close on background click
    modal.onclick = (e) => {
        if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
            closeModal();
        }
    };
});