// SVG要素を取得
var s = Snap("#svg");

// 円の数を指定
var circleCount = 6;

// 円の半径
var radius = 20;

// 円の間隔
var spacing = 50;

// 初期位置
var x = 95;
var y = 200;

// 
var delay = 100;

var circles = [];
var texts = [];

Snap.load("test.svg", function(fragment) {
  //   読み込んだSVGの特定の要素を選択
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

// 円を生成し、時間差で表示する関数
function createCircle(index) {
var cx=x + index * spacing;
var cy= y+(index-2.5) *(index-2.5) * spacing/2.5;

  setTimeout(function() {
    var circle = s.circle(cx ,cy, radius);
    circle.attr({
      fill: "#fff"
    });
 circles.push(circle);


// グループに追加 


 // グループ全体に対して処理を行う

//moji 
var groupm = s.group(); 
  if(index===2){
var text = s.text(cx, cy+5, "♀");
texts.push(text);
groupm.add(circle, text);

text.node.style.userSelect = "none"; 
// テキストのフォントサイズを調整
text.attr({
 fill: "#800",
  "font-size": 40,
  "text-anchor": "middle", // 文字を中央揃え
  "dominant-baseline": "middle" // 文字を中央揃え
});

   circle.attr({
            stroke: "#f00",
            strokeWidth: 2
   });
 groupm.click(function(){
//       circle.click(function() {
            // 外部SVGを読み込む
Snap.load("satz.svg", function(fragment) {
    // 読み込んだSVGの特定の要素を選択
    var GrmMain = fragment.select("#g08")
.attr({fill:"ffff",
            stroke:"#F00"
 });
      s.append(GrmMain);
 });
});

}
//消去
var group0 = s.group(); 
  if(index===0){

var text = s.text(cx, cy+3, "");
text.node.style.userSelect = "none";
texts.push(text);
group0.add(circle, text);
 
// テキストのフォントサイズを調整
 text.attr({
 fill: "#fff",
  "font-size": 30,
  "text-anchor": "middle", // 文字を中央揃え
  "dominant-baseline": "middle" // 文字を中央揃え
});
text.node.style.userSelect = "none"; 

   circle.attr({
 fill: "#0f0",
            stroke: "#fff",
            strokeWidth: 2
   });

 group0.click(function() {
 // 全ての円を削除
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

var text = s.text(cx, cy+8, "");
text.node.style.userSelect = "none";
texts.push(text);
 
// テキストのフォントサイズを調整
 text.attr({
 fill: "#880",
  "font-size": 35,
  "text-anchor": "middle", // 文字を中央揃え
  "dominant-baseline": "middle" // 文字を中央揃え
});

   circle.attr({
            stroke: "#FF0",
            strokeWidth: 2
   });

}


//#
  if(index===1){

var text = s.text(cx-1, cy+10, "");
text.node.style.userSelect = "none"; 
texts.push(text);

// テキストのフォントサイズを調整
 text.attr({
 fill: "#080",
  "font-size": 35,
  "text-anchor": "middle", // 文字を中央揃え
  "dominant-baseline": "middle" // 文字を中央揃え
});

   circle.attr({
            stroke: "#0f0",
            strokeWidth: 2
   });
 
}

//o
  if(index===5){

var text = s.text(cx, cy+3,"");
text.node.style.userSelect = "none"; 
texts.push(text);

// テキストのフォントサイズを調整
 text.attr({
 fill: "#fff",
  "font-size": 50,
  "text-anchor": "middle", // 文字を中央揃え
  "dominant-baseline": "middle" // 文字を中央揃え
});

   circle.attr({
            fill: "#0f0", 
            stroke: "#fff",
            strokeWidth: 2
   });

}

//数字
var groups = s.group(); 

  if(index===3){

var text = s.text(cx, cy+5, "♂");
text.node.style.userSelect = "none"; 
texts.push(text);
groups.add(circle, text);

// テキストのフォントサイズを調整
text.attr({
 fill: "#08f",
  "font-size": 40,
  "text-anchor": "middle", // 文字を中央揃え
  "dominant-baseline": "middle" // 文字を中央揃え
});

   circle.attr({
            stroke: "#0FF",
            strokeWidth: 2
   });

       groups.click(function() {
            // 外部SVGを読み込む
Snap.load("satz.svg", function(fragment) {
    // 読み込んだSVGの特定の要素を選択
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


// 円を生成
  for (var i = 0; i < circleCount; i++) {
  createCircle(i);
  }

});
