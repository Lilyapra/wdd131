
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
                document.body.classList.add('dark-mode');
                logo.src = 'byui-logo-white.png';

        // code for changes to colors and logo
    } else {
        document.body.classList.remove('dark-mode');
        logo.src = 'byui-logo-blue.webp';
        // code for changes to colors and logo
    }
}           
                    