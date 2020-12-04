function loadPartials(context){
    const user = getUser();
    context.isLogged = Boolean(user);
    context.email = user? user.email:'Guest';
    return context.loadPartials({
        'header': '../views/const/header.hbs',
        'footer': '../views/const/footer.hbs',
        'notifications': '../views/const/notifications.hbs'
    });
}



function saveUserData(data){
    const { email, uid } = data.user;
    localStorage.setItem('user', JSON.stringify({email, uid}));
}

function getUser(){
    const user = localStorage.getItem('user');
    return user? JSON.parse(user): null;
}


function clearUser(){
    localStorage.removeItem('user');
}



function succesHandler(data){
    document.getElementById('success').textContent = `${data}`;
    document.getElementById('success').style.display = 'block';
    setTimeout(function(){
        document.getElementById('success').textContent = ``;
        document.getElementById('success').style.display = 'none';
    },5500)
}
function errorHandler(error){
    let errorCode = error.code;
    let errorMessage = error.message;
    document.getElementById('error').textContent = `${errorMessage}`;
    document.getElementById('error').style.display = 'block';
    setTimeout(function(){
        document.getElementById('error').textContent = ``;
        document.getElementById('error').style.display = 'none';
    },5500)
    console.log(`${errorCode}:${errorMessage}`);
}