<?php
// Database connection
$host = 'localhost';
$dbname = 'quickserve';
$username = 'root';
$password = '';

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $itemName = $_POST['item-name'];
    $itemPrice = $_POST['item-price'];
    $itemImage = $_POST['item-image'];

    if (!empty($itemName) && !empty($itemPrice)) {
        try {
            // Insert the item into the database
            $query = "INSERT INTO menu (name, price, image_url) VALUES (:name, :price, :image_url)";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':name', $itemName);
            $stmt->bindParam(':price', $itemPrice);
            $stmt->bindParam(':image_url', $itemImage);
            $stmt->execute();

            echo "New item added successfully!";
        } catch (PDOException $e) {
            echo "Error adding item: " . $e->getMessage();
        }
    } else {
        echo "Please fill in all required fields.";
    }
}
?>
