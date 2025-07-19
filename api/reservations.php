<?php
session_start();
require_once '../config/db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $flight_id = intval($_POST['flight_id']);

    $conn->begin_transaction();

    $check = $conn->prepare("SELECT available_seats FROM flights WHERE id = ? FOR UPDATE");
    $check->bind_param("i", $flight_id);
    $check->execute();
    $result = $check->get_result();
    $flight = $result->fetch_assoc();

    if ($flight && $flight['available_seats'] > 0) {
        $book = $conn->prepare("INSERT INTO reservations (user_id, flight_id) VALUES (?, ?)");
        $book->bind_param("ii", $user_id, $flight_id);
        $book->execute();

        $update = $conn->prepare("UPDATE flights SET available_seats = available_seats - 1 WHERE id = ?");
        $update->bind_param("i", $flight_id);
        $update->execute();

        $conn->commit();
        echo json_encode(["success" => true, "message" => "Flight booked successfully."]);
    } else {
        $conn->rollback();
        echo json_encode(["success" => false, "message" => "No seats available."]);
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $reservation_id = intval($_DELETE['reservation_id']);

    $stmt = $conn->prepare("SELECT flight_id FROM reservations WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $reservation_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $res = $result->fetch_assoc();

    if ($res) {
        $delete = $conn->prepare("DELETE FROM reservations WHERE id = ?");
        $delete->bind_param("i", $reservation_id);
        $delete->execute();

        $update = $conn->prepare("UPDATE flights SET available_seats = available_seats + 1 WHERE id = ?");
        $update->bind_param("i", $res['flight_id']);
        $update->execute();

        echo json_encode(["success" => true, "message" => "Reservation canceled."]);
    } else {
        echo json_encode(["success" => false, "message" => "Reservation not found."]);
    }
}
?>
