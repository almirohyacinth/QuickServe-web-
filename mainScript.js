function selectRole(role) {
    // Hide the welcome section
    document.getElementById('welcome').style.display = 'none';
    
    // Show the login form
    const loginForm = document.getElementById('loginForm');
    loginForm.style.display = 'block';
    
    // Update the form based on the role
    const roleTitle = document.getElementById('roleTitle');
    const formFields = document.getElementById('formFields');
    formFields.innerHTML = ''; // Clear previous fields
  
    switch (role) {
        case 'customer':
            roleTitle.textContent = 'Customer Login';
            formFields.innerHTML = `
                <input type="text" name="name" placeholder="Name" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="text" name="student_id" placeholder="Student/Employee ID" required>
                <input type="text" name="department" placeholder="Department" required>
            `;
            break;
        case 'vendor':
            roleTitle.textContent = 'Vendor Login';
            formFields.innerHTML = `
                <input type="text" name="vendor_id" placeholder="Vendor ID" required>
                <input type="text" name="name" placeholder="Name" required>
                <input type="text" name="stall_id" placeholder="Stall ID" required>
            `;
            break;
        case 'admin':
            roleTitle.textContent = 'Admin Login';
            formFields.innerHTML = `
                <input type="text" name="admin_id" placeholder="Admin ID" required>
                <input type="password" name="password" placeholder="Password" required>
            `;
            break;
    }
  
    // Add Back and Proceed buttons
    formFields.innerHTML += `
        <button type="button" id="backButton" onclick="goBack()">Back</button>
    `;
  
    // Add event listener for validation
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting automatically
        if (validateFormFields()) {
            console.log('Form submitted successfully. Redirecting to dashboard...');
            window.location.href = `${role}_dashboard.html`; // Redirect to respective dashboard
        } else {
            alert('Please fill in all required fields.');
        }
    });
  }
  
  // Function to validate the form fields
  function validateFormFields() {
    const inputs = document.querySelectorAll('#formFields input');
    for (let input of inputs) {
        if (!input.value.trim()) {
            return false; // Return false if any field is empty
        }
    }
    return true; // All fields are filled
  }
  
  // Function for the Back button
  function goBack() {
    // Hide the login form
    document.getElementById('loginForm').style.display = 'none';
    
    // Show the welcome section
    document.getElementById('welcome').style.display = 'block';
  }
  