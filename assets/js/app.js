
//Work citation: below code derived from: http://bl.ocks.org/weiglemc/6185069
var svgWidth = 960
var svgHeight = 500

//Sets up the margins for the svg object
var margin = {top: 20, right: 20, bottom: 80, left: 80},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;


// setup x 
var xValue = function(d) { return d.poverty;}, // gets the values for poverty
    xScale = d3.scale.linear().range([0, width]), // creates the range based on width variable
    xMap = function(d) { return xScale(xValue(d));}, // scales each poverty value along the range
    xAxis = d3.svg.axis().scale(xScale).orient("bottom"); //displays reference lines for the scale and orients axis to the bottom of the svg object

// setup y
var yValue = function(d) { return d.healthcare;}, // gets the values for healthcare (or lack thereof)
    yScale = d3.scale.linear().range([height, 0]), // gets the height range for the y-axis
    yMap = function(d) { return yScale(yValue(d));}, // scales each healthcare datum along the height range
    yAxis = d3.svg.axis().scale(yScale).orient("left"); // displays reference lines for the y-axis and orients line to the left of the svg object


// add the graph canvas to the body of the webpage
var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load data
d3.csv("assets/data/data.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.poverty = +d.poverty; //prepending a plus sign changes string into a number
    d.healthcare = +d.healthcare;
//    console.log(d);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  // the domain needs to be within the x and y; sets the domain one unit within the range of height and width
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")// append text element within <g> element
      .attr("class", "label")
      .attr("x", width/2)
      .attr("y", 50)
      .style("text-anchor", "middle")
      .style("font-weight","bold")
      .text("In Poverty (%)");
      

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -300)
      //.attr("dy", ".71em")
      .style("font-weight","bold")
      .text("Lacks Healthcare (%)");

  // sets up element for plotting shapes
  var gdots = svg.selectAll("g.dot")
              .data(data)
              .enter().append('g');
  // appends dots (i.e. small circles)
  gdots.append("circle")
      .attr("class", "dot")
      .attr("r",12)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr("stroke","black")
      .attr("stroke-width",1)
      .style("fill", "aquamarine")         
  // appends the abbreviations taken from the csv file column "abbr" and plces them within the circles
  gdots.append("text").text(function(d){
        return d.abbr;})
      .attr("x", xMap)
      .attr("y", yMap)
      .attr("dx",-7)
      .attr("dy",5)
      .attr("font-size",10)



});