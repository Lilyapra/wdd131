let title = document.querySelector('h1');

console.log(title);

title.testContent = 'Web Page Components'; 
//document.querySelector('#topic').computedStyleMap.color = 'red';

const topics = document.querySelector('#topics');

topics.style.color='purple';

const wrapper = document.getElementById('content');

wrapper.style.backgroundColor= "lightblue";

let list = document.querySelector('.list');

list.style.border = "3px solid black";

let para = document.querySelector('p');

para.style.fontSize = '2em';

para.classList.add('background');
image.setAttribute('src', 'images/New_logo.png');

const dropdown = document.querySelector("#webdevlist")

const html = document.querySelector('#html');
const css = document.querySelector('#css');
const jss = document.querySelector('#jss');

//let dropdown = document.getElementById('webdevlist');
dropdown.addEventListener('change', function(){
    // headertwo.style.color = "purple";
    html.syle.color = "purple";
    css.syle.color = "purple";
    jss.syle.color = "purple";
    let codeValue = dropdown.value;
    console.log(codeValue);
    document.getElementsById(codeValue).style.color = 'red';
});
      

