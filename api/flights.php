<?php
header('Content-Type: application/json');
require_once '../config/db.php';

try {
    $stmt = $pdo->prepare("SELECT flight_id, flight_number, origin, destination, departure_time, arrival_time, available_seats 
                           FROM flights 
                           WHERE available_seats > 0 
                           ORDER BY departure_time ASC");
    $stmt->execute();
    $flights = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $flights
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database query failed: " . $e->getMessage()
    ]);
}
?>
