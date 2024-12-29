const express = require('express');
var methodOverride = require('method-override');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();

const {
  renderHome,
  rendermyproject,
  renderaddproject,
  deletProject,
  updateProject,
  addBlog,
  rendercontact,
  rendertestimonial,
  renderaddcontact,
  rendererror,
  render404,
  renderEditProject,
  renderProjectDetail,
} = require('./controllers/controllers');
const { formatDateToWIB, getRelativeTime } = require('./utils/time');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, './assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

hbs.registerPartials(__dirname + '/views/partials', function (err) {});
hbs.registerHelper('formatDateToWIB', formatDateToWIB);
hbs.registerHelper('getRelativeTime', getRelativeTime);
hbs.registerHelper('equal', function (a, b) {
  return a == b;
});

app.get('/', renderHome);
app.get('/myproject', rendermyproject);
app.get('/project-detail/:id', renderProjectDetail);
app.post('/myproject', addBlog);
app.get('/add-project', renderaddproject);
app.get('/edit-project/:id', renderEditProject);
app.patch('/update-project/:id', updateProject);
app.delete('/delet-project/:id', deletProject);

app.get('/addcontact', renderaddcontact);
app.get('/contact', rendercontact);
app.get('/testimonial', rendertestimonial);
app.get('/error', rendererror);
app.get('*', render404);

app.listen(PORT, () => {
  console.log(`Server Berjalan di Port : ${PORT}`);
});
