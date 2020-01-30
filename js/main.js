const 
      body = document.querySelector('body'),
      header = document.querySelector('header'),
      wrapTop = 'wrap_top',
      wrapBottom = 'wrap_bottom',
      on = 'on',
      move = 'move',
      wrap = document.querySelector('.wrap')
      ;
let 
      i , ii, num, scrollTop, y
      ;
let   bc = 0
      ;

function bgColor(){
   if(bc) {
      wrap.classList.remove(wrapTop);
      wrap.classList.add(wrapBottom);
   } else {
      wrap.classList.remove(wrapBottom);
      wrap.classList.add(wrapTop);
   }
}

function scrollEvent() {
   y =  window.scrollY;
   if(y >= 50) {
    header.classList.add(move);
        if (y >= 1000) {
            bc = 1;
            bgColor();
        } else {
            bc = 0;
            bgColor();
        }
    } else {
    header.classList.remove(move);
    }
   // console.log(y);
}

function init() {
   scrollEvent();
   window.addEventListener("scroll", scrollEvent);
}

init();