let eBay = require('ebay-node-api')
const express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.urlencoded())

				var imageDiff = require('image-diff')

					const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
var request = require("request")
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.listen(process.env.PORT || 80, function() {});
app.post('/', (req, res, next) => {
    once = true;
	search = req.body.query
	
var aliobjs = []
var ebayobjs = []
    ebaydo(res, aliobjs, ebayobjs)
})
app.get('/', (req, res) => {
    res.render('index.ejs', {})
})
let ebay = new eBay({
    clientID: process.env.ebay,
    env: 'PRODUCTION', // optional default = 'PRODUCTION'
    headers: { // optional
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US' // For Great Britain https://www.ebay.co.uk
    }
})
var template = 'http://rover.ebay.com/rover/1/706-53473-19255-0/1?ff3=4&pub=5575480811&toolid=10001&campid=5338476385&customid=&mpre='
var search = ''

function ebaydo(res, aliobjs, ebayobjs) {
	for (var i = 0; i <= 5; i++){
    ebay.findItemsByKeywords({
        keywords: search,
		pageNumber: i

    }).then((data) => {
			try{
        for (var item in data[0].searchResult[0].item) {
            img = (data[0].searchResult[0].item[item].galleryURL[0])
            url = encodeURIComponent(data[0].searchResult[0].item[item].viewItemURL[0])
            url = template + url
            obj = {
                'site': 'ebay',
                'affiliate url': url,
                'img': img,
                'title': (data[0].searchResult[0].item[item].title[0]),
                'price': (parseFloat(data[0].searchResult[0].item[item].sellingStatus[0].currentPrice[0].__value__))
            }
            ebayobjs.push(obj)
            //console.log(' ')
			
		} } catch (err){}
		
    }, (error) => {
        //console.log(error);
    });
	}
	ali (search, res, aliobjs, ebayobjs)
}
var request = require('request')

function ali(keywords, res, aliobjs, ebayobjs) {
    var options = {
        method: "GET"
    };
    var time = new Date();
    var time2 = (time.getHours().toString() + "%20" + time.getMinutes().toString() + "%20" + time.getSeconds().toString());
    keywords = encodeURIComponent(keywords)
	for (var i = 1; i <= 50; i++){
		console.log(i)
    var url = "http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.listPromotionProduct/"+process.env.ali+"?pageNo=" + i + "&sort=volumeDown&fields=salePrice,productTitle,volume,imageUrl,productUrl&keywords=" + keywords;
    //console.log('keywords?: ' + url);
    var responses = new Array();
    try {
        var result2 = request.get(url, function(e, r, result2) {
            var json = JSON.parse(result2)
                ////console.log(json);
                /*for (var p in json.result.products){
                  if (json.result.products[p].volume != "0"){
                  //console.log(json.result.products[p].productId);
                  }
                }*/
                ////console.log(json.result);
            if (json.result != null) {
                for (var i in json.result.products) {
                    //console.log(json.result.products[i]);
                    var price = json.result.products[i].salePrice;
                    var id = json.result.products[i].productUrl;
                    var img = json.result.products[i].imageUrl;
                    var title = json.result.products[i].productTitle;
                    var split = keywords.split("%20");

                    if (true) {
                        if (true) {
                            //          //console.log(title);
                            //     //console.log('id: ' + id);
                            //     //console.log('id: ' + id);
                            var options2 = {
                                method: "GET"
                            };
                            dosearchurl(id, title, img, price, aliobjs)
                        } else {


                            //console.log("nuffin - no title match");
                        }
                    }
                }			

            } else {

                //console.log("nuffin - no match atall");
                return ("nuffin - no match atall");
            }
        })
    } catch (e) {
        //console.log('exception: ' + e.toString());
    }
	if (i == 10){
if (once){
	
once = false;
var stringSimilarity = require('string-similarity');
				setTimeout(function(){
newebay = []
newali = []
					for (var e in ebayobjs){
				for (var a in aliobjs){
 try{
var similarity = stringSimilarity.compareTwoStrings(ebayobjs[e].title, aliobjs[a].title); 
if (similarity > 0.63){
	console.log(similarity)
	ebayobjs[e].similarity = similarity
	aliobjs[a].similarity = similarity
newebay.push(ebayobjs[e])
newali.push(aliobjs[a])

}
 } catch(err){}
				}					
				}
				ebayobjs = newebay
				aliobjs = newali
                    res.render('index2.ejs', {
                        'ebay': JSON.stringify(ebayobjs),
                        'aliexpress': JSON.stringify(aliobjs),
						'search': search
                    })
				}, 5000)
		
}
	}		
	}
}
var once = true;

function dosearchurl(id, title, img, price, aliobjs) {
    price = parseFloat(price.substring(4, price.length))
    var url2 = "http://gw.api.alibaba.com/openapi/param2/2/portals.open/api.getPromotionLinks/"+process.env.ali+"?fields=promotionUrl&trackingId=4632&urls=" + id;
    var responses = new Array();
    try {
        var result3 = request.get(url2, function(e, r, result3) {

            var json = JSON.parse(result3)
            obj = {
                'site': 'aliexpress',
                'title': title.replace(/<[^>]*>?/gm, ''),
                'affiliate url': json.result.promotionUrls[0].promotionUrl,
                'img': img,
                'price': price
            }
            aliobjs.push(obj)
        })

    } catch (e) {
        //console.log('exception: ' + e.toString());
    }
}