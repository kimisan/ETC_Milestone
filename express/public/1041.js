// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1300 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

//var x = d3.scaleLinear().range([0, 50]);
var x = d3.scaleTime().range([0, width]);
//var y = d3.scaleTime().range([0, height]);
var y = d3.scaleLinear().range([height, 0]);
var y2 = d3.scaleLinear().range([height, 0]);

var _s1 = d3.format("s");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



//append clip
svg.append("clipPath")       // define a clip path
    .attr("id", "rect-clip") // give the clipPath an ID
    .append("rect")            // shape it as an ellipse
    .attr("x", 0)            // position the x-centre
    .attr("y", 0)            // position the y-centre
    .attr("height",height)
    .attr("width",width);


var jsonCircles = [


    { "Milestone": "2018-08-08",
        "text":"Bitcoin ETF delay",
        "status":"completed",
        "color" : "red"
    },
    { "Milestone": "2018-08-17",
        "text":"Coinbase support $ETC",
        "status":"completed",
        "color" : "green"
    },
    { "Milestone": "2018-08-21",
        "text":"Bittrex support $ETC",
        "status":"completed",
        "color" : "green"
    },
    { "Milestone": "2018-08-21",
        "text":"WeChat Shuts ICO Related Social Media",
        "status":"completed",
        "color" : "black"
    },
    { "Milestone": "2018-8-23",
        "text":" Bitcoin ETF disapproval",
        "status":"completed",
        "color" : "red"
    },
    { "Milestone": "2018-8-24",
        "text":" Chinese Authorities Issue Joint Warning on ‘Illegal’ Crypto Fundraising",
        "status":"completed",
        "color" : "black"
    },
    { "Milestone": "2018-8-26",
        "text":" Baidu banned cryptocurrency related forum",
        "status":"completed",
        "color" : "black"
    },

];

//console.log(hashrate_array.cars);

// Scale the range of the data
//x.domain([0, 1]);
//x.domain(d3.extent(jsonCircles, function(d) { return new Date(d.Milestone); }));
//x.domain([new Date("2018-05-15"), new Date("2018-9-20")]);
x.domain([new Date("2018-01-1"), new Date("2018-9-11")]);
//y.domain(d3.extent(jsonCircles, function(d) { return new Date(d.Milestone); }));
y.domain([0, 50]);
y2.domain([0,50]);


var data3= [];

_.forEach(jsonCircles, function(value,i) {
    data3.push(
        {
            source: [0, y(new Date(value.Milestone))],
            target: [1, (i+0.5)*35],
            time: value.Milestone,
            text:value.text,
            status:value.status,
            color : value.color,
        }
    )
});


var data5=[];
var data6=[];
var i;
var start_block=5885000;
var start_block_time=1527259520;
//23.91
var ave_block_time=14.665;
var block_inverval=5000;

var milestone_text_addjust = 0;

//var base_diff= 140 * Math.pow(10,12);
var base_diff= 145 * Math.pow(10,12);
//var base_diff= 0;


for (i=start_block;i<7300000;i+=block_inverval)
{
    //1518784275, 5400000
    var newtime = start_block_time+(i-start_block)*ave_block_time;

    data6.push(
        {
            time: newtime,
            block:i,
            //diff : base_diff-100000000000,
            diff : base_diff,
        }
    )


}


let r1=1;
let o1=1;



//console.log(data_array.ETC_price_data[0]);
//add ETC price data
var circles5 = svg.selectAll("circle5")
    .data(data_array.ETC_price_data)
    .enter()
    .append("circle")
    .attr("clip-path","url(#rect-clip)")
    .attr("cx", function (d) {
        //console.log(d.timestamp);
        return x(new Date(d.date*1000)); })
    .attr("cy", function (d) {
        //console.log(d);
        return y(d.close);
        //return y(d.totalDifficulty);
    })
    .attr("r", r1)
    .attr('fill-opacity', o1)
    .style("fill", "green");




//add ETC Vdroop2
let circles7 = svg.selectAll("circle7")
    .data(data_array.ETC_vdroop2)
    .enter()
    .append("circle")
    .attr("clip-path","url(#rect-clip)")
    .attr("cx", function (d) {
        //console.log(d.timestamp);
        return x(new Date(d.date*1000)); })
    .attr("cy", function (d) {
        //console.log(d);
        return y(d.close);
        //return y(d.totalDifficulty);
    })
    .attr("r", r1)
    .attr('fill-opacity', o1)
    .style("fill", "red");



console.log(data_array.ETC_vdroop3);
//add ETC Vdroop3
let circles8 = svg.selectAll("circle8")
    .data(data_array.ETC_vdroop3)
    .enter()
    .append("circle")
    .attr("clip-path","url(#rect-clip)")
    .attr("cx", function (d) {
        //console.log(d.timestamp);
        return x(new Date(d.date*1000)); })
    .attr("cy", function (d) {
        //console.log(d);
        return y(d.close);
        //return y(d.totalDifficulty);
    })
    .attr("r", r1)
    .attr('fill-opacity', o1)
    .style("fill", "blue");

//console.log(data_array.ETC_vdroop3);
//add ETC Vdroop3
let circles9 = svg.selectAll("circle9")
    .data(data_array.ETC_vdroop4)
    .enter()
    .append("circle")
    .attr("clip-path","url(#rect-clip)")
    .attr("cx", function (d) {
        //console.log(d.timestamp);
        return x(new Date(d.date*1000)); })
    .attr("cy", function (d) {
        //console.log(d);
        return y(d.close);
        //return y(d.totalDifficulty);
    })
    .attr("r", r1)
    .attr('fill-opacity', o1)
    .style("fill", "purple");



var f1 = d3.format(".2s");



var link = d3.linkHorizontal()
    .x(function(d) {
        return x(d[0]);
    })
    .y(function(d) {
        return d[1];
    });



svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
    )

// Add the Y Axis
svg.append("g")
    .attr("stroke", "purple")
    .call(d3.axisLeft(y)
        .tickFormat(d3.format(".2s")));


svg.append("text")
    .attr("x", x(new Date()))
    .attr("y", 20)
    .style("font-size", "14px")
    //.attr("transform", "translate(0,0) rotate(90)")
    .attr('text-anchor', 'middle')
    .text("Today");

/*
svg.append("text")
    .attr("x", 100)
    .attr("y", -10)
    .style("font-size", "14px")
    .attr("transform", "translate(0,0) rotate(90)")
    .attr('text-anchor', 'middle')
    .attr("stroke", "purple")
    .text("$ETC/USD");
    */