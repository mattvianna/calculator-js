class calcController {
    constructor(){
        this._operation = [];
        this._displayEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();
    }


    // metedo(função) que inicializa a data e hora da calc
    initialize() {

        // metedo que capta os getters e setters dos atributos dataEl e timeEl,
        // onde estão seus respectivos querySelector
        this.setDisplayDateTime();

        setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000)

    }

    // limpa a calculadora
    allClear() {
        this._operation = [];
    }

    // limpa a última entrada
    cancelEntry() {
        this._operation.pop();
    }

    setError() {
        this.displayCalc = "ERROR";
    }

    // pega o último item o array
    getlastOperation() {
        return this._operation[this._operation.length-1];
    }

    // troca o último valor inserido
    setLastOperation(value) {
        this._operation[this._operation.length-1] = value;
    }

    // adiciona um valor no array 
    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3) {
            this.calc();
        }
    }

    calc() {
        const last = this._operation.pop();
        const result = eval(this._operation.join(''));

        this._operation = [result, last];

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay() {
        let lastNumber;

        for(let i = this._operation.length-1; i >= 0; i--) {
            if(!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }

        this.displayCalc = lastNumber;
    }

    // retorna através do indexOf a posição do array de sinais abaixo
    // no caso o array em questão teria como última posição o 4
    // se ele não encontrar os sinais que são strings nesse array
    // ele retorna -1
    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    addOperation(value) {

        if(isNaN(this.getlastOperation())) {
            
            if(this.isOperator(value)) {

                this.setLastOperation(value);
            
            }else if(isNaN(value)){

            }else {

                this.pushOperation(value);
                this.setLastNumberToDisplay()
            
            }

        }else {

            if(this.isOperator(value)) {

                this.pushOperation(value);
            
            }else {

                const newValue = this.getlastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                this.setLastNumberToDisplay()
            
            }

        }

    }

    execButton(value) {
        
        switch(value) {
            case 'ac':
                this.allClear();
            break;

            case 'ce':
                this.cancelEntry();
            break;

            case 'soma':
                this.addOperation('+');
            break;
        
            case 'subtracao':
                this.addOperation('-');
            break;

            case 'divisao':
                this.addOperation('/');
            break;

            case 'multiplicacao':
                this.addOperation('*');
            break;

            case 'porcento':
                this.addOperation('%');
            break;

            case 'igual':
             
            break;

            case 'ponto':
                this.addOperation('.');
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
            break;

            default:
                this.setError();
            break;

        }

    }

    // metodo criado para usar mais de um tipo de addEventListener na mesma função
    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach((e) => {
            element.addEventListener(e, fn, false)
        })

    }

    // metodo que captura o click do mouse
    initButtonsEvent() {

        const buttonsCalc = document.querySelectorAll('#buttons > g, #parts > g');

        buttonsCalc.forEach((button) => {

            this.addEventListenerAll(button, 'click drag', (e) => {
                
                const buttonText = button.className.baseVal.replace('btn-', '')

                this.execButton(buttonText);

            })

            this.addEventListenerAll(button, 'mouseover mouseup mousedown', (e) => {
                button.style.cursor = "pointer";
            })
        })

    }

    // metodo que captura os getters e setters de data e hora
    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString('pt-br', {day: 'numeric', month: 'short', year: 'numeric'});
        this.displayTime = this.currentDate.toLocaleTimeString('pt-br');

    }

    // captura o valor do elemento em tela, através do querySelector
    get displayCalc() {
        return this._displayEl.innerHTML;
    }

    // captura o valor do elemento em tela, através do querySelector
    get displayDate() {
        return this._dateEl.innerHTML;
    }

    // captura o valor do elemento em tela, através do querySelector
    get displayTime() {
        return this._timeEl.innerHTML;
    }

    // captura a data atual para usar com o atributo timeEl e dateEl
    // que consecutivamente pegam o elemento do botão
    get currentDate() {
        return new Date();
    }


    // coloca o elemento na tela
    set displayCalc(value) {
        this._displayEl.innerHTML = value;
    }

    // coloca o elemento na tela
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    // coloca o elemento na tela
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }
}