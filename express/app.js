const express = require('express')
const app = express()

var rp = require('request-promise');

Web3 = require('web3')
var moment = require('moment');


app.set('view engine', 'pug')
app.use(express.static('public'))



const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'test1';


var _ = require('lodash');

app.get('/', async (req, res, next) => {
    try {

        let ETC_price_data;

        await rp('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETC&start=1509508800&end=9999999999&period=1800')
        //await rp('https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETC&start=1509508800&end=9999999999&period=300')
            .then(function (htmlString) {
                // Process html...
                ETC_price_data = JSON.parse(htmlString);
                //console.log(ETC_price_data[0]);
            })
            .catch(function (err) {
                // Crawling failed...
            });

        let ETC_vdroop2=[];
        let hash_latest2 = await Promise.all([
            _.forEach(ETC_price_data, function(value) {
                //console.log(value);
                //moment.unix(value.date).add(7, 'd').unix();
                let obj = {
                    "date" : moment.unix(value.date).add(-37, 'd').unix(),
                    "close" : value.close*1.08
                };
                ETC_vdroop2.push(obj);
            })
        ]);

        let ETC_vdroop3=[];
        let hash_latest3 = await Promise.all([
            _.forEach(ETC_price_data, function(value) {
                //console.log(value);
                //moment.unix(value.date).add(7, 'd').unix();
                let obj = {
                    "date" : moment.unix(value.date).add(-112, 'd').unix(),
                    "close" : value.close*1.8
                };
                ETC_vdroop3.push(obj);
            })
        ]);

        let ETC_vdroop4=[];
        let hash_latest4 = await Promise.all([
            _.forEach(ETC_price_data, function(value) {
                //console.log(value);
                //moment.unix(value.date).add(7, 'd').unix();
                let obj = {
                    "date" : moment.unix(value.date).add(-205, 'd').unix(),
                    "close" : value.close*2.28
                };
                ETC_vdroop4.push(obj);
            })
        ]);


        //const user = await getUserFromDb({ id: req.params.id })
        //res.json(user);
        client = await MongoClient.connect(url);
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Get the collection
        const col = db.collection('site67');
        const docs = await col.find().limit(5000).toArray();
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
                {block: value._id, difficulty: value.difficulty, miner: value.miner, timestamp: value.timestamp, totalDifficulty:value.totalDifficulty, blocktime: value.blocktime }
            );
        }));

        var string_hash = JSON.stringify(hash_array);
        //console.log(string_hash);



        let hash_max  = await Math.max.apply(Math,hash_array.cars.map(function(d){
            //console.log(d.difficulty);
            return d.difficulty;
        }))

        let hash_min  = await Math.min.apply(Math,hash_array.cars.map(function(d){
            //console.log(d);
            return d.difficulty;
        }));

        let hash_latest = await Promise.all([_.maxBy(hash_array.cars, function(o) {
            //console.log(o.timestamp);
            return o.timestamp;
        })]);

        //console.log(result2);


        console.log(ETC_vdroop3);

        let data = {

            "hash_max": hash_max,
            "hash_min": hash_min,
            "hash_latest": hash_latest,
            "ETC_price_data": ETC_price_data,
            "ETC_vdroop2": ETC_vdroop2,
            "ETC_vdroop3": ETC_vdroop3,
            "ETC_vdroop4": ETC_vdroop4,
            "number": 123,
            "string": "Hello World"
        }

        let string_data = JSON.stringify(data);
        //console.log(string_hash);

        res.render('index', {
            title: 'Hey',
            message: 'Hello there!',
            hashrate: string_hash,
            data:string_data
        })
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e)
    }

    // Close connection
    client.close();

})





app.listen(3000, () => console.log('Example app listening on port 3000!'))


