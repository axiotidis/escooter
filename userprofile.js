var userEmail ="";
var userPhone =0;
var userPayment = "";
var updPassword ="";
var updCnfPassword ="";
var dbKey ="";

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDU1RPg4avyJA4Dv4DCGtGb2nnne8FZCfk",
    authDomain: "escooter-d43d9.firebaseapp.com",
    databaseURL: "https://escooter-d43d9.firebaseio.com",
    projectId: "escooter-d43d9",
    storageBucket: "escooter-d43d9.appspot.com",
    messagingSenderId: "27699640672",
    appId: "1:27699640672:web:05eb2d79cca519e28d4605",
    measurementId: "G-F2V4WNEBRW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Get a reference to the database service
  let database = firebase.database();


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user = firebase.auth().currentUser;
    var email = user.email;
    //read user details
    readUserData(email);
  } else {
    location.replace("signin.html");
  }
});



function readUserData(email){
	var ref = firebase.database().ref("users");
	ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
		//console.log(snapshot.key);
	dbKey = snapshot.key;	
	let ref = database.ref("users/" + dbKey); 
	ref.on("value" , gotData , errData);
	});
	
}	


  	


function gotData(data){
	data = data.val();
	userEmail = data.email;
	userPhone = data.phone;
	userPayment = data.payment;
	document.getElementById("email").value = userEmail;
	document.getElementById("phone").value = userPhone;
	document.getElementById("payment").value = userPayment;

}

function errData(error){
	console.log(error.message , error.code);
}


  //Reference messages collection
  var usersRef = firebase.database().ref('users');
  
  

//Listen for form submit
document.getElementById('profileForm').addEventListener('submit', submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();
  
    //Get values
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var password = getInputVal('password');
    var payment = getInputVal('payment');
    

    // update user details
    //updateUser(email, password);
    updateDetails(email, phone, payment);

    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },2000);

    //Clear form
    document.getElementById('profilepForm').reset();

    setTimeout(function(){
        document.querySelector('.continue').style.display = 'block';
    },2000);

    setTimeout(function(){
        document.querySelector('.continue').style.display = 'none';
        window.location.replace("app.html");
    },4000);

}



//Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save the details to firebase
function updateDetails(email, phone, payment){
    db.ref("users/" + dbKey).update({ 
	    email: email,
	    phone: phone,
	    payment: payment
	});

}
/**********************************************
function updateUser(email, password){
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	      
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		
		// [START_EXCLUDE]
		if (errorCode == 'auth/weak-password') {		  
			alert('The password is too weak.');
		}else {
			alert(errorMessage);
		}
			console.log(error);
			// [END_EXCLUDE]
		
	
});
}      // [END createwithemail]
*******************************************/
