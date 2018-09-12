 $(function () {
    $('#pre-qu-form').submit(function (event) {
        event.preventDefault();
        var participantId = $('#participantId').val();
        if (participantId === '1' ||
            participantId === '2' ||
            participantId === '3' ||
            participantId === '4' ||
            participantId === '5' ||
            participantId === '6') {

            toCSV($(this).serializeArray(), participantId);
            window.location='instructions.html?participantId='+participantId;
        } else {
            alert('Participant ID invalid');
        }


    });
});

function toCSV(array, participantId){
    console.log(array);
    var columns = [];
    var values = [];
    array.forEach(function (item) {
        columns.push(item.name);
        values.push(item.value);
    });
    output = columns.join(', ') + "\n" + values.join(', ') + "\n";

    var hiddenLink = document.createElement('a');
    hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(output);
    hiddenLink.target = '_blank';
    hiddenLink.download = 'pre-questionaire_participant_'+participantId+'.csv';
    document.body.appendChild(hiddenLink);
    hiddenLink.click();

}

