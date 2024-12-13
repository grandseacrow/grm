var s = Snap("#svg");
var circleCount = 6;
var radius = 20;
var spacing = 50;
var x = 95;
var y = 200;
var delay = 100;
//
var circles = [];
var texts = [];
var colors = ["white","green","red", "aqua", "orange", "gray"];
var lunetext= ["\u292C","\u2648","♀","♂","\u264E","\u26E4"];
var sy=0;

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
    var fc="#fff";
    if(index==0 || index==5){
    fc="#0f0";
    }
    
     circle.attr({
            stroke: colors[index]
            ,
            fill:fc
            ,
            strokeWidth: 2
   });
   circles.push(circle);


//close
var group0 = s.group(); 
  if(index===0){

var text = s.text(cx, cy, lunetext[index]);
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


 group0.click(function() {

  circles.forEach(function(circle) {
   circle.remove();
   });

  texts.forEach(function(text) {
   text.remove();
   });


});

}else{

//sonota
if(index < 5){
 sy=1;
 }else{
 sy=0;
 }

var text = s.text(cx, cy+10*sy, lunetext[index]);
texts.push(text);
group0.add(circle, text);

text.node.style.userSelect = "none"; 

text.attr({
 fill: colors[index],
  "font-size": 30,
  "text-anchor": "middle", 
  "dominant-baseline": "middle" 
});


 group0.click(function(){

                fetch("save_color.php", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "color=" + colors[index]
                });

Snap.load("satz.svg", function(fragment) {



    var GrmMain = fragment.select("#g08")
.attr({fill:"#fff",
            stroke:colors[index]
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