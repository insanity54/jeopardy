const fs = require('fs');

const game = {
  name: "My First Game",
  id: '',
  pointUnit: '$',
  pointMultiplier: 200,
  buzzerLock: true,
  categories: [
    'From B to C',
    'The Food Chain',
    'Stately Bodies of Water',
    'Hammer',
    'I sing the body',
    'Electric'
  ],
  answers: [{
      'category': 0,
      'item': 0,
      'answerText': 'This modern slam is another word for simple',
      'questionText': 'what is Basic',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    },
    {
      'category': 0,
      'item': 1,
      'answerText': 'Seen here are a bunch of this pear',
      'questionText': 'what are Bosc',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': false
    },
    {
      'category': 0,
      'item': 2,
      'answerText': 'A modern slam is to be called another word for simple',
      'questionText': 'what is Basic',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    },
    {
      'category': 0,
      'item': 3,
      'answerText': 'Seen here are a bunch of this pear',
      'questionText': 'what are Bosc',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    },
    {
      'category': 0,
      'item': 4,
      'answerText': 'A modern slam is to be called another word for simple',
      'questionText': 'what is Basic',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    },
    {
      'category': 1,
      'item': 2,
      'answerText': 'Seen here are a bunch of this pear',
      'questionText': 'what are Bosc',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    },
    {
      'category': 1,
      'item': 0,
      'answerText': 'Seen here are a bunch of this pear',
      'questionText': 'what are Bosc',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    },
    {
      'category': 2,
      'item': 1,
      'answerText': 'Seen here are a bunch of this pear',
      'questionText': 'what are Bosc',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    },
    {
      'category': 3,
      'item': 1,
      'answerText': 'Seen here are a bunch of this pear',
      'questionText': 'what are Bosc',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    },
    {
      'category': 5,
      'item': 3,
      'answerText': 'Seen here are a bunch of this pear',
      'questionText': 'what are Bosc',
      'dailyDouble': false,
      'image': '/pears.jpg',
      'video': false,
      'available': true
    }
  ]
}

fs.writeFileSync('default.game.json', JSON.stringify(game));
