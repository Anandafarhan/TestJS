$('#button-search').on('click', function () {
   $.ajax({
      url: `http://www.omdbapi.com/?apikey=b999d022&s=${$('.input-search').val()}`,
      success: result => {
         const movies = result.Search;
         let cards = "";
         for (const m of movies) {
            cards += showMovie(m);
         }
         $('.movie-list').html(cards);

         $('.btn-movie-detail').on('click', function () {
            $.ajax({
               url: `http://www.omdbapi.com/?apikey=b999d022&i=${$(this).data('imdbid')}`,
               success: result => {
                  modalContent = showMovieDetail(result);
                  $('.modal-body').html(modalContent);
               },
               error: (e) => {
                  console.error(e.responseText);
               }
            });
         });
      },
      error: (e) => {
         console.error(e.responseText);
      }
   });
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
