var s = Snap("#svg");
var circleCount = 6;
var radius = 20;
var spacing = 50;
var x = 95;
var y = 200;

// 
var delay = 100;

var circles = [];
var texts = [];

Snap.load("test.svg", function(fragment) {
    var GrmMain = fragment.select("#g846");
    s.append(GrmMain);
});
        var circle1= s.circle(220, 350, 100);
        circle1.attr({
            fill: "#fff",
            stroke: "#0f0",
            strokeWidth: 5
        });

circle1.click(function() {

// $B1_$r@8@.$7!";~4V:9$GI=<($9$k4X?t(B
function createCircle(index) {
var cx=x + index * spacing;
var cy= y+(index-2.5) *(index-2.5) * spacing/2.5;

  setTimeout(function() {
    var circle = s.circle(cx ,cy, radius);
    circle.attr({
      fill: "#fff"
    });
 circles.push(circle);


// $B%0%k!<%W$KDI2C(B 


 // $B%0%k!<%WA4BN$KBP$7$F=hM}$r9T$&(B

//moji 
var groupm = s.group(); 
  if(index===2){
var text = s.text(cx, cy+5, "♀");
texts.push(text);
groupm.add(circle, text);

text.node.style.userSelect = "none"; 
// $B%F%-%9%H$N%U%)%s%H%5%$%:$rD4@0(B
text.attr({
 fill: "#800",
  "font-size": 40,
  "text-anchor": "middle", // $BJ8;z$rCf1{B7$((B
  "dominant-baseline": "middle" // $BJ8;z$rCf1{B7$((B
});

   circle.attr({
            stroke: "#f00",
            strokeWidth: 2
   });
 groupm.click(function(){
//       circle.click(function() {
            // $B30It(BSVG$B$rFI$_9~$`(B
Snap.load("satz.svg", function(fragment) {
    // $BFI$_9~$s$@(BSVG$B$NFCDj$NMWAG$rA*Br(B
    var GrmMain = fragment.select("#g08")
.attr({fill:"ffff",
            stroke:"#F00"
 });
      s.append(GrmMain);
 });
});

}
//$B>C5n(B
var group0 = s.group(); 
  if(index===0){

var text = s.text(cx, cy+3, "\u292C");
text.node.style.userSelect = "none";
texts.push(text);
group0.add(circle, text);
 
// $B%F%-%9%H$N%U%)%s%H%5%$%:$rD4@0(B
 text.attr({
 fill: "#fff",
  "font-size": 30,
  "text-anchor": "middle", // $BJ8;z$rCf1{B7$((B
  "dominant-baseline": "middle" // $BJ8;z$rCf1{B7$((B
});
text.node.style.userSelect = "none"; 

   circle.attr({
 fill: "#0f0",
            stroke: "#fff",
            strokeWidth: 2
   });

 group0.click(function() {
 // $BA4$F$N1_$r:o=|(B
  circles.forEach(function(circle) {
   circle.remove();
   });

  texts.forEach(function(text) {
   text.remove();
   });


});

}

//+
  if(index===4){

var text = s.text(cx, cy+8, "\u264E");
text.node.style.userSelect = "none";
texts.push(text);
 
// $B%F%-%9%H$N%U%)%s%H%5%$%:$rD4@0(B
 text.attr({
 fill: "#880",
  "font-size": 35,
  "text-anchor": "middle", // $BJ8;z$rCf1{B7$((B
  "dominant-baseline": "middle" // $BJ8;z$rCf1{B7$((B
});

   circle.attr({
            stroke: "#FF0",
            strokeWidth: 2
   });

}


//#
  if(index===1){

var text = s.text(cx-1, cy+10, "\u2648");
text.node.style.userSelect = "none"; 
texts.push(text);

// $B%F%-%9%H$N%U%)%s%H%5%$%:$rD4@0(B
 text.attr({
 fill: "#080",
  "font-size": 35,
  "text-anchor": "middle", // $BJ8;z$rCf1{B7$((B
  "dominant-baseline": "middle" // $BJ8;z$rCf1{B7$((B
});

   circle.attr({
            stroke: "#0f0",
            strokeWidth: 2
   });
 
}

//Class
  if(index===5){

var text = s.text(cx, cy+3,"\u26E4");
text.node.style.userSelect = "none"; 
texts.push(text);

// $B%F%-%9%H$N%U%)%s%H%5%$%:$rD4@0(B
 text.attr({
 fill: "#fff",
  "font-size": 50,
  "text-anchor": "middle", // $BJ8;z$rCf1{B7$((B
  "dominant-baseline": "middle" // $BJ8;z$rCf1{B7$((B
});

   circle.attr({
            fill: "#0f0", 
            stroke: "#fff",
            strokeWidth: 2
   });

}

//$B?t;z(B
var groups = s.group(); 

  if(index===3){

var text = s.text(cx, cy+5, "♂");
text.node.style.userSelect = "none"; 
texts.push(text);
groups.add(circle, text);

// $B%F%-%9%H$N%U%)%s%H%5%$%:$rD4@0(B
text.attr({
 fill: "#08f",
  "font-size": 40,
  "text-anchor": "middle", // $BJ8;z$rCf1{B7$((B
  "dominant-baseline": "middle" // $BJ8;z$rCf1{B7$((B
});

   circle.attr({
            stroke: "#0FF",
            strokeWidth: 2
   });

       groups.click(function() {
            // $B30It(BSVG$B$rFI$_9~$`(B
Snap.load("satz.svg", function(fragment) {
    // $BFI$_9~$s$@(BSVG$B$NFCDj$NMWAG$rA*Br(B
    var GrmMain = fragment.select("#g08")
.attr({fill:"ffff",
            stroke:"#0FF"
 });
      s.append(GrmMain);
 });
});



}


  }, delay * index);

}



//en2


// $B1_$r@8@.(B
  for (var i = 0; i < circleCount; i++) {
  createCircle(i);
  }

});
