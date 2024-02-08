//Chaves da api de imagem do unsplash
//K39TOYwaArSvgk1q95dtq6wrFpbsRV_1EvaNinsiWVM
//-----------------------------------------//
//Chaves da Api de clima 
// 1368b56c8e60c666fc675f5dc66e676b
//72d518309623e504a968bee7ac506ced
// Variaveis



const bolacha = "72d518309623e504a968bee7ac506ced";
const apiCountryURL = 'https://flagsapi.com/BE/flat/64.png';
const imgCity = document.querySelector(".container-cidade")

const cityInput = document.querySelector('#iclima');
const searchBtn = document.querySelector('#isearch');

const cityElement = document.querySelector('#icity')
const tempElement = document.querySelector('#itemperatura span ');
const descElement = document.querySelector('#idescricao');
const weatherIconElement = document.querySelector('#iweather-icon');
const countryElement = document.querySelector('#icountry');
const humidityElement = document.querySelector('#ihumidade span');
const windElement = document.querySelector('#iwind span');
const weatherElement = document.querySelector('#weather-data')



//funções
const getImageBackGround = async (siglaPais) => {
    const apiUnsplashURL = `https://api.unsplash.com/search/photos?page=1&query=${siglaPais}e&order_by=relevant&client_id=K39TOYwaArSvgk1q95dtq6wrFpbsRV_1EvaNinsiWVM`;
    const espera = await fetch(apiUnsplashURL);
    const pack = await espera.json();
    console.log(pack);
    return pack;

}


const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${bolacha}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    console.log(data);
    return data;

};



let siglaPais;


const showWeatherData = async (city) => {

     const data = await getWeatherData(city);
    weatherElement.classList.remove('hide');
            cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`);
        humidityElement.innerText = `${data.main.humidity}%`
        windElement.innerText = `${data.wind.speed}/km/h`
        





        //Parte da codficação para adcionar os dados da Api de clima no DOM hml.
        


        countryElement.onload = () => {
            weatherElement.classList.remove('loading')

        }

        //efeito skeleton
    


    //Parte da codificação para adcionar a imagem de fundo de acordo com o país
    siglaPais = data.sys.country;
    const packReturn = await getImageBackGround(siglaPais);
    imgCity.setAttribute('style', `background-image: url(${packReturn.results[0].urls.full});`)
}






//Eventos
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);


})
