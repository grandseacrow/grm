const me= "mære";//文字化け修正が面倒なので
const Vr=0.9996;//ver修正を書き込みやすいように
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

//grm
const Grm = {
  s00:	{Gr3:"♐",	mere:"エコー",A:0},		//print
  s01:	{Gr3:"♋",	mere:"ループ",A:3},		//for
  s03:	{Gr3:"♓",	mere:"リスト",A:0},		//case
  s04:	{Gr3:"♈",	mere:"エンド",A:0},		//break
  s05:	{Gr3:"♉",	mere:"ホーム",A:0},		//return
  s10:	{Gr3:"♀",	mere:"モジ",A:1},	//文字関数
  s11:	{Gr3:"♂",	mere:"カズ",A:1},		//数字関数
  s12:	{Gr3:"＆",	mere:"カツ",A:2},		//and
  s13:	{Gr3:"♊",	mere:"マタ",A:2},		//or
  s14:	{Gr3:"♍",	mere:"アレ",A:1},		//配列変数
  s15:	{Gr3:"♌",	mere:"コメ",A:1},		//コメント文
  s20:	{Gr3:"♎",	mere:"イフ",A:1},		//if
  s21:	{Gr3:"♑",	mere:"エルス",A:0},		//else
  s22:	{Gr3:"＝",	mere:"＝",A:1},		//＝
  s23:	{Gr3:"＞",	mere:"＞",A:1},		//＞
  s24:	{Gr3:"＜",	mere:"＜",A:1},		//＜
  s25:	{Gr3:"！",	mere:"！",A:1},		//NOT
  }

let outerRadius = 200;
let smallCircles = [];
let pilaB = [];
let data1=[];
let data3=[];
let satzK=[];
let gaa=0;
let fsgg="";
let gr=""
let gt="";
let kotei=-1;
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
let flag=0;



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


//捨てpila 順番入れ替え、メイン魔法陣の前に
const path = g.append("path")
  .attr("d", "M250 250")
  .attr("stroke", "white") // 線の色
  .attr("fill", "none") // 線の幅
  .attr("stroke-width", 10); // 線の幅

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





//枠

D3SVG4(svg,1,620,20,1020,470,Ctable,0,1,2,20);

//mre(メーレ)
D3SVG2(svg,0,640,15,me,Ctable,1);




//メーレ表示（テスト用）
let mW="グリム{";
svg.append("text")
.attr("x", 640)
.attr("y", coy+5)
.style("font-family", "Grmfont")//フォント
.style("font-size", "20px")//大きさ
.text(mW)
.attr("fill", "green"); // クラスを追加

//魔法円　初期化
circleinit();

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
  if(kotei==-1){
        g.attr("transform", event.transform);
  }
}




//サブ魔法円追加　関数
function addSmallCircles(flag,loadX,loadY) {

  const maxOuterCircles = 6;
  coy=coy+30;
    Ccircle.attr("y", coy+20);

//gr グループ



//メーレ追加（直書き）
mW="{"+nan[index]+"◖";
  svg.append("text")
    .attr("x", 640)
    .attr("y", coy+4+jf)
    .attr("class", "erase")
    .style("font-family", "Grmfont")//フォント
    .style("font-size", "20px")//大きさ
    .text(mW)
    .attr("fill", "green")
    .attr("id","t"+index) 
    satzK[index]=mW;

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
if (flag==1){
  g.select("#c"+index)
  .attr("cx", loadX)
  .attr("cy", loadY)
  
    g.select("#b"+index)
  .attr("cx", loadX)
  .attr("cy", loadY)
	.attr("r", 90)		

  
  
}else{
  g.select("#c"+index)
  .attr("cx", newX)
  .attr("cy", newY)
    g.select("#b"+index)
  .attr("cx", newX)
  .attr("cy", newY)	
  .attr("r", 90)
}

g.select("#c"+index)
.attr("r", radiusB+index)
.attr("fill", "gray")
  

//番号付与
const ind="sc"+index;
console.log(ind);
   const sno = g.append("text")
   .attr("id",ind)
   .attr("fill", "green")
   .style("font-size", "10px")//大きさ
   .text(nan[index]);
console.log(ind);
if (flag==1){
sno.attr("x", loadX)
  .attr("y", loadY-radiusB-index-10);

}else{
  sno.attr("x", newX)
    .attr("y", newY-radiusB-index-10);
  
  }




                
//Mistel（ミステル）表示                      
if (flag==1){
lineGroup.select("#l"+index)
  .attr("x2", loadX)
  .attr("y2", loadY)
}else{
lineGroup.select("#l"+index)
  .attr("x2", newX)
  .attr("y2", newY)
}

lineGroup.select("#l"+index)
                .attr("x1", centerX)
                .attr("y1", centerY)
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
                .attr("width", 10+index)
                .attr("height", 10+index)                   
                .attr("fill", "grey") 

                .call(d3.drag().on("drag", function (event) {
                    d3.select(this).attr("x", event.x).attr("y", event.y);
                   const idS=d3.select(this).attr("width")-10-1;            
                   
                   

      
                 no.attr("x", event.x+12+idS).attr("y", event.y);

                xx=event.x;
                yy=event.y;
                lv=0;
                sh=0;
                

                pilaB.splice(idS,0);
                pilaB.splice(idS,1,{xx,yy,lv,sh});
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

          //    
              
                }))

        const no=g.append("text")
        .attr("fill", "gray")
        .style("font-size", "8px")//大きさ
        .style("user-select","none");//変数処理


if (flag==1){
const pbb=pilaB[index-1];

pila.attr("x",  pbb.xx)
  .attr("y",  pbb.yy);
  
//  no.attr("x", pbb.xx+12+index-1)
//      .attr("y", pbb.yy)
//      .text(nan[index-1]);

}else{
pila
.attr("x", pbx)
.attr("y", pby);

no.attr("x", pbx+12+index)
  .attr("y", pby)
   .text(nan[index-1]);
 xx=pbx;
yy=pby;
pilaB.push({xx,yy});
}


//

       
  }
  if (flag==1){
        xx=loadX;
        yy=loadY;
        smallCircles.push({xx,yy,lv,sh});
        }else{
          const lv=0;
          const sh="";
        xx=newX;
        yy=newY;
        console.log(lv)
        smallCircles.push({xx,yy,lv,sh});
        
        }


       
//pila書き込み（直描き）

if (index>0 && flag!=1){
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
     //

        index++;
}
    
    
//けす        
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


//data かきこみ
d3.select(".kaku").on("click",function(){
zenkes();
flag=1;
const data=d3.select(".mess").property("value");
//@で分割
let data2="";
data1=data.split("@");  
//data2=data2+"*"+data1[1];
const str=data1[1];
const numbers = str.match(/d+/g); // 数字の連続をすべて抽出

if(numbers.length>2){
const ppx=numbers[2];
const ppy=numbers[3];
xx = ppx; 
yy = ppy;
console.log(xx,yy);
pilaB.push({xx,yy});
}

xx = numbers[0]; 
yy = numbers[1];
console.log(xx,yy);
addSmallCircles(flag,xx,yy)    



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


if(numbers.length>2){

const pbx=numbers[2];
const pby=numbers[3];
xx = pbx; 
yy = pby;

pilaB.push({xx,yy,});
}

xx = numbers[0]; 
yy = numbers[1];


addSmallCircles(flag,xx,yy)    

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
xx = numbers[0]; 
yy = numbers[1]; 


data2=data2+data1[data1.length-2]
data2=data2.replace('Sx',' ');
data2=data2.replace('y',' ');

addSmallCircles(flag,xx,yy)    


}

data2=data2.replace('Sx',' ');
data2=data2.replace('y',' ');

data2=datax+data2;
path.attr("d", data2);
d3.select(".mess").property("value", data2);

}

);

function zenkes(){

//変数初期化
smallCircles = [];
pilaB = [];
z=0;
index=0;
coy=40;
Ccircle .attr("y", coy+10);
kotei=-1;

//その他全消去
svg.selectAll(".stk").remove();
svg.selectAll(".bbb").remove();
svg.selectAll(".ccc").remove();
svg.selectAll(".erase").remove()
g.selectAll("line").remove(); 
g.selectAll("rect").remove(); 
g.selectAll("text").remove();
g.selectAll(".small").remove();
path.attr("d", "M250 250")
svg.call(zoom.transform, d3.zoomIdentity);
circleinit();
}

function D3SVG2(set,k,x,y,etc,Ctable,nakaC,sotoC,sotoW,cla){
if (!cla){
  cla="none";
}
  switch(k){
case 1:
set.append("circle")//円
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", etc)
    .attr("fill", Ctable[nakaC])
    .attr("stroke", Ctable[sotoC])     
    .attr("stroke-width", sotoW) 
    .attr("class",cla);
    break;
    
    default:
  set.append("text") //文字
    .attr("x",x)
    .attr("y",y)
    .attr("fill", Ctable[nakaC])
  .text(etc)
  .attr("class",cla);//変数処理
  

}
return set;
}

function D3SVG4(set,k,x,y,x2,y2,Ctable,nakaC,sotoC,sotoW,r,cla){
if (!cla){
    cla="none";
  }
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
    .attr("stroke-width", sotoW) 
    .attr("class",cla);
 break; 
default:
set.append("line") //文字
    .attr("x1",x)
    .attr("y1",y)
    .attr("x2",x2)
    .attr("y2",y2)
    .attr("stroke", Ctable[sotoC])     
    .attr("stroke-width", sotoW) 
    .attr("class",cla);

}
return set;
}

function Gmenu(){
kotei=-1;
zoomed;
svg.selectAll(".stk").remove();
svg.selectAll(".bbb").remove();
svg.selectAll(".ccc").remove();
svg.selectAll(".stz").style("opacity",opt);    
d3.select(this).style("opacity",0.5);

selectS= (d3.select(this).attr("y")-55)/30;
const sgg="#c"+selectS;

g.selectAll(sgg).attr("fill", "white");

//   zoom test
const circle =  g.selectAll(sgg).node();
const bounds = circle.getBBox();
const dx = bounds.width;
const dy = bounds.height;
const x = bounds.x + dx / 2;
const y = bounds.y + dy / 2;
const scale = 0.5 / Math.max(dx /600, dy / 600)
const translate = [300 - scale * x, 300 - scale * y];

//二度打ち防止
if (fsgg==""){
svg.transition()
.duration(500)
.call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
fsgg=sgg;
}
//



//Bohne（ボーネ）
for(i=0;i<4;i++){

const bean=svg.append("text")
    .attr("x",dx+i*30-3)
    .attr("y", dy-50)
    .style("font-family", "Grmfont")//フォント
    .style("font-size", "15px")//大きさ
    .text(lunetext[i])
    .attr("fill", "green")
    .attr("class", "ccc");
    

const ccc=svg.append("rect")
    .attr("x",dx+i*30-10)
    .attr("y",dy-70)
    .attr("width", 30)
    .attr("height",28)
    .attr("rx",0)
    .attr("ry",0)
    .attr("fill", "white")
    .attr("class", "bbb")
    .style("opacity",0.5) 
     .attr("id", "s"+i+"t"+selectS)//二重ID　#s (i)t(selectS) 
    .on("mouseenter",Bon)
    .on("mouseleave",Bout)
    .on("click",Bck)

  
}


console.log(sgg);
}
function Gleave(){
fsgg="";
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

function Bck(){
//w-Bohne
const gtr= d3.select(this).attr("id") //
console.log(gtr);
svg.selectAll(".bbb").remove();
svg.selectAll(".ccc").remove();
svg.selectAll(".stk").remove();
kotei=0;
const str= gtr.slice(0, 2)//頭の二文字だけ使う
const tst= gtr.slice(2)//頭の二文字とる




//const svg = d3.select("svg");
const radius = 200;
const handleRadius = 50;
const handlePositions = 6;
let currentValue = 0;

// 円の描画
svg.append("circle")
.attr("cx", 300)
.attr("cy", 250)
.attr("r", radius)
.style("fill", "white")
.style("stroke", "green")
.style("stroke-width", 2)
.attr("class","stk")
 .on("click",bBn);

// 数字の描画

gr=Grm[str+currentValue]["Gr3"];
const suji=svg.append("text")
    .attr("x",250)
    .attr("y", 290)
    .style("font-family", "Grmfont")//フォント
    .style("font-size", "100px")//大きさ
    .text(gr)
    .attr("fill", "black")
     .attr("class","stk");

// ハンドルの描画
const angle = currentValue * 60 * Math.PI / 180;
const x1 = 300 + radius * Math.cos(angle)*0.7;
const y1 = 300 + radius * Math.sin(angle)*0.7;

const handle = svg.append("circle")
.attr("r", handleRadius)
.style("fill", "green")
.attr("cx",x1).attr("cy", y1)
.attr("class","stk")
.on("mouseover",function (){
      currentValue++;
if (currentValue >5) {
currentValue = 0;
}
// ハンドルのドラッグイベント処理
const angle = currentValue * 60 * Math.PI / 180;
const x1 = 300 + radius * Math.cos(angle)*0.7;
const y1 = 250 + radius * Math.sin(angle)*0.7;
handle.attr("cx", x1).attr("cy", y1);
  gt=Grm[str+currentValue]["mere"];
  svg.select("#"+tst).text("{"+gt+"◖◀");
 
gr=Grm[str+currentValue]["Gr3"];
gaa= Grm[str+currentValue]["A"];
suji.text(gr+":"+gaa)


});

//ホイール処理（ズームオフ）


}




function bBn(){
//W-bohne終了
  svg.selectAll(".stk").remove();
//B-bohne
const winx=170;
const winy=260;
const zz=20;
D3SVG2(svg,1,winx,winy,20,Ctable,1,0,0,"stk") ;//半円

D3SVG4(svg,1,winx,winy-20,winx+220,winy+20,Ctable,2,0,0,0,"stk");//白■
D3SVG4(svg,1,winx+180,winy-16,winx+212,winy+15,Ctable,0,3,2,5,"stk")//入力枠右
const input1 = svg.append("foreignObject")//入力枠
    .attr("x", winx+4)
    .attr("y", winy-18)
    .attr("width", 200)
    .attr("height", 36)
    .append("xhtml:input")
    .style("border-radius", "5px")
    .style("border", "2px solid gray")
    .style("padding", "4px")
    .attr("type", "text")
    .style("font-size", "18px")
    .attr("class", "stk")
    .on("input", function(){
const insize=input1.node().value
if(insize.length>10){
  input1.node().value=insize.slice(0, 10);

}
});

for(i=1;i<gaa+1;i++){
//const ii=1
const zx=winx+zz*i;
const zy=winy+(zz*2+5)*i;
svg.append("text") //◀
    .attr("x",zx-35)
    .attr("y",zy+zz*2-25)
　　 .style("font-size", "40px")//大きさ
    .attr("fill", "green")
  .text("◀")
  .attr("class","stk");

  D3SVG4(svg,1,zx,zy-20,zx+220,zy+20,Ctable,2,0,0,0,"stk");//白■
  D3SVG4(svg,1,zx+180,zy-16,zx+212,zy+15,Ctable,0,3,2,5,"stk")//入力枠右
  const inputt = svg.append("foreignObject")//入力枠
      .attr("x", zx+4)
      .attr("y", zy-18)
      .attr("width", 200)
      .attr("height", 36)
      .append("xhtml:input")
      .style("border-radius", "5px")
      .style("border", "2px solid gray")
      .style("padding", "4px")
      .attr("type", "text")
      .style("font-size", "18px")
      .attr("class", "stk")
      .on("input", function(){
  const insize=inputt.node().value
  if(insize.length>10){
    inputt.node().value=insize.slice(0, 10);
  
  }
   }
);

}



//処理後　bohnend;　
}

//終了時
function bohnend(){
  svg.selectAll(".stk").remove();
  //kotei=-1;

  //Kreisに色々追加
  const sen = tst.substring(1);//数字だけとる
  const sxx=smallCircles[sen].xx
  const syy=smallCircles[sen].yy
  smallCircles[sen].sh=gr;



  //後方円
  g.select("#b"+sen)
   .attr("cx",sxx)
  .attr("cy", syy)

  
    //      kr1
    g.select("#k1"+sen)
      .attr("x",sxx-90)
      .attr("y", syy+90)
      .text("①");

    smallCircles[sen].lv=1;

    //kr2
     g.select("#k2"+sen)
      .attr("x",sxx-45)
      .attr("y",syy+40)
      .text(gr);

 

     
}

function circleinit(){


  
  for(k=0;k<12;k++){
     const line = lineGroup.append("line")
      .attr("id","l"+k);
      
      const BackCircle = g.append("circle")
      .attr("id","b"+k)
      .attr("fill", "#222")
      .attr("class","krs");
      
      const krs1=g.append("text")      
      .style("font-family", "Grmfont")//フォント
      .style("font-size", "180px")//大きさ
      .attr("fill", "green")
        .attr("id","k1"+k)
       .attr("class","krs");
      
       const krs2=g.append("text")       
      .style("font-family", "Grmfont")//フォント
      .style("font-size", "100px")//大きさ
      .attr("fill", "#00ff00")
       .attr("id","k2"+k)
       .attr("class","krs");
      
  
      
     const smallCircle = g.append("circle")
      .attr("id","c"+k)
      .attr("class","small")
      .style("opacity",0.5)
  
  
      //ドラッグイベント
    .call(d3.drag()
      .on("drag", function (event) {
        svg.selectAll(".bbb").remove();
        svg.selectAll(".ccc").remove();
        d3.select(this).attr("fill", "green").attr("cx", event.x).attr("cy", event.y);
        line.attr("x2", event.x).attr("y2", event.y);
        
       const idkz=d3.select(this).attr("id");
       const idk=idkz.substring(1);//数字だけとる
       console.log(idk)
       const k1= "#k1"+idk;
       const k2= "#k2"+idk;
       const bk= "#b"+idk;
        svg.select(k1).attr("x",event.x-90).attr("y", event.y+90);
       svg.select(k2).attr("x",event.x-45).attr("y", event.y+40);
        svg.select(bk).attr("cx",event.x).attr("cy", event.y);   
  
        const snos= "#s"+idkz;
  
         svg.select(snos).attr("x", event.x-20).attr("y", event.y+20).style("font-size", "50px").attr("fill", "Black");
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
  
  
  smallCircles[idS].xx=xx;
  smallCircles[idS].yy=yy;  
        
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
     kotei=-1;
      opt=0.2;
      d3.select(this).attr("fill", "gray");
      
      const sgg="#c"+selectS;
  g.selectAll(sgg).attr("fill", "white");
   const snos= "#s"+d3.select(this).attr("id");
   console.log(snos);
  svg.select(snos).attr("x", event.x).attr("y", event.y-radiusB-index-10).style("font-size", "10px").attr("fill", "green");
      svg.selectAll(".mrect").remove()
      })
  
         );
  
  
  }
  
  
  }
