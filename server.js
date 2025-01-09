const express = require('express');
var session = require('express-session');
var flash = require('express-flash');

var methodOverride = require('method-override');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();
const upload = require('./middlewares/upload-file');

const {
  // renderHome,
  // rendermyproject,
  // renderaddproject,
  // deletProject,
  // updateProject,
  // addBlog,
  // rendercontact,
  // rendertestimonial,
  // renderaddcontact,
  // rendererror,
  // render404,
  // renderEditProject,
  // renderProjectDetail,
  // renderRegister,
  // renderLogin,
} = require('./controllers/controllers');
const {
  renderLogin,
  renderRegister,
  renderHome,
  rendermyproject,
  renderaddproject,
  renderProjectDetail,
  deletProject,
  authRegister,
  authLogin,
  rendertestimonial,
  authLogout,
  addBlog,
  renderEditProject,
  updateProject,
  rendercontact,
  renderaddcontact,
  rendererror,
  render404,
} = require('./controllers/controller-V2');
const { formatDateToWIB, getRelativeTime } = require('./utils/time');
const { truncateText } = require('./utils/text');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(flash());

app.use(
  session({
    name: 'my-session',
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/assets', express.static(path.join(__dirname, './assets')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

hbs.registerPartials(__dirname + '/views/partials', function (err) {});
hbs.registerHelper('truncateText', truncateText);
hbs.registerHelper('formatDateToWIB', formatDateToWIB);
hbs.registerHelper('getRelativeTime', getRelativeTime);
hbs.registerHelper('equal', function (a, b) {
  return a == b;
});

app.get('/login', renderLogin);
app.get('/register', renderRegister);
app.post('/login', authLogin);
app.post('/register', authRegister);

app.get('/logout', authLogout);

app.get('/', renderHome);

app.get('/myproject', rendermyproject);
app.get('/project-detail/:id', renderProjectDetail);

app.post('/myproject', upload.single('image'), addBlog);
app.get('/add-project', renderaddproject);
app.get('/edit-project/:id', renderEditProject);
app.patch('/update-project/:id', upload.single('image'), updateProject);
app.delete('/delet-project/:id', deletProject);

app.get('/addcontact', renderaddcontact);
app.get('/contact', rendercontact);
app.get('/testimonial', rendertestimonial);
app.get('/error', rendererror);
app.get('*', render404);

app.listen(PORT, () => {
  console.log(`Server Berjalan di Port : ${PORT}`);
});
