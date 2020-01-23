import api from '../services/apiService';

class Locations {
    constructor(api){
        this.api=api;
        this.countries=null;
        this.cities=null;
        // 3)создадим переменную для автокомплита 
        this.shortCitiesList=null;
    }
    async init(){
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
        ]);

        const [countries, cities]=response;
        this.countries=this.serializeCountries(countries);
        this.cities=this.serializeCities(cities)
        this.shortCitiesList=this.createShortCitiesList(this.cities);
        // console.log(this.shortCitiesList);
         
        return response;
    }

    //передаем в апп для того, чтоб на сервер передавать код города
    getCityCodeByKey(key){
        return this.cities[key].code;
    }



    //2)формируем данные для автокомплита
    createShortCitiesList(cities){
        //так как на входе получаем сериализованный объект объектов, то используем Object.entries === [[],[]]
        // {'city,country': null} на вход имеем
        // [key] - должны получить 
        //
        return Object.entries(cities).reduce((acc, [key])=>{
            acc[key]=null;
            return acc;     
        },{})
    }

    //1)Преобразуем страны в формат который нам нужен ES:{ name: "Испания", ....}
    serializeCountries(countries){
        //{'Country code': {...}} - нам нужен такой форт
        return countries.reduce((acc,country)=>{
            acc[country.code]=country;
            return acc;
        },{})
    } 

    //1)Преобразуем города в формат который нам нужен.
    //Ключем будет название, которое мы хотим использовать
    serializeCities(cities){
        // {'City name, Country name': {....}} -нужен такой формат для автокомплита
        return cities.reduce((acc, city)=>{
            const country_name=this.getCouytryNameByCode(city.country_code);
            const city_name = city.name||city.name_translations.en;
            const key=`${city_name},${country_name}`;
            acc[key]=city;
            return acc;
        },{});
    }

    //1)Принадлежность города к стране определяется кодом страны описанным в городе.
    getCouytryNameByCode(code){
        // {'Country code': {...}} на данный момент
        return this.countries[code].name;
    }

    // вывод цены
    async fetchTickets(params){
        const response=await this.api.prices(params);
        console.log(response);
        
    }
   
}

const locations=new Locations(api);

export default locations;

// {'City, Country':null. null это картинка, которую принимает материалайз}
// [{},{}] we have
// {'City': {...}}=> cities[code] для удобства к отдельному объекту, городу
//