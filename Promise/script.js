const searchBtn = document.querySelector('.btn-search');
const searchInput = document.querySelector('.input-search');


searchInput.addEventListener('keyup', async (e) => {
   if (e.key === 'Enter') {
      try {
         const movies = await getMovie()
         updateUI(movies)
      }
      catch (err) {
         document.querySelector('.movie-list').innerHTML = showError(err);
      }

   }
});


document.addEventListener('click', async (e) => {
   if (e.target.classList.contains('btn-search')) {
      try {
         const movies = await getMovie()
         updateUI(movies)
      } catch (err) {
         document.querySelector('.movie-list').innerHTML = showError(err);
      }

   }
   if (e.target.classList.contains('btn-movie-detail')) {
      try {
         document.querySelector('.modal-body').innerHTML = ``;
         const imdbid = e.target.dataset.imdbid;
         const movieDetail = await getMovieDetail(imdbid)
         updateMovieDetailUI(movieDetail)
      } catch (err) {
         document.querySelector('.modal-body').innerHTML = showError(err);
      }

   }
})



function getMovie() {
   return fetch(`https://www.omdbapi.com/?apikey=b999d022&s=${searchInput.value}`)
      .then(response => {
         if (!response.ok) {
            throw new Error(response.statusText);
         }
         return response.json()
      })
      .then(response => {
         if (response.Response === 'False') {
            throw new Error(response.Error);
         }
         return response.Search
      })
}


function getMovieDetail(imdbid) {
   return fetch(`https://www.omdbapi.com/?apikey=b999d022&i=${imdbid}`)
      .then(response => {
         if (!response.ok) {
            throw new Error(response.statusText);
         }
         return response.json()
      })
      .then(response => {
         if (response.Response === 'False') {
            throw new Error(response.Error);
         }
         return response
      })
}


function updateUI(data) {
   if (data != undefined) {
      const movies = data;
      document.querySelector('.movie-list').innerHTML = ``;
      for (const m of movies) {
         document.querySelector('.movie-list').insertAdjacentHTML('beforeend', createCard(m))
      }
   }
}


function updateMovieDetailUI(data) {
   document.querySelector('.modal-body').innerHTML = createMovieDetail(data)
}


function createCard({ Title, Year, Poster, imdbID }) {
   return `<div class="col-md-3 my-3" loading="lazy">
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


function createMovieDetail({ Title, Year, Genre, Director, Writer, Actors, Plot, Poster }) {
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


function showError(err) {
   return `<div class="alert alert-danger" role="alert">
               ${err}
            </div>`
}