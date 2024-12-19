document.addEventListener("DOMContentLoaded", function () {

    // Show/Hide sections 
    const showSection = (sectionId) => { 
      document.querySelectorAll('.dashboard-section').forEach(section => { 
        section.style.display = 'none'; 
      }); 
      document.getElementById(sectionId).style.display = 'block'; }; 

      showSection('overview');

    // Event listeners for navigation buttons 
    document.querySelectorAll('.button').forEach(button => { 
        button.addEventListener('click', function () { 
          const sectionId = this.getAttribute('onclick').split("'")[1]; 
          showSection(sectionId); 
        }); 
      });
    
    // Notification Bell Handling
    const notificationBell = document.getElementById("notificationBell");
    const notificationSection = document.getElementById("notifications");
    notificationBell.addEventListener("click", function () {
      showSection("notifications");
    });

    // Logout icon click event 
    document.getElementById('logoutIcon').addEventListener('click', function () { 
      console.log('Logging out...'); 
      window.location.href = 'mainIndex.html'; // Redirect to login page 
    });
});