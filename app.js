const
express = require('express'),
app = express(),
mongoose = require('mongoose'),
commander = require('commander'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

commander
  .requiredOption('-u --user <name>','username of the mongodb atlas')
  .requiredOption('-p --password <value>','password for the mongodb atlas acccount')
  .option('-d --database <value>','name of the database','test')
  .parse(process.argv);


const uri = `mongodb+srv://${commander.user}:${commander.password}@cluster0-dumdy.mongodb.net/${commander.database}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(
  () => {
    console.log('mongoose connected');
  },
  err =>{
    console.log('mongoose connection failed');
  }
);

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));

const itemSchema = mongoose.Schema({
  movie: {
    title: String,
    year: String
  },
  listType: Number
});

const Item = mongoose.model('Item', itemSchema);

app.get('/', function(req, res){
  res.redirect('/movies');
});

//index route
app.get('/movies', function(req, res){
  Item.find({}, function(err, items){
    if(err){
      console.log(err);
    }
    else{
      res.render('index',{items: items});
    }
  });
});

//new route
app.get('/movies/new', function(req, res){
  res.render('new');
});


//create route
app.post('/movies', function(req, res){
  let newItem = {
    movie: req.body.movie,
    listType: 1
  };

  Item.create(newItem, function(err, item){
    if(err){
      console.log(err);
    }
    else{
      console.log('Item created');
      res.redirect('/movies');
    }
  });
});

//show route
app.get('/movies/:id', function(req, res){
  Item.findById(req.params.id, function(err, item){
    if(err){
      console.log(err);
    }
    else{
      res.render('show', {item: item});
    }
  });
});

// edit route
app.get('/movies/:id/edit', function(req, res){
  Item.findById(req.params.id, function(err, item){
    if(err) console.log(err);
    else res.render('edit',{item:item});
  });
});

//update route
app.put('/movies/:id', function(req, res){
  let item = {
    movie : req.body.movie,
    listType: req.body.listType
  };
  console.log(item);
  Item.findByIdAndUpdate(req.params.id, item, function(err, item){
    if(err) console.log(err);
    else res.redirect('/movies/' + req.params.id);
  });
});


//delete route
app.delete('/movies/:id', function(req,res){
  Item.findByIdAndRemove(req.params.id, function(err){
    if(err) console.log(err);
    res.redirect('/movies');
  });
});

app.listen(3000, '127.0.0.1', function(){
  console.log('server connected');
});