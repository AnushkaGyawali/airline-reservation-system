<?php
session_start();
require_once '../config/db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized. Please log in."]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    if ($method === 'POST') {
        // Booking a flight
        $data = json_decode(file_get_contents('php://input'), true);
        $flight_id = $data['flight_id'] ?? null;

        if (!$flight_id) {
            throw new Exception("Flight ID is required.");
        }

        // Begin transaction
        $pdo->beginTransaction();

        // Check flight availability
        $stmt = $pdo->prepare("SELECT available_seats FROM flights WHERE flight_id = ? FOR UPDATE");
        $stmt->execute([$flight_id]);
        $flight = $stmt->fetch();

        if (!$flight || $flight['available_seats'] <= 0) {
            throw new Exception("Flight not available or full.");
        }

        // Create reservation
        $stmt = $pdo->prepare("INSERT INTO reservations (user_id, flight_id) VALUES (?, ?)");
        $stmt->execute([$user_id, $flight_id]);

        // Decrement seat
        $stmt = $pdo->prepare("UPDATE flights SET available_seats = available_seats - 1 WHERE flight_id = ?");
        $stmt->execute([$flight_id]);

        $pdo->commit();

        echo json_encode(["status" => "success", "message" => "Flight booked successfully."]);

    } elseif ($method === 'DELETE') {
        // Cancel a reservation using reservation_id
        $data = json_decode(file_get_contents('php://input'), true);
        $reservation_id = $data['reservation_id'] ?? null; // Changed from flight_id to reservation_id

        if (!$reservation_id) {
            throw new Exception("Reservation ID is required.");
        }

        // Begin transaction
        $pdo->beginTransaction();

        // Get flight_id from reservation
        $stmt = $pdo->prepare("SELECT flight_id FROM reservations WHERE reservation_id = ? AND user_id = ?");
        $stmt->execute([$reservation_id, $user_id]);
        $reservation = $stmt->fetch();

        if (!$reservation) {
            throw new Exception("Reservation not found.");
        }

        $flight_id = $reservation['flight_id'];

        // Delete reservation
        $stmt = $pdo->prepare("DELETE FROM reservations WHERE reservation_id = ?"); // Changed WHERE clause
        $stmt->execute([$reservation_id]); // Changed parameter

        // Increment seat count
        $stmt = $pdo->prepare("UPDATE flights SET available_seats = available_seats + 1 WHERE flight_id = ?");
        $stmt->execute([$flight_id]);

        $pdo->commit();

        echo json_encode(["status" => "success", "message" => "Reservation cancelled successfully."]); // Updated message

    } else {
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Method not allowed."]);
    }
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>