<?php
if($_POST) {
    $res = $_POST;
    $Login = $res["Login"];
    $Password = $res["Password"];
    $conn = mysqli_connect("localhost", "root", "", "Sait", "3308");
    if($conn->connect_error){
        die("Ошибка: " . $conn->connect_error);
    }
    $sqlPapka = "SELECT papka.id, papka.Papka_Name, papka.Papka_Описание, papka.Родительская_папка FROM papka INNER JOIN Status ON status.id = papka.Доступ INNER JOIN Users ON status.id = users.Status WHERE Login = '$Login' AND Password = '$Password'";
    $sqlFiles = "SELECT  fails.id, fails.Fails_Name, fails.Fails_Описание, fails.Fails_Ссылка, fails.Папка FROM fails INNER JOIN papka ON papka.id = fails.Папка INNER JOIN Status ON status.id = papka.Доступ INNER JOIN users ON status.id = users.Status WHERE Login = '$Login' AND Password = '$Password'";
    $sqlStatus = "SELECT Status.id, Status.Name, Status.Удалять, Status.Добавлять FROM  Status INNER JOIN users ON status.id = users.Status WHERE Login = '$Login' AND Password = '$Password'";
    $papka = [];
    $files = [];
    if( $result = $conn->query($sqlPapka)){
        while( $row = mysqli_fetch_object($result)) {
            $papka[] = $row;
        }
    } else{
        echo "Ошибка: " . $conn->error;
    }
    if( $result = $conn->query($sqlFiles)){
        while( $row = mysqli_fetch_object($result)) {
            $files[] = $row;
        }
    } else{
        echo "Ошибка: " . $conn->error;
    }
    if( $result = $conn->query($sqlStatus)){
        $status = mysqli_fetch_object($result);
        if($status) {
        $rows = [$papka, $files, $status];
        echo json_encode($rows, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(false, JSON_UNESCAPED_UNICODE);
        }
    }
    
}

?>
