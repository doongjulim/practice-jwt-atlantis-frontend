const ajaxUrl = "http://localhost:8080";

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const workDay = urlParams.get('workDay');

$(function (){

    console.log("### : " + workDay);
})

$.setTodaySchedule = function (){
    let data;
    $.ajax({
        url : ajaxUrl + "/api/v2/schedule",
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        type: 'GET',
        dataType : "JSON",
        contentType: "application/json",
        data: JSON.stringify(
            data
        ),
        success : function (result) {
            alert("등록 완료");
            location.href = "schedule.html";
        },error: function(xhr, status, error) {
            console.error('오류:', status, error);
        },
    })

    let dataForm = '<div class="input-group mb-3 update-data-line">\n' +
        '              <label class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">김은서</label>\n' +
        '              <label class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label">D3아</label>\n' +
        '              <select name="userId" id="userSelector" class="custom-select col-xl-9 col-lg-8 col-md-8 col-sm-7">\n' +
        '                <option value="SIX_TIME">6퇴</option>\n' +
        '                <option selected value="SEVEN_TIME">7퇴</option>\n' +
        '                <option value="EIGHT_TIME">8퇴</option>\n' +
        '                <option value="NINE_TIME">9퇴</option>\n' +
        '                <option value="TEN_TIME">10퇴</option>\n' +
        '              </select>\n' +
        '            </div>';
}
