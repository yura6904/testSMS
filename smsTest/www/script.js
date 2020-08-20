let message = document.querySelector('.message');
let counterValue = document.querySelector('.counter-value');
let messageTrans = document.querySelector('.check-trans');
let messCount = document.querySelector('.counter-messages');
let smsCount = document.querySelector('.counter-sms');

let ruAlph = 'а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я,«,»,",–,_,№,`', 
enAlph = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,x,w,y,z,",-,#,\'';

let countRU = 0, countEN = 0, currentValue = 0, lengthOfPrevMessage = 0;

message.addEventListener('input',() => {
    lengthOfPrevMessage =  message.value.length-(message.value.length-lengthOfPrevMessage);

    if (message.value === "") {
        countRU = 0;
        countEN = 0;
        messCount.innerHTML = 0;
    }

    currentValue = counterValue.innerHTML;
    currentValue = message.value.length;
    counterValue.innerHTML = currentValue;
    countSymbols(currentValue, lengthOfPrevMessage);
    
    lengthOfPrevMessage += currentValue - lengthOfPrevMessage;
    countSegments(countEN, countRU);
});

messageTrans.addEventListener('input', ()=>{
    let currentText = message.value;
    currentText = translit(currentText);
    message.value = currentText;
});

function countSegments(enSymbols, ruSymbols) {
    let enCost = 8/7, ruCost = 2, maxSegmentLength = 134;
    let result = messCount.value;
    result = Math.ceil((Math.ceil(enSymbols*enCost) + ruSymbols*ruCost) / maxSegmentLength);
    
    smsCount.innerHTML = result;
    messCount.value = result;
}

function translit (str) {
    let ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
        'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i','й': 'y', 
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 
        'щ': 'shch', 'ъ': '\'', 'ы': 'i', 'ь': '\'', 'э': 'e',
        'ю': 'u', 'я': 'ya', '«':'"', '»':'"', '–':'-', '_':'-', '№':'#', '`':'\''
    };
    
    let en = {
        'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 
        'e': 'е', 'yo': 'ё', 'zh': 'ж', 'z': 'з', 'i': 'и','y': 'й', 
        'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 
        'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 
        'f': 'ф', 'h': 'х', 'ts': 'ц', 'ch': 'ч', 'sh': 'ш', 
        'shch': 'щ', '\'': 'ъ', 'i': 'ы', '\'': 'ь', 'e': 'э',
        'u': 'ю', 'ya': 'я', '"':'«', '"':'»', '-':'–', '-':'_', '#':'№', '\'':'`'
    };

    let newStr = [];

    if (messageTrans.checked){
        for ( let i = 0; i < str.length; ++i ) {
            newStr.push(
                  ru[str[i]]
               || ru[str[i].toLowerCase()] == undefined && str[i]
               || ru[str[i].toLowerCase()].replace(/^(.)/, function (match) {return match.toUpperCase()})
           );
        }
        countEN += countRU;
        countRU = 0;
    }
    else {
        for ( let i = 0; i < str.length; ++i ) {
            newStr.push(
                  en[str[i]]
               || en[str[i].toLowerCase()] == undefined && str[i]
               || en[str[i].toLowerCase()].replace(/^(.)/, function (match) {return match.toUpperCase()})
           );
        }
        countRU += countEN;
        countEN = 0;
    }

    return newStr.join('');
}

function countSymbols(currentValue, lengthOfPrevMessage) {
    let checkFlag = false;
    let lastChar = message.value[message.value.length-1];
    
    if (currentValue === lengthOfPrevMessage-1) {
        if (ruAlph.includes(lastChar)) {
            countRU--;
        }
        if (enAlph.includes(lastChar)) {
            countEN--;
        }
        checkFlag = true;
    }
    if (currentValue < lengthOfPrevMessage) {        
        countRU = 0;
        countEN = 0;
        countSymbols(currentValue, 0);
        checkFlag = true;
    }

    if (currentValue - lengthOfPrevMessage > 1) {
        lastChar = message.value;
        for ( let i = lengthOfPrevMessage; i < currentValue; i++) {
            if (ruAlph.includes(lastChar[i]) || ruAlph.toUpperCase().includes(lastChar[i])) {
                countRU++;
            }
            if (enAlph.includes(lastChar[i]) || enAlph.toUpperCase().includes(lastChar[i])) {
                countEN++;
            }
        }
        checkFlag = true;
    }

    if (!checkFlag){ 
        if (ruAlph.includes(lastChar) || ruAlph.toUpperCase().includes(lastChar)) {
            countRU++;
        }
        if (enAlph.includes(lastChar) || enAlph.toUpperCase().includes(lastChar)) {
            countEN++;
        }        
    }
    

}


