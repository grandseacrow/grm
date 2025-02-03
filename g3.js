    const me= "mære";//文字化け修正が面倒なので
    const Vr=0.91;//ver修正を書き込みやすいように

//@0　メイン魔法円
    const centerX = 250;
    const centerY = 250;
    const radiusA = 250;
//@１　サブ魔法円
    const radiusB = 50; 
    const nan=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
    
    let outerRadius = 200;
    let smallCircles = [];
    let pilaB = [];

    let z=0;
    let index=0;
		let xx=0;
    let yy=0;
    let cox=750;
    let coy=40;

// SVG 要素を追加
    const svg = d3.select("body").append("svg")
      .attr("width", 1200)
      .attr("height", 640);
      
//Gr3.jsバージョン表示
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
     

// メイン魔法円を描画
    const largeCircle = g.append("circle")
      .attr("cx", 250)  // 円の中心の X 座標
      .attr("cy", 250)       // 円の中心の Y 座標
      .attr("r", 200)                // 円の半径
      .attr("fill", "black")         // 円の塗りつぶし
      .attr("stroke", "green")      // 円の枠の色
      .attr("stroke-width", 2);     // 円の枠の幅

//捨てpila 順番入れ替え、メイン魔法陣の前に
		const path = g.append("path")
      .attr("d", "M250 250")
      .attr("stroke", "white") // 線の色
      .attr("fill", "none") // 線の幅
  		.attr("stroke-width", 10); // 線の幅

//枠
    svg.append("rect")
      .attr("x",620)
      .attr("y", 20)
      .attr("width", 400)
      .attr("height",600)
      .attr("rx", 20) // x方向の角の丸み
      .attr("ry", 20) // y方向の角の丸み
    	.classed("lines", true);// CSSクラスを追加

//mre(メーレ)
    svg.append("text")
       .attr("x", 620)
       .attr("y", 15)
      .attr("fill", "green")
      .text(me);//変数処理
    
// SW しばらく封印（タグ切り替え？）
//  svg.append("text")
 //    .attr("x", 620)
 //    .attr("y", 335)
 //   .attr("fill", "green")
//    .text("SW");


//メーレ表示（テスト用）
let mW="グリム{";
svg.append("text")
  .attr("x", 640)
  .attr("y", coy+5)
  .style("font-family", "Grmfont")//フォント
  .style("font-size", "20px")//大きさ
  .text(mW)
  .attr("fill", "green"); // クラスを追加

  

//魔法円追加カーソル


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
    

//サブ魔法円追加
function addSmallCircles() {

      const maxOuterCircles = 6;
      coy=coy+30;
			Ccircle.attr("cy", coy);
  
  //メーレ追加（直書き）
  mW="テスト{";
      svg.append("text")
        .attr("x", 640)
        .attr("y", coy+5)
        .attr("class", "erase")
        .style("font-family", "Grmfont")//フォント
        .style("font-size", "20px")//大きさ
        .text(mW)
        .attr("fill", "green");
        
      

//魔法円が６超えたら外側に
	if( z == 5){
            z=0;
            outerRadius = outerRadius + 100 ;
            }else{
            z++;
 	}
    
        
      const angle = Math.PI * 2 * (smallCircles.length / maxOuterCircles);
      const newX = centerX + outerRadius * Math.cos(angle);
      const newY = centerY + outerRadius * Math.sin(angle);


//サブ魔法円表示メイン
      const smallCircle = g.append("circle")
      .attr("cx", newX)
      .attr("cy", newY)
      .attr("r", radiusB+index)
      .attr("fill", "black")
      .attr("stroke", "green")     
      .attr("stroke-width", 2) 

//ドラッグイベント
      .call(d3.drag()
      	.on("drag", function (event) {
          d3.select(this).attr("fill", "white").attr("cx", event.x).attr("cy", event.y);
          line.attr("x2", event.x).attr("y2", event.y);
          sno.attr("x", event.x-20).attr("y", event.y+20).style("font-size", "50px");
          
          if(index>1){
           const cf=smallCircles[0];//魔法円最初
          const pf=pilaB[0];//pira最初
          let pilaW=`M${cf.xx} ${cf.yy} Q ${pf.xx} ${pf.yy}`;
              
          for(let i=0;i<smallCircles.length-1;i++){
           const ct=smallCircles[i];//魔法円途中
           const pt=pilaB[i];//pila円途中
             if (i>0){
             pilaW=pilaW+` ${ct.xx} ${ct.yy} ${pt.xx} ${pt.yy}`;
             }

           }
           
          const ce=smallCircles[smallCircles.length-1];	//魔法円最後
          pilaW=pilaW+` ${ce.xx} ${ce.yy}`;
					path.attr("d", pilaW);
         console.log(pilaW)   
          }
          
          
//サブ魔法円位置更新                        
          const idS=d3.select(this).attr("r") -radiusB;
          xx=event.x;
          yy=event.y;
          smallCircles.splice(idS,0);
          smallCircles.splice(idS,1,{xx,yy,smallCircle});
        })
        
        .on("end", function (event) {
        d3.select(this).attr("fill", "black");
        sno.attr("x", event.x).attr("y", event.y-radiusB-index-10).style("font-size", "10px");
      	})

           );
           
//番号付与
                    
      const sno=g.append("text")
      .attr("x", newX)
      .attr("y", newY-radiusB-index-10)
      .attr("fill", "green")
      .style("font-size", "10px")//大きさ
      .text(nan[index])
      .style("user-select","none");//変数処理
                    
//Mistel（ミステル）表示                      
                const line = lineGroup.append("line")
                    .attr("x1", centerX)
                    .attr("y1", centerY)
                    .attr("x2", newX)
                    .attr("y2", newY)
							      .attr("stroke", "green")      
							      .attr("stroke-width", 20);     
                    
                    
//魔法円が１個以上表示されたら                 
		if(smallCircles.length>0){
             const prev=smallCircles[smallCircles.length-1]
             const angle2 = Math.PI * 2 * ((smallCircles.length-0.5) / maxOuterCircles);
             const pbx = centerX + outerRadius * Math.cos(angle2);
             const pby = centerY + outerRadius * Math.sin(angle2);           
           
//Pila-B表示  
		 	     	const pila = g.append("rect")
                    .attr("x", pbx)
                    .attr("y", pby)
                    .attr("width", 10+index)
                    .attr("height", 10+index)                   
                    .attr("fill", "grey") 
                    .call(d3.drag().on("drag", function (event) {
                        d3.select(this).attr("x", event.x).attr("y", event.y);
                       const idS=d3.select(this).attr("width")-10-1;                    
                     no.attr("x", event.x+12+idS).attr("y", event.y);

                    xx=event.x;
                    yy=event.y;

                    pilaB.splice(idS,0);
                    pilaB.splice(idS,1,{xx,yy});
          //        
          const cf=smallCircles[0];//魔法円最初
          const pf=pilaB[0];//pira最初
          let pilaW=`M${cf.xx} ${cf.yy} Q ${pf.xx} ${pf.yy}`;
              
          for(let i=0;i<smallCircles.length-1;i++){
           const ct=smallCircles[i];//魔法円途中
           const pt=pilaB[i];//pila円途中
             if (i>0){
             pilaW=pilaW+` ${ct.xx} ${ct.yy} ${pt.xx} ${pt.yy}`;
             }

           }
           
          const ce=smallCircles[smallCircles.length-1];	//魔法円最後
          pilaW=pilaW+` ${ce.xx} ${ce.yy}`;
					path.attr("d", pilaW);
         console.log(pilaW)   
              //    
                  
                    }))
                   
                    
                       const no=g.append("text")
                      .attr("x", pbx+12+index)
                      .attr("y", pby)
                      .attr("fill", "gray")
                      .style("font-size", "8px")//大きさ
                      .text(nan[index])
                      .style("user-select","none");//変数処理
                    
               
            xx=pbx;
            yy=pby;
            pilaB.push({xx,yy});
           

      }
     
            xx=newX;
            yy=newY;
            smallCircles.push({xx,yy,smallCircle});
            
           
//pila書き込み（直描き）

    if (index>0){
         const cf=smallCircles[0];//魔法円最初
          const pf=pilaB[0];//pira最初
          let pilaW=`M${cf.xx} ${cf.yy} Q ${pf.xx} ${pf.yy}`;
              
          for(let i=0;i<smallCircles.length-1;i++){
           const ct=smallCircles[i];//魔法円途中
           const pt=pilaB[i];//pila円途中
             if (i>0){
             pilaW=pilaW+` ${ct.xx} ${ct.yy} ${pt.xx} ${pt.yy}`;
             }

           }
           
          const ce=smallCircles[smallCircles.length-1];	//魔法円最後
          pilaW=pilaW+` ${ce.xx} ${ce.yy}`;
					path.attr("d", pilaW);
         console.log(pilaW)   
        }
         //

            index++;
}
        
        
//サブ魔法円消す        
d3.select("#clearButton").on("click",function(){
  for(i=0;i<smallCircles.length;i++){
  smallCircles[i].smallCircle.remove();
  }
//捨てPila再配置
 path.attr("d", "M250 250");
//変数初期化
    smallCircles = [];
    pilaB = [];
    z=0;
    index=0;
    coy=40;
    Ccircle .attr("cy", coy);
   
//その他全消去
svg.selectAll(".erase").remove()
g.selectAll("line").remove(); 
g.selectAll("rect").remove(); 
g.selectAll("text").remove(); 
}
 )
        
        
        