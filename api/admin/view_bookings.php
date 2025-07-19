<?php
require_once '../auth_check.php';
require_once '../../config/db.php';

$sql = "
  SELECT r.reservation_id,u.username,u.email,
         f.flight_number,f.origin,f.destination,f.departure_time
  FROM reservations r
  JOIN users u   ON r.user_id = u.user_id
  JOIN flights f ON r.flight_id= f.flight_id
  ORDER BY f.departure_time ASC
";
$stmt = $pdo->query($sql);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
