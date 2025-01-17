    const width = 1200;
    const height = 640;


    // SVG 要素を追加
    const svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);
      
      //JsG3バージョン
svg.append("text") 
.attr("x",450)
.attr("y",600)
   .attr("fill", "green")
    .text("gr3.js Ver0.6");
      

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

var dataset = [ [620,30], [620, 350] ];


//枠
svg.selectAll("rect") 
     .data(dataset) 
     .enter()
     .append("rect")
     .attr("x", function(d) { return d[0]; })
     .attr("y", function(d) { return d[1]; })
  .attr("width", 400)
  .attr("height", 280)
  .attr("rx", 20) // x方向の角の丸み
  .attr("ry", 20) // y方向の角の丸み
.classed("lines", true);// CSSクラスを追加

//文字
  svg.append("text")
     .attr("x", 620)
     .attr("y", 25)
    .attr("fill", "green")
    .text("mere");
    
   svg.append("text")
     .attr("x", 620)
     .attr("y", 345)
    .attr("fill", "green")
    .text("SW");


//メーレ表示試作

svg.append("text")
  .attr("x", 640)
  .attr("y", 60)
  .style("font-family", "Grmfont")//フォント
  .style("font-size", "20px")//大きさ
  .text("テスト(A){I←１}")
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
