$(document).ready(function(){
    $('#fileupload').fileupload({
         dataType: 'json' 
    });
    
    var $track = $('.track');

    $track.dblclick(function(e){
        e.preventDefault();

        //highlight the clicked track
        $track.removeClass('highlight');
        $(this).addClass('highlight');

        var highlightedTrackname =  $(this).find('.name').text();
        var trackname = document.getElementById('trackname');
        trackname.innerText = highlightedTrackname;
    });
});