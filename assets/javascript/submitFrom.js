var contactfrom = document.getElementById('contactFrom');

function submitForms(e) {
  var from = e.target;
  var fromData = new FormData(from);

  var data = Object.fromEntries(fromData.entries());

  console.log(data);

  var link = document.createElement('a');

  link.href = `mailto:adiwijaya5699@gmail.com?subject=${data.subject}&body=Selamat Siang, Nama Saya ${data.name}.
  %0D%0ASilakan hubungi saya di ${data.email} atau ${data.phoneNumber}. Skill saya adalah ${data.skill}. 
  Berikut pesan saya : ${data.massage}`;

  link.click();
}

contactfrom.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForms(e);
});
