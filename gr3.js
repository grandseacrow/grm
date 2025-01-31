    const me= "mre";//いちいち修正が面倒なので
    const Vr=0.81;//ver修正を書き込みやすいように
    let z=0;
    let index=0;
		let xx=0;
    let yy=0;
    

        const centerX = 250;
        const centerY = 250;
        const radiusA = 250;
                
        const radiusB = 50; 
            let outerRadius = 200;
        let smallCircles = [];



    // SVG 要素を追加
    const svg = d3.select("body").append("svg")
      .attr("width", 1200)
      .attr("height", 640);
      
      //JsG3バージョン
svg.append("text") 
.attr("x",450)
.attr("y",600)
   .attr("fill", "green")
    .text("gr3.js Ver"+Vr);//変数処理
      

    // ズーム動作を定義
    const zoom = d3.zoom()
      .scaleExtent([0.1, 10]) // ズームの範囲を設定
      .on("zoom", zoomed);

    // グループ要素を追加
    const g = svg.append("g");

    // 線のグループ要素（ノードを円の奥に配置）
    const lineGroup = g.append("g")
      .lower();

    // 大きな円を描画
    const largeCircle = g.append("circle")
      .attr("cx", 250)  // 円の中心の X 座標
      .attr("cy", 250)       // 円の中心の Y 座標
      .attr("r", 200)                // 円の半径
      .attr("fill", "black")         // 円の塗りつぶし
      .attr("stroke", "green")      // 円の枠の色
      .attr("stroke-width", 2);     // 円の枠の幅

    const largeCircle2 = g.append("circle")
      .attr("cx", 250)  // 円の中心の X 座標
      .attr("cy", 250)       // 円の中心の Y 座標
      .attr("r", 180)                // 円の半径
      .attr("fill", "black")         // 円の塗りつぶし
      .attr("stroke", "green")      // 円の枠の色
      .attr("stroke-width", 2);     // 円の枠の幅


//SW枠しばらく封印

//枠
svg.append("rect")
     .attr("x",620)
     .attr("y", 20)
  .attr("width", 400)
  .attr("height",600)
  .attr("rx", 20) // x方向の角の丸み
  .attr("ry", 20) // y方向の角の丸み
.classed("lines", true);// CSSクラスを追加

//文字
  svg.append("text")
     .attr("x", 620)
     .attr("y", 15)
    .attr("fill", "green")
    .text(me);//変数処理
    
// SW しばらく封印
//  svg.append("text")
 //    .attr("x", 620)
 //    .attr("y", 335)
 //   .attr("fill", "green")
//    .text("SW");


//メーレ表示

//svg.append("text")
 // .attr("x", 640)
//  .attr("y", 60)
 // .style("font-family", "Grmfont")//フォント
 // .style("font-size", "20px")//大きさ
//  .text("グリムテスト{  }")
//    .attr("fill", "green");

//カーソル
let cox=790;
let coy=50;

const Ccircle = svg.append("circle")
  .attr("cx", cox)
  .attr("cy", coy)
  .attr("r", 10)
  .attr("fill", "white")
.on("click", addSmallCircles);

// 点滅アニメーション
let opacity = 1;
setInterval(() => {
  opacity = opacity === 1 ? 0.5 : 1;
  Ccircle.style("opacity", opacity);
}, 1000);



    // ズーム動作をグループ要素に適用
    svg.call(zoom);

    // ズームイベントの処理
    function zoomed(event) {
      g.attr("transform", event.transform);
    }
    

    
    function addSmallCircles() {
             const maxOuterCircles = 6;

            
            if( z == 5){
            z=0;
            outerRadius = outerRadius + 100 ;
            
            }else{
            z++;
            }
    
        
                const angle = Math.PI * 2 * (smallCircles.length / maxOuterCircles);
                const newX = centerX + outerRadius * Math.cos(angle)*1.5;//test
                const newY = centerY + outerRadius * Math.sin(angle)*1.5;//test

                const smallCircle = g.append("circle")
                    .attr("cx", newX)
                    .attr("cy", newY)
                    .attr("r", radiusB+index)
                    .attr("fill", "black")
                    .attr("stroke", "green")      // 線の色
							      .attr("stroke-width", 2)     // 線の幅
                    .call(d3.drag().on("drag", function (event) {
                        d3.select(this).attr("fill", "white").attr("cx", event.x).attr("cy", event.y);
                        line.attr("x2", event.x).attr("y2", event.y);
               const idS=d3.select(this).attr("r") -radiusB;
               xx=event.x;
               yy=event.y;
               smallCircles.splice(idS,0);
               smallCircles.splice(idS,1,{xx,yy,smallCircle});
             
               
                    })
                    .on("end", function (event) {
                        d3.select(this).attr("fill", "black");
                        })
                    
                    );
                    
                    



                const line = lineGroup.append("line")
                    .attr("x1", centerX)
                    .attr("y1", centerY)
                    .attr("x2", newX)
                    .attr("y2", newY)
							      .attr("stroke", "green")      // 線の色
							      .attr("stroke-width", 20);     // 線の幅
                    
                    
                    
           if(smallCircles.length>0){
           const prev=smallCircles[smallCircles.length-1]
           const angle2 = Math.PI * 2 * ((smallCircles.length-0.5) / maxOuterCircles);
                const pbx = centerX + outerRadius * Math.cos(angle2)*1.5;//test
                const pby = centerY + outerRadius * Math.sin(angle2)*1.5;//test           
           
                    const path = g.append("path")
          .attr("d", `M ${prev.xx} ${prev.yy} S ${pbx} ${pby} ${newX} ${newY}`)
    .attr("stroke", "white") // 線の色
    .attr("fill", "none") // 線の幅
    .attr("stroke-width", 10) // 線の幅
    
    const smallCircle2 = g.append("circle")
                    .attr("cx", pbx)
                    .attr("cy", pby)
                    .attr("r", 10+index)
                    .attr("fill", "grey") 
                    .call(d3.drag().on("drag", function (event) {
                        d3.select(this).attr("cx", event.x).attr("cy", event.y);
                         path.attr("d", `M ${prev.xx} ${prev.yy} S ${event.x} ${event.y} ${newX} ${newY}`);
                    }))

}
					xx=newX;
					yy=newY;
          smallCircles.push({xx,yy,smallCircle});
          index++;
        }
        
        
