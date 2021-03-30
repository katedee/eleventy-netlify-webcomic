const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const slugify = require("slugify");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const sass = require('./config/sass-process');

module.exports = function(eleventyConfig) {

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addCollection("webcomic", function(collection) {
    const coll = collection.getFilteredByTag("comic");
  
    for(let i = 0; i < coll.length ; i++) {
      const firstPost = coll[0];
      const lastPost = coll.slice(-1)[0];
      const prevPost = coll[i-1];
      const nextPost = coll[i + 1];
  
      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
      coll[i].data["firstPost"] = firstPost;
      coll[i].data["lastPost"] = lastPost;
    }
  
    return coll;
  });



  // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
  // layout aliases! Say you have a bunch of existing content using
  // layout: post. If you don’t want to rewrite all of those values, just map
  // post to a new file like this:
  // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");

   //RSS feed plugin
   eleventyConfig.addPlugin(pluginRss);

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  //Watching for modificaions in style directory
  sass('./scss/styles.scss', './_includes/css/styles.css');

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Universal slug filter strips unsafe chars from URLs
  eleventyConfig.addFilter("slugify", function(str) {
    return slugify(str, {
      lower: true,
      replacement: "-",
      remove: /[*+~.·,()'"`´%!?¿:@]/g
    });
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("static/img");
  eleventyConfig.addPassthroughCopy("static/social-icons");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("feed");
  eleventyConfig.addPassthroughCopy("_includes/assets/");

  const Image = require("@11ty/eleventy-img");

  async function imageShortcode(src, alt) {
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }
  
    let metadata = await Image(src, {
      widths: [200],
      outputDir: "./static/img/thumbs/",
      formats: ["jpeg"]
    });
  
    let data = metadata.jpeg[metadata.jpeg.length - 1];
    return `<img src="/${data.outputPath}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
  }

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  function linkFilter(link) {
    let formattedLink= decodeURIComponent(link);
    formattedLink = formattedLink.trim().replace(/\s/g, "");

    if(link == "/feed/feed.xml") {
      return formattedLink;
    }

    if(/^(:\/\/)/.test(formattedLink)){
        return `http${formattedLink}`;
    }
    if(!/^(f|ht)tps?:\/\//i.test(formattedLink)){
        return `http://${formattedLink}`;
    }

    return formattedLink;
  }

  eleventyConfig.addFilter("linkFormat", linkFilter);

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
