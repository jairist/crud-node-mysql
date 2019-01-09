const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const session = require('express-session');

const {database } = require('./keys');

//initializations 

const app = express();


//settings 
app.set('port', process.env.PORT || 4000);
//decirle a node donde esta la carpeta views

app.set('views', path.join(__dirname, 'views'));

//configurar handlerbars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//middlewares
app.use(session({
    secret: 'mysqlnotejairist',
    resave:false,
    saveUninitialized:false,
    sotre: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Global Variables
app.use((req, res, next)=> {
    app.locals.success = req.flash('success');
    next();
});

//preparar el middleware
app.use((req, res,next) => {
    next();
} );

//Routes
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//public 
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server

app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'));
});
