/* Global Variables */
const actionButton = document.body.querySelector('#generate');
const entryHolder = document.body.querySelector('#entryHolder');
const fragment = document.createDocumentFragment();

// Personal API Key for OpenWeatherMap API
const apiKey = '771c23218cab5bce9d9010b6fc11c5c4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;


/* Main Function in an event listener */
actionButton.addEventListener('click', async function action() {
    const zipCode = document.body.querySelector('#zip').value;
    const feelings = document.body.querySelector('#feelings').value
    try {
        const temperature = await getTemperature(zipCode);
        await saveData(temperature, feelings);
        const finalData = await getData();
        updateUi(finalData);
    } catch(error) {
        console.log(error);
    }
});


/* Function to GET Web API Data */
async function getTemperature(zipCode) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.main.temp;
    return temperature;
};

/* Function to POST data */
async function saveData(temperature, feelings) {
    await fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: newDate,
            temp: temperature,
            feelings: feelings
        })
    })
};

/* Function to GET Project Data */
async function getData() {
    const response = await fetch('/getData');
    const finalData = await response.json();
    return finalData;
};

/* Function to update the DOM */
function updateUi(data) {
    const newDate = document.createElement('div');
    const newTemp = document.createElement('div');
    const newContent = document.createElement('div');

    newDate.id = `date`;
    newTemp.id = `temp`;
    newContent.id = `content`;

    newDate.innerHTML = `Date: ${data.date}`;
    newTemp.innerHTML = `Temperature: ${data.temp}`;
    newContent.innerHTML = `You feel: ${data.feelings}`;

    fragment.append(newDate, newTemp, newContent);
    entryHolder.append(fragment);
};