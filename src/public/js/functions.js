
fetch('http://localhost:3000/questions',{
    cors: true,
})
    .then(res => res.text())
    .then(data => {
        generateQuizz(data)
    })
    .catch(err => console.error(err))
    


let qtdeQuestions = 9
let qtdeAnswers = 5

const random = (start,end) => {
    let arr = []
    for(let count = start-1; count < end; count ++) {
        let val = Math.floor(Math.random()*(end-start+1)+start)
        if(arr.includes(val)) {
            count--
        } else {
            arr.push(val)
        }
    }
    return arr
}

const generateQuizz = (questions) => {
    questions = JSON.parse(questions)
    let randomize = random(0,4)
    let context = document.getElementById('context')
    
    for(let i = 1; i < qtdeQuestions+1; i++) {
        context.innerHTML += `<h1>${i}° ${questions[0][i].quest.text}</h1>`
        for(let x = 0; x < qtdeAnswers; x++){
            context.innerHTML += `
                <div class='answer-wrapper'>
                    <input type='radio' id='${questions[0][i].quest[randomize[x]].course}' name='${i}' value='${questions[0][i].quest[randomize[x]].course}'/>
                    <label style='cursor: pointer;' for='${questions[0][i].quest[randomize[x]].course}' >${questions[0][i].quest[randomize[x]].answer_text}</label>
                </div>
            `
        }
        
    }
}

const sendAnswers = () => {
    let arrAnswers = []
    let send = document.getElementById('submit')
    send.onclick = (e) => {
        e.preventDefault()
        for(let x = 1; x < qtdeQuestions+1; x++){
            let itens = document.querySelectorAll(`.answer-wrapper input[name='${x}']`)
            for(let y = 0; y < qtdeAnswers; y++){
                let val = itens[y]
                if(val != undefined) {
                    let valId = val.checked == true ? itens[y].getAttribute('id') : 'vazio'
                    if(valId != 'vazio' && !arrAnswers.includes(valId)) {
                        arrAnswers.push(valId)
                    }
                }   
            }
        }
        arrAnswers.length != qtdeQuestions ? alert('Para gerar seu resultado você deve responder a todas as questões!') : checkAnswers(arrAnswers)
        
    }
}

const checkAnswers = (param) => {
    param = param.map((e) => e.split('_')[0]) // limpar as siglas dos cursos
    let qtd = param.reduce(function( object , item ){  // contar quantas questões de cada curso foram selecionadas
        if ( !object[item] ) {
            object[item]=1;
        } else {
            object[item]++;
        }
        return object; 
    },{}) //se tirar o objeto vazio não o retorno será apenas uma string
    generateResult(qtd)
}

const generateResult = (result) => {
    let bigger = [ 0, 'curso' ]
    
    let baseObj = ['ADS', 'SI', 'GE', 'GP', 'LOG']
    baseObj.forEach((value, key, arr) => {
        for(let i = 0; i < baseObj.length; i++) {
            if(result[value] > bigger[0] && result[value] != undefined) {
                bigger[0] = result[value]
                bigger[1] = value
            }
        }
    })   

    let cursos = {
        ADS: 'Análise e Desenvolvimento de Sistemas',
        SI: 'Sistemas para Internet',
        GE: 'Gestão Empresarial',
        GP: 'Gestão Portuária',
        LOG: 'Logística'
    }

    alert('Parabéns, você concluiu o Quizz!')
    alert(`Seu resultado foi: ${cursos[bigger[1]]} com ${getPercentage(bigger[0])}% de compatibilidade. `)
    setTimeout(function(){
		window.location.replace("index.html");	
    },3000)		
}

const getPercentage = (val) => {
    return Math.ceil((100 * val) / qtdeQuestions)
}

sendAnswers()
generateQuizz()