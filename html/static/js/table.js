const url = "localhost:8080";

$(document).ready(function (){
    localStorage.token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZXIxIiwicm9sZXMiOlsiUk9MRV9NQVNURVIiXSwiaXNzIjoibGltZG9uZ2p1IiwiaWF0IjoxNzY3NDM5NDMxLCJleHAiOjE4NzU0Mzk0MzF9.cJ6Yq-JKHKqO5lgZKRNhXTxXTFd0aEnTKU3w5X79pnw";
    $.ajax({
        url: url + "/api/v2/position",
        type: 'get',
        origin:url,
        headers : {"Authorization": "token"},
        success:function (result){
            console.log(result);
        }
    })
})

$("#schedule-table").click(function (){
    $.ajax({
        beforeSend: function(req) {
            if (localStorage.token) {
                req.setRequestHeader('Authorization', localStorage.token);
            }
        },
        url: url + "/api/v2/position",
        type: 'GET',
        dataType: "json",
        contentType: "application/json",
        headers : {"Authorization": "token"},
        success:function (result){
            console.log(result);
        }
    })
})
