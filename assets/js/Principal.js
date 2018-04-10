const btnLogout = document.getElementById('buttonLogout');

btnLogout.addEventListener('click', e =>{

	firebase.auth().signOut();

	window.location.replace("index.html");

});


firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			
			// Get elements
			const img = document.getElementById('img');
			const name = document.getElementById('nome');
			const email = document.getElementById('email');
			
			//Create references. referencia do bando de dados do firebase.
			const dbRefObjec = firebase.database().ref();
			const dbRefList = dbRefObjec.child('user');
			
			
			//Sync list changes.metodo de recuperar os dados do usuario.
			dbRefList.on('child_added', snap => {
				
				//para saber qual usuario pegar.
				if(firebaseUser.email == snap.val().email){
					
					// Create a reference with an initial file path and name
					var storage = firebase.storage();
					var pathReference = storage.ref('icon/' + snap.val().name + '/');
					
					pathReference.child(''+ snap.val().name + '').getDownloadURL().then(function(url) {
					// `url` is the download URL for 'images/stars.jpg'
					
					// Or inserted into an <img> element:
					img.src = url;
					}).catch(function(error) {
						// Handle any errors
					});
					
					
					document.getElementById("nome").innerHTML = snap.val().name;
					document.getElementById("email").innerHTML = snap.val().email;
					document.getElementById("img").src = img.src;
					
				}
				
			});
	}else{

	}
});