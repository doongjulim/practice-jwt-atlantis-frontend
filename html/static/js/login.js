const ajaxUrl = "http://localhost:8080";


$(function (){
    $("#login-btn").click(function(){
        $.login();
    });
})


$.login = function (){
    const username = $("#username").val();
    const password = $("#password").val();
    $.ajax({
        url : ajaxUrl + "/api/v2/login",
        type: 'POST',
        dataType : "JSON",
        contentType: "application/json",
        data: JSON.stringify({	// 기존 코드에서는 JSON.stringify()가 없었다.
            "username": username,
            "password": password
        }),
        success : function (result) {
            localStorage.token = "Bearer "+result['token'];
            location.href = "index.html";

        },error: function(xhr, status, error) {
            // 통신 실패 시 실행할 코드
            alert("로그인에 실패하였습니다.");
            console.error('Ajax 오류:', status, error);
            //location.href = "index.html";
        },
    })
}