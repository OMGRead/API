var Parse = require('parse/node');
var auth = require('config.json')('./auth.json');
var amazon = require('amazon-product-api');

var createBook = function(bookInformations, code, callBack) {
  var Book = Parse.Object.extend("Book");
  var book = new Book();
  var bookAttributs = bookInformations.ItemAttributes[0];

  book.set("ISBN", code);
  book.set("detailUrl", bookInformations.DetailPageURL);
  book.set("title", bookAttributs.Title[0]);
  book.set("author", bookAttributs.Author[0]);
  book.set("numberOfItem", bookAttributs.NumberOfItems[0]);
  book.set("numberOfPages", bookAttributs.NumberOfPages[0]);
  book.set("publicationDate", bookAttributs.PublicationDate[0]);
  book.set("publisher", bookAttributs.Publisher[0]);

  book.save(null, {
  success: function(gameScore) {
    callBack(gameScore, null);
  },
  error: function(gameScore, err) {
    callBack(gameScore, err);
  }
});
}

var findBook = function(code, callBack) {
  console.log("find book for code " + code);
  var client = amazon.createClient({
    awsTag: "abc",
    awsId: auth.awsId,
    awsSecret: auth.awsSecret
  });

  client.itemLookup({
    idType: 'ISBN',
    itemId: code
  }).then(function(results) {
    var bookInformations = results[0];
    console.log("response : ");
    console.log(bookInformations);
    console.log("-")
    console.log(bookInformations.ASIN);
    createBook(bookInformations, code, function(book, err) {
      if (err) {
        callBack(null, err);
      }
      else {
        callBack(book, null);
      }
    });
  }).catch(function(err) {
    console.log("error :");
    console.log(err);
    console.log(err.Error);
    callBack(null, err.Error);
  });
}

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('findISBN', function(req, res) {
  console.log("call findISBN cloud function");
  var code = req.params.code;
  if (!code) {
    console.log("error code missing");
    res.error("code missing body request");
    return;
  }
  var Book = Parse.Object.extend("Book");
  var query = new Parse.Query(Book);
  query.equalTo("ISBN", req.param);

  query.first({
    success: function(result) {
      if (result) {
        console.log("find book result ");
        console.log(result);
        res.success(result);
      }
      else {
        console.log("don't find book");
        findBook(code, function(book, err) {
          if (err) {
            console.log("err find book : ");
            console.log(err);
            res.error(err);
          }
          else {
            console.log("find book : ");
            console.log(book);
            res.success(book);
          }
        });
      }
    },
    error: function(error) {
      console.log(error);
      res.error(err);
    }
  });
});
