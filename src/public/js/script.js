  window.onload = function(){ 
  
  document.querySelector('button').onclick = function(){ 
  //var nome = prompt('Qual é o seu nome?');
  //alert('Olá ' + nome + '! Vamos começar o teste');
  swal({

 	   title: "Antes de começar o teste",
	    text: "Qual é o seu nome?",
	    type: "input",
	    closeOnConfirm: false
	 },
	 function (valor){
	      if (valor === false) 
	 	return false;      
	      if (valor === ""){     
	         swal.showInputError("Nem um palpite?");     
	         return false   
	      }      
	  swal("Tudo certo!", "Podemos começar o teste " + valor, "success");	
	  setTimeout(function(){
		window.location.replace("quizz.html");	
	  },3000)			
    });



	}
}