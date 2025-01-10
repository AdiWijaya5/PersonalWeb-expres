let testimonials = [
  {
    author: 'Moh Ali',
    rating: 5,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image: 'bog-img.png',
  },
  {
    author: 'Moh Ali',
    rating: 1,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image: 'bog-img.png',
  },
  {
    author: 'Adam',
    rating: 4,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image: 'bog-img.png',
  },
  {
    author: 'Messi',
    rating: 3,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea reiciendis qui molestias blanditiis inventore reprehenderit nesciunt sequi pariatur quaerat? Error?',
    image: 'bog-img.png',
  },
  {
    author: 'Syifa Maulaya',
    rating: 4,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, commodi obcaecati necessitatibus totam reprehenderit fuga.',
    image: 'bog-img.png',
  },
  {
    author: 'Pandu Rizky',
    rating: 5,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image: 'bog-img.png',
  },
];

const testimonialsContainer = document.getElementById('testimonialsContainer');

const testimonialsHTML = (daftarTestimoni) => {
  return daftarTestimoni
    .map(
      (testimonial) => `
      <div class="d-flex justify-content-center my-3">
          <div class="card p-3 col mx-0">
              <img src="assets/img/${testimonial.image}" class="card-img-top" alt="..." />
              <div class="card-body px-0">
                <div class="overflow-scroll" style="height: 50px">
                  <p class="card-text text-white">${testimonial.content}</p>
                </div>
                <div class="text-end fw-bold mt-3 text-white">
                  <p>- ${testimonial.author}</p>
                  <p>${testimonial.rating}✯</p>
                </div>
              </div>
          </div>
      </div>`
    )
    .join('');
};

function showAllTestimonials() {
  testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials();

function filterTestimonialByStar(rating) {
  const filteredTestimonial = testimonials.filter((testimonial) => testimonial.rating === rating);

  console.log(filteredTestimonial);

  if (filteredTestimonial.length === 0) {
    return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
  }

  setTimeout(() => {
    testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonial);
  }, 1000);
}
