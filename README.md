# WEBPACK 4 course note (step-by-step)

## Lesson 1 ( webpack project entegration start )

- `$ npm init -y` package.json created for npm

- `$ npm install webpack webpack-cli --save-dev` intrall webpack plugins

- `$ mkdir src dist` create folder src & dist

- `$ touch src/index.js src/hello-world.js index.html` create file js & html

- `$ touch webpack.config.js` webpack custom configuration file

- "_webpack.config.js_" updated code :

```javascript
const path = resolve("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  mode: none
};
```

- "_src/index.js_" updated code ;

```javascript
import helloworld from "./src/hellw-world";

helloworld();
```

-_src/hello-world.js_" updated code ;

```javascript
const helloworld = () => {
  console.log("Webpack project success");
};

export default helloworld;
```

- "_index.html_" updated code ;

```html
...
<body>
  <script src="bundle.js"></script>
</body>
```

- "_package.json_" added scripts

```json
{
  ...
  "scripts":{
    "test": "echo \"Error: no test specified\" && exit 1",
+   "build": "webpack"
  }
  ...
}
```

- `$ npm run build` start builder

## Lesson 2 (Loaders - file-loader)

- `$ npm install file-loader --save-dev` install file-loader

- `$ mkdir src/images` create folder images

- `$ touch src/image-add.js` create file js

- `$ wget https://image.freepik.com/free-photo/kiwi-fruit-slice_44865-126.jpg -O src/images/kiwi.jpg` download images folder with change image name file

- "_webpack.config.js_" added code

```javascript
module.exports = {
  output: {
    publicPath: "dist/"
  },
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
      use: {
        loader: "file-loader"
    }
  }]
}
```

- \_image-add.js update code

```javascript
import kiwi from "./images/kiwi.jpg";

const addImage = () => {
  const img = document.createElement("img");
  img.alt = "Kivi image";
  img.src = kiwi;
  img.width = 300;

  const body = document.querySelector("body");
  body.appendChild(img);
};

export default addImage;
```

- "_index.js_" update code

```javascript
import helloWorld from './hellw-world';
+ import addImage from './image-add';

helloWorld();
+ addImage();
```

- `$ npm run build`

## Lesson 3 (loaders - css-loader)

- `$ npm install style-loader css-loader` install loader css&style

- remove file "_hello-world.js_

- `$ mkdir src/components` create component folder

- `$ touch src/components/button.js src/components/button.css` create js and css file

- "_src/components/button.js_" updated code

```javascript
import "./button.css";

class Buttons {
  render() {
    const button = document.createElement("button");

    button.classList.add("button");
    button.innerHTML = "Add Text";

    button.addEventListener("click", () => {
      const text = document.createElement("p");

      text.classList.add("text");
      text.innerHTML = "This is Text";

      document.body.appendChild(text);
    });
    document.body.appendChild(button);
  }
}

export default Buttons;
```

- "_src/components/button.css_" updated code

```css
.button {
  background: #444;
  color: #fff;
  padding: 10px 30px;
  display: inline-block;
  border: none;
  outline: none;
  background-repeat: 2px;
  cursor: pointer;
}

.text {
  color: rgb(54, 161, 69);
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  margin: 0;
}
```

- "_src/index.js_" added code

```javascript
import Button from "./components/button";
const btn = new Button();

btn.render();
```

- "_webpack.config.js_" added css rules

```json
module>rule:[
  ...
  {
    "test": /\.css$/,
    "use": ["style-loader", "css-loader"]
  }
  ...
]
```

- `$ npm run build` conrolled index.html file and clicked button

## Lesson 4 (loaders - sass-loader)

- `$ npm install sass-loader node-sass --save` install sass loader

- "_src/components/button.css_" rename "_button.scss_

- "_button.scss_" update code

```scss
$btn-color: #999;
$text-color: blue;

.button {
  ...background: $btn-color; // added
}

.text {
  ...color: $text-color; // added
}
```

- "_src/components/button.js_" change import css file to scss file

```javascript
import "./button.css"; // remove
import "./button.scss"; // added
```

- "_webpack.config.js_" added scss-loader rule

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.scss$/,
      use: ["style-loader","css-loader","sass-loader"]
  }]
}
```

## Lesson 5 (loaders - babel-loader with use plugins)

- `$ npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev` install packages babel

- "_src/components/button.js_" update code

```javascript
class Buttons {
  buttonClass = "button" // added
  textClass = "text" // added
  render() {
    ...
    button.classList.add(this.buttonClass); // change
    ...
    button.addEventListener("click", () => {
      ...
      text.classList.add(this.textClass); // change
      ...
    });
  }
}
```

- "_webpack.config.js_" added js rule

```javascript
module.exports = {
  module: {
    rules: [
      ...
      {
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    }]
}
```

- `$ npm run build` check page

## Lesson 6 (Webpack plugins added)

- `$ npm install terser-webpack-plugin --save-dev` webpack plugin install

- "_webpack.config.js_" update codes

```javascript
const TerserPlugin = require("terser-webpack-plugin"); // added
module.exports = {
  ...
  plugins: [
    new TerserPlugin()
  ]
}
```

- `$ npm run build` see "_dist/bundle.js_" size 17kb switch 6kb

## Lesson 7 (Extracting CSS into a separate Bundle)

- `$ npm install mini-css-extract-plugin --save-dev` install extract css plugin

- "_webpack.config.js_" updated code add plugin

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // added
module.exports = {
  ...
  plugins: [
    ...
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ]
}
```

- `$ touch src/components/heading.js src/components/heading.scss` create new component files

- "_heading.js_" ;

```javascript
import "./heading.scss"; // import scss file

class Heading {
  render() {
    const h = document.createElement("h1");
    h.innerHTML = "WEBPACK awesome";
    document.body.appendChild(h);
  }
}

export default Heading;
```

- "_heading.scss_" ;

```scss
$colored: #f85;

h1 {
  color: $colored;
}
```

- "_index.js_" imported heading.js files

```javascript
import Button from "./components/button";
import Heading from "./components/heading"; // added

const hd = new Heading(); // added
const btn = new Button();
hd.render(); // added
btn.render();
```

- `$ npm run build` see all style files collected in a single file.

## Lesson 8 (Browser caching and clean dist folder generated bundle)

- "_webpack.config.js_" updated code

```javascript
module.exports = {
  output: {
    filename: "bundle[contenthash].js" // change
  },
  plugins:{
    new MiniCssExtractPlugin({
      filename: "styles[contenthash].css" // change
    })
  }
};
```

- `$ npm run build` see dist folder. added new files md5 name

> **NOTE** this configuration will add new files to the "dist" folder each time the "npm build run" command is executed. This will cause confusion. Clean up the dist folder before running the command

- `$ npm install clean-webpack-plugin --save-dev`

- "_webpack.config.js_" update code

```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');; // added
module.exports = {
  ...
  plugins: [
    new CleanWebpack()
  ]
}
```

- `$ npm run build`

## Lesson 9 (Generate html file plugin )

- `$ npm install html-webpack-plugin --save` install plugin

- "_webpack.config.js_" update

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');; // added
module.exports = {
  output:{
    ...
    publicPath: "./" // change publicPath empty
  }
  ...
  plugins: [
    new HtmlWebpackPlugin(
      template: "./index.html",
    )
  ]
}
```

- `$ npm run build` generate index.html file

> **NOTE** publicPath file path on the server side does not work, we will address this problem in future tutorials. For now, run without a server.

## Lesson 10 (production - development mode)

- "_webpack.config.js_" rename "_webpack.prod.config.js_

- "_webpack.dev.config.js_" create new config file and "_webpack.prod.config.js_" inside all code copied after paste "_webpack.dev.config.js_

- "_webpack.prod.config.js_" change mode "none" to "production"

- "_webpack.dev.config.js_" change mode "none" to "development"

- "_webpack.prod.config.js_" removed TerserPlugin all

- "_webpac.dev.config.js_" removed all [contenthash] , TerserPlugin and MiniCssExtractPlugin (with rules loader change 'style-loader')

- "_package.json_" change script properties

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config=webpack.prod.config.js",
    "dev": "webpack --congif=webpack.dev.js"
  }
}
```

- `$ npm run build` or `$ npm dev`

## Lesson 11 (devServer - webpack-dev-server- live development)

- `$ npm install webpack-dev-server --save-dev`

- "_webpack.dev.config.js_" added devServer properties

```javascript
module.exports = {
  ...
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    index: "index.html",
    port: 9000
  },
}
```

> **NOTE** change publicPath "./" to "/"

- "_package.json_" change scripts in dev properties value to "webpack-dev-server --config=webpack.dev.config.js --hot"

- `$ npm run dev` live server working
