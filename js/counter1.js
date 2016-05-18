(function(){
    var btn = $(".start");

    var btnFront = $(".btn-front"),
        btnYes = $(".yes"),
        btnNo = $(".no");

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
        var name1 = $("#name-0").val(),
            name2 = $("#name-1").val(),
            name3 = $("#name-2").val(),
            name4 = $("#name-3").val();
        if(name1 && name2 && name3 && name4){
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

    function distance(x1, y1, x2, y2){
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx*dx + dy*dy);
    };

    $('#clear-history').leanModal();
})()