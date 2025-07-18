<?php
session_start();
header('Content-Type: application/json');
require_once '../config/db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            r.reservation_id,
            f.flight_number,
            f.origin,
            f.destination,
            f.departure_time,
            f.arrival_time,
            r.reservation_time
        FROM reservations r
        JOIN flights f ON r.flight_id = f.flight_id
        WHERE r.user_id = ?
        ORDER BY f.departure_time ASC
    ");
    $stmt->execute([$user_id]);
    $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "data" => $reservations]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "DB error: " . $e->getMessage()]);
}
?>
