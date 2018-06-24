
Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("https://web3.gastracker.io"));


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";





var getblock = function(para) {
    return new Promise(function(resolve, reject) {

        web3.eth.getBlock(para, function(error, result){
            if(!error){
                //console.log(JSON.stringify(result));
                resolve(result);
            }

            else
                console.error(error);
        })

    })
}




var sleep = function(para) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(para * para)
        }, 1000)
    })
}




async function main() {


    //var result1 = await getblock(5700000);
    //console.log(result1.timestamp);

    //var result1 = await getblock(5);
    //console.log(result1.timestamp);
    //var result2 = await getblock(4);
    //console.log(result2.timestamp);
    //console.log(parseInt(result1.timestamp)-parseInt(result2.timestamp));



    var count =0
    var sum =0;
    for (var i=5845000;i< 6100000; i += 200)
    {
        var result1 = await getblock(i);
        //console.log(result1.difficulty.toString());
        var result2 = await getblock(i-1);
        //console.log(result2.timestamp);
        console.log(parseInt(result1.timestamp)-parseInt(result2.timestamp));
        var blocktime = parseInt(result1.timestamp)-parseInt(result2.timestamp);


        var xx ={
            _id: result1.number,
            difficulty:result1.difficulty.toString(),
            miner:result1.miner,
            timestamp:result1.timestamp,
            totalDifficulty:result1.totalDifficulty.toString(),
            blocktime:blocktime

        };

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("test1");
            dbo.collection("site27").insertOne(xx, function(err, res) {
                if (err){
                    console.log("Repeat");
                }
                console.log("文档插入成功");
                db.close();

            });
        });



    }


}

main();
