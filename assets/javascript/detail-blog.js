function renderBlog() {
  console.log(blogs);

  let blogListElement = document.getElementById('blogList');

  for (let i = 0; i < blogs.length; i++) {
    let formattedDate = formatDateToWIB(blogs[i].postedAt);
    // menampilkan my projecct
    console.log(blogs[i]);

    blogListElement.innerHTML += `

  <div id="${i}" class="blog-list">
          <div class="blog-list-item">
            <div class="blog-image">
              <img src="${blogs[i].image}" alt="blog-image" />
            </div>
            <div class="blog-content">
              <h1>
                <a href="blog-detail.html" class="blog-item-title">
                ${blogs[i].title} - ${blogs[i].datestart}
                </a>
                <p class="relative-time">${getRelativeTime(blogs[i].postedAt)}</p>
              </h1>
              <p class="blog-text">
              ${blogs[i].content}
              </p>
              <div class="icone-f">
              ${blogs[i].teknologi}
            </div>
              <div class="btn-group">
                <button class="btn-edit">Edit</button>
                <button id="1" type="button" class="btn-delet" onclick="remove(this)">Delete</button>
              </div>
            </div>
          </div>
    `;
  }
}
