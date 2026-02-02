const ajaxUrl = "http://localhost:8080";

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const workDay = urlParams.get('workDay');

$(function (){
    $.setTodayAttractionSchedule();
})

$(document).on('click', '#schedule-update-btn', function() {
    $.updateAttractionSchedule();
});

$.setTodayAttractionSchedule = function (){
    if(workDay == null || workDay == ""){
        alert("유효하지 않은 정보");
        location.href = "position.html"
    }
    $.ajax({
        url : ajaxUrl + "/api/v2/attraction/schedule",
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        type: 'GET',
        dataType : "JSON",
        contentType: "application/json",
        data: {'workDay':workDay},
        success : function (result) {
            let data = result.body;
            $.each(data,function (key,value){

            })
        },error: function(xhr, status, error) {
            console.error('오류:', status, error);
        },
    })
}

$.updateAttractionSchedule = function (){
    let requests = [
        {
            'workDay':workDay,
            'attraction':'ATLANTIS',
            'leaveCode':$("#atlantis-leave-code option:selected").val(),
        },
        {
            'workDay':workDay,
            'attraction':'FANTASY_DREAM',
            'leaveCode':$("#fantasy-dream-leave-code option:selected").val(),
        },
    ];

    $.ajax({
        url : ajaxUrl + "/api/v2/attraction/schedules",
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        type: 'PUT',
        dataType : "JSON",
        contentType: "application/json",
        data: JSON.stringify(
            requests
        ),
        success : function (result) {
            location.href = "update-leave-code-schedule.html?workDay="+workDay;
        },error: function(xhr, status, error) {
            console.error('오류:', status, error);
        },
    })
}