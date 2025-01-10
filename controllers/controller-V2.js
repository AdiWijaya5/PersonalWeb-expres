const { formatDateToWIB } = require('../utils/time');
const { Sequelize, QueryTypes, Model, where } = require('sequelize');
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
var fs = require('fs');
const path = require('path');
const { Blog, User } = require('../models');
const users = require('../models/users');
const { request } = require('http');

const saltRounds = 10;

const sequelize = new Sequelize(config.development);

async function authRegister(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (!username) {
    req.flash('error', 'Username Tidak Boleh Kosong');
    return res.redirect('/register');
  }
  if (!email) {
    req.flash('error', 'Email Tidak Boleh Kosong');
    return res.redirect('/register');
  }

  const mail = await User.findOne({
    where: {
      email,
    },
  });
  if (mail) {
    req.flash('error', 'Email Sudah Terdaftar Silakan Masukan Email Yang Baru');
    return res.redirect('/register');
  }

  if (!password) {
    req.flash('error', 'Password Tidak Boleh Kosong');
    return res.redirect('/register');
  }
  if (password.length < 6 || password.length > 12) {
    req.flash('error', 'Password Harus Memiliki Minimal 6 Character dan Maksimal 12 Character');
    return res.redirect('/register');
  }
  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  req.flash('success', 'Register Success');
  res.redirect('/login');
}

async function authLogin(req, res) {
  const { email, password } = req.body;

  const users = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!users) {
    req.flash('error', 'Email Yang Anda Masukkan Tidak Terdaftar');
    return res.redirect('/login');
  }

  const isValidate = await bcrypt.compare(password, users.password);

  if (!isValidate) {
    req.flash('error', 'Password Yang Anda Masukkan Salah, Coba lagi');
    return res.redirect('/login');
  }

  let loginSession = users.toJSON();

  delete loginSession.password;

  req.session.users = loginSession;

  req.flash('success', `Login Success, Hai ${loginSession.username}`);
  res.redirect('/');
}

function renderHome(req, res) {
  const { users } = req.session;
  res.render('index', { users });
}
function renderLogin(req, res) {
  const users = req.session.users;

  if (users) {
    res.redirect('/');
  } else {
    res.render('auth-fromLogin');
  }
}
function renderRegister(req, res) {
  res.render('auth-fromRegister');
}

async function rendermyproject(req, res) {
  const { users } = req.session;

  const projects = await Blog.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    order: [['createdAt', 'DESC']],
  });

  res.render('myproject', { projects: projects, users });
}

async function addBlog(req, res) {
  const { users } = req.session;
  const { inputTitle, inputContent, dateStart, dateEnd, angular, nodeJs, react, vueJs } = req.body;

  let checkBox = '';
  if (angular) {
    checkBox += ` ${angular} `;
  }
  if (nodeJs) {
    checkBox += ` ${nodeJs} `;
  }
  if (react) {
    checkBox += ` ${react} `;
  }
  if (vueJs) {
    checkBox += ` ${vueJs} `;
  }

  const image = 'http://localhost:5000/' + req.file.path;

  const id_User = users.id;

  if (!inputTitle) {
    req.flash('error', 'Judul Tidak Boleh Kosong');
    return res.redirect('/myproject');
  }
  if (!inputContent) {
    req.flash('error', 'Content Tidak Boleh Kosong');
    return res.redirect('/myproject');
  }
  if (!dateStart) {
    req.flash('error', 'Content Tidak Boleh Kosong');
    return res.redirect('/myproject');
  }
  if (!dateEnd) {
    req.flash('error', 'Content Tidak Boleh Kosong');
    return res.redirect('/myproject');
  }

  await Blog.create({
    title: inputTitle,
    content: inputContent,
    startDate: dateStart,
    endDate: dateEnd,
    teknologi: checkBox,
    image: image,
    user_id: id_User,
  });

  req.flash('success', 'success add Project');
  res.redirect('/myproject');
}

async function renderProjectDetail(req, res) {
  let { users } = req.session;
  const { id } = req.params;

  const projectDetail = await Blog.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    where: {
      id: id,
    },
  });

  if (!projectDetail[0]) {
    req.flash('error', 'Project tidak ada');
    return res.redirect('/my-project');
  }

  const angular = projectDetail[0].teknologi.includes('Angular');
  const nodeJs = projectDetail[0].teknologi.includes('NodeJs');
  const react = projectDetail[0].teknologi.includes('React');
  const vueJs = projectDetail[0].teknologi.includes('VueJs');

  // if (projectDetail === null) {
  //   res.render('error.hbs', { message: 'Blog tidak ditemukan' });
  // } else {
  //   console.log('Project Detail :', projectDetail);

  res.render('project-detail', { data: projectDetail[0], users, angular, nodeJs, react, vueJs });
}

async function renderEditProject(req, res) {
  const { users } = req.session;
  const { id } = req.params;

  const data = await Blog.findOne({
    where: {
      id: id,
    },
  });

  if (!users) {
    req.flash('error', 'Silahkan login');
    return res.redirect('/login');
  }
  const angular = data.teknologi.includes('Angular');
  const nodeJs = data.teknologi.includes('NodeJs');
  const react = data.teknologi.includes('React');
  const vueJs = data.teknologi.includes('VueJs');

  res.render('edit-project', { data, users, angular, nodeJs, react, vueJs });
}
function renderaddproject(req, res) {
  const { users } = req.session;

  if (!users) {
    req.flash('error', 'Silahkan login');
    return res.redirect('/login');
  }
  res.render('add-project', { users });
}

async function deletProject(req, res) {
  const { id } = req.params;

  const getImageById = await Blog.findOne({
    where: {
      id: id,
    },
  });

  let getImage = getImageById.image;
  let getImageReplace = getImage.replace('http://localhost:5000/uploads', '');

  const result = await Blog.destroy({
    where: {
      id: id,
    },
  });

  if (result) {
    const fullPath = path.join(__dirname, '../uploads/', getImageReplace);
    fs.unlink(fullPath, (err) => {});
  }

  // console.log('result query delete :', result);
  //   req.flash('success', 'Berhasil Menghapus Data Project');
  res.redirect('/myproject');
}

async function updateProject(req, res) {
  const { id } = req.params;
  const { inputTitle, inputContent, dateStart, dateEnd, angular, nodeJs, react, vueJs } = req.body;

  let checkBox = '';
  if (angular) {
    checkBox += ` ${angular} `;
  }
  if (nodeJs) {
    checkBox += ` ${nodeJs} `;
  }
  if (react) {
    checkBox += ` ${react} `;
  }
  if (vueJs) {
    checkBox += ` ${vueJs} `;
  }

  const imageuplode = await Blog.findOne({
    where: {
      id: id,
    },
  });

  let imageGet = imageuplode.image;
  let imageRep = imageGet.replace('http://localhost:5000/uploads/', '');

  let upImage;

  if (req.file) {
    upImage = 'http://localhost:5000/uploads/' + req.file.filename;
    const fullPath = path.join(__dirname, '../uploads/', imageRep);
    fs.unlink(fullPath, (err) => {});
  } else {
    upImage = imageGet;
  }

  await Blog.update(
    {
      title: inputTitle,
      content: inputContent,
      startDate: dateStart,
      endDate: dateEnd,
      teknologi: checkBox,
      image: upImage,
      updatedAt: sequelize.fn('NOW'),
    },
    {
      where: {
        id: id,
      },
    }
  );

  //   console.log('update', result);
  res.redirect('/myproject');
}

function rendercontact(req, res) {
  const { users } = req.session;
  res.render('contact', { users });
}
function rendertestimonial(req, res) {
  const { users } = req.session;
  res.render('testimonial', { users });
}
function renderaddcontact(req, res) {
  const { users } = req.session;
  res.render('addcontact', { users });
}
function authLogout(req, res) {
  req.session.users = null;

  res.redirect('/login');
}
function rendererror(res, req) {
  res.render('error.hbs');
}

function render404(req, res) {
  res.render('error.hbs');
}
module.exports = {
  renderLogin,
  renderRegister,
  authLogin,
  authRegister,
  renderHome,
  rendercontact,
  rendermyproject,
  renderProjectDetail,
  addBlog,
  renderEditProject,
  updateProject,
  authLogout,
  renderaddproject,
  deletProject,
  rendertestimonial,
  renderaddcontact,
  render404,
  rendererror,
};
