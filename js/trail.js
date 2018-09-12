$(function () {
    $('#experiment').click(function() {
        event.preventDefault();
        var participantId = window.location.href.split('participantId=')[1];
        window.location = 'experiment.html?participantId='+participantId;
    });
});
