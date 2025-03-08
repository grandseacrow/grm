    const me= "mære";//文字化け修正が面倒なので
    const Vr=0.985;//ver修正を書き込みやすいように
  let jf=0;
 jf=5;//	jsfiddle-Grm本体間の誤差修正用(Fiddle以外は消す)

//@0　メイン魔法円
    const centerX = 250;
    const centerY = 250;
    const radiusA = 250;
//@１　サブ魔法円
    const radiusB = 90; 
    const nan=["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ"];
    const Ctable=["none","green","white","gray","black"];
		const lunetext= ["♈","♀","♎","☆"];


    let outerRadius = 200;
    let smallCircles = [];
    let pilaB = [];
    let data1=[];
    let data3=[];
    
    let z=0;
    let index=0;
    let xx=0;
    let yy=0;
    let cox=750;
    let coy=40;
    let cow=120;
    let ksng=0;
    let opt=0.1;
    let bflag=0;
    let selectS=0;


// SVG 要素を追加
    const svg = d3.select("body").append("svg")
      .attr("width", 1200)
      .attr("height",480);//縦サイズ縮小
      
//Gr3.jsバージョン表示
D3SVG2(svg,0,450,460,"gr3.js Ver"+Vr,Ctable,1);

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
const largeCircle = D3SVG2(g,1,250,250,200,Ctable,4,1,2);
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



//捨てpila 順番入れ替え、メイン魔法陣の前に
		const path = g.append("path")
      .attr("d", "M250 250")
      .attr("stroke", "white") // 線の色
      .attr("fill", "none") // 線の幅
  		.attr("stroke-width", 10); // 線の幅

//枠

D3SVG4(svg,1,620,20,1020,470,Ctable,0,1,2,20);

//mre(メーレ)
D3SVG2(svg,0,640,15,me,Ctable,1);

//Bohne（ボーネ）
  for(i=0;i<4;i++){

  const bean=svg.append("text")
        .attr("x",705+i*20)
        .attr("y", 15)
        .style("font-family", "Grmfont")//フォント
        .style("font-size", "10px")//大きさ
        .text(lunetext[i])
        .attr("fill", "green")
        .attr("class", "ccc");

  const ccc=svg.append("rect")
          .attr("x",700+i*20)
          .attr("y",0)
          .attr("width", 20)
          .attr("height",18)
          .attr("rx",0)
          .attr("ry",0)
          .attr("fill", "black")
           .attr("class", "bbb")
          .on("mouseenter",Bon)
          .on("mouseleave",Bout)

      
  }



//メーレ表示（テスト用）
let mW="グリム{";
svg.append("text")
  .attr("x", 640)
  .attr("y", coy+5)
  .style("font-family", "Grmfont")//フォント
  .style("font-size", "20px")//大きさ
  .text(mW)
  .attr("fill", "green"); // クラスを追加




//■カーソル（初期）


      const Ccircle = svg.append("rect")
        .attr("x", 630)
        .attr("y", coy+10)
        .attr("rx",5)
        .attr("ry",5)
        .attr("width", cow)
        .attr("height",10)                   
        .attr("fill", "green")
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
    



//サブ魔法円追加　関数
function addSmallCircles(flag) {

      const maxOuterCircles = 6;
      coy=coy+30;
    		Ccircle.attr("y", coy+20);

  //gr グループ

  

  //メーレ追加（直書き）
  mW=nan[index]+"(　){";
      svg.append("text")
        .attr("x", 640)
        .attr("y", coy+4+jf)
        .attr("class", "erase")
        .style("font-family", "Grmfont")//フォント
        .style("font-size", "20px")//大きさ
        .text(mW)
        .attr("fill", "green");

  //メーレ前に■
   svg.append("rect")
       .attr("x", 630)
       .attr("y", coy-15)
       .attr("width", cow)
       .attr("height", 30)
       .attr("rx",10)
       .attr("ry",10)
       .attr("fill", "white")
       .attr("class", "erase stz")
       .style("opacity",opt)
       .on("click",Gmenu)
       .on("mouseleave",Gleave)
    

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
      .attr("id","c"+index) 
      
//ドラッグイベント
      .call(d3.drag()
      	.on("drag", function (event) {
          d3.select(this).attr("fill", "green").attr("cx", event.x).attr("cy", event.y);
          line.attr("x2", event.x).attr("y2", event.y);
          sno.attr("x", event.x-20).attr("y", event.y+20).style("font-size", "50px").attr("fill", "Black");
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

          }




//サブ魔法円位置更新                        
          const idS=d3.select(this).attr("r") -radiusB;
          xx=event.x;
          yy=event.y;
          smallCircles.splice(idS,0);
          smallCircles.splice(idS,1,{xx,yy,smallCircle});
          
//メーレ側の該当箇所を四角で囲む 
if(ksng>0){
opt=0;
}
ksng=1;
const mrect = svg.append("rect")
                    .attr("x", 630)
                    .attr("y", idS*30+55)
                    .attr("rx",10)
                    .attr("ry",10)
                    .attr("width", cow)
                    .attr("height", 30)                   
                    .attr("stroke", "green") 
                    .attr("stroke-width",3)
                    .attr("fill", "green") 
					.attr("class", "mrect") 
                    .style("opacity",opt);
        })
        
//ドラッグ終了処理        
        .on("end", function (event) {
       ksng=0;
        opt=0.2;
        d3.select(this).attr("fill", "black");
        
        const sgg="#c"+selectS;
    g.selectAll(sgg).attr("fill", "white");
    
        selectS
        sno.attr("x", event.x).attr("y", event.y-radiusB-index-10).style("font-size", "10px").attr("fill", "green");
        svg.selectAll(".mrect").remove()
      	})

           );

//番号付与
                    
      const sno=g.append("text")
      .attr("x", newX)
      .attr("y", newY-radiusB-index-10)
      .attr("fill", "green")
      .style("font-size", "10px")//大きさ
      .text(nan[index]);


                    
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
d3.select(".clearButton").on("click",function(){
  zenkes();
//test

const multilineString ="Spiegel, Spiegel an der Wand, wer ist die schnste Knigin von allen?";
d3.select(".mess").property("value", multilineString);
}
);
        

//data書き出し
d3.select(".yomu").on("click",function(){
  let data="Gr3"; 
  for(i=0;i<pilaB.length;i++){
  data=data+"@Sx"+parseInt(smallCircles[i].xx) +"y"+parseInt(smallCircles[i].yy);
  data=data+"Px"+parseInt(pilaB[i].xx) +"y"+parseInt(pilaB[i].yy)+` `;
  }

  data=data+"@Sx"+parseInt(smallCircles[smallCircles.length-1].xx)+"y"+parseInt(smallCircles[smallCircles.length-1].yy)+"@Ed";

d3.select(".mess").property("value", data);
}
 );


 d3.select(".kaku").on("click",function(){
 zenkes();

 const data=d3.select(".mess").property("value");
//@で分割
let data2="";
data1=data.split("@");  
//data2=data2+"*"+data1[1];
const str=data1[1];
const numbers = str.match(/d+/g); // 数字の連続をすべて抽出
const xx = numbers[0]; 
const yy = numbers[1]; 

      const smallCircle = g.append("circle")
      .attr("cx", xx)
      .attr("cy", yy)
      .attr("r", radiusB)
      .attr("fill", "black")
      .attr("stroke", "green")     
      .attr("stroke-width", 2) ;
      smallCircles.push({xx,yy,smallCircle});


//1個目円位置

let datax=data1[1].replace('Sx','M ');
datax=datax.replace('Px', ' S ');
datax=datax.replace('x',' ');
datax=datax.replace('y',' ');
datax=datax.replace('y',' ');

if(data1.length>2){
  for(i=2;i<data1.length-2;i++){
const str=data1[i];
const numbers = str.match(/d+/g); // 数字の連続をすべて抽出
const xx = numbers[0]; 
const yy = numbers[1]; 
addSmallCircles(1);

      const smallCircle = g.append("circle")
      .attr("cx", xx)
      .attr("cy", yy)
      .attr("r", radiusB+index-1)
      .attr("fill", "black")
      .attr("stroke", "green")     
      .attr("stroke-width", 2) ;
      smallCircles.push({xx,yy,smallCircle});

  data2=data2+data1[i];
  data2=data2.replace('Sx',' ');
  data2=data2.replace('Px',' ');
  data2=data2.replace('y',' ');
  data2=data2.replace('x',' ');

  }
}
  if (data1.length>3){
const str=data1[data1.length-2];
const numbers = str.match(/d+/g); // 数字の連続をすべて抽出
const xx = numbers[0]; 
const yy = numbers[1]; 

 addSmallCircles(1);

  data2=data2+data1[data1.length-2]
    data2=data2.replace('Sx',' ');
data2=data2.replace('y',' ');
  }

   data2=data2.replace('Sx',' ');
   data2=data2.replace('y',' ');

  data2=datax+data2;
   path.attr("d", data2);
    d3.select(".mess").property("value", data2);

}
 );

 function zenkes(){
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
    Ccircle .attr("y", coy+10);

//その他全消去
svg.selectAll(".erase").remove()
g.selectAll("line").remove(); 
g.selectAll("rect").remove(); 
g.selectAll("text").remove(); 
svg.call(zoom.transform, d3.zoomIdentity);

 }

function D3SVG2(set,k,x,y,etc,Ctable,nakaC,sotoC,sotoW){
   switch(k){
   case 1:
   set.append("circle")//円
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", etc)
        .attr("fill", Ctable[nakaC])
        .attr("stroke", Ctable[sotoC])     
        .attr("stroke-width", sotoW) ;
        break;
        
        default:
    	set.append("text") //文字
    		.attr("x",x)
    		.attr("y",y)
      	.attr("fill", Ctable[nakaC])
    	.text(etc);//変数処理

   }
   return set;
  }

function D3SVG4(set,k,x,y,x2,y2,Ctable,nakaC,sotoC,sotoW,r){
	switch(k){
   case 1:
   set.append("rect")//四角
        .attr("x",x)
        .attr("y",y)
        .attr("width", x2-x)
        .attr("height",y2-y)
        .attr("rx", r) // x方向の角の丸み
        .attr("ry", r) // y方向の角の丸み
        .attr("fill", Ctable[nakaC])
        .attr("stroke", Ctable[sotoC])     
        .attr("stroke-width", sotoW) ;
     break; 
 default:
		set.append("line") //文字
        .attr("x1",x)
        .attr("y1",y)
        .attr("x2",x2)
        .attr("y2",y2)
        .attr("stroke", Ctable[sotoC])     
        .attr("stroke-width", sotoW) ;

 	 }
   return set;
  }

function Gmenu(){
    svg.selectAll(".bbb").attr("fill", "white").style("opacity",0.5);
    svg.selectAll(".stz").style("opacity",opt);    
    d3.select(this).style("opacity",0.5);
    
selectS= (d3.select(this).attr("y")-55)/30;
const sgg="#c"+selectS;
    g.selectAll("circle").attr("fill", "black");
    g.selectAll(sgg).attr("fill", "white");

console.log(sgg);
}
function Gleave(){

}

function Bon(){
    d3.select(this)
      .attr("fill", "green")
      .attr("rx",15)
      .attr("ry",15);
}

function Bout(){
    d3.select(this)
      .attr("fill", "white")
      .attr("rx",0)
      .attr("ry",0);
}
