// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 961;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 90,
  right: 90,
  bottom: 90,
  left: 90
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select scatter, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(healthData) {
    // Throw an error if one occurs
    //if (error) throw error;
  
    // Print the healthData
    //console.log(healthData);
    //var poverty = []
    //healthData.forEach(function(data){
        //poverty.push(data.poverty)
    
    //console.log(poverty)
    //var healthcare = []
    //healthData.forEach(function(data){
        //healthcare.push(data.healthcare)
    
    //console.log(healthcare)
    console.log(healthData);

    // Configure a linear scale with a range between the chartHeight and 0
    var xLinearScale = d3.scaleLinear()
    .range([0, chartWidth])
    .domain(d3.extent(healthData, data => data.poverty));

    var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(healthData, data => data.healthcare)]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Configure a line function which will plot the x and y coordinates using our scales
    var drawLine = d3
    .line()
    .x(data => xTimeScale(data.poverty))
    .y(data => yLinearScale(data.healthcare));

     // Append an SVG path and plot its points using the line function
     chartGroup.append("path")
     // The drawLine function returns the instructions for creating the line for milesData
     .attr("d", drawLine(healthData))
     .classed("line", true); 

    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

    chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

});

svg.selectAll(".dot")
.data(data)
.enter().append("circle")
.attr("class", "dot")
.attr("r", 3.5)
.attr("cx", xMap)
.attr("cy", yMap)
.style("fill", "red") 
.on("mouseover", function(d) {
    tooltip.transition()
         .duration(200)
         .style("opacity", .9);
    tooltip.html(d.poverty + "<br/> (" + xValue(d) 
    + ", " + yValue(d) + ")")
         .style("left", (d3.event.pageX + 5) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
})
.on("mouseout", function(d) {
    tooltip.transition()
         .duration(500)
         .style("opacity", 0);
});
