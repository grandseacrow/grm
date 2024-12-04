<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet" href="style.css">
<title>Grm0.82(git)</title>

    <title>Snap.svg SVG Displaytest</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
@font-face {
  font-family: "Grmfont";
  src: url("GRMfont.woff")  format('woff');
}
.myFontClass {
  font-family: "Grmfont";
overflow-y: scroll;
}
* {
  font-size: 20px;
}
</style>
</head>



<body>
<div class="flex">
 <div class="grm box">
<span class="myFontClass">
    <svg id="svg" width="500" height="500"></svg>
    <script src="grm.js"></script>
</span>

<p>
<input class="btn" type="button" value="Satz" name="satz"/>
<input class="box satz" type="text" name="test"/>
</div>

<div>
<div>
　mare<br>
 <div class="box code">
<span class="myFontClass">
<?php
$data = file('colors.txt'); 
 $queue = array(); 

function addToQueue(&$queue, $newString) {
  array_push($queue, $newString); 
  if (count($queue) >  7) {
  array_shift($queue); 
 } 
}

foreach ($data as $line) {
addToQueue($queue,"<font color=" . $line .">テスト</font><br/>");
}

for($i=1;$i<7;$i++){
echo($queue[$i]);
}


?>
</span>
</div>
</div>
<br>
　SW
  <div class="box mm">

</div>
 </div>
</div>
</body>
</html>
