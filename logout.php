<?php
Session_start();
$LOGIN = false;  
$_SESSION['login'] = false; 
Session_destroy();
header('Location: ' . $_SERVER['HTTP_REFERER']);

?>