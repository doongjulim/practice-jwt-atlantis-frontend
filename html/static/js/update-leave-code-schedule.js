const ajaxUrl = "http://localhost:8080";

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const workDay = urlParams.get('workDay');

$(function (){
    $.setTodaySchedule();
})

$(document).on('click', '#schedule-update-btn', function() {
    $.updateLeaveCode();
});

$.setTodaySchedule = function (){
    if(workDay == null || workDay == ""){
        alert("유효하지 않은 정보");
        location.href = "position.html"
    }
    $.ajax({
        url : ajaxUrl + "/api/v2/schedule/day",
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
            $("#schedule-data-area").empty();
            $.each(data,function (key,value){
                $("#schedule-data-area").append(
                    '<div class="input-group mb-3 update-data-line" data-id="'+value.id+'">' +
                    '   <label class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">'+value.name+'</label>' +
                    '   <label class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">'+value.workCode+'</label>' +
                    '   <select name="userId" id="userSelector" class="custom-select col-xl-9 col-lg-8 col-md-8 col-sm-7">' +
                    '     <option value="SIX_TIME">6퇴</option>' +
                    '     <option selected value="SEVEN_TIME">7퇴</option>' +
                    '     <option value="EIGHT_TIME">8퇴</option>' +
                    '     <option value="NINE_TIME">9퇴</option>' +
                    '     <option value="TEN_TIME">10퇴</option>' +
                    '   </select>' +
                    '</div>'
                );
                if(value.leaveCode != 'NONE'){
                    $(".update-data-line:last select").val(value.leaveCode).prop("selected", true);
                }

            })
        },error: function(xhr, status, error) {
            console.error('오류:', status, error);
        },
    })
}


$.updateLeaveCode = function (){
    let requests = [];
    $(".update-data-line").each(function (index,item){
        requests.push(
            {
                'id':$(this).data('id'),
                'leaveCode':$(this).find('select:selected').val(),
            }
        )
    })
    $.ajax({
        url : ajaxUrl + "/api/v2/schedule/leave-code",
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
            location.href = "position.html";
        },error: function(xhr, status, error) {
            console.error('오류:', status, error);
        },
    })
}