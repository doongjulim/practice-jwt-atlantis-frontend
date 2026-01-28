const ajaxUrl = "http://localhost:8080";

$(function (){
    $.userSelectorSet();

    $("#schedule-btn").click(function(){
        $.addSchedule();
    });

    $("#datepicker").datepicker({
        dateFormat: 'yy-mm-dd' //달력 날짜 형태
        ,beforeShowDay: function(date){
            let day = date.getDay();
            return [(day != 0 && day != 2 && day != 3 && day != 4 && day != 5 && day != 6)];
        }
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
        ,changeYear: true //option값 년 선택 가능
        ,changeMonth: true //option값  월 선택 가능
        ,buttonText: "선택" //버튼 호버 텍스트
        ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
        ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
        ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
    });


    //초기값을 오늘 날짜로 설정해줘야 합니다.
    //$('#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
})

$("#userSelector").change(function (){
    $.workCodeSelectorSet();
});

$.userSelectorSet = function () {
    const userSelector = $("#userSelector");
    $.ajax({
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        url: ajaxUrl + "/api/v2/user",
        type: 'GET',
        dataType: "json",
        contentType: "application/json",
        headers: {"Authorization": "token"},
        success: function (result) {
            const data = result.body;
            data.forEach(function (item, index) {
                userSelector.append("<option value='"+item.id+"'>"+item.name+"</option>>")
            });
        }
    })
}

$.workCodeSelectorSet = function () {
    let userId = $("#userSelector option:selected").val();
    const workCodeSelector = $(".workCodeSelector");

    $.ajax({
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        url: ajaxUrl + "/api/v2/work-code",
        type: 'GET',
        dataType: "json",
        data : {'userId':userId},
        contentType: "application/json",
        headers: {"Authorization": "token"},
        success: function (result) {
            const data = result.body;
            workCodeSelector.empty();
            workCodeSelector.append("<option value=''>휴무</option>")
            data.forEach(function (item, index) {
                workCodeSelector.append("<option value='"+item.name+"'>"+item.value+"</option>>")
            });
        }
    })
}

$.addSchedule = function (){

    const userId = $("#userSelector option:selected").val();
    const startDay = $("#datepicker").val();
    const mondayWorkCode = $("#mondayWorkCode option:selected").val();
    const tuesDayWorkCode = $("#tuesDayWorkCode option:selected").val();
    const wednesdayWorkCode = $("#wednesdayWorkCode option:selected").val();
    const thursdayWorkCode = $("#thursdayWorkCode option:selected").val();
    const fridayWorkCode = $("#fridayWorkCode option:selected").val();
    const saturdayWorkCode = $("#saturdayWorkCode option:selected").val();
    const sundayWorkCode = $("#sundayWorkCode option:selected").val();
    const mondayLeaveCode = $("#mondayLeaveCode option:selected").val();
    const tuesDayLeaveCode = $("#tuesDayLeaveCode option:selected").val();
    const wednesdayLeaveCode = $("#wednesdayLeaveCode option:selected").val();
    const thursdayLeaveCode = $("#thursdayLeaveCode option:selected").val();
    const fridayLeaveCode = $("#fridayLeaveCode option:selected").val();
    const saturdayLeaveCode = $("#saturdayLeaveCode option:selected").val();
    const sundayLeaveCode = $("#sundayLeaveCode option:selected").val();

    if(userId == null || userId == ""){
        alert("캐스트를 선택해주세요.");
        return false;
    }

    if(startDay == null || startDay == ""){
        alert("시작일을 선택해주세요.");
        return false;
    }
    let data = {'userId':userId,'startDay':startDay};

    if(mondayWorkCode != ""){
        data.mondayWorkCode = mondayWorkCode;
        data.mondayLeaveCode = mondayLeaveCode;
    }
    if(tuesDayWorkCode != ""){
        data.tuesDayWorkCode = tuesDayWorkCode;
        data.tuesDayLeaveCode = tuesDayLeaveCode;
    }
    if(wednesdayWorkCode != ""){
        data.wednesdayWorkCode = wednesdayWorkCode;
        data.wednesdayLeaveCode = wednesdayLeaveCode;
    }
    if(thursdayWorkCode != ""){
        data.thursdayWorkCode = thursdayWorkCode;
        data.thursdayLeaveCode = thursdayLeaveCode;
    }
    if(fridayWorkCode != ""){
        data.fridayWorkCode = fridayWorkCode;
        data.fridayLeaveCode = fridayLeaveCode;
    }
    if(saturdayWorkCode != ""){
        data.saturdayWorkCode = saturdayWorkCode;
        data.saturdayLeaveCode = saturdayLeaveCode;
    }
    if(sundayWorkCode != ""){
        data.sundayWorkCode = sundayWorkCode;
        data.sundayLeaveCode = sundayLeaveCode;
    }

    $.ajax({
        url : ajaxUrl + "/api/v2/schedule",
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        type: 'POST',
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
}