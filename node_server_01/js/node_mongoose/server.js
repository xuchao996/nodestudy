const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/animals");

const Cat = mongoose.model('Cat', {name: String});

const kitty = new Cat({title: 'Zild'});

// Promise
kitty.save().then(() => console.log('meow'));

