const main = document.querySelector("#main");
//quertSelector 문서에서 css선택자에 대응하는 것을 선택해주는 것
const qna = document.querySelector("#qna");

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display="none";
            qna.style.display = "block"; 
        }, 450);
    }, 450);
    // qna.style.WebkitAnimation = "fadeIn 1s";
    // qna.style.animation = "fadeIn 1s";


    //main.style.display = "none";
    //qna.style.display = "block"; //함수 사용 시 qna테그를 가진 속성 값이 보여지게된다.
}