 $(function () {
    $('#login-form').submit(function (event) {
        event.preventDefault();
        toCSV($(this).serializeArray());
        var participantId = window.location.href.split('participantId=')[1];
        window.location='exit.html?participantId='+participantId;
        

    });
});

function toCSV(array){
    console.log(array);
    var columns = [];
    var values = [];
    array.forEach(function (item) {
        columns.push(item.name);
        values.push(item.value);
    });
    output = columns.join(', ') + "\n" + values.join(', ') + "\n";

    var hiddenLink = document.createElement('a');
    var participantId = window.location.href.split('participantId=')[1];
    hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(output);
    hiddenLink.target = '_blank';
    hiddenLink.download = 'post-questionaire_participant_'+participantId+'.csv';
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
}

