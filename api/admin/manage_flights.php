<?php
require_once '../auth_check.php';
require_once '../../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

if ($method==='GET') {
  $sql = "
    SELECT f.flight_id,f.flight_number,f.origin,f.destination,
           f.departure_time,f.arrival_time,f.available_seats,f.seat_prices,
           a.model AS aircraft_model
    FROM flights f
    LEFT JOIN aircraft a ON f.aircraft_id=a.id
  ";
  $stmt = $pdo->query($sql);
  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
elseif ($method==='POST') {
  $fields = [
    $data['flight_number'],$data['origin'],$data['destination'],
    $data['departure_time'],$data['arrival_time'],
    (int)$data['available_seats'],
    (int)$data['aircraft_id'],
    json_encode($data['seat_prices'])
  ];
  $sql = "INSERT INTO flights
    (flight_number,origin,destination,departure_time,arrival_time,available_seats,aircraft_id,seat_prices)
    VALUES (?,?,?,?,?,?,?,?)";
  $pdo->prepare($sql)->execute($fields);
  echo json_encode(['success'=>true]);
}
elseif ($method==='PUT') {
  $fields = [
    $data['flight_number'],$data['origin'],$data['destination'],
    $data['departure_time'],$data['arrival_time'],
    (int)$data['available_seats'],
    (int)$data['aircraft_id'],
    json_encode($data['seat_prices']),
    (int)$data['flight_id']
  ];
  $sql = "UPDATE flights SET
    flight_number=?,origin=?,destination=?,departure_time=?,arrival_time=?,
    available_seats=?,aircraft_id=?,seat_prices=?
    WHERE flight_id=?";
  $pdo->prepare($sql)->execute($fields);
  echo json_encode(['success'=>true]);
}
elseif ($method==='DELETE') {
  $id = (int)$data['flight_id'];
  $pdo->prepare("DELETE FROM flights WHERE flight_id=?")->execute([$id]);
  echo json_encode(['success'=>true]);
}
else {
  http_response_code(405);
}
?>
