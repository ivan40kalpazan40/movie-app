const app = Sammy("#app", function(){

    this.use('Handlebars', 'hbs');
   
    // GET HOME
    this.get('/', function(context){

        db
            .collection("movies")
            .get()
            .then(res => {
                context.movies = [];
                res.forEach(movie => {
                    context.movies.push({id:movie.id, ...movie.data() })
                    loadPartials(context).then(function(context){
                        this.partial('../views/home.hbs'); 
                    });
            });
        });
    });

    // GET REGISTER
    this.get('/register', function(context){
        loadPartials(context).then(function(context){
            this.partial('../views/register.hbs'); 
        });
    });

    this.post('/register', function(context){
        const { email, password, repeatPassword } = context.params;
        if(password !==repeatPassword) return;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                context.redirect('/login');
            })
            .catch(errorHandler);
    });

    // GET LOGIN
    this.get('/login', function(context){
        loadPartials(context).then(function(context){
            this.partial('../views/login.hbs'); 
        });
    });

    // POST LOGIN
    this.post('/login', function(context){
        const { email, password } = context.params;
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                saveUserData(res);
                this.redirect('/');
            })
            .catch(errorHandler);
    });

    // GET Add Movie
    this.get('/add-movie', function(context){
        loadPartials(context).then(function(context){
            this.partial('../views/add-movie.hbs'); 
        });
    });

    // POST Add Movie
    this.post('/add-movie', function(context){
        const { title, description, imageUrl } = context.params;
        db.collection("movies").add({
            title,
            description,
            imageUrl,
            author:getUser().email
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            context.redirect('/');
        })
        .catch(errorHandler);
        
    });

    // GET DETAILS
    this.get(`/details/:id`, function(context){
      const { id } = context.params;
      db.collection('movies')
        .doc(id)
        .get()
        .then(res => {
            context.movie = {id,...res.data()};
            context.isAuthor = res.data().author === getUser().email;
            loadPartials(context).then(function(context){
                this.partial('../views/details.hbs'); 
            });
        })
        .catch(errorHandler);
        
    });

    this.get('delete/:id', function(context){
        const { id } = context.params;
        console.log(id);
        db.collection('movies')
            .doc(id)
            .delete().then(function() {
            context.redirect('/');
        }).catch(errorHandler);
    });

    // GET Edit Movie
    this.get('/edit-movie/:id', function(context){
        const { id } = context.params;
        db.collection('movies')
        .doc(id)
        .get()
        .then(res => {
            context.movie = {id,...res.data()};
            context.isAuthor = res.data().author === getUser().email;
            loadPartials(context).then(function(context){
                this.partial('../views/edit-movie.hbs'); 
            });
        })
        .catch(errorHandler);
    });
    
    // POST Edit Movie
    this.post('/edit-movie/:id', function(context){
        const { title, description, imageUrl, id } = context.params;
        db.collection('movies')
            .doc(id)
            .set({
            title,
            description,
            imageUrl,
            author:getUser().email
        }).then(res => {
            context.redirect(`/details/${id}`);
        }).catch(errorHandler);
    });


    // GET LOGOUT
    this.get('/logout', function(context){
        auth.signOut()
            .then(function(){
                clearUser();
                context.redirect('/login');
            })
            .catch(errorHandler);
    });


});

(()=>{
    app.run('/');
})();