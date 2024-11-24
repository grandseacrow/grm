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


function createCircle(index) {
var cx=x + index * spacing;
var cy= y+(index-2.5) *(index-2.5) * spacing/2.5;

  setTimeout(function() {
    var circle = s.circle(cx ,cy, radius);
    circle.attr({
      fill: "#fff"
    });
 circles.push(circle);




//moji 
var groupm = s.group(); 
  if(index===2){
var text = s.text(cx, cy+5, "♀");
texts.push(text);
groupm.add(circle, text);

text.node.style.userSelect = "none"; 

text.attr({
 fill: "#800",
  "font-size": 40,
  "text-anchor": "middle", 
  "dominant-baseline": "middle" 
});

   circle.attr({
            stroke: "#f00",
            strokeWidth: 2
   });
 groupm.click(function(){

Snap.load("satz.svg", function(fragment) {

    var GrmMain = fragment.select("#g08")
.attr({fill:"ffff",
            stroke:"#F00"
 });
      s.append(GrmMain);
 });
});

}

//close
var group0 = s.group(); 
  if(index===0){

var text = s.text(cx, cy+3, "\u292C");
text.node.style.userSelect = "none";
texts.push(text);
group0.add(circle, text);
 

 text.attr({
 fill: "#fff",
  "font-size": 30,
  "text-anchor": "middle", 
  "dominant-baseline": "middle" 
});
text.node.style.userSelect = "none"; 

   circle.attr({
 fill: "#0f0",
            stroke: "#fff",
            strokeWidth: 2
   });

 group0.click(function() {

  circles.forEach(function(circle) {
   circle.remove();
   });

  texts.forEach(function(text) {
   text.remove();
   });


});

}



//ronri
var groupr = s.group(); 
  if(index===4){

var text = s.text(cx, cy+8, "\u264E");
texts.push(text);
groupr.add(circle, text);

text.node.style.userSelect = "none"; 

text.attr({
 fill: "#880",
  "font-size": 40,
  "text-anchor": "middle", 
  "dominant-baseline": "middle" 
});

   circle.attr({
            stroke: "#ff0",
            strokeWidth: 2
   });
 groupr.click(function(){

Snap.load("satz.svg", function(fragment) {

    var GrmMain = fragment.select("#g08")
.attr({fill:"ffff",
            stroke:"#880"
 });
      s.append(GrmMain);
 });
});

}



//#Command
var groupc = s.group(); 
  if(index===1){

var text = s.text(cx-1, cy+10, "\u2648");
texts.push(text);
groupc.add(circle, text);

text.node.style.userSelect = "none"; 

text.attr({
 fill: "#080",
  "font-size": 35,
  "text-anchor": "middle", 
  "dominant-baseline": "middle" 
});

   circle.attr({
            stroke: "#0f0",
            strokeWidth: 2
   });
 groupc.click(function(){

Snap.load("satz.svg", function(fragment) {

    var GrmMain = fragment.select("#g08")
.attr({fill:"ffff",
            stroke:"#080"
 });
      s.append(GrmMain);
 });
});

}


//Class
 var groupc2 = s.group(); 
  if(index===5){

var text = s.text(cx, cy+3,"\u26E4");
texts.push(text);
groupc2.add(circle, text);

text.node.style.userSelect = "none"; 

text.attr({
 fill: "#fff",
  "font-size": 35,
  "text-anchor": "middle", 
  "dominant-baseline": "middle" 
});

   circle.attr({
            stroke: "#fff": ,
            fill: "#080": 
   });
 groupc2.click(function(){

Snap.load("satz.svg", function(fragment) {

    var GrmMain = fragment.select("#g08")
.attr({fill:"#080",
            stroke:"#FFF",
            strokeWidth: 2
 });
      s.append(GrmMain);
 });
});

}

//suuji
var groups = s.group(); 

  if(index===3){

var text = s.text(cx, cy+5, "♂");
text.node.style.userSelect = "none"; 
texts.push(text);
groups.add(circle, text);


text.attr({
 fill: "#08f",
  "font-size": 40,
  "text-anchor": "middle", 
  "dominant-baseline": "middle" 
});

   circle.attr({
            stroke: "#0FF",
            strokeWidth: 2
   });

       groups.click(function() {
            
Snap.load("satz.svg", function(fragment) {
 
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


// 
  for (var i = 0; i < circleCount; i++) {
  createCircle(i);
  }

});
