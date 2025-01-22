    const width = 1200;
    const height = 640;
    const me= "mære";//いちいち修正が面倒なので
    const Vr=0.69;//ver修正を書き込みやすいように

    // SVG 要素を追加
    const svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);
      
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


    // 小さな円を描画
    const smallCircle = g.append("circle")
      .attr("cx", 400)  // 円の中心の X 座標
      .attr("cy", 400)       // 円の中心の Y 座標
      .attr("r", 50)                // 円の半径
      .attr("fill", "white")         // 円の塗りつぶし
      .attr("stroke", "green")      // 円の枠の色
      .attr("stroke-width", 2)      // 円の枠の幅
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // 線を描画（ノード）
    const line = lineGroup.append("line")
      .attr("x1", 250)  // 線の始点の X 座標
      .attr("y1", 250)       // 線の始点の Y 座標
      .attr("x2", 400)  // 線の終点の X 座標
      .attr("y2", 400)       // 線の終点の Y 座標
      .attr("stroke", "green")      // 線の色
      .attr("stroke-width", 20);     // 線の幅




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

svg.append("text")
  .attr("x", 640)
  .attr("y", 60)
  .style("font-family", "Grmfont")//フォント
  .style("font-size", "20px")//大きさ
  .text("グリムテスト{  }")
    .attr("fill", "green");

//カーソル
let cox=790;
let coy=50;

const Ccircle = svg.append("circle")
  .attr("cx", cox)
  .attr("cy", coy)
  .attr("r", 10)
  .attr("fill", "white");

// 点滅アニメーション
let opacity = 1;
setInterval(() => {
  opacity = opacity === 1 ? 0.5 : 1;
  Ccircle.style("opacity", opacity);
}, 1000);

svg.append("text")
  .attr("x", cox-10)
  .attr("y", coy+10)
  .style("font-family", "Grmfont")//フォント
  .style("font-size", "20px")//大きさ
  .text("１")
    .attr("fill", "green");

    // ズーム動作をグループ要素に適用
    svg.call(zoom);

    // ズームイベントの処理
    function zoomed(event) {
      g.attr("transform", event.transform);
    }

    // ドラッグイベントの処理
    function dragstarted(event, d) {
      d3.select(this)
        .raise()
        .attr("opacity", 0.5);    // 半透明に設定
    }

    function dragged(event, d) {
      d3.select(this)
        .attr("cx", event.x)
        .attr("cy", event.y);
      line
        .attr("x2", event.x)
        .attr("y2", event.y);  // 線の終点を更新
    }

    function dragended(event, d) {
      d3.select(this)
        .attr("stroke", "green")  // ドラッグ終了後に元の色に戻す
        .attr("opacity", 1);      // 透明度を元に戻す
    }
