const express = require('express')
const app = express()

Web3 = require('web3')


app.set('view engine', 'pug')
app.use(express.static('public'))

let rp = require('request-promise');



const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'test1';


var _ = require('lodash');

app.get('/', async (req, res, next) => {
    try {
        //const user = await getUserFromDb({ id: req.params.id })
        //res.json(user);
        client = await MongoClient.connect(url);
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Get the collection
        const col = db.collection('site10');
        const docs = await col.find().limit(500).toArray();
        //console.log(docs);


        var
            hash_array = {
                //"name":"John",
                //"age":30,
                "cars": [
                    //{ "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
                    //{ "name":"BMW", "models":[ "320", "X3", "X5" ] },
                ]
            };


        let result = await Promise.all(_.forEach(docs, function(value) {
            //console.log(docs);
            hash_array.cars.push(
                {block: value._id,
                    difficulty: value.difficulty,
                    miner: value.miner,
                    timestamp: value.timestamp,
                    totalDifficulty:value.totalDifficulty,
                    blocktime: value.blocktime }
            );


        }));

        var string_hash = JSON.stringify(hash_array);
        //console.log(string_hash);



        var arr = [1,2,3];
        var max = await arr.reduce(function(a, b) {
            return Math.max(a, b);
        });
        //console.log(max);

        let hash_max  = await Math.max.apply(Math,hash_array.cars.map(function(d){
            //console.log(d.difficulty);
            return d.difficulty;
        }))
        let hash_min  = await Math.min.apply(Math,hash_array.cars.map(function(d){
            //console.log(d.difficulty);
            return d.difficulty;
        }))

        let data = {

            "hash_max": hash_max,
            "hash_min": hash_min,
            "number": 123,
            "string": "Hello World"
        }

        let string_data = JSON.stringify(data);
        //console.log(string_hash);


        let polo_data = await rp('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETC&start=1514419200&end=9999999999&period=14400')
            .then(function (htmlString) {
                // Process html...
                //console.log(htmlString);
                return htmlString;
            })
            .catch(function (err) {
                // Crawling failed...
            });

        console.log(typeof polo_data);

        res.render('index', {
            title: 'Hey',
            message: 'Hello there!',
            hashrate: string_hash,
            data:string_data,
            polo_data:polo_data
        })
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e)
    }

    // Close connection
    client.close();

})





app.listen(3000, () => console.log('Example app listening on port 3000!'))


