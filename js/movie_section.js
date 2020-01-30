 // Movie Chart Menu
 const 
    sectionMovie = document.querySelector('.section_movie'),
    menuMovie = sectionMovie.querySelector('.menu_movie'),
    movieMenu = menuMovie.querySelector('.menu'),
    btnMovie = menuMovie.querySelectorAll('.btn_movie'),
    activeBar = menuMovie.querySelector('.active_bar'),
    firstReset = sectionMovie.querySelector('.first_reset'),
    lastReset = sectionMovie.querySelector('.last_reset')
    ;

 // Movie Chart 
 const
    movieChart = document.querySelector('.movie_chart'),
    movieWrap = movieChart.querySelector('.movie_wrap'),
    movieContent = movieWrap.querySelectorAll('.movieContent'),
    movieCover = movieWrap.querySelectorAll('.movie_prev'),
    movieKids = movieWrap.querySelectorAll('.all'),
    movieArt = movieWrap.querySelectorAll('.art'),
    movieUnop = movieWrap.querySelectorAll('.unop'),
    movieSelect = [movieContent, movieUnop, movieArt, movieKids],
    mPrevBtn = document.querySelector('.movie_btn_arrows.movie_prev'),
    mNextBtn = document.querySelector('.movie_btn_arrows.movie_next'),
    conWidth = movieContent[1].offsetLeft, 
    activeWidth = activeBar.offsetWidth,
    menuWidth = movieMenu.offsetWidth
    ;

// Movie Info
const
    movieArrow = movieWrap.querySelectorAll('.movie_arrow'),
    movieInfoWrap = document.querySelector('.movie_info_wrap'),
    movieInfo = movieInfoWrap.querySelectorAll('.movie_info')
    ;


let 
    moveNext,
    movePrev,
    lateX_m = 0,
    count_m = 0,
    movieClick = 1,
    movieOn = 1,
    movieConX_down = 0,
    movieConX_move = 0,
    movieConX_res = 0,
    count_move = 0,
    inum = 0,
    lateX_a = 0,
    astart = 0,
    amove = 0,
    aon = 0,
    apoint = 0,
    menuPoint = document.body.clientWidth,
    menuMWidth = movieMenu.clientWidth,
    mi = 1
    ;


function movieChartSelect() {
    btnMovie.forEach(function(btn, idx) {
        btn.addEventListener("click",function(){
            inum = idx
            const btnMovieOn = menuMovie.querySelector(`.${on}`);
            if (btnMovieOn) {
                btnMovieOn.classList.remove(on);
                for (let con = 0; con < movieContent.length; con++) {
                    movieContent[con].classList.remove(on);
                }
            }
            for (let con = 0; con < movieSelect[inum].length; con++) {
                movieSelect[inum][con].classList.add(on);
            }
            btnMovie[inum].classList.add(on);
            lateX_m = 0;
            count_m = 0;
            lateX_a = activeWidth*inum;
            activeBar.style.transform = `translateX(${lateX_a}px)`;
            movieWrap.style.transition = '0.3s ease-in-out';
            movieWrap.style.transform = `translateX(${-lateX_m}px)`; 
        });
    });
}
    
function activeMoveStart() {
    aon = 1;
}

function activerSize() {
    menuPoint = document.body.clientWidth;
    menuMWidth = movieMenu.clientWidth;
}

function activeMoveOn(e) {
    if(!aon) return

    amove = e.clientX;
    astart = Math.round((menuPoint - menuMWidth )/2)
    apoint =  amove - astart  - 75;
    if (apoint <= 0) {
        apoint = 0;
    } else if (apoint >= menuWidth - activeWidth) {
        apoint = menuWidth - activeWidth;
    }
    activeBar.style.transition = '0.3s ease-out';
    activeBar.style.transform = `translateX(${apoint}px)`;
}


function activeMoveEnd() {
    aon = 0;
    activeBar.style.transform = `translateX(${lateX_a}px)`;
}

// 이전으로 넘기기
function moviePrev() {
    count_m = lateX_m / conWidth;
    if(count_m > 0){
        count_m--;
        movieReset();
        lateX_m = count_m*conWidth; 
        movieWrap.style.transition = '0.3s ease-in-out';
        movieWrap.style.transform = `translateX(${-lateX_m}px)`;  
    } else{
        return false
    }       
}

// 다음으로 넘기기
function movieNext() {
    count_m = lateX_m / conWidth;
    if(count_m < movieSelect[inum].length -5){
        count_m++;
        movieReset();
        lateX_m = count_m*conWidth;   
        movieWrap.style.transition = '0.3s ease-in-out';
        movieWrap.style.transform = `translateX(${-lateX_m}px)`; 
    } else{
        return false;
    }
}


// 마우스엔터시 오작동 막기
function movieEnter(){
    movieClick = 1;
    movieOn = 1;
}

// 마우스클릭시 마우스 무브 활성화
function movieMoveOn(e){
    movieClick = 0;
    movieOn = 0;
    movieConX_down = e.clientX;     
}
        
// 마우스 무브시 좌표값 출력
function movieMove(e) {
    if(movieClick) return false;

    movieWrap.style.transition = '';
    movieConX_move = e.clientX;
    movieConX_res =  lateX_m + (movieConX_down - movieConX_move) ;
    m_num = movieSelect[inum].length -4;
    if(movieConX_res < -conWidth){
        movieConX_res = -conWidth
    } else if (movieConX_res >= m_num*conWidth) {
        movieConX_res = m_num*conWidth;
    }
    movieWrap.style.transform = `translateX(${-movieConX_res}px)`;
}
        
// 마우스 무브 종료     
function movieMoveStop() {
    movieClick = 1;
    count_m = Math.round(movieConX_res / conWidth);
    if(count_m <= 0 ) {
        count_m = 0 ;
    } else if (count_m >= movieSelect[inum].length -5 ) {
        count_m = movieSelect[inum].length -5;
    }
    if(movieOn) {
        movieWrap.style.transition = '0.3s ease-in-out';
        movieWrap.style.transform = `translateX(${-lateX_m}px)`;
    } else { 
        movieReset();
        lateX_m  = count_m*conWidth;
        movieWrap.style.transition = '0.3s ease-in-out';
        movieWrap.style.transform = `translateX(${-lateX_m}px)`;
    }
}

function movieReset() {
    if (count_m == 0 || count_m == movieSelect[inum].length -5 ) {
        firstReset.style.opacity = 0;
        lastReset.style.opacity = 0;
    } else {
        if (count_m >= 3 ) {
            firstReset.style.opacity = 1;
        } 
        if ( count_m <= movieSelect[inum].length - 8 ) {
            lastReset.style.opacity = 1;
        } 
    }
    
}

function movieChartfirstReset() {
    lateX_m = 0;
    count_m = 0;
    movieReset();
    movieWrap.style.transition = '0.5s ease-in-out'
    movieWrap.style.transform = `translateX(${-lateX_m}px)`;
}   

function movieChartlastReset() {
    count_m = movieSelect[inum].length -5;
    lateX_m = count_m*conWidth;
    movieReset();
    movieWrap.style.transition = '0.5s ease-in-out'
    movieWrap.style.transform = `translateX(${-lateX_m}px)`;
} 
 

function movieInfoOn() {
    if (mi) {
        movieInfoWrap.classList.add(on);
        movieInfo[0].classList.add(on);
        wrap.style.backgroundColor = '#000';
        movieArrow[0].style.opacity = 1;
        movieCover[0].style.opacity = 1;
        mi--;
    } else {
        movieInfoWrap.classList.remove(on);
        movieInfo[0].classList.remove(on);
        wrap.style.backgroundColor = '';
        movieArrow[0].style.opacity = '';
        movieCover[0].style.opacity = '';
        mi++;
    }
}

function movieInfoBtn() {
    mi = 1;
    movieInfoOn();
}
function movieInfoOut() {
    mi = 0;
    movieInfoOn();
}

// 무비섹션 초기화 함수 
function init_movie(){
    movieChartSelect();
    movieReset();
    window.addEventListener('resize',activerSize);
    movieMenu.addEventListener('mouseenter',activeMoveStart);
    movieMenu.addEventListener('mousemove',activeMoveOn);
    movieMenu.addEventListener('mouseleave',activeMoveEnd);
    mPrevBtn.addEventListener('click',moviePrev);    
    mNextBtn.addEventListener('click',movieNext);
    firstReset.addEventListener('click',movieChartfirstReset);
    lastReset.addEventListener('click',movieChartlastReset);
    movieChart.addEventListener('mouseenter',movieEnter);
    movieChart.addEventListener('mousedown',movieMoveOn);
    movieChart.addEventListener('mousemove',movieMove);
    movieChart.addEventListener('mouseup',movieMoveStop); 
    movieChart.addEventListener('mouseleave',movieMoveStop);    
    movieArrow[0].addEventListener('click',movieInfoOn);
}

init_movie();
    
