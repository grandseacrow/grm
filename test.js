const svg = d3.select("svg");

const me= "mære";//文字化け修正が面倒なので
const Vr=0.949;//ver修正を書き込みやすいように

//@0　メイン魔法円
const centerX = 250;
const centerY = 250;
const radiusA = 250;
let outerRadius = 200;
  

const knsj=["壱","弐","参","肆","伍","陸","質","捌","玖","拾"];
const nan=["","Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ"];
let dataArray = [];
let idc=0;
let cl="";
let z=0;
const radius=90;
const container = d3.select("#container");

// データの数だけP要素を作成し、Div要素に追加

const gr3p=d3.select("#clicks")
.on("click",addcircle);


// グリム＠
let opacity = 1;
  setInterval(() => {
    opacity = opacity === 1 ? 0.5 : 1;
    gr3p.style("opacity", opacity);
  }, 1000);


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

  //     const coordinatesDiv = d3.select("#coordinates");

       const drag = d3.drag()
           .on("start", function(event, d) {
            d3.select(this).raise().classed("dragging", true);
            d3.select(this).select("circle.main").attr("fill","green");
            cursor.style.transform ='scale(0)';
           })
           .on("drag", function(event, d) {
               d.x += event.dx;
               d.y += event.dy;
               d3.select(this).attr("transform", `translate(${d.x},${d.y})`);
              
           })
           .on("end", function(event, d) {
            d3.select(this).select("circle.main").attr("fill","black");
            d3.select(this).classed("dragging", false);
    cursor.style.transform ='scale(1)';
           });



       // 初期表示（必要であれば）
       // addCircle();

       svg.call(zoom);

       ////Gr3.jsバージョン表示
svg.append("text") 
.style("font-size", "20px")//大きさ
.attr("fill", "green")
.attr("x",450)
.attr("y",460)
.attr("fill", "Green")
.text("gr3.js Ver"+Vr)



//mre(メーレ)
svg.append("text") //k1(Lv)
.style("font-size", "20px")//大きさ
.attr("fill", "green")
.attr("x",640)
.attr("y",15)
.attr("fill", "Green")
.text(me)


       function zoomed(event) {
           //if(kotei==-1){
                 g.attr("transform", event.transform);
          // }
         }


       function updateChart() {
           const groups = g.selectAll("g")
               .data(dataArray);

           const Kreis = groups.enter()
               .append("g")
               .attr("class", "draggable")
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

              groups.attr("transform", d => `translate(${d.x},${d.y})`);


           groups.exit().remove();

           container.selectAll("p") // 既存のP要素を選択 (最初は空)
           .data(dataArray)                         // データをバインド
           .enter()                            // データに対応する新しい要素のプレースホルダーを作成
           .append("p")  
           .text(d => "◤"+nan[d.id]+"◖");

   
       }

       function addcircle() {
        const maxOuterCircles = 6;

        if( z == 5){
            z=0;
            outerRadius = outerRadius + 100 ;
            }else{
            z++;
    }
    
        
      const angle = Math.PI * 2 * (dataArray.length / maxOuterCircles);    
      const x = centerX + outerRadius * Math.cos(angle);
      const y = centerY + outerRadius * Math.sin(angle);

    



           const id= idc;
           const sh="&"
if(idc===0){ 
const x=250;
const y=250;
}
           dataArray.push({id,x, y ,sh });
console.log(dataArray);
           updateChart();
           idc++;
       }

     



