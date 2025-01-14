const svg = d3.select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500)
  .style("background-color", "black");

// 緑色の十字線を描き、中央に配置
svg.append("line")
  .attr("x1", 250)
  .attr("y1", 0)
  .attr("x2", 250)
  .attr("y2", 500)
  .attr("stroke", "green")
  .attr("stroke-width", 2);

svg.append("line")
  .attr("x1", 0)
  .attr("y1", 250)
  .attr("x2", 500)
  .attr("y2", 250)
  .attr("stroke", "green")
  .attr("stroke-width", 2);

// 緑色の円を左上に描き、半径を50とする
svg.append("circle")
  .attr("cx", 50)
  .attr("cy", 50)
  .attr("r", 50)
  .attr("fill", "green");
