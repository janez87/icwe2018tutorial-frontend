var jsonData = {

}
$(document).ready(function () {

    function saveInfo(){
        console.log("general info")
        var name = $("#appName").val()
        var description = $("#appDescription").val()

        if (name && description) {
            jsonData.application = {
                name: name,
                description: description
            }
        }
    }
    function saveStreams(data){
        
        var streams = []
        console.log("register streams")
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
        console.log("register engine")
        var name = $("#engine #engineName").val()
        var uri = $("#engine #engineUri").val()

        if(name && uri){
            jsonData.engine = {
                name:name,
                uri:uri
            }
        }

    }

    function saveQueries(data) {
        var queries = []
        console.log("register query")
        $(".query").each(function (k, v) {
            var name = $(v).find("#queryName1").val()
            var body = $(v).find("#queryBody1").val()

            console.log(body)
            if (name && body) {
                queries.push({
                    name: name,
                    body: body
                })
            }
        })

        jsonData.queries = queries
        createObserverForm()
    }

    function createObserverForm(){
        var queries = jsonData.queries
        var $container = $(".observers")
        for (let i = 0; i < queries.length; i++) {
            var $clone = $("#observer0").clone()
            const query = queries[i];
            
            $clone.attr("id","observer"+(i+1))

            console.log($clone)
            $clone.find("#obsQuery").val(query.name)
            $clone.appendTo($container)
        }

        $("#observer0").remove()
    }
    function saveObservers(data) {
        console.log(data)
    }

    var handlers = [saveInfo,saveStreams, saveEngine, saveQueries, saveObservers]
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

    var btnAddQuery = $("#addQuery").on('click', function () {
        var $container = $("#queries")

        var $clone = $("#query1").clone()
        var count = $(".query").length + 1

        $clone.attr("id", "query" + count)

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