const path = require('path');
const express = require('express');
const viewengines = (app) => {
    //static file
    app.use(express.static(path.join("./src", 'publics')));
    //viewengin
    app.set('view engine', 'ejs');
    app.set('views', path.join("./src", 'views'));
}
module.exports = viewengines;