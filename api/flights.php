<?php
require_once '../config/db.php';

$stmt = $pdo->query("SELECT * FROM flights WHERE available_seats > 0 ORDER BY departure_time ASC");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
