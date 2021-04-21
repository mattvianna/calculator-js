class calcController {
    constructor(){
        this._audio = new Audio('click.mp3');
        this._audioOnOff = true;
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];

        this._displayEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();
        this.initKeyboard();
    }

    
    pasteFromClipboard() {

        document.addEventListener('paste', (e) => {
            let paste = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(paste);
        })

    }

    copyToClipboard() {

        const input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        input.remove();

    }

    // metedo(função) que inicializa a data e hora da calc
    initialize() {

        // metedo que capta os getters e setters dos atributos dataEl e timeEl,
        // onde estão seus respectivos querySelector
        this.setDisplayDateTime();

        setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000)

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', (e) => {
                this.toggleAudio();
                this.playAudio();
            })

        })
    }

    toggleAudio() {
        this._audioOnOff = (this._audioOnOff) ? true : false;
    }

    playAudio() {
        
        if(this._audioOnOff) {
            this._audio.currentTime = 0;
            this._audio.play();
        }

    }

    initKeyboard() {
        
        document.addEventListener('keyup', (e) => {

            this.playAudio();

            switch(e.key) {
                case 'Escape':
                    this.allClear();
                break;
    
                case 'Backspace':
                    this.cancelEntry();
                break;
    
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                break;

                case 'Enter':
                case '=':
                    this.calc();
                break;
    
                case '.':
                case ',':
                    this.addDot();
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
                    this.addOperation(parseInt(e.key));
                break;

                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                break;
    
            }

        })

    }

    // limpa a calculadora
    allClear() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    // limpa a última entrada
    cancelEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
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

    getResult() {
        try{
            return eval(this._operation.join(''));
        }catch(e) {
            setTimeout(()=> {
                this.setError();
            }, 1)
        }
    }

    calc() {
        
        let last = '';
        
        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3) {
            let firstNumber = this._operation[0];
            this._operation = [firstNumber, this._lastOperator, this._lastNumber];
        }
        
        if(this._operation.length > 3) {
            
            last = this._operation.pop();
            this._lastNumber = this.getResult();
            
        }else if(this._operation.length == 3) {
            
            this._lastNumber = this.getLastItem(false);
            
        }
        
        let result = this.getResult();
        
        if(last == '%') {
            result /= 100;
            this._operation = [result];
        }else {
            this._operation = [result];

            if(last !== '') {
                this._operation.push(last);
            }
        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) {
        let lastItem;

        for(let i = this._operation.length-1; i >= 0; i--) {
            if(this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);

        if(!lastNumber) {
            lastNumber = 0;
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
                this.setLastOperation(newValue);
                this.setLastNumberToDisplay()
            
            }

        }

    }

    addDot() {

        let lastOperation = this.getlastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        }else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }

    execButton(value) {

        this.playAudio();
        
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
                this.calc();
            break;

            case 'ponto':
                this.addDot();
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

        if(value.toString().length > 10) {
            this.setError();
            return false;
        }

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