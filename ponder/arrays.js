
//.forEach
const steps = ['one', 'two', 'three'];

// steps.forEach(function (item) {
//     console.log(item);
// });

steps.forEach(showStep);

function showStep(step) {
    console.log(step);

}


//.map

let myList = document.querySelector('#myList');

const stepsHtml = steps.map(listTemplate);

function listTemplate(step) {
    //  My PT-EU keyboard doesn't have backticks, nor the shortcut seems to work.
    //  I had to copy and paste from a google search.
    return `<li>${step}</li>`;
}

myList.innerHTML = stepsHtml.join('');


let grades = ['A', 'B', 'C'];
let points;

let gpaPoints = grades.map(convert);

function convert(grade) {
    switch (grade) {
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}


console.log(gpaPoints);

//.reduce

let totalPoints = gpaPoints.reduce(getTotal);

function getTotal(total, points) {
    return total + points;
}

console.log(totalPoints);

let gpaAverage = totalPoints / gpaPoints.length;
console.log(gpaAverage);

//.filter
const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const shortWords = words.filter(function (word) {
    return word.length < 6;
});

console.log(shortWords);

//.indexOf

const myArray = [12, 34, 21, 54];
const luckyNumber = 21;
const luckyIndex = myArray.indexOf(luckyNumber);

console.log(luckyIndex);

//dynamic content

let container = document.querySelector('#student-container');

const students = [
    {
        last: 'Andrus',
        first: 'Aaron'
    },
    {
        last: 'Masa',
        first: 'Manny'
    },
    {
        last: 'Tanda',
        first: 'Tamanda'
    }
];

students.forEach(function (item) {
    let name = document.createElement('div');
    name.className = 'format';

    let html = `
        <span>${item.first}</span>
        <span>${item.last}</span>
        <hr>
    `;

    innerHTML = name.innerHTML = html;
    container.appendChild(name);
});

