const inputContainer = document.getElementById('input-container');
const countdonwForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date; // this specify in the function and gets date from it
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today); // you cant choose dates before

//populate countdown complete Uİ
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day); // it will return largest number
        const hours = Math.floor((distance % day) / hour); // return what leftover from day
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        //hite input
        inputContainer.hidden = true;

        //if the countdown hgas ended show cpmplete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // else show the countdown in progress
            //populate countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}



//take values from form input e = event
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown)); // without json it shows object on localstorage


    //check for valid date
    if (countdownDate === '') {
        alert('Please select a date!');
    } else {
        //get number version of current date, updateDom
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

//reset countdown all
function reset() {
    //hide counts show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    //stop countdown
    clearInterval(countdownActive);
    //reset calues;
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown'); // removed localstorage too
}

function restorePreviousCountdown() {
    //get countdown from localstorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

//eventlistener
countdonwForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// on load, check localstorage
restorePreviousCountdown();