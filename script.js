
//window load function starts here
$(window).load(function(){

/*------------- isotope is intilized here ---------*/

    var $container = $('.portfolioContainer');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

/*------------- filter option isotope ---------*/


    $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
        $("#searchText").val('');
        $('#searchedItem').empty();
        var category= $(".portfolioFilter a.current").text();
        showHideSearch(category);
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    }); 

   /*------------- content load from moviedb api ---------*/ 

    var movieBaseUrl ='https://api.themoviedb.org/3/movie/popular?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&page=1';  // top 20 movies url api
    
    var tvShowsBaseUrl ='https://api.themoviedb.org/3/tv/popular?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&page=1';   // top 20 Tv shows url api

    var peopleBaseUrl = 'https://api.themoviedb.org/3/person/popular?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&page=1'; // top 20 peroson url api
   
    var newItems='';

    // ajax call for movie api 
    $.ajax({
        url: movieBaseUrl,
        type: "GET",
        dataType: "json",
        data: {},
        success: function (response) {             
            var popularMovies = response.results;
            for (i = 0; i < popularMovies.length; ++i) {    
                newItems = $('<div class="Movies"> <a href="#popular-movies-modal" data-toggle="modal" data-movie-id="'+popularMovies[i].id+'"> <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2' +popularMovies[i].poster_path+ '" alt="image"> <span>' + popularMovies[i].title + '</span></a></div>');
                $('#portfolioContainer').isotope('insert', newItems );
            }
        }
    });


    // ajax call for Tv shows api 
    $.ajax({
        url: tvShowsBaseUrl,
        type: "GET",
        dataType: "json",
        data: {},
        success: function (response) {
            var popularTvShows = response.results;
            for (i = 0; i < popularTvShows.length; ++i) {
                newItems = $('<div class="Shows"> <a href="#popular-tv-modal" data-toggle="modal" data-tv-id="'+popularTvShows[i].id+'"> <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2' +popularTvShows[i].poster_path+ '" alt="image"> <span>' + popularTvShows[i].name + '</span></a></div>');
                $('#portfolioContainer').isotope('insert', newItems );                 
            }
        }
    });


    // ajax call for Person api 
    $.ajax({
        url: peopleBaseUrl,
        type: "GET",
        dataType: "json",
        data: {},
        success: function (response) {
            var popularPeoples = response.results;
            for (i = 0; i < popularPeoples.length; ++i) {
                newItems = $('<div class="Persons"> <a href="#popular-person-modal" data-toggle="modal" data-person-id="'+popularPeoples[i].id+'"> <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2' +popularPeoples[i].profile_path+ '" alt="image"> <span>' + popularPeoples[i].name + '</span></a></div>');
                $('#portfolioContainer').isotope('insert', newItems );
            }
            $('#portfolioContainer').isotope('shuffle');
        }
    });    



});

//window load function ends here

/*-------------search box hide/show function ---------*/

function showHideSearch(category){
    if(category == 'All Categories'){
        $("#searchText").css({ 'display' : 'none'});
    }
    else {
        $("#searchText").css({ 'display' : ''});
    }
}

/*-------------Movies modal dynamic content function  ---------*/

$('#popular-movies-modal').on('show.bs.modal', function(e) {
    var movieId = $(e.relatedTarget).data('movie-id');
    var moverDeatailsUrl = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US';
    $.ajax({
        url: moverDeatailsUrl,
        type: "GET",
        dataType: "json",
        data: {},
        success: function (response) {                              
            $(e.currentTarget).find('label[name="title"]').text(response.title);
            $(e.currentTarget).find('label[name="release"]').text(response.release_date);
            $(e.currentTarget).find('label[name="overview"]').text(response.overview);
            var movieGenres = '';
            $.each(response.genres,function(index, value)
            {                    
                if(movieGenres == '') {
                    movieGenres = value.name;
                }
                else
                {
                    movieGenres = movieGenres + ', ' + value.name;
                }
            });
            $(e.currentTarget).find('label[name="genres"]').text(movieGenres);
        }
    });      
});



/*-------------Tv Shows modal dynamic content function  ---------*/

$('#popular-tv-modal').on('show.bs.modal', function(e) {
    var tvId = $(e.relatedTarget).data('tv-id');
    var tvDeatailsUrl = 'https://api.themoviedb.org/3/tv/'+tvId+'?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US';
    $.ajax({
        url: tvDeatailsUrl,
        type: "GET",
        dataType: "json",
        data: {},
        success: function (response) {                              
            $(e.currentTarget).find('label[name="name"]').text(response.name);
            $(e.currentTarget).find('label[name="firstairdate"]').text(response.first_air_date);
            $(e.currentTarget).find('label[name="lastairdate"]').text(response.last_air_date);
            $(e.currentTarget).find('label[name="status"]').text(response.status);                
        }
    });      
});



/*-------------Person modal dynamic content function  ---------*/

$('#popular-person-modal').on('show.bs.modal', function(e) {
    var personId = $(e.relatedTarget).data('person-id');
    var personDeatailsUrl = 'https://api.themoviedb.org/3/person/'+personId+'?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US';
    $.ajax({
        url: personDeatailsUrl,
        type: "GET",
        dataType: "json",
        data: {},
        success: function (response) {                              
            $(e.currentTarget).find('label[name="name"]').text(response.name);
            $(e.currentTarget).find('label[name="biography"]').text(response.biography);
            $(e.currentTarget).find('label[name="placeofbirth"]').text(response.place_of_birth);
            $(e.currentTarget).find('label[name="knownfordepartment"]').text(response.known_for_department);                
        }
    });
});



/*------------- document ready function starts here  ---------*/
$(document).ready(function(){




/*------------- search url according to selected filter  function---------*/
    function getSearchUrl(){	
        var category= $(".portfolioFilter a.current").text();
        if(category == 'Popular Movies'){
            return "https://api.themoviedb.org/3/search/movie?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&query="+$('#searchText').val()+"&page=1&include_adult=false";
        }
        else if(category == 'Popular TV Shows'){
            return "https://api.themoviedb.org/3/search/tv?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&query="+$('#searchText').val()+"&page=1&include_adult=false";
        }
        else if(category == 'Popular Persons'){
            return "https://api.themoviedb.org/3/search/person?api_key=d0aea524bd07ed49cbc26dff63f357dd&language=en-US&query="+$('#searchText').val()+"&page=1&include_adult=false";
        }
    }

/*------------- live search function starts here ---------*/
    $("#searchText").autocomplete({
        minLength: 0,			
        source: function (request, response) {				
            var searchUrl = getSearchUrl(); 
            $.ajax({
                url: searchUrl,
                type: "GET",
                dataType: "json",
                data: {},
                success: function (data) {
                    var newItems_string='';
                    var category= $(".portfolioFilter a.current").text();
                    if(category == 'Popular Movies'){
                        category_elements= $('.Movies');
                        $('#portfolioContainer').isotope( 'remove',category_elements); // used to remove current items when live search is intiated
                        response($.map(data.results, function (item) {
                            if(item.poster_path!=null)
                            {
                                newItems_string =newItems_string+'<div class="Movies"> <a href="#popular-movies-modal" data-toggle="modal" data-movie-id="'+item.id+'"> <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2' +item.poster_path+ '" alt="image"> <span>' + item.title + '</span></a></div>';
                            }
                        }));
                    }
                    else if(category == 'Popular TV Shows'){
                        category_elements= $('.Shows');
                        $('#portfolioContainer').isotope( 'remove',category_elements); // used to remove current items when live search is intiated
                        response($.map(data.results, function (item) {
                            if(item.poster_path!=null)
                            {
                                newItems_string =newItems_string+'<div class="Shows"> <a href="#popular-tv-modal" data-toggle="modal" data-tv-id="'+item.id+'"> <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2' +item.poster_path+ '" alt="image"> <span>' + item.name + '</span></a></div>';
                            }
                        }));
                    }
                    else if(category == 'Popular Persons'){
                        category_elements= $('.Persons');
                        $('#portfolioContainer').isotope( 'remove',category_elements); // used to remove current items when live search is intiated
                        response($.map(data.results, function (item) {
                            if(item.poster_path!=null)
                            {
                                newItems_string =newItems_string+'<div class="Persons"> <a href="#popular-person-modal" data-toggle="modal" data-person-id="'+item.id+'"> <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2' +item.profile_path+ '" alt="image"> <span>' + item.name + '</span></a></div>';
                            }
                        }));
                    }                        
                    newItems=$(newItems_string);
                    $('#portfolioContainer').isotope('insert', newItems );  // used to add dynamic items according to search
                    $('#portfolioContainer').isotope('shuffle');
                }
            })
        },
        messages : {
            noResults : '',
            results : function(resultsCount) {}
        },
        delay: 2
    });
});
/*------------- document ready function ends here  ---------*/