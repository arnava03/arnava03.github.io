// Get the date and time input fields
const dateInput = document.getElementById('myDate');
const timeInput = document.getElementById('myTime');

// Create a new Date object
const currentDate = new Date();

// Set the value of the date and time input fields
dateInput.value = currentDate.toISOString().slice(0,10);
timeInput.value = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

function scrollDown() {
    var e = document.getElementById("middle");
    e.style.display = "block";
    e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start'
      });
      document.getElementById("navbar").style.display = "block";
  }


  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    }
    else { 
        document.getElementById("navbar").style.top = "-75px";
    }
    prevScrollpos = currentScrollPos;
  }

  $(document).ready(function() {
    $('#form').on('submit', function(e) {
      e.preventDefault(); // Prevent form submission
      $.post(
        'process.php', {
          place: $("#myPlace").val(),
          time: $("#myTime").val(),
          date: $("#myDate").val()
        },
        function(data) {
            // Handle success case
            $("#success").html("<div>" + data + "</div>");
        }
        ).fail(function(jqXHR, textStatus, errorThrown) {
            // Handle error case
            $("#failure").html("<div>AJAX Error: " + textStatus + " : " + errorThrown + "</div>");
        });
    });
  });