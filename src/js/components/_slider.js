import { ACTIVE } from '../constants';

const CURRENT = 'is-current';

const slider = $('.js-slider');
const slides = $('.js-slide', slider);
const nextArrow = $('.js-next-arrow', slider);
const prevArrow = $('.js-prev-arrow', slider);
const icons = $('.js-icon', slider);
$(slides[0]).addClass(CURRENT);
$(icons[0]).addClass(ACTIVE);
slider.nextSlide = () => {
  for (let i = 0; i < slides.length; i++) {
    if($(slides[i]).hasClass(CURRENT)) {
      $(slides[i]).removeClass(CURRENT);
      $(icons[i]).removeClass(ACTIVE);
      if(i > slides.length - 2) {
        $(slides[0]).addClass(CURRENT);
        $(icons[0]).addClass(ACTIVE);
        return;
      } else {
        $(slides[i+1]).addClass(CURRENT);
        $(icons[i+1]).addClass(ACTIVE);
        return;
      }
    }
  }
};
slider.prevSlide = () => {
  for (let i = 0; i < slides.length; i++) {
    if($(slides[i]).hasClass(CURRENT)) {
      $(slides[i]).removeClass(CURRENT);
      $(icons[i]).removeClass(ACTIVE);
      if(i === 0) {
        $(slides[slides.length - 1]).addClass(CURRENT);
        $(icons[slides.length - 1]).addClass(ACTIVE);
        return;
      } else {
        $(slides[i-1]).addClass(CURRENT);
        $(icons[i-1]).addClass(ACTIVE);
        return;
      }
    }
  }
};
slider.goToSlide = id => {
  slides.removeClass(CURRENT);
  $(slides[id]).addClass(CURRENT);
};

let autoPlay;
let reRun;
function repeatRun() {
  reRun = setTimeout(function() {run();}, 6000);

}
function run() {
  autoPlay = setTimeout(function next() {
    slider.nextSlide();
    autoPlay = setTimeout(next, 5000);
  }, 5000);
}
run();
prevArrow.on('click', () => {
  clearTimeout(autoPlay);
  clearTimeout(reRun);
  slider.prevSlide();
  repeatRun();
});
nextArrow.on('click', () => {
  clearTimeout(autoPlay);
  clearTimeout(reRun);
  slider.nextSlide();
  repeatRun();
});


icons.on('click', e => {
  let currentIcon = $(e.currentTarget);
  const id = currentIcon.index();
  clearTimeout(autoPlay);
  clearTimeout(reRun);
  icons.removeClass(ACTIVE);
  currentIcon.addClass(ACTIVE);
  slider.goToSlide(id);
  repeatRun();
});


let initialPoint;
let finalPoint;
const sliderWrap = document.querySelector('.js-slider-wrap');
console.log(sliderWrap);
sliderWrap.addEventListener('touchstart', function(event) {
  initialPoint=event.changedTouches[0];
}, false);
sliderWrap.addEventListener('touchend', function(event) {
  finalPoint=event.changedTouches[0];
  var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
  var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
  if (xAbs > 20 || yAbs > 20) {
    if (xAbs > yAbs) {
      if (finalPoint.pageX < initialPoint.pageX) {
        clearTimeout(autoPlay);
        clearTimeout(reRun);
        slider.nextSlide();
        repeatRun();
    
      }
      else{
        clearTimeout(autoPlay);
        clearTimeout(reRun);
        slider.prevSlide();
        repeatRun();
      }
    }
  }
},false);
