// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

//var x = d3.scaleLinear().range([0, 50]);
var x = d3.scaleTime().range([0, width]);
//var y = d3.scaleTime().range([0, height]);
var y = d3.scaleLinear().range([height, 0]);

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


    { "Milestone": "2018-05-30",
        "text":"ECIP 1041 - Remove Difficulty Bomb",
        "status":"uncompleted",
        "color" : "green"
    },

    { "Milestone": "2018-06-12",
        "text":"Coinbase Announces Ethereum Classic Support",
        "status":"completed",
        "color" : "green"
    },
    { "Milestone": "2018-06-12",
        "text":"Binance add new ETC Trading Pairs ",
        "status":"completed",
        "color" : "green"
    },
    { "Milestone": "2018-06-22",
        "text":"Japan FSA orders improvements at crypto exchanges",
        "status":"completed",
        "color" : "green"
    },
    { "Milestone": "2018-06-26",
        "text":"Emerald-wallet v1.0.0",
        "status":"completed",
        "color" : "green"
    },

    { "Milestone": "2018-07-16",
        "text":"Bitmain Antminer E3(B3)",
        "status":"completed",
        "color" : "green"
    },


];

//console.log(hashrate_array.cars);

// Scale the range of the data
//x.domain([0, 1]);
//x.domain(d3.extent(jsonCircles, function(d) { return new Date(d.Milestone); }));
x.domain([new Date("2018-05-15"), new Date("2018-7-30")]);
//y.domain(d3.extent(jsonCircles, function(d) { return new Date(d.Milestone); }));
y.domain([0, 500000000000000]);


var data3= [];

_.forEach(jsonCircles, function(value,i) {
    data3.push(
        {
            source: [0, y(new Date(value.Milestone))],
            target: [1, (i+0.5)*51],
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

var milestone_text_addjust = 30;

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

console.log(data6);


svg.append("rect")
    .attr("x", -0)
    .attr("y", 0)
    .style("opacity", 0.1)
    .style("fill", "green")
    .attr("width", x(new Date()))
    .attr("height",height);



let rect2 = svg.selectAll("rect2")
    .data(data3)
    .enter()
    .append("rect")
    .attr("x", function (d) {
        return x(new Date(d.time))-5; })
    .attr("y", function (d) {
        return d.target[1]+milestone_text_addjust;
        //return 100;
    })
    .style("opacity", 0.5)
    .style("fill", "green")
    .attr("width", 1)
    .attr("height",function (d) {
        return y(data_array.hash_max)-(d.target[1]+milestone_text_addjust);
    //return d.target[1]+150;
    //return 100;
})


var circles = svg.selectAll("circle")
    .data(data3)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return x(new Date(d.time))-5; })
    .attr("cy", function (d) {
        return d.target[1]+milestone_text_addjust;
        //return 100;
    })
    .attr("r", function (d) { return 5; })
    .attr('fill-opacity', 1)
    .style("fill", function(d) { return "green"; });

var circles2 = svg.selectAll("circle2")
    .data(data5)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return x(new Date(d.time*1000)); })
    .attr("cy", function (d) {
        return y(d.diff);
    })
    .attr("r", function (d) { return 0; })
    .attr('fill-opacity', function(d) {
        if (d.status == "completed"){
            return 1;
        }
        else {
            return 0.5;
        }
    })
    .style("fill", function(d) { return "purple"; });



console.log(data_array.hash_max);
console.log(data_array.hash_min);
console.log(y(data_array.hash_max));
console.log(y(data_array.hash_min));
console.log(y(data_array.hash_min)-y(data_array.hash_max));

svg.append("rect")
    .attr("x", 0)
    .attr("y", y(data_array.hash_max))
    .style("opacity", 0.5)
    .style("fill", "#bada55")
    .attr("width", width)
    .attr("height",y(data_array.hash_min)-y(data_array.hash_max));
//.attr("height",y(new Date(1526234275*1000)));



var start = moment([2018, 5, 30]);
var end   = moment([2018, 6, 21]);
end.from(start);       // "in 5 days"
end.from(start, true); // "5 days"
console.log(end.from(start));



var circles3 = svg.selectAll("circle3")
    .data(hashrate_array.cars)
    .enter()
    .append("circle")
    .attr("clip-path","url(#rect-clip)")
    .attr("cx", function (d) {
        //console.log(d.timestamp);
        return x(new Date(d.timestamp*1000)); })
    .attr("cy", function (d) {
        //console.log(d);
        return y(d.difficulty);
        //return y(d.totalDifficulty);
    })
    .attr("r", function (d) { return 2; })
    .attr('fill-opacity', function(d) {
        if (d.status == "completed"){
            return 1;
        }
        else {
            return 0.5;
        }
    })
    .style("fill", function(d) { return "purple"; });






var f1 = d3.format(".2s");



var link = d3.linkHorizontal()
    .x(function(d) {
        return x(d[0]);
    })
    .y(function(d) {
        return d[1];
    });


var circles1 = svg.selectAll("path")
    .data(data3)
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", function(d) {
        return d.color;
    })
    .attr("stroke-opacity", function(d) {
        if (d.status == "completed"){
            return 1;
        }
        else {
            return 0.5;
        }
    })
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr('d', function(d) {
        return link(d);
    });

var circles2 = svg.selectAll("text3")
    .data(data3)
    .enter()
    .append("text")
    .attr("x", function(d) {
        //console.log(d);
        return x(new Date(d.time)); })
    .attr("y", function(d) {
        return d.target[1]+milestone_text_addjust;
    })
    .attr( "fill-opacity", 1)
    .attr("dx", 5)
    .attr("dy", 5)
    .style("font-size", "14px")
    .text(function(d){
        return d.text;
    });

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
    )

// Add the Y Axis
svg.append("g")
    .call(d3.axisLeft(y)
    //.ticks(20)
        .tickFormat(d3.format(".2s")));


var valueline = d3.line()
    .x(function(d) { return x(new Date(d.time*1000)); })
    .y(function(d) { return y(d.diff); });

svg.append("path")
    .data([data5])
    .style("stroke-dasharray", ("3, 3"))
    .attr("clip-path","url(#rect-clip)")
    .attr("class", "line")
    .attr("d", valueline)
    .style("stroke", "Red");

svg.append("path")
    .data([data6])
    .style("stroke-dasharray", ("3, 3"))
    .attr("clip-path","url(#rect-clip)")
    .attr("class", "line")
    .attr("d", valueline)
    .style("stroke", "Green");


svg.append("text")
    .attr("x", x(new Date()))
    .attr("y", 50)
    .style("font-size", "14px")
    //.attr("transform", "translate(0,0) rotate(90)")
    .attr('text-anchor', 'middle')
    .text("Today");

svg.append("text")
    .attr("x", x(new Date())-490)
    .attr("y", -10)
    .style("font-size", "14px")
    .attr("transform", "translate(0,0) rotate(90)")
    .attr('text-anchor', 'middle')
    .text("Ethereum Classic Difficulty");


svg.append("text")
    .attr("x", 840)
    .attr("y",385)
    .style("font-size", "14px")
    //.attr("transform", "translate(0,0) rotate(90)")
    .attr('text-anchor', 'middle')
    .style('fill', 'green')
    .text("ECIP-1041");