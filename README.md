# Building Applications in React and Redux

## Get Started

1. **Install [Node 8](https://nodejs.org)** or newer.
2. **Navigate to this project's root directory on the command line.**
3. **Install Node Packages.** - `npm install`
4. **Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in Chrome.
5. Having issues? See below.

## Having Issues? Try these things first:

1. Run `npm install` - If you forget to do this, you'll get an error when you try to start the app later.
2. Don't run the project from a symbolic link. It will cause issues with file watches.
3. Delete any .eslintrc in your user directory and disable any ESLint plugin / custom rules within your editor since these will conflict with the ESLint rules defined in the course.
4. On Windows? Open your console as an administrator. This will assure the console has the necessary rights to perform installs.
5. Ensure you do not have NODE_ENV=production in your env variables as it will not install the devDependencies. To check run this on the command line: `set NODE_ENV`. If it comes back as production, you need to clear this env variable.
6. Nothing above work? Delete your node_modules folder and re-run npm install.

### Production Dependencies

| **Dependency**   | **Use**                                              |
| ---------------- | ---------------------------------------------------- |
| bootstrap        | CSS Framework                                        |
| immer            | Helper for working with immutable data               |
| prop-types       | Declare types for props passed into React components |
| react            | React library                                        |
| react-dom        | React library for DOM rendering                      |
| react-redux      | Connects React components to Redux                   |
| react-router-dom | React library for routing                            |
| react-toastify   | Display messages to the user                         |
| redux            | Library for unidirectional data flows                |
| redux-thunk      | Async redux library                                  |
| reselect         | Memoize selectors for performance                    |

### Development Dependencies

| **Dependency**                     | **Use**                                                          |
| ---------------------------------- | ---------------------------------------------------------------- |
| @babel/core                        | Transpiles modern JavaScript so it runs cross-browser            |
| @testing-library/react             | Test React components                                            |
| @wojtekmaj/enzyme-adapter-react-17 | Configure Enzyme to work with React 17                           |
| babel-eslint                       | Lint modern JavaScript via ESLint                                |
| babel-loader                       | Add Babel support to Webpack                                     |
| babel-preset-react-app             | Babel preset for working in React. Used by create-react-app too. |
| css-loader                         | Read CSS files via Webpack                                       |
| cssnano                            | Minify CSS                                                       |
| enzyme                             | Simplified JavaScript Testing utilities for React                |
| eslint                             | Lints JavaScript                                                 |
| eslint-loader                      | Run ESLint via Webpack                                           |
| eslint-plugin-import               | Advanced linting of ES6 imports                                  |
| eslint-plugin-react                | Adds React-related rules to ESLint                               |
| fetch-mock                         | Mock fetch calls                                                 |
| html-webpack-plugin                | Generate HTML file via webpack                                   |
| http-server                        | Lightweight HTTP server to serve the production build locally    |
| jest                               | Automated testing framework                                      |
| json-server                        | Create mock API that simulates create, update, delete            |
| mini-css-extract-plugin            | Extract imported CSS to a separate file via Webpack              |
| node-fetch                         | Make HTTP calls via fetch using Node - Used by fetch-mock        |
| npm-run-all                        | Display results of multiple commands on single command line      |
| postcss                            | Post-process CSS                                                 |
| postcss-loader                     | Post-process CSS via Webpack                                     |
| react-test-renderer                | Render React components for testing                              |
| redux-immutable-state-invariant    | Warn when Redux state is mutated                                 |
| redux-mock-store                   | Mock Redux store for testing                                     |
| rimraf                             | Delete files and folders                                         |
| style-loader                       | Insert imported CSS into app via Webpack                         |
| webpack                            | Bundler with plugin ecosystem and integrated dev server          |
| webpack-bundle-analyzer            | Generate report of what's in the app's production bundle         |
| webpack-cli                        | Run Webpack via the command line                                 |
| webpack-dev-server                 | Serve app via Webpack                                            |

## Points

1. Add index file to mound our app inside src folder
2. Add entry point for the app with index.js inside src folder
   - Import React, render from react and react-dom
   - render a simple `<Hi/>` component
3. Use webpack to deliver our app
   - webpack has a local webserver that delivers our app
   - Its common to have webpack config for dev and prod in the root folder
   - since we are using node, we will use the commonJS syntax like `require` & `module.exports` in the webpack config
   - we configure the NODE_ENV as development
   - In development the bundelled files are delivered from memory
4. Configuring Babel & ESLint
   - To trnaspile moden js & jasx to any browser with ES5 standard
   - Can be configured through package.json under the section `babel` or through its own config file
   - Use the preset for react so that it configures babel for all the required settings
   - ESLint is also configured from package.json under the section `eslintConfig`
   - Set up webpack to file watch for us and lint any errors by changing the module loaders and add `eslint-loader`
5. Four ways of creating react components
   - createClass `React.createClass({ render: function(){ return (<p>Hi</p>); } } );`
   - ES class `class Hello extends React.Component { render() { return (<p>Hi</p>); } }`
   - Function Component `function Hello(props) { return (<p>Hi</p>); }`
   - Arrow function `const Hello = (props) => <p>Hi</p>`
   - Prefer Functional components
   - Container components are concerned with behaviour and littl/no markup. These are responsible for passing the data / actions to child components and they hold the state.
   - Presentation components contain all the markup and they receive the data from the container components through props and are not stateful
6. Folder structure
   - src/components
   - each module of the application is in a seperate folder as src/components/login
   - Add about and home modules
7. Redux
   - Immutable store, Action trigger, Reducer
   - store is created in App's entry point by using `createStore(reducer);`
   - Reducers are pure functions, no mutations or sideeffects, no randon, no datetime, no api calls etc
   - `React-Redux` has `Provider` component which attaches the entire `app` to the redux `store`. `Connect` is a function which connects components to the redux store for specific states
   - Provider component is used to wrap app's top level component to the store
   - Connect function wraps the component so that its connected to the store
   - Connect function has two optional parameters mapStateToProps and mapDispatchToProps. mapStateToProps is used to map a set of values from the state and to alter the shape of the state as needed for the component. mapDispatchToProps is used to map which actions are exposed to dispatch so that it can update the state. The mapDispatchToProps can be ingored to the connect function and in this case the dispatch menthod is available to the component and the component need to use, `this.props.discpatch(loadUsers());`. We can also manually wrap the mapdispatchTo Props
   ```js
    function mapDispatchToProps(dispatch){
        return {
            loadUsers: ()=> dispatch(loadUsers());
        };
    }
   ```
   - The next option is to use `bindActionCreators`
   ```js
   function mapDispatchToProps(dispatch) {
     return {
       actions: bindActionCreators(actions, dispatch),
     };
   }
   ```
   - The last choice is to use the return object
   ```js
   const mapDispatchToProps = {
     loadUsers,
   };
   ```
