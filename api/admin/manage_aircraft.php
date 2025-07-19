<?php
require_once '../auth_check.php';
require_once '../../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

if ($method==='GET') {
  $stmt = $pdo->query("SELECT * FROM aircraft");
  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
elseif ($method==='POST') {
  $model = trim($data['model']);
  $total = (int)$data['total_seats'];
  $config= json_encode($data['seat_config']);
  $stmt = $pdo->prepare("INSERT INTO aircraft (model,total_seats,seat_config) VALUES (?,?,?)");
  $stmt->execute([$model,$total,$config]);
  echo json_encode(['success'=>true]);
}
elseif ($method==='PUT') {
  $id    = (int)$data['id'];
  $model = trim($data['model']);
  $total = (int)$data['total_seats'];
  $config= json_encode($data['seat_config']);
  $stmt = $pdo->prepare("UPDATE aircraft SET model=?,total_seats=?,seat_config=? WHERE id=?");
  $stmt->execute([$model,$total,$config,$id]);
  echo json_encode(['success'=>true]);
}
elseif ($method==='DELETE') {
  $id = (int)$data['id'];
  $pdo->prepare("DELETE FROM aircraft WHERE id=?")->execute([$id]);
  echo json_encode(['success'=>true]);
}
else {
  http_response_code(405);
}
?>
