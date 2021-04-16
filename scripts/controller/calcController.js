class calcController {
    constructor(){
        this._displayEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
    }


    initialize() {

        this.setDisplayDateTime();

        setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000)

    }

    initButtonsEvent() {

        const buttonsCalc = document.querySelectorAll('#buttons > g, #parts > g');

    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString('pt-br', {day: 'numeric', month: 'short', year: 'numeric'});
        this.displayTime = this.currentDate.toLocaleTimeString('pt-br');

    }


    get displayCalc() {
        return this._displayEl.innerHTML;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    get currentDate() {
        return new Date();
    }



    set displayCalc(value) {
        this._displayEl.innerHTML = value;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }
}