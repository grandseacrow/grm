const me= "mære";//文字化け修正が面倒なので
const Vr=0.9099;//ver修正を書き込みやすいように

// SVG 要素を追加
const svg = d3.select("body").append("svg")
  .attr("width", 1200)
  .attr("height",480);//縦サイズ縮小
  
let fla=[0,0,0,0,0,0,0,0,0,0];
let knsj=["壱","弐","参","肆","伍","陸","質","捌","玖","拾"];
const nan=["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ"];
let cl="";
const dataset=[
{id:0,x:0,y:150,sh:"＆"},
{id:1,x:100,y:150,sh:"＆"},
{id:2,x:200,y:150,sh:"＆"}
];

const pilaB=[
{id:0,x:100,y:50},
{id:1,x:300,y:200}];


const g = svg.append("g");

// カーソル用のdivタグを取得してcursorに格納
var cursor = document.getElementById('cursor'); 

// カーソル用のdivタグをマウスに追従させる
document.addEventListener('mousemove', function (e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

 //中央魔法円
const largeCircle=  g.append('g')
.append("circle")//後方魔法円
.attr("stroke", "Green")
.attr("stroke-width", 2)
.attr("cx",250)
.attr("cy",250)
.attr("r",200)

//外部SVG魔法陣
d3.xml("key.svg").then(function(xml) {
  const defs = g.append("defs");
  defs.node().appendChild(xml.documentElement);
  
  // use要素を使用して、外部SVGファイル内の要素をコピーして円の中に表示
  const MOYO= g.append("use")
  .attr("xlink:href", "#g0") // 外部SVGファイル内の要素のIDを指定
  .attr("x",60)
  .attr("y", 60);
  //    .attr("width", 10)
  //    .attr("height", 10)
  }); 
  


// ズーム動作を定義
const zoom = d3.zoom()
  .scaleExtent([0.1, 10]) // ズームの範囲を設定
  .on("zoom", zoomed);

    const drag = d3.drag()
      .on("start", function(event, d) {
        d3.select(this).raise().classed("dragging", true);
        d3.select(this).select("circle.main").attr("fill","green");
        cursor.style.transform ='scale(0)';
      })
      .on("drag", function(event, d) {
        d.x = event.x;
        d.y = event.y;
        d3.select(this).attr("transform", `translate(${d.x},${d.y})`);
      })
      .on("end", function(event, d) {
              d3.select(this).select("circle.main").attr("fill","black");
        d3.select(this).classed("dragging", false);
cursor.style.transform ='scale(1)';
      });
 
     const drag2 = d3.drag()
      .on("start", function(event, d) {
        d3.select(this).raise().classed("dragging", true);
        d3.select(this).select("text.ID").attr("fill","green");
        cursor.style.transform ='scale(0)';
      })
      .on("drag", function(event, d) {
        d.x = event.x;
        d.y = event.y;
        d3.select(this).attr("transform", `translate(${d.x},${d.y})`);
      })
      .on("end", function(event, d) {
              d3.select(this).select("text.ID").attr("fill","white");
        d3.select(this).classed("dragging", false);
cursor.style.transform ='scale(1)';
      });
      
      
circleinit();

svg.call(zoom);

function zoomed(event) {
  //if(kotei==-1){
        g.attr("transform", event.transform);
 // }
}

////Gr3.jsバージョン表示
svg.append("text") 
.style("font-size", "20px")//大きさ
.attr("fill", "green")
.attr("x",450)
.attr("y",460)
.attr("fill", "Green")
.text("gr3.js Ver"+Vr)

//枠
svg.append("rect")
.attr("rx",20)
.attr("x",620)
.attr("y",20)
.attr("width",400)
.attr("height",450)
.attr("stroke", "Green")
.attr("stroke-width", 2)
.attr("fill", "none")


//mre(メーレ)
svg.append("text") //k1(Lv)
.style("font-size", "20px")//大きさ
.attr("fill", "green")
.attr("x",640)
.attr("y",15)
.attr("fill", "Green")
.text(me)



function circleinit(){
//Kreis
 const  Kreis= g.selectAll('.kris')
    .data(dataset)
    .enter()
    .append('g')
    .attr("transform", d => `translate(${d.x},${d.y})`)
     .call(drag);
      
 
 
 


  Kreis.append("circle")//後方魔法円
    .attr("fill", "#222")
    .attr("class","b")
    .attr("cx",d=> d.x)
    .attr("cy",d=> d.y)
  

  
  Kreis.append("text") //k1(Lv)
    .style("font-family", "Grmfont")//フォント
   .style("font-size", "180px")//大きさ
    .attr("fill", "green")
    .attr("x",d=> d.x-90)
    .attr("y",d=> d.y+90)
    .text("①")
  .attr("class","k1");
  
  Kreis.append("text") //k2（ｓｈ）   
  .style("font-family", "Grmfont")//フォント
  .style("font-size", "100px")//大きさ
  .attr("fill", "#00ff00")
    .text(d=> d.sh)
    .attr("x",d=> d.x-45)
    .attr("y",d=> d.y+40)
   .attr("class","k2");
  
  Kreis.append("circle")//メイン魔法円
      .style("opacity",0.5)
      .attr("fill","black")
       .attr("class","main") 
    .attr("cx",d=> d.x)
    .attr("cy",d=> d.y)
     .attr("r",90)
     
   Kreis.append("text") //ID   
  .style("font-size", "16px")//大きさ
  .attr("fill", "#00ff00")
    .text(d=> nan[d.id])
    .attr("x",d=> d.x)
    .attr("y",d=> d.y-100)
   .attr("class","ID");    

//pilab

 const  pilab= g.selectAll('.plb')
    .data(pilaB)
    .enter()
    .append('g')
    .attr("transform", d => `translate(${d.x},${d.y})`)
     .call(drag2);

  pilab.append("text") //ID   
   .style("font-size", "10px")//大きさ
   .attr("fill", "white")
   .text(d=> knsj[d.id])
   .attr("x",d=> d.x+5)
   .attr("y",d=> d.y+14)
   .attr("class","ID");   


  pilab.append("rect")
    .attr("x",d=> d.x)
    .attr("y",d=> d.y)
    .attr("rx",5)
    .attr("width", 20)
    .attr("height", 20)
    .style("opacity",0.5)
    .attr("fill", "grey");
    
    
   
}
