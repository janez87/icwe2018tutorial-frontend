var jsonData = {}

var insertEngine = $('#insertEngine').on('click',function(){
    var name = $("#engine #name").val()
    var uri = $("#engine #engineUri").val()

    if (name && uri) {
        jsonData.engine = {
            name: name,
            uri: uri
        }

        var payload = {
            method: "POST",
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            url: "add-engine"
        }
        $.ajax(payload)
            .done(function (data) { console.log(data) })
            .fail(function (error) { console.log(error) })

    }else{
        alert("Name or URI missing")
    }
    
})

var loadEngine = $("#loadEngine").on('click', function () {
    var $container = $("#engine-preview")
    $.get('static/csparql.json')
        .done(function (data) {
            jsonData.engineData = data
            var engineName = data["vsd:name"]
            var dialect = data["vsd:lang"]
            var baseUrl = data["vsd:base"]

            $("#engineName").val(engineName)
            $("#dialect").val(dialect)
            $("#baseUrl").val(baseUrl)


            var services = []

            var emptyClone = $(".service").first().clone()
            for (let i = 0; i < data["vsd:hasService"].length; i++) {

                const s = data["vsd:hasService"][i];

                var name = s["vsd:name"]
                var method = s["vsd:method"]
                var endpoint = s["vsd:endpoint"]
                var bodyParams = s["vsd:body_param"]
                var urlParams = s["vsd:uri_param"]

                var clone = emptyClone.clone()

                clone.find("#serviceName").text(name)
                clone.find("#method").text(method)
                clone.find("#endpoint").text(endpoint)

                if (bodyParams) {

                    var list = ""

                    if (!Array.isArray(bodyParams)) {
                        bodyParams = [bodyParams]
                    }

                    bodyParams.forEach(element => {
                        list += "<li>" + element + "</li>"
                    });

                    clone.find("#bodyParams ul").html(list)

                } else {
                    clone.find("#bodyParams").remove()
                }

                if (urlParams) {
                    var list = ""

                    if (!Array.isArray(urlParams)) {
                        urlParams = [urlParams]
                    }

                    urlParams.forEach(element => {
                        list += "<li>" + element + "</li>"
                    });

                    clone.find("#urlParams ul").html(list)

                } else {
                    clone.find("#urlParams").remove()
                }



                clone.appendTo($container)
            }

            $(".service").first().remove()
            // $("#engine-preview").html(JSON.stringify(data))
        })
})