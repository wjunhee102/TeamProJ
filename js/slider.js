const 
    slider = document.querySelector('.main_visual') 
    slide = document.querySelectorAll('.slide'),
    onClass = "slide_on",
    firstSlide = document.querySelector('.slide:first-child'),
    lastSlide = document.querySelector('.slide:last-child'),
    // 
    activeClass = "active",
    dots = document.querySelector('.mainSlideDots'),
    slideDots = document.querySelectorAll('.slideDot'),
    firstDot = document.querySelector('.slideDot:first-child'),
    lastDot = document.querySelector('.slideDot:last-child'),
    //
    slideArrow = document.querySelector('.arrow'),
    nextArrow  = document.querySelector('.mainSlide_next'), 
    prevArrow = document.querySelector('.mainSlide_prev'),
    //
    btnPause = document.querySelector('.slideBtn'),
    pause = "pause",
    play = "play"
    ;
    
    
    //슬라이더 시작
    let current = 0;


    //슬라이더 사진, dots reset
    function reset(){
        for(let i = 0; i<slide.length; i++){
            slide[i].classList.remove(onClass);
            slideDots[i].classList.remove(activeClass);
        }
    }
    
    //이전 이동 함수

    function prev(){
       const currentSlide = document.querySelector(`.${onClass}`),
           currentDot = document.querySelector(`.${activeClass}`);

       if (currentSlide) {
           reset();
           const prevSlide = currentSlide.previousElementSibling,
               prevDot = currentDot.previousElementSibling;

           if (prevSlide) {
               prevSlide.classList.add(onClass);
               prevDot.classList.add(activeClass);

           } else {
               lastSlide.classList.add(onClass);
               lastDot.classList.add(activeClass);
           }

       } else {
           lastSlide.classList.add(onClass);
           lastDot.classList.add(activeClass);
       }
        
    }


      
       
    //다음 이동 함수

   function next() {
       const currentSlide = document.querySelector(`.${onClass}`),
           currentDot = document.querySelector(`.${activeClass}`);
       
           if (currentSlide) {
                reset();
                const nextSlide = currentSlide.nextElementSibling,
                nextDot = currentDot.nextElementSibling;
                    
                if (nextSlide) {
                        nextSlide.classList.add(onClass);
                         nextDot.classList.add(activeClass);
          
                } else{
                    firstSlide.classList.add(onClass);
                    firstDot.classList.add(activeClass);
                 }

             }else{
                firstSlide.classList.add(onClass);
                firstDot.classList.add(activeClass);
       }
   }


    //정지버튼
    let auto;
    let x;
 
    
    function autoPlayStart(){
        auto = setInterval(next,5000);
    }
    
    function autoPlayStop(){
        window.clearInterval(auto);
    }
    
   
    function playPause(){
        if(!current){
            btnPause.classList.add(play);
            current++;
        }else{
            autoPlayStart();
            btnPause.classList.remove(play); 
            current--;
        }
    }


     function currentPlay() {
         if (btnPause.classList.contains(play)) {
             autoPlayStop();
         } else {
             autoPlayStart();
         }
     }

    //Arrow 동작
     //이전
     function prevBtn(){
        prevArrow.addEventListener('click', () => {
            prev();
            autoPlayStop();
            currentPlay();
        });
    }


    //다음
    function nextBtn(){
        nextArrow.addEventListener('click', () => {
            next();
            autoPlayStop();
            currentPlay();
        });
    }

    
    //dots pagination
    function dotsSlide(){
         for (let current = 0; current < slideDots.length; current++) {
              slideDots[current].addEventListener('click', (e)=> {
                   reset();
                   slideDots[current].classList.add(activeClass);
                   slide[current].classList.add(onClass);
                   autoPlayStop();
                   currentPlay();
             });          
          
        };
    };
    
    //드래그
    let sw = false;
    let sx, dx;

    function firstLoc(){
        slider.addEventListener('mousedown', (e) => {
            autoPlayStop();
            e.preventDefault;
            sx = event.clientX;

      });
    }

    function secondLoc(){
        document.addEventListener('mousemove', (e) => {
            e.preventDefault();
            dx = event.clientX

        });
    }

    function sumLoc(){
        slider.addEventListener('mouseup', (e) => {
            e.preventDefault();
            const sum = dx - sx
                if (sum < 0) {
                    next();
                    currentPlay();
                } else if (sum > 0) {
                    prev();
                    currentPlay();
                }
        });
    }


    //실행
     function init(){       
        autoPlayStart();
        dotsSlide();
        nextBtn();
        prevBtn();
        firstLoc();
        secondLoc();
        sumLoc();
        btnPause.addEventListener('click', playPause);
     }

 
     init()
   
    

