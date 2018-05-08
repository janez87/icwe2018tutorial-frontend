var jsonData = {

}
$(document).ready(function () {

    function saveStreams(data){
        
        var streams = []
        console.log("register")
        $(".stream").each(function (k, v) { 
           var name = $(v).find("#streamName1").val()             
           var uri =  $(v).find("#streamUri1").val()   
           
           if(name && uri){
               streams.push({
                   name: name,
                   uri: uri
               })
           }
        })
        
        jsonData.streams = streams

    }


    function saveEngine(data) {
        console.log(data)
    }

    function saveQueries(data) {
        console.log(data)
    }

    function saveObservers(data) {
        console.log(data)
    }

    var handlers = [saveStreams, saveEngine, saveQueries, saveObservers]
    // Step show event
    $("#smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection, stepPosition) {
        //alert("You are on step "+stepNumber+" now");
        if (stepPosition === 'first') {
            $("#prev-btn").addClass('disabled');
        } else if (stepPosition === 'final') {
            $("#next-btn").addClass('disabled');
        } else {
            $("#prev-btn").removeClass('disabled');
            $("#next-btn").removeClass('disabled');
        }

        if (stepNumber>0){
            handlers[stepNumber-1](stepNumber-1)
        }
        console.log(jsonData)
    });

    var btnAddStream = $("#addStream").on('click',function(){
        var $container = $("#streams")

        var $clone = $("#stream1").clone()
        var count = $(".stream").length+1

        $clone.attr("id","stream"+count)

        $clone.appendTo($container)
    })
    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish')
        .addClass('btn btn-info')
        .on('click', function () { alert('Finish Clicked'); });
    var btnCancel = $('<button></button>').text('Cancel')
        .addClass('btn btn-danger')
        .on('click', function () { $('#smartwizard').smartWizard("reset"); });


    // Smart Wizard
    $('#smartwizard').smartWizard({
        selected: 0,
        theme: 'arrows',
        transitionEffect: 'fade',
        showStepURLhash: true,
        toolbarSettings: {
            toolbarPosition: 'both',
            toolbarButtonPosition: 'end',
            toolbarExtraButtons: [btnFinish, btnCancel]
        }
    });


    // External Button Events
    $("#reset-btn").on("click", function () {
        // Reset wizard
        $('#smartwizard').smartWizard("reset");
        return true;
    });

    $("#prev-btn").on("click", function () {
        // Navigate previous
        $('#smartwizard').smartWizard("prev");
        return true;
    });

    $("#next-btn").on("click", function () {
        // Navigate next
        $('#smartwizard').smartWizard("next");
        return true;
    });

});