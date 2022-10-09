const main = document.querySelector("#main");
//quertSelector 문서에서 css선택자에 대응하는 것을 선택해주는 것
const qna = document.querySelector("#qna");
const result=document.querySelector("#result");

const endPoint = 12; //문제수
const select = [0,0,0,0,0,0,0,0,0,0,0,0]; //선택한 값에 따른 배열 저장

function calResult(){ //결과 계산기
   console.log(select);
    var result = select.indexOf(Math.max(...select));
    //indexOf : 인덱스값 반환 , ...select 선택한 배열을 펼쳐줌
    return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
  
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
  
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
  }

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display="none";
            result.style.display = "block"; 
        }, 450) 
        setResult();
    })}

function addAnswer(answerText, qIdx, idx){ //qnaList[qIdx].a[i].answer
                                            //반복문의 i 값을 idx로 받음
    var a = document.querySelector('.aBox');
    var answer = document.createElement('button');
    //createElemnt : 지정한 테그의 html요소만 반환한다.
    answer.classList.add('answerList');
    //버튼에 class or id값이 없기 때문에 answer class에 answerList라는 값을 추가해준다.
    answer.classList.add('my-2');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    //appendChild : answer라는 버튼이 a에 소속되도록 관계를 만들어준다.
    answer.innerHTML = answerText;
    answer.addEventListener("click", 
    function(){
        var children = document.querySelectorAll('.answerList');//9~10 line
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true; //클릭 시 버튼 비활성화
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
            //children[i].style.display = 'none'; //버튼 사라짐
        }
        setTimeout(()=>{ //버튼 전환효과
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
                select[target[i]] += 1;
            }
            for(let i =0; i<children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
    },false);
    //addEventListener : 지정한 이벤트가 대상에 전달될 때 마다 호출할 함수를 설정한다.
}
function goNext(qIdx){ //질문을 계속 받아야함.
    if(qIdx === endPoint){ //goNext에서 이미 1+해서 넘겨줌
        goResult();   
        return;
    }
    var q = document.querySelector('.qBox');
q.innerHTML = qnaList[qIdx].q;
//innerHTML : 요소내에 포함 된 HTML을 가져오거나 설정한다.
    for(let i in qnaList[qIdx].a){ // data.js파일의 qInx값에 맞는 a값 반복
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i); //a[i]에 맞는 answer 값
    }
    var status = document.querySelector('.statusBar');
    status.style.width =(100/endPoint) * (qIdx+1) + '%'; // statusBar 게이지
}
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
        let qIdx = 0; //<- qIdx 변수값을 지정해준다.
        goNext(qIdx);
    }, 450);
    // qna.style.WebkitAnimation = "fadeIn 1s";
    // qna.style.animation = "fadeIn 1s";


    //main.style.display = "none";
    //qna.style.display = "block"; //함수 사용 시 qna테그를 가진 속성 값이 보여지게된다.
}