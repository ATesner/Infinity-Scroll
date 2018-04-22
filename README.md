This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It contains an Infinity Scroll component that you can integrate in your **React** project.<br>
It allow you to load data indefinitely when you scroll the page. Feel free to customize the style.

Test the component on the [Github Page](https://atesner.github.io/React-Infinity-Scroll/)

## Table of Contents

- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Infinity Scroll Component](#infinity-scroll-component)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)

## Folder Structure

After creation, your project should look like this:

```
infinity-scroll/
  README.md
  node_modules/
  package.json
  public/
    index.html
    infinity-scroll-logo.png
    data/
      data.json
  src/
    App.css
    App.js
    index.css
    index.js
    component/
      infinity-scroll.jsx
      infinity-scroll.css
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Installation

Run `npm install` and `npm start` to test.

## Infinity Scroll component

The component is the `src/component/infinity-scroll.jsx` file and the `src/component/infinity-scroll.css`.
The back-end is simulated by the call of the `public/data/data.json`. You have to replace the url in the get method. The component use `axios` to load the data. Don't forget to run `npm install --save axios` in your project if you want to use it.

### `infinity-scroll.jsx`

```js
//...
    /**
     * load the data with axios (you can use your own method if you want)
     */
    get(offset, limit) {
        return new Promise((resolve, reject) => {
            let url = 'http://localhost:3000/data/data.json'; //or use your url (with offset and limit params)
            
            axios.get(url).then(response => { //you can replace axios with your favorite lib :)

                setTimeout(() => { //the setTimeout is for simulate the back time response (you can delete it)
                    //the response.data.slice is for simulate the offest and limit of an API
                    resolve(response.data.slice(offset, offset+limit))
                }, 500)
            })
            .catch(error => {
                console.log('CATCH Infinity-Scroll:', url, '\nError:', error)
                reject(error)
            })
        })
    }
//...
```

Your back have to accept `offset` and `limit` parameters, to fetch data 10 per 10 for example. 

  - **offset** parameter is the starting point of the fetch.
  - **limit** parameter is the number of data you want to fetch.

Use the component like that :

### `App.js`

```js
  render() {
    return (
      ...
        {/* offset param is zero by default */}
        <InfinityScroll offset={0} limit={6} /> {/* load data per six */}
      ...  
    );
  }
```

The infinity scroll component detect when you scroll the page and load the data from the offset point plus the limit.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
