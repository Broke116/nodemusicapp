$(document).ready(function () {
    var isPlaying = false;
    var isPaused = false;
    var audio = null;

    $('#fileupload').fileupload({
        dataType: 'json'
    });

    var $track = $('.track');

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

        audio = $("td.id:contains('" + Track.id + "')").parent().find('audio').get(0);

        audio.play();

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

        

        /*$('div#volumeSlider').hide();
        $('div#mute').hover(function () {
            console.log('hover');
            $('div#volumeSlider').show();
        });*/
    }

    function stopTrack() {
        $.each($('audio'), function () {
            this.pause();
        });
    }

    $('#play').click(function (player) {
        if (isPlaying) {
            return;
        }

        if (isPaused) {
            audio.play();
            isPaused = false;
            isPlaying = true;
            return;
        }

        $('.track').first().trigger('dblclick');
    });

    $('#pause').click(function () {
        console.log("track" + $(this).hasClass('highlight'));
        var current = document.getElementsByClassName('highlight');
        console.log("current " + current[0]);
        isPlaying = false;
        isPaused = true;
        stopTrack();
    });

    $('#forward').click(function () {
        if (isPlaying) {
            $('.highlight').next().trigger('dblclick');
        }
    });

    $('#backward').click(function () {
        if (isPlaying) {
            $('.highlight').prev().trigger('dblclick');
        }
    });
});