<!DOCTYPE html>

<?php 
    $connect = new mysqli ("localhost", "root", "", "testsms");
    if (!$connect) {
        printf("Connection failed: %s\n", mysqli_connect_error());
        exit();
    }
    $connect->query ("SET NAMES 'utf8'");        
    
    if (isset($_POST['save'])) {
        mysqli_query($connect, "INSERT INTO `testsms` (`SMS`, `countSMS`) VALUES ('". $_POST['textar'] ."', '". $_POST['countMess'] ."')");        
    }
    $connect -> close();
?>

<html>    
    <head>
        <title>Test SMS</title>
        <link rel="stylesheet" type="text/css" href="SMS.css">
        <meta name="viewport" content="width=device-width">
        <meta charset="utf8">    
    </head>
    <body>
        <form  class = "content" action = "" method = "POST">
            <a>Введите сообщение:</a> <br />
            <textarea class = "message" name = "textar" placeholder = "Написать сообщение"></textarea><br />
            <input class = "check-trans" type="checkbox"/> <a>  Транслитерировать</a><br />
            <a>Введено символов:
                <span class = "counter-value">0</span>            
            </a><br />
            <a>Количество сегментов, необходимых для отправки: 
                <input class = "counter-messages" name = "countMess" type = "hidden"><span class = "counter-sms">0</span></input>
            </a><br />
            <button class = "saveBtn" name = "save">Сохранить</button>            
        </form>
    </body>

    <script src="script.js"></script>
</html>