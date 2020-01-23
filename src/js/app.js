import '../css/style.css';
import './plugins';
import locations from "./store/location";
import formUI from "./views/form";
import currencyUI from "./views/currency"


document.addEventListener('DOMContentLoaded', ()=>{

    initApp();
    const form=formUI.form;

    //Events

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        onFormSubmit()
    })



// 1) инит самого апп
//Handlers обработчики стартовой функции
async function initApp(){
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
}

async function onFormSubmit(){
    // сбор данных из инпутов/ в форме сборщик, геттеры

    const origin=locations.getCityCodeByKey(formUI.originValue);
    const destination=locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date=formUI.departDateValue;
    const return_date=formUI.returnDateValue;
    const currency=currencyUI.currencyValue;
     //CODE, CODE-форматируем через locations.getCityByKey, 2020-01, 2020-02 - материалайз datePicker-format
    console.log(origin, destination, depart_date, return_date);

    await locations.fetchTickets({
        origin,
        destination, 
        depart_date, 
        return_date,
        currency
    });


    


}

});
