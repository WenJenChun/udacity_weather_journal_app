/* Global Variables */
const apiKey = '48becda6ff4eae22bbcd5a51e542cbcb&units=imperial';
const apiUrl = (zipCode) => {
    return `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

// chain all together
function performAction(e){
    const userFeeling = document.getElementById('feelings').value;
    const locationZip = document.getElementById('zip').value;
    getZipWeather(apiUrl(locationZip))
    .then(function(data){
        // console.log(data.main.temp);
        postData('/add', {date: newDate, temperature: data.main.temp, userResponse: userFeeling} )
    })

    // ==== 2 ways to update UI: ====
    // ==== 1 give it a function ====
    // .then(function(data){
    //     updateUI()
    // })
    // ==== 2 accept function refrence instead function call====
    .then(updateUI)
    
}

//post user input data
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),         
  });
    try {
        const newData = await response.json();
        console.log('postData:');
        console.log(newData);
        return newData
    }catch(error) {
        console.log("error", error);
    }
}

//get zip weather from api
const getZipWeather = async (url) =>{
    const res = await fetch(url);
    try {
        const weatherData = await res.json();
        console.log(weatherData.main.temp);
        return weatherData;
    }
    catch(error) {
        console.log("error", error);
    }
}

// update UI 
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
    //   console.log('updateUI:');
      console.log(allData);
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('content').innerHTML = allData.userResponse;
    }catch(error){
      console.log("error", error);
    }
  }
