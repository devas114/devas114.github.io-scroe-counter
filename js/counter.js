(function(){var players = {};
    var score = {};
    var score_log = []

    var btn = $(".start");

    var btnFront = $(".btn-front"),
        btnYes = $(".yes"),
        btnNo = $(".no"),
        btnEvent = $("#event-update");

    btnFront.on("click", function(event){
        var mx = event.clientX - btn.offset().left,
            my = event.clientY - btn.offset().top;

        var w = btn.outerWidth(),
            h = btn.outerHeight();

        var directions = [
            { id: "top", x: w/2, y: 0},
            { id: "right", x: w, y: h/2},
            { id: "bottom", x: w/2, y: h},
            { id: "left", x: 0, y: h/2}
        ];

        directions.sort(function(a, b){
            return distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y);
        });

        btn.attr("data-direction", directions.shift().id);
        btn.addClass("is-open");
    });

    btnYes.on("click", function(){
        var name1 = $("#name-1").val(),
            name2 = $("#name-2").val(),
            name3 = $("#name-3").val(),
            name4 = $("#name-4").val();
        if(name1 && name2 && name3 && name4){
            players['1'] = name1;
            players['2'] = name2;
            players['3'] = name3;
            players['4'] = name4;

            score['1'] = 0;
            score['2'] = 0;
            score['3'] = 0;
            score['4'] = 0;

            $("#total-name-1").text(name1);
            $("#total-name-2").text(name2);
            $("#total-name-3").text(name3);
            $("#total-name-4").text(name4);

            $("#event-name-1").text(name1);
            $("#event-name-2").text(name2);
            $("#event-name-3").text(name3);
            $("#event-name-4").text(name4);

            $("#table-name-1").text(name1);
            $("#table-name-2").text(name2);
            $("#table-name-3").text(name3);
            $("#table-name-4").text(name4);

            $(".main-content").css("left","0%");
            btn.removeClass("is-open");
        }else{
            $(".name-warning").css("display","block");
        }

    });

    btnNo.on("click", function(){
        btn.removeClass("is-open");
        $(".name-warning").css("display","none");
    });

    btnEvent.on("click",function(){
        var score_batch = [];

        score_batch.push(parseInt($("#input-name-1 input").val())),
        score_batch.push(parseInt($("#input-name-2 input").val())),
        score_batch.push(parseInt($("#input-name-3 input").val())),
        score_batch.push(parseInt($("#input-name-4 input").val()));

        console.log(score_batch);

        var countNaN = 0;
        var targetNum;
        var score_gain = 0;

        for(i=0; i<4; i++){
            if(isNaN(score_batch[i])){
                countNaN += 1;
                targetNum = i;
            } else {
                score_gain -= score_batch[i];
            }
        }

        if(countNaN > 1){
            $("#input-name-1 input").val("");
            $("#input-name-2 input").val("");
            $("#input-name-3 input").val("");
            $("#input-name-4 input").val("");
            $(".event-warning").css("display","block");
        }else{
            if(targetNum || targetNum === 0){
                score_batch[targetNum] = score_gain;
            }
            console.log(score_batch);
            updateScore(score_batch);
            $("#modal1").closeModal();
            $("#input-name-1 input").val("");
            $("#input-name-2 input").val("");
            $("#input-name-3 input").val("");
            $("#input-name-4 input").val("");
            $(".event-warning").css("display","none");
        }
    })

    function distance(x1, y1, x2, y2){
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx*dx + dy*dy);
    }

    function updateScore(item){
        var $tr = $("<tr>", {id: "recent"});
        var length = item.length;

        for(i=0; i<length; i++){
            if(item[i] > 0){
                var value = 0 - item[i];
                var $td = $("<td>", {text: value});
                $tr.append($td);
            }else{
                var value = 0 - item[i];
                var $td = $("<td>", {text: value, id: "win"});
                $tr.append($td);
            }
            score[(i+1).toString()] -= item[i];
            $("#total-score-" + (i+1)).text(score[(i+1).toString()]);
        }
        $("#recent").removeAttr("id");
        $("#score-table tbody").append($tr);
    }

    $(".modal-trigger").leanModal();
})()




