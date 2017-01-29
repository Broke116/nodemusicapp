$(document).ready(function () {
    var isPlaying = false;
    var isPaused = false;
    var audio = null;

    var $track = $('.track');
    var $play = $('#play');
    var $pause = $('#pause');
    var $forward = $('#forward');
    var $backward = $('#backward');

    $play.show();
    $pause.hide();

    //fileupload init
    $('#fileupload').fileupload({
        dataType: 'json'
    });
    
    document.getElementById('song-count').innerText = $track.length;

    // actions when user double clicks the track on the list.
    $track.dblclick(function (e) {

        if ($(e.target).parent().hasClass('highlight')) {
            return;
        }

        isPlaying = true;

        //highlight the clicked track
        //if (e.originalEvent !== undefined) {
        $track.removeClass('highlight');
        $(this).addClass('highlight');
        //}

        stopTrack();

        // highlighted track details
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

        $pause.show();
        $play.hide();

        // get highlighted track audio element and assign it to audio
        audio = $("td.id:contains('" + Track.id + "')").parent().find('audio').get(0);

        audio.play();
        audio.addEventListener("timeupdate", progress, false);

        if (audio.readyState > 0) {
            var minutes = parseInt(audio.duration / 60, 10);
            var seconds = parseInt(audio.duration % 60);

            // write the calculated length of the track.
            document.getElementById('time').innerText = minutes + ":" + seconds;
        }

        // jquery-ui slider init.
        $('#volumeSlider').slider({
            orientation: "vertical",
            value: audio.volume,
            min: 0,
            max: 1,
            range: 'min',
            animate: true,
            step: .1,
            slide: function (e, ui) {
                audio.volume = ui.value;
            }
        });
    }

    function progress() {
        // event listener function for audio's current time.
        var m = ~~(audio.currentTime / 60), s = ~~(audio.currentTime % 60);
        document.getElementById('currentTime').innerText = (m < 10 ? "0" + m : m) + ':' + (s < 10 ? "0" + s : s);
    }

    function stopTrack() {
        $.each($('audio'), function () {
            this.pause();
        });
    }

    $play.click(function (player) {
        $pause.show();
        $play.hide();
        
        if (isPlaying) {
            return;
        }

        // if isPaused = true continue with the paused track when play clicked.
        if (isPaused) {
            audio.play();
            isPaused = false;
            isPlaying = true;
            return;
        }

        $track.first().trigger('dblclick');
    });

    $pause.click(function () {
        $pause.hide();
        $play.show();
        isPlaying = false;
        isPaused = true;
        stopTrack();
    });

    $forward.click(function () {
        if (isPlaying) {
            $('.highlight').next().trigger('dblclick');
        }
    });

    $backward.click(function () {
        if (isPlaying) {
            $('.highlight').prev().trigger('dblclick');
        }
    });
});