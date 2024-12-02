
<?php

$file = 'colors.txt';

$color = $_POST['color'];
$color = mb_convert_encoding($color,"utf-8","sjis-win");
file_put_contents($file,$color . PHP_EOL, FILE_APPEND);
?>