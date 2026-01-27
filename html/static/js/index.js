$(function (){

    localStorage.token = "Bearer ";
    console.log("### :" + localStorage.token);
    if(localStorage.token != null){
        $(".login-area").addClass("dp-none");
        $(".logout-area").removeClass("dp-none");
    } else{

    }
})

$(document).on('click', '#logout-btn', function() {
    $.logout();
});


$.logout = function (){
    localStorage.removeItem('token');
    location.href = 'index.html';
}