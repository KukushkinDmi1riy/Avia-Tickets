// 
// 1) рендер списка для автокомплита


//Получем инстансы из материалайз
import {getAutocopleteInstance, getDatePickerInstance} from '../plugins/materialize';

class FormUI{
    constructor(autocopleteInstance,datePickerInstance){
    //находим форму и все её инпуты
     this._form=document.forms['locationControles']; //_form-условно "приватная"
     this.origin=document.getElementById('autocomplete-origin');
     this.destination=document.getElementById('autocomplete-destination');
     this.depart=document.getElementById('datepicker-depart');
     this.return=document.getElementById('datepicker-return');

     //инстансы из матИриала
     this.originAutocomplete=autocopleteInstance(this.origin);
     this.destinationAutocomplete=autocopleteInstance(this.destination);
     this.departDatePicker=datePickerInstance( this.depart);
     this.returnDatePicker=datePickerInstance( this.return);
    }
    get form(){
        return this._form; //используем форму в app.js и для прослушивания собыитя submit 
    }
       
    //спец геттеры для app.js. сбор данных из инпутов и дальнейшая передача на сервер
    get originValue(){
        return this.origin.value;
    }
    get destinationValue(){
        return this.destination.value;
    }

    get departDateValue(){
        return this.departDatePicker.toString();
    }
    get returnDateValue(){
        return this.returnDatePicker.toString();
    }

    //функция для обновления данных в автокомплите
    setAutocompleteData(data){
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI=new FormUI(getAutocopleteInstance, getDatePickerInstance);

export default formUI;