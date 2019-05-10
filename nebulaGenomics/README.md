# nebula-genomics

> Things I would do/add if I had more time:

* There are a couple of parts that I would have broken down into smaller, reusable components, such as the photograph cards present on both the question and results page. If I had more time, I would have made these child components and passed the data down on props.

* Wanted to make the images themselves the radio buttons. Hover and selection effects. When one is selected, lower the brightness and opacity of the other options.

* Testing the components.

* User authentication. Some sort of token auth system that keeps track of who is logged in. Can use this to attach name to each vote rather than requesting the name manually.

* When entering name -- check database -- can't enter same name twice -- throws error.

* Ability to add new questions. I tried to design this in a way that this would be easy to implement in the future.

* Would have used SASS if it was a larger application/ if I had more time.

> If I had done this in React, I think it would have been a lot more impressive/well organised!

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
