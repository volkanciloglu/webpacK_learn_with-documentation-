# WEBPACK 4 course note (step-by-step)

## Lesson 1 ( webpack project entegration start )

- `$ npm init -y` package.json created for npm

- `$ npm install webpack webpack-cli --save-dev` intrall webpack plugins

- `$ mkdir src dist` create folder src & dist

- `$ touch src/index.js src/hello-world.js index.html` create file js & html

- `$ touch webpack.config.js` webpack custom configuration file

- _webpack.config.js_ updated code :

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

- _src/index.js_ updated code ;

```javascript
import helloworld from "./src/hellw-world";

helloworld();
```

-_src/hello-world.js_ updated code ;

```javascript
const helloworld = () => {
  console.log("Webpack project success");
};

export default helloworld;
```

- _index.html_ updated code ;

```html
...
<body>
  <script src="bundle.js"></script>
</body>
```

- _package.json_ added scripts

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
