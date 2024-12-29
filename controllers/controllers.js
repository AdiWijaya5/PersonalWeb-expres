const { formatDateToWIB } = require('../utils/time');
const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

function renderHome(req, res) {
  res.render('index');
}
// BLOGS
let projects = [];

async function rendermyproject(req, res) {
  const query = `SELECT * FROM public."Blogs" ORDER By "createdAt" DESC`;
  const projects = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log(projects);
  res.render('myproject', { projects: projects });
}

async function renderProjectDetail(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  // console.log('hasil query :', project[0]);
  res.render('project-detail', { data: project[0] });
}

function renderaddproject(req, res) {
  res.render('add-project');
}

async function addBlog(req, res) {
  const { inputTitle, inputContent, dateStart, dateEnd, arrChechbox } = req.body;
  console.log('from submitted');

  const image = 'https://picsum.photos/200/300';

  const query = `INSERT INTO public."Blogs"
                (title, content, image)
                VALUES
                ('${inputTitle}',' ${inputContent}', '${image}')  
  `;

  const result = await sequelize.query(query, { type: QueryTypes.INSERT });

  console.log(result);

  res.redirect('/myproject');
}

async function renderEditProject(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  // console.log('hasil query :', project[0]);
  res.render('edit-project', { data: project[0], id: id });
}

async function updateProject(req, res) {
  const { id } = req.params;
  const { inputTitle, inputContent, dateStart, dateEnd } = req.body;

  const query = `UPDATE public."Blogs"
                  SET Blogs title, content,   
                  WHERE ${id} ,${title}, ${content}`;

  const result = await sequelize.query(query, { type: QueryTypes.UPDATE });

  console.log(result);

  res.redirect('/myproject');
}

function deletProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public."Blogs"
                  WHERE id = ${id}`;
  const result = sequelize.query(query, { type: QueryTypes.DELETE });

  console.log('result query delete :', result);

  res.redirect('/myproject');
}

function rendercontact(req, res) {
  res.render('contact');
}
function rendertestimonial(req, res) {
  res.render('testimonial');
}
function renderaddcontact(req, res) {
  res.render('addcontact');
}
function rendererror(res, req) {
  res.render('error.hbs');
}

function render404(req, res) {
  res.render('error.hbs');
}

module.exports = {
  renderHome,
  rendercontact,
  rendermyproject,
  addBlog,
  renderProjectDetail,
  renderaddproject,
  renderEditProject,
  updateProject,
  deletProject,
  rendertestimonial,
  renderaddcontact,
  render404,
  rendererror,
};
