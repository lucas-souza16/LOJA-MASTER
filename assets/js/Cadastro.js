const novoEmail = document.getElementById('email');
const novoPass = document.getElementById('password');
const novoName = document.getElementById('first_name');
const novoCPF = document.getElementById('cpf');
const novoSexo = document.getElementById('sexo');
const novoData = document.getElementById('data');
const filebutton = document.getElementById('arquivo');
var file;
//Adiciona o arquivo na variavel file.
filebutton.addEventListener('change', function(e){
		
    file = e.target.files[0];
		
});
	
btnNovo.addEventListener('click' , e => {

    
		
	var confirma = cadastra(file,novoName.value, novoEmail.value, novoPass.value,novoCPF.value, novoSexo.value, novoData.value);
		
});

function cadastra(file, novoName, novoEmail, novoPass, novoCPF, novoSexo, novoData){
		
    //Para testar si o usuario clicou na cor e adicinou o arquivo.
    if((file) && (novoName) && (novoCPF) && (novoSexo) && (novoData)){

        //Cria o usuario no firebase no autenticar.
        firebase.auth().createUserWithEmailAndPassword(novoEmail, novoPass).then(function(){
            // Update successful.
            //Cria o usuario no firebase no database.
            firebase.database().ref('user/').push({
                name : novoName,
                email : novoEmail,
                pass : novoPass,
                cpf : novoCPF,
                sexo : novoSexo,
                data : novoData
            }).key;
            
            //Cria uma referencia no storage do firabase.
            var storageRef = firebase.storage();
            firebase.storage().ref('icon/' + novoName + '/' + novoName);
            //Ele adiciona a foto na referencia criada no firabase storage.
            storageRef.put(file);
            
            alert("Cadastro feito com sucesso!")
            console.log("entrou")
            return true;
        }, function(error) {
            /*An error happened. Erro de criaçao no autenticar.
            if(document.getElementById("email").value == "" || document.getElementById("password").value == "" ){
                alert("Preencha as campos vazios!")
                return false;
            }else{
                alert("Dados incorretos")
                return false;
            }*/
        });
        
    }else{
        alert("ERRO! Nao adicionou o arquivo ou Nao preencheu os campos!");
        return false;
    }
}

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        
        //Se ele tiver logado com sucesso ele e mandado para a pagina principal.
    }else{
    
    }
});