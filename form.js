$(document).ready(function () {
    $("#form").submit(function (event) {
      var formData = {
        userDate: $("#date").val(),
        userTime: $("#time").val(),
        userPlace: $("#place").val(),
      };
  
      $.ajax({
        type: "POST",
        url: "process.php",
        data: formData,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        console.log(data);
      });
  
      event.preventDefault();
    });
  });