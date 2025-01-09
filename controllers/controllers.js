const { formatDateToWIB } = require('../utils/time');
const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

function renderHome(req, res) {
  res.render('index');
}
// BLOGS

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

  res.render('project-detail', { data: project[0] });
}

function renderaddproject(req, res) {
  res.render('add-project');
}

async function addBlog(req, res) {
  const { inputTitle, inputContent, dateStart, dateEnd, image } = req.body;
  const { angular, nodeJs, react, vueJs } = req.body;

  let checkBox = [];
  if (angular) {
    checkBox.push(angular);
  }
  if (nodeJs) {
    checkBox.push(nodeJs);
  }
  if (react) {
    checkBox.push(react);
  }
  if (vueJs) {
    checkBox.push(vueJs);
  }

  // const image = 'https://picsum.photos/200/300';

  const query = `INSERT INTO public."Blogs"
                (title, content, "startDate", "endDate", teknologi, image)
                VALUES
                ('${inputTitle}', '${inputContent}', '${dateStart}', '${dateEnd}', '${checkBox}','${image}') `;

  const result = await sequelize.query(query, { type: QueryTypes.INSERT });

  console.log(result);

  res.redirect('/myproject');
}

async function renderEditProject(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Blogs" WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  const ckt = req.query.tech;
  console.log(ckt);

  const tech = project[0].teknologi;

  const angular = tech.includes('Angular');
  const nodeJs = tech.includes('NodeJs');
  const react = tech.includes('React');
  const vueJs = tech.includes('VueJs');

  res.render('edit-project', { data: project[0], angular, nodeJs, react, vueJs });
}

async function updateProject(req, res) {
  const { id } = req.params;
  const img = req.query.image;
  let { inputTitle, inputContent, dateStart, dateEnd, image } = req.body;
  const { angular, nodeJs, react, vueJs } = req.body;

  if (image == '') {
    image = img;
  }

  let checkBox = [];
  if (angular) {
    checkBox.push(angular);
  }
  if (nodeJs) {
    checkBox.push(nodeJs);
  }
  if (react) {
    checkBox.push(react);
  }
  if (vueJs) {
    checkBox.push(vueJs);
  }

  const query = `UPDATE public."Blogs"
                  SET title ='${inputTitle}', content ='${inputContent}', "startDate"='${dateStart}', "endDate"= '${dateEnd}', teknologi ='${checkBox}', image ='${image}'
                 WHERE id = ${id}`;

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
