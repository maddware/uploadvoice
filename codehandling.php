<?php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["recording"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

if (isset($_POST["submit"])) {
  $check = getimagesize($_FILES["recording"]["tmp_name"]);
  if ($check !== false) {
    echo "File is an audio recording - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an audio recording.";
    $uploadOk = 0;
  }
}

if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
} else {
  if (move_uploaded_file($_FILES["recording"]["tmp_name"], $target_file)) {
    echo "The file " . htmlspecialchars(basename($_FILES["recording"]["name"])) . " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
?>
