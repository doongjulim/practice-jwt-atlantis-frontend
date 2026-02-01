const ajaxUrl = "http://localhost:8080";

let userId = "";

$(function (){
    $.setUsers();
})

$(document).on('click', '.user-line', function() {
    $.setEditUser(this);
});



$("#edit-user").click(function (){
    $.editUser();
})

$("#delete-user").click(function (){
    $.deleteUser();
})

$.setEditUser = function (place){
    userId = $(place).data('id');
    $.ajax({
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        url: ajaxUrl + "/api/v2/user/detail",
        type: 'GET',
        dataType: "json",
        data: {'id': userId},
        headers: {"Authorization": "token"},
        success: function (result) {
            const user = result.body;
            $("#username").val(user.username);
            $("#name").val(user.name);
            $("#role").val(user.role).prop("selected", true);;
            $("#grade").val(user.grade).prop("selected", true);;
        },error: function(xhr, status, error) {
            alert("조회 실패. 관리자에게 문의해주세요.");
        },
    })
}

$.setUsers = function (){
    $.ajax({
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        url: ajaxUrl + "/api/v2/user",
        type: 'GET',
        dataType: "json",
        headers: {"Authorization": "token"},
        success: function (result) {
            const users = result.body;
            const usersArea = $("#users-area");
            usersArea.children("li").remove();
            if (users.size){
                usersArea.append("<li class=\"tm-list-group-item\">등록된 사용자가 없습니다.</li>")
            }else{
                users.forEach(function (item, index) {
                    usersArea.append("<li class=\"tm-list-group-item user-line\" data-id='"+item.id+"'>"+item.name+"</li>")
                });
            }
        },error: function(xhr, status, error) {
            alert("자동생성 실패. 관리자에게 문의해주세요.");
        },
    })
}

$.editUser = function (){
    if(userId == ""){
        alert("사용자를 선택해주세요.");
        return false;
    }

    const username =  $("#username").val();
    const name =  $("#name").val();
    const password =  $("#password").val();
    const password_check =  $("#password_check").val();
    const role =  $("#role option:selected").val();
    const grade =  $("#grade option:selected").val();

    if(username == ""){
        alert("사번(ID)를 입력하세요.");
        return false;
    }
    if( name == ""){
        alert("이름을 입력하세요.");
        return false;
    }
    if(password != "" && password_check == ""){
        alert("비밀번호 확인을 입력하세요.");
        return false;
    }

    if(password != "" && password != password_check){
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
        type: 'PUT',
        dataType: "json",
        data: {
            "id":userId,
            "username":username,
            "name":name,
            "password":password,
            "role":role,
            "grade":grade
        },
        headers: {"Authorization": "token"},
        success: function (result) {
            location.reload();
        },error: function(xhr, status, error) {
            alert("수정 실패. 관리자에게 문의해주세요.");
        },
    })
}

$.deleteUser = function (){
    if(userId == ""){
        alert("사용자를 선택해주세요.");
        return false;
    }

    if(!confirm("삭제하시겠습니까?")){
        return false;
    }


    $.ajax({
        beforeSend: function (req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        url: ajaxUrl + "/api/v2/user",
        type: 'Patch',
        dataType: "json",
        data: {
            "id":userId
        },
        headers: {"Authorization": "token"},
        success: function (result) {
            location.reload();
        },error: function(xhr, status, error) {
            alert("수정 실패. 관리자에게 문의해주세요.");
        },
    })
}




const usersForm = "<li class=\"tm-list-group-item\"></li>";