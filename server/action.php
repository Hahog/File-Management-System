<?php
if($_POST['type'] == 'file') {
    if($_POST['action'] == 'add') {
        $conn = mysqli_connect("localhost", "root", "", "sait", "3308");

        if ($conn -> connect_error) {
            die("Connection failed: " . mysqli_connect_error());
        }
    
        $Name = $_POST["Name"];
        $Описание = $_POST["Описание"];
        $Ссылка = $_POST["Ссылка"];
        $Папка = intval($_POST["papka"]);
    
        $sql = "INSERT INTO Fails (Fails_Name, Fails_Описание, Fails_Ссылка, Папка) VALUES ('$Name', '$Описание', '$Ссылка', $Папка)";
    
        if($conn -> query($sql)) {
            echo json_encode('Данные успешно добавленны', JSON_UNESCAPED_UNICODE);
        } else {
            echo 'Error: ' . $conn -> error;
        }
    } else if($_POST['action'] == 'delete') {
        $conn = mysqli_connect("localhost", "root", "", "sait", "3308");

        if ($conn -> connect_error) {
            die("Connection failed: " . mysqli_connect_error());
        }
    
        $id = $_POST["file"];
    
        $sql = "DELETE FROM Fails WHERE id = '$id'";
    
        if($conn -> query($sql)) {
            echo json_encode('Данные удалены', JSON_UNESCAPED_UNICODE);
        } else {
            echo 'Error: ' . $conn -> error;
        }
    }
} else if($_POST['type'] == 'papka') {
    if($_POST['action'] == 'add') {
        $conn = mysqli_connect("localhost", "root", "", "sait", "3308");

        if ($conn -> connect_error) {
            die("Connection failed: " . mysqli_connect_error());
        }
    
        $Name = $_POST["Name"];
        $Описание = $_POST["Описание"];
        $Родительская_папка = $_POST["papka"];
        $Доступ = $_POST["status"];
    
        $sql = "INSERT INTO Papka (Papka_Name, Papka_Описание, Родительская_папка, Доступ) VALUES ('$Name', '$Описание', '$Родительская_папка', '$Доступ')";
    
        if($conn -> query($sql)) {
            echo json_encode('Данные успешно добавленны', JSON_UNESCAPED_UNICODE);
        } else {
            echo 'Error: ' . $conn -> error;
        } 
    } else if($_POST['action'] == 'delete') {
        $conn = mysqli_connect("localhost", "root", "", "sait", "3308");

        if ($conn -> connect_error) {
            die("Connection failed: " . mysqli_connect_error());
        }
    
        $id = $_POST["papka"];
    
        $sql = "DELETE FROM Papka WHERE id = '$id'";
    
        if($conn -> query($sql)) {
            echo json_encode('Данные удалены', JSON_UNESCAPED_UNICODE);
        } else {
            echo 'Error: ' . $conn -> error;
        } 
    }
    
}
?>