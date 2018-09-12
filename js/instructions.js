$(function () {
    $('#trail').click(function() {
        event.preventDefault();
        var participantId = window.location.href.split('participantId=')[1];
        console.log(participantId);
        window.location = 'experiment.html?participantId='+participantId+"&isTrail=True";
    });
});
