const searchBtn = document.getElementById('button-search');

searchBtn.addEventListener('click', function () {
   fetch(`http://www.omdbapi.com/?apikey=b999d022&s=${document.querySelector('.input-search').value}`)
      .then(response => response.json())
      .then(response => {
         const movies = response.Search;
         for (const m of movies) {
            document.querySelector('.movie-list').insertAdjacentHTML('beforeend', showMovie(m))
         }
      })
      .then(function () {
         const btnDetail = document.querySelectorAll('.btn-movie-detail');
         btnDetail.forEach(function (btn) {
            btn.addEventListener('click', function () {
               fetch(`http://www.omdbapi.com/?apikey=b999d022&i=${this.dataset.imdbid}`)
                  .then(response => response.json())
                  .then(response => {
                     document.querySelector('.modal-body').innerHTML = showMovieDetail(response);
                  })
            })
         })
      })
})




function showMovie({ Title, Year, Poster, imdbID }) {
   return `<div class="col-md-4 my-3" loading="lazy">
               <div class="card">
                  <img src="${Poster}" class="card-img-top lozad">
                  <div class="card-body">
                     <h5 class="card-title">${Title}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${Year}</h6>
                     <a href="#" class="btn btn-primary btn-movie-detail" data-bs-toggle="modal" data-bs-target="#modalMovie" data-imdbid="${imdbID}">Show details</a>
                  </div>
               </div>
            </div>`;
}


function showMovieDetail({ Title, Year, Genre, Director, Writer, Actors, Plot, Poster }) {
   return `<div class="container-fluid">
               <div class="row">
               <div class="col-md-3">
                  <img src="${Poster}" alt="${Title}" class="img-fluid">
               </div>
               <div class="col-md">
                  <ul class="list-group">
                     <li class="list-group-item">
                        <h3>${Title} (${Year})</h3>
                     </li>
                     <li class="list-group-item"><strong>Genre : </strong>${Genre}</li>
                     <li class="list-group-item"><strong>Director : </strong>${Director}</li>
                     <li class="list-group-item"><strong>Writer : </strong>${Writer}</li>
                     <li class="list-group-item"><strong>Actors : </strong>${Actors}</li>
                     <li class="list-group-item"><strong>Plot : </strong><br>${Plot}</li>
                  </ul>
               </div>
               </div>
            </div>`;
}