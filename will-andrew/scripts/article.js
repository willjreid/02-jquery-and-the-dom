'use strict';

let articles = [];

// DONE: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The Article function below is the constructor function (which is why it is capitalized) which takes as an argument the rawDataObj.  The "rawDataObj"s are a reference to the objects in the "rawData" array in the blogArticles.js file.  We will use the article constructor to intstantiate each of the rawDataObjs from the blogArticles.js as we need them.  We will use the information contained in these objects using "this" to render postings to the index.html dynamically with JS.  We keep all information in the blogArticles.js file for clarity, allowing this functional JS page to remain uncluttered.

function Article (rawDataObj) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
  articles.push(this);

}

Article.prototype.toHtml = function() {
  // COMMENTED: What is the benefit of cloning the article? (see the jQuery docs)
  // Cloning allows you to create a deep copy of a set of matched elements, including all descendant elements and text nodes. This way you avoid deleting the article from the original location while you use the framework to post a new article by calling on the key/value pairs of the new Article object.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  // REVIEWED: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEWED: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

for(let i = 0; i < rawData.length; i++) {
  articles.push(new Article(rawData[i]));
}

for(let i = 0; i < articles.length; i++) {
  $('#articles').append(articles[i].toHtml());
}
