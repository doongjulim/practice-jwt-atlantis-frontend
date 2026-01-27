const ajaxUrl = "http://localhost:8080";


$(function (){

})


$("#add-user").click(function (){
    $.addUser();
})

$.addUser = function (){
    const username =  $("#username").val();
    const name =  $("#name").val();
    const password =  $("#password").val();
    const password_check =  $("#password_check").val();
    const role =  $("#role option:selected").val();
    const grade =  $("#grade option:selected").val();

    if(username == null || username == ""){
        alert("사번(ID)를 입력하세요.");
        return false;
    }
    if(name == null || name == ""){
        alert("이름을 입력하세요.");
        return false;
    }
    if(password == null || password == ""){
        alert("비밀번호를 입력하세요.");
        return false;
    }
    if(password_check == null || password_check == ""){
        alert("비밀번호 확인을 입력하세요.");
        return false;
    }

    if(password != password_check){
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }


    $.ajax({
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        url: ajaxUrl + "/api/v2/user",
        type: 'POST',
        dataType: "json",
        data: {
            "username":username,
            "name":name,
            "password":password,
            "role":role,
            "grade":grade
        },
        headers: {"Authorization": "token"},
        success: function (result) {
            location.href = "accounts.html";
        },error: function(xhr, status, error) {
            alert("자동생성 실패. 관리자에게 문의해주세요.");
        },
    })
}