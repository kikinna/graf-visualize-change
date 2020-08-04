// var svg = d3.select('#mapa')
//   .append('svg').attr('height', 100).attr('width', 100)
//   // .attr('x', 0)
//   // .attr('viewBox', '0 0 100 100')

// https://www.d3-graph-gallery.com/

// https://www.d3-graph-gallery.com/graph/lollipop_horizontal.html
var margin = {top: 10, right: 30, bottom: 40, left: 130},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#mapa")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

// svg.append('circle').attr('cx', 10).attr('cy', 10).attr('r', 20)
//   .attr('class', 'target').attr('fill', '#ff0000').classed('ttarget', true)

d3
  .select(".target")  // select the elements that have the class 'target'
  .style("stroke-width", 1) // change their style: stroke width is not equal to 8 pixels
  .attr('stroke', '#000000')


// Parse the Data
d3.csv("./data.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([-7000, 13000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text.x-axis")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .attr('class', 'x-axis')
      .style('font-family', 'Fira Sans');

// Y axis
var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(data.map(function(d) { return d.Country; }))
  .padding(1)
svg.append("g")
  .call(d3.axisLeft(y))
  .style('font-family', 'Fira Sans')
  .attr('class', 'labels')

// Grid
svg.selectAll("horizontalGrid")
.data(data)
.enter()
.append("line")
  .attr("x1", 0)
  .attr("x2", 800)
  .attr("y1", function(d) { return y(d.Country); })
  .attr("y2", function(d) { return y(d.Country); })
  .attr("stroke", "grey")
  .attr('stroke-dasharray', '1, 4')


// Lines
svg.selectAll("myline")
  .data(data)
  .enter()
  .append("line")
    .attr("x1", function(d) { return x(d.Value); })
    .attr("x2", d => x(d.Original))
    .attr("y1", function(d) { return y(d.Country); })
    .attr("y2", function(d) { return y(d.Country); })
    .attr("stroke", "black")
    .attr('stroke-width', 1.5)
    .attr('stroke-linecap="round"')

svg.selectAll("text.valuesNow")
    .data(data)
    .enter()
    .append("text")
    .attr('class', 'values')
    // .attr('x', d => x(d.Value))
    // .attr('y', d => y(d.Country) - 7)
    .attr('x', d => x(d.Value) + 20)
    .attr('y', d => y(d.Country) + 4)
    .text( d => d.Value )

    // svg.selectAll("text.valuesOrig")
    // .data(data)
    // .enter()
    // .append("text")
    // .attr('class', 'values')
    // .attr('x', d => x(d.Original))
    // .attr('y', d => y(d.Country) - 7)
    // .text( d => d.Original )


svg.selectAll("text.change")
    .data(data)
    .enter()
    .append("text")
    .attr('class', 'change')
    .attr('x', d => (x(d.Value) + x(d.Original))/2 )
    .attr('y', d => y(d.Country) + 15)
    .text( d => d.Value-d.Original )
  
  
// Circles
svg.selectAll("mycircle")
  .data(data)
  .enter()
  .append('svg:image')
  .attr('xlink:href', d => (d.Value-d.Original) > 0 ? 'img/icons/right-arrow.svg' : 'img/icons/left-arrow.svg')
  .attr('class', 'svgimg')
  .attr('width', 10)
  .attr('height', 10)
  .attr('x', d => x(d.Value) - 5)
  .attr('y', d => y(d.Country) - 5)
  // .attr('transform', 'translate(400, 100) rotate(30)' )
  // .attr('transform', d => { (d.Value - d.Original) > 0 ? 'rotate(180)' : '' } )
  // .attr('fill', '#ff0000')
  // .append("circle")
  //   .attr("cx", function(d) { return x(d.Value); })
  //   .attr("cy", function(d) { return y(d.Country); })
  //   .attr("r", "4")
  //   .style("fill", "#69b3a2")
  //   .attr("stroke", "black")
})