const sass = require('node-sass-promise');
const fs = require('fs-extra');
const path = require('path');

const exportCss = (scssPath, cssPath) => {
    //Render css from sass...
    sass.render({file: scssPath})
    //Then write result css string to cssPath file
    .then(result => fs.writeFile(cssPath, result.css.toString()))
    .catch(error => console.error(error))     
}

module.exports = (scssPath, cssPath) => {
    //If cssPath directory doesn't exist...
    if(!fs.existsSync(path.dirname(cssPath))) {
        //Create cssPath directory recursively
        fs.mkdir(path.dirname(cssPath), {recursive: true})
        //Render css from sass
        .then(() => sass.render({file: scssPath}))
        //Then write result css string to cssPath file
        .then(result => fs.writeFile(cssPath, result.css.toString()))
        .catch(error => console.error(error))
    }
    
    //Watch for changes to scssPath directory...
    //Only if running watch
    if (process.argv.includes('scss-watch')) {
        fs.watch(path.dirname(scssPath), () => {
            exportCss(scssPath, cssPath); 
            console.log(`Watching ${path.dirname(scssPath)}...`); 
        });
    } else {
        exportCss(scssPath, cssPath);
    }
}