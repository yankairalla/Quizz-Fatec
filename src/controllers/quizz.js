
const Quizz = require("../models/quizz");

exports.getIndex = (req, res, next) => {
  if(!req.session.result) {
    return res.render("index.ejs", {result: false});
  }
  res.render('index.ejs', {result: req.session.result})
  req.session.destroy();
};

exports.postUser = async (req, res, next) => {
  const { name, age, sex } = req.body;
  req.session.user = { name, age, sex };
  console.log(req.session.user)
  res.redirect('/quizz');
}

exports.getQuizz = async (req, res, next) => {
  if(!req.session.user) {
    res.redirect('/')
  }
  const random = (start, end) => {
    const arr = [];
    for (let count = start - 1; count < end; count++) {
      let val = Math.floor(Math.random() * (end - start + 1) + start);
      if (arr.includes(val)) {
        count--;
      } else {
        arr.push(val);
      }
    }
    return arr;
  };

  const generateQuizz = questions => {
    const questionary = [];

    questions.map(({ title, answers }) => {
      const obj = {
        title,
        answers: answers.map(({ course, answer_text }) => ({
          course,
          answer_text
        }))
      };
      return questionary.push(obj);
    })
    res.render("quizz.ejs", {
      questionary
    });
  };

  quizzes = await Quizz.find();
  generateQuizz(quizzes);
};

exports.postQuizz = (req, res, next) => {
  const checkAnswers = param => {
    param = Object.values(param).map(e => e.split("_")[0]); // limpar as siglas dos cursos
    let qtd = param.reduce(function(object, item) {
      // contar quantas questões de cada curso foram selecionadas
      if (!object[item]) {
        object[item] = 1;
      } else {
        object[item]++;
      }
      return object;
    }, {}); //se tirar o objeto vazio não o retorno será apenas uma string
    return generateResult(qtd);
  };

  const generateResult = result => {
    let bigger = [0, "curso"];

    let baseObj = ["ADS", "SI", "GE", "GP", "LOG"];
    baseObj.forEach((value, key, arr) => {
      for (let i = 0; i < baseObj.length; i++) {
        if (result[value] > bigger[0] && result[value] != undefined) {
          bigger[0] = result[value];
          bigger[1] = value;
        }
      }
    });

    let cursos = {
      ADS: "Análise e Desenvolvimento de Sistemas",
      SI: "Sistemas para Internet",
      GE: "Gestão Empresarial",
      GP: "Gestão Portuária",
      LOG: "Logística"
    };

    const getPercentage = (val,qtdQuestions) => {
      return Math.ceil((100 * val) / qtdQuestions);
    };

    const resultQuizz = `Seu resultado foi: <strong>${cursos[bigger[1]]} </strong> com 
    <strong>${getPercentage(bigger[0], 5)}%</strong> de compatibilidade. `;

    return resultQuizz;
  };

  
  // console.log(checkAnswers(req.body))
  req.session.result = checkAnswers(req.body);
  // console.log(req.session.result)
  res.redirect('/');
};
