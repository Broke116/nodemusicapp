$(document).ready(function () {
    var isPlaying = false;

    $('#fileupload').fileupload({
        dataType: 'json'
    });

    var $track = $('.track');

    $track.dblclick(function (e) {
        e.preventDefault();

        $.each($('audio'), function () {
            this.pause();
        });

        isPlaying = true;

        //highlight the clicked track
        $track.removeClass('highlight');
        $(this).addClass('highlight');

        var highlightedTrackid = $(this).find('.id').text();
        var highlightedTrackname = $(this).find('.name').text();
        var highlightedTrackfile = $(this).find('.file').text();
        var Track = {
            id: highlightedTrackid,
            name: highlightedTrackname,
            filename: highlightedTrackfile
        };
        var trackname = document.getElementById('trackname');

        trackname.innerText = highlightedTrackname;

        playTrack(Track);
    });

    function playTrack(Track) {
        console.log(Track.filename + " begin playing");

        var audio = $("td.id:contains('" + Track.id + "')").parent().find('audio').get(0);

        audio.play();    
    }

    $('#play').click(function(player){
        if(isPlaying) return;
        $('.track').first().trigger('dblclick');
    });

    $('#pause').click(function () {
        isPlaying = false;
        clearInterval(latencyInterval);
        socket.emit('pause');
    });

    $('#forward').click(function() {
        if (isPlaying) {
            $('.highlight').next().trigger('dblclick');
        }
    });

     $('#backward').click(function() {
        if (isPlaying) {
            $('.highlight').prev().trigger('dblclick');
        }
    });
});