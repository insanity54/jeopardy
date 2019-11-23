# jepurdee

A full featured clone of a quiz show game. Made for family gatherings, meetups, business meetings, educational use, and more.


## Development Notes

### Picture Image Class Idea

When adding an image to an answer, there is some information that needs to be saved. This is done in order to successfully export the image along with the game JSON.

For this reason, I am thinking I should create an image class.

```
Class Image {
  this.type: 'png';
  this.name: '03';
  this.url: 'blob:http://localhost:8080/38a653ba-0ed5-49af-97b1-3f3ba6fd208a'
}
```

#### Image Creation (via AnswerEditor)

  * [x] Add image type, name, and url to vuex state.
  * [x] Add image data (arrayBuffer) to local forage.


#### Image Loading (via Answer)

  * [x] Load image type, name, and url from vuex state.
  * [x] Render URL in <image> tag.


#### Importing (via ImportGameBadge)

  * [x] Read `assets.json` to determine image name and type.
  * [x] Read image data (arrayBuffer) and store in local storage.
  * [x] Derive URL from arrayBuffer and store in vuex state.


#### Exporting (via GameBadge)

  * [x] Read vuex state to get image name, type (png|jpg|gif), and url
  * [x] Create an `assets.json` file with data defining image type, image name.
  * [x] Write assets.json and `${image.name}.${image.type}` to `assets/` in the zip file
