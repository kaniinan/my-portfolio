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
    if (!gallery) return;

    const items = gallery.querySelectorAll('.photo-item');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const body = document.body;
    let currentIndex = 0;

    if (items.length > 3) {
        const thirdItem = items[2];
        thirdItem.classList.add('has-more');
        thirdItem.setAttribute('data-more', `+${items.length - 3}`);
    }

    const updateModalImage = () => {
        modalImg.src = items[currentIndex].querySelector('img').src;
        modalImg.classList.remove('zoomed');
        modal.scrollTo(0, 0); // Reset scroll position when changing images
    };

    const openModal = () => {
        modal.style.display = 'block';
        body.classList.add('modal-open'); // 🛑 FIX: Freezes background scroll
    };

    const closeModal = () => {
        modal.style.display = 'none';
        body.classList.remove('modal-open'); // 🛑 FIX: Restores background scroll
        modalImg.classList.remove('zoomed');
    };

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateModalImage();
            openModal();
        });
    });

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

    // 🛑 FIX: Zoom Logic
    modalImg.onclick = (e) => {
        e.stopPropagation();
        modalImg.classList.toggle('zoomed');
        // Reset scroll position when zooming out, but keep center when zooming in
        if (!modalImg.classList.contains('zoomed')) {
            modal.scrollTo(0, 0);
        }
    };

    // Close modal when clicking on the dark background
    modal.onclick = (e) => {
        if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
            closeModal();
        }
    };
});