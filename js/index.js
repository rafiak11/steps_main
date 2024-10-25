const slider = document.querySelector('.slider__container');
const track = document.querySelector('.slider__track');
const buttons = document.querySelectorAll('[data-controls]');
const indicators = document.querySelectorAll('[data-idx]');
let slides = document.querySelectorAll('.slider__slide');
const delay = 30000; // interval delay
let index = 1; // flag to track slide id's
let current = 0; // flag to track current indicators id's
let slideInterval; // variable for slideShow interval

// Clone first and last slide, give each id and append/prepend it in track.
// This allow us to get an infinite slider later.
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = `first-clone`;
lastClone.id = `last-clone`;
track.append(firstClone);
track.prepend(lastClone);

// Gets a width for each active slide.
// And set first slide on page load. 
let slideWidth = slides[index].clientWidth;
track.style.transform = `translateX(${-slideWidth * index}px)`;


// The interval triggers a function moveToNextSlide, creating an automatic slider effect.
// It is used on page load & also active it when mouse leave slider.
const slideShow = () => {
    slideInterval = setInterval(moveToNextSlide, delay);
}

// Remove interval for slideShow and stops the effect of the automatic slider.
// It is used when mouse enter slider.
const removeSlideShow = () => {
    clearInterval(slideInterval);
}

// The function disables the transition effect when the active slide equals the cloned elements.
// At this point, we set our track back to the starting position with no transition effect.
// This way we create the effect of an endless slider.
const isTransitionend = () => {
    slides = document.querySelectorAll('.slider__slide');
    if (slides[index].id === firstClone.id) {
        index = 1;
        track.style.transform = `translateX(${-slideWidth * index}px)`;
        track.style.transition = `none`;
    }

    if (slides[index].id === lastClone.id) {
        index = slides.length - 2;
        track.style.transform = `translateX(${-slideWidth * index}px)`;
        track.style.transition = `none`;
    }
}

// The fn is responsible for moving the slide forward and changing the indicators.
// If statement prevent infinite index increment.
const moveToNextSlide = () => {
    if (index >= slides.length - 1) return;
    checkCurrent(true);
    changeIndicators();
    index++;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

// The fn is responsible for moving the slide backward and changing the indicators.
// If statement prevent infinite index decrement.
const moveToPrevSlide = () => {
    if (index <= 0) return;
    checkCurrent(false);
    changeIndicators();
    index--;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

// The fn is responsible for moving the slide straight to selected slide with is linked to indicator.
// If statement prevent infinite index decrement.
function moveToSlide() {
    current = this.dataset.idx;
    changeIndicators();
    index = parseFloat(current) + 1;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

// The fn add active class for current active indicator.
// for each call we remove all active classes using removeAllIndicators();
const changeIndicators = () => {
    removeAllIndicators();
    indicators.forEach(indicator => {
        if (indicator.dataset.idx == current) {
            indicator.classList.add('active');
        }
    })
}

// Helper fn to see which slide is currently active.
const checkCurrent = (check) => {
    check ? current++ : current--;
    if (current > 3) {
        current = 0;
    } else if (current < 0) {
        current = 3;
    }
}

// Helper fn to remove all active classes on indicators.
const removeAllIndicators = () => {
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    })
}

// Fn to resize slideWidth while resizing window to make it responsive. 
const changeSlideWidth = () => {
    slideWidth = slides[index].clientWidth;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
}

slideShow();

// Event listeners
slider.addEventListener('mouseenter', removeSlideShow);
slider.addEventListener('mouseleave', slideShow);
track.addEventListener('transitionend', isTransitionend);
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonDir = button.dataset.controls;
        buttonDir == 'prev' ? moveToPrevSlide() : moveToNextSlide();
    })
})
indicators.forEach(indicator => indicator.addEventListener('click', moveToSlide));
window.addEventListener('resize', changeSlideWidth);


// Animations 

document.addEventListener('DOMContentLoaded', () => {
    const boxesLeft = document.querySelectorAll('.box-left');
    const boxesRight = document.querySelectorAll('.box-right');

    boxesLeft.forEach((box, index) => {
        box.style.animationDelay = `${index * 0.1}s`; // stagger animation
    });

    boxesRight.forEach((box, index) => {
        box.style.animationDelay = `${index * 0.1}s`; // stagger animation
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');
    
    const checkVisibility = () => {
      const windowHeight = window.innerHeight;
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight * 0.8) { 
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    };
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
  });


  document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.blooming');
  
    function checkVisibility() {
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          element.classList.add('visible');
        }
      });
    }
  
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();

}); 


document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('hidden');
          if (entry.target.id === 'left-column') {
            entry.target.classList.add('animate-left');
          } else if (entry.target.id === 'right-column') {
            entry.target.classList.add('animate-right');
          }
          observer.unobserve(entry.target);
        }
      });
    };
  
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
  
    document.querySelectorAll('#left-column, #right-column').forEach(element => {
      observer.observe(element);
    });
  });



//conatct form 

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('https://backend-steps-1.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            document.getElementById('contactForm').reset();
        } else {
            alert(result.error);
        }
    } catch (error) {
        alert('Failed to send message');
    }
});



document.addEventListener("DOMContentLoaded", function() {
  const listItems = document.querySelectorAll('.list-item');
  console.log("List items found:", listItems.length);

  function checkScroll() {
      const windowHeight = window.innerHeight;
      console.log("Checking scroll, windowHeight:", windowHeight);

      listItems.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          console.log(`Item ${index + 1}: rect.top = ${rect.top}, windowHeight = ${windowHeight}`);

          // Trigger animation when the item is fully within the viewport
          if (rect.top >= 0 && rect.bottom <= windowHeight) {
              console.log(`Animating item ${index + 1}`);
              setTimeout(() => {
                  item.classList.add('show');
              }, index * 300); // Adjust delay for staggered effect
          } else {
              // Remove the class if the item is out of view to allow re-animation
              item.classList.remove('show');
          }
      });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once on load
});
