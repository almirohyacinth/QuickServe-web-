<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $role = '';
  if (isset($_POST['student_id'])) {
    $role = 'customer';
    $name = $_POST['name'];
    $number = $_POST['number'];
    $email = $_POST['email'];
    $student_id = $_POST['student_id'];
    $department = $_POST['department'];

    // Process customer data
    echo "<h1>Welcome, $name! You are logged in as a Customer.</h1>";
  } elseif (isset($_POST['vendor_id'])) {
    $role = 'vendor';
    $vendor_id = $_POST['vendor_id'];
    $name = $_POST['name'];
    $stall_id = $_POST['stall_id'];

    // Process vendor data
    echo "<h1>Welcome, $name! You are logged in as a Vendor.</h1>";
  } elseif (isset($_POST['admin_id'])) {
    $role = 'admin';
    $admin_id = $_POST['admin_id'];
    $password = $_POST['password'];

    // Process admin data
    echo "<h1>Welcome, Admin!</h1>";
  } else {
    echo "<h1>Error: Invalid Role</h1>";
  }

  // You can add database integration here if required
} else {
  echo "<h1>Error: Invalid Request</h1>";
}
?>
