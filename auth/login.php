<?php
session_start();
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input
    $username_or_email = trim($_POST['username_or_email']);
    $password = $_POST['password'];

    // Fetch user by username or email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username_or_email, $username_or_email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password_hash'])) {
        // Password matches, set session
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['username'];
        echo "Login successful. Welcome, " . htmlspecialchars($user['username']) . "!";
    } else {
        echo "Invalid username/email or password.";
    }
} else {
    echo "Invalid request method.";
}
?>
