let callMeFrom = document.querySelector('.call-me-form');
document.addEventListener('DOMContentLoaded', async () => {
  let posts = await getPosts();
  let articles = document.querySelector('.articles');
  articles.innerHTML = '';
  posts.forEach(post => {
    let postHTML = `<div class="col-12 col-md-4">
        <div class="cards">
          <img class="card-img-top" src="${post.imageURL}" alt="${post.title}">
          <div class="card-body">
            <h4 class="card-title">${post.title}
            </h4>
            <p class="card-text">${post.description}
            </p>
            <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>`
    articles.insertAdjacentHTML('beforeend', postHTML);
  });
})
callMeFrom.addEventListener('submit', (e) => {
  e.preventDefault();
  let phoneInp = callMeFrom.querySelector('input');
  fetch('/callback-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phoneInp.value
    })
  }).then((res,) => res.text()).then((data) => alert(+ data + '    we will call you back as soon as possible'));
})
