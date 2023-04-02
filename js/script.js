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
