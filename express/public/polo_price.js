function f() {
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

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

        { "Milestone": "2018-02-20",
            "text": "ETC 5.0.0",
            "status":"completed",
            "color" : "green"
        },
        { "Milestone": "2018-03-05",
            "text": "ETC handled over 100,000 in transactions per day",
            "status":"completed",
            "color" : "green"
        },
        { "Milestone": "2018-03-27",
            "text": "ETC 5.1.0",
            "status":"completed",
            "color" : "green"
        },

        { "Milestone": "2018-04-19",
            "text": "ETC 5.2.0",
            "status":"completed",
            "color" : "green"
        },
        { "Milestone": "2018-05-07",
            "text": "ETC 5.2.1",
            "status":"completed",
            "color" : "green"
        },

        { "Milestone": "2018-05-24",
            "text":"ECIP 1041 - Remove Difficulty Bomb",
            "status":"uncompleted",
            "color" : "green"
        },

    ];

//console.log(hashrate_array.cars);

    //console.log(polo_data_array);

// Scale the range of the data
//x.domain([0, 1]);
//x.domain(d3.extent(jsonCircles, function(d) { return new Date(d.Milestone); }));
    x.domain([new Date("2018-01-01"), new Date("2018-12-31")]);
//y.domain(d3.extent(jsonCircles, function(d) { return new Date(d.Milestone); }));
    y.domain([0, 70]);


    var data3= [];

    _.forEach(jsonCircles, function(value,i) {
        data3.push(
            {
                source: [0, y(new Date(value.Milestone))],
                target: [1, (i+0.0)*21],
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
    var start_block=5800000;
    var start_block_time=1525311323;

//var base_diff= 140 * Math.pow(10,12);
    var base_diff= 150 * Math.pow(10,12);
//var base_diff= 0;

    for (i=start_block;i<7300000;i+=100000)
    {
        //1518784275, 5400000
        var newtime = start_block_time+(i-start_block)*18.452;
        data5.push(
            {
                time: newtime,
                block:i,
                //diff : Math.pow(2, (i/100000)-2-20)+base_diff-100000000000,
                diff : Math.pow(2, (i/100000)-2-20)+base_diff,
            }
        )
    }

    for (i=start_block;i<7300000;i+=10000)
    {
        //1518784275, 5400000
        var newtime = start_block_time+(i-start_block)*18.452;
        if (i<5900000){
            data6.push(
                {
                    time: newtime,
                    block:i,
                    //diff : base_diff-100000000000,
                    diff : base_diff,
                }
            )
        }
        else{
            data6.push(
                {
                    time: newtime,
                    block:i,
                    //diff : base_diff-100000000000-10000000000000,
                    diff : base_diff-10000000000000,
                }
            )
        }

    }


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
            return d.target[1]+150;
            //return 100;
        })
        .style("opacity", 0.5)
        .style("fill", "green")
        .attr("width", 1)
        .attr("height",function (d) {
            return y(data_array.hash_max)-(d.target[1]+150);
            //return d.target[1]+150;
            //return 100;
        })




    svg.append("rect")
        .attr("x", 0)
        .attr("y", y(data_array.hash_max))
        .style("opacity", 0.5)
        .style("fill", "#bada55")
        .attr("width", width)
        .attr("height",y(data_array.hash_min)-y(data_array.hash_max));
//.attr("height",y(new Date(1526234275*1000)));


    let circles3 = svg.selectAll("circle3")
        //.data(hashrate_array.cars)
        .data(polo_data_array)
        .enter()
        .append("circle")
        .attr("clip-path","url(#rect-clip)")
        .attr("cx", function (d) {
            //console.log(d.timestamp);
            return x(new Date(d.date*1000)); })
        .attr("cy", function (d) {
            //console.log(d);
            return y(d.close);
            //return y(d.difficulty);
            //return y(d.totalDifficulty);
        })
        .attr("r", function (d) { return 1; })
        .attr('fill-opacity', function(d) {
            if (d.status == "completed"){
                return 1;
            }
            else {
                return 0.5;
            }
        })
        .style("fill", function(d) { return "purple"; });


    let etcg_line = d3.line()
        .x(function(d) { return x(new Date(d.Date)); })
        .y(function(d) { return y(parseInt(d.Close)); });

    svg.append("path")
        .data([all_data_array.etcg_price])
        .attr("class", "line")
        .attr("d", etcg_line);


    var f1 = d3.format(".2s");

    var text3 = svg.selectAll("text1")
        .data(data5)
        .enter()
        .append("text")
        .attr("class", "text1")
        .attr("x", function (d) {
            //console.log(d);
            return x(new Date(d.time*1000)); })
        .attr("y", function (d) {
            return height-10;
        })
        .attr("dx", 0)
        .attr("dy", 0)
        .style("font-size", "12px")
        .text(function(d){
            //console.log(d.block);
            if (d.block % 200000 == 0){
                return f1(d.block);
            }
            else{
                return null;
            }


        });

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



    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

// Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y)
        .ticks(20));
            //.tickFormat(d3.format(".0s")));


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
        .attr("y", 0)
        .style("font-size", "14px")
        //.attr("transform", "translate(0,0) rotate(90)")
        .attr('text-anchor', 'middle')
        .text("Today");

    svg.append("text")
        .attr("x", x(new Date()))
        .attr("y", -10)
        .style("font-size", "14px")
        .attr("transform", "translate(0,0) rotate(90)")
        .attr('text-anchor', 'middle')
        .text("Ethereum Classic Difficulty");

    svg.append("text")
        .attr("x", x(new Date())-50)
        .attr("y", 640)
        .style("font-size", "14px")
        //.attr("transform", "translate(0,0) rotate(90)")
        .attr('text-anchor', 'middle')
        .text("Block:");


}

f();