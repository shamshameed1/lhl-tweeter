/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
    //Some common checks are that data is not empty ("", or null), and in the case of Tweeter, you can also validate the maximum message length.
    
    $('#error-length-null').hide();
    $('#error-length-exceed').hide();
    
    // Use an escape function to escape some text, and then use it inside .html() or $(). Here is such a function
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
  
    // createTweetElement function will take a tweet object and return a tweet <article> element
    const createTweetElement = (tweet) => {
      
      let $tweet = $(`
      <article class="tweet">
      <header>
        <div>
          <img src="${tweet.user.avatars}">
          <span>${tweet.user.name}</span>
        </div>
        <span class="user-id">${tweet.user.handle}</span>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <hr>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>`);
    return $tweet;
    };
  
  
    // renderTweets will take in an array of tweet objects and append each one to the tweets-container
    const renderTweets = (tweets) => {
      
      $('#tweets-container').empty();
  
      for (const tweet of tweets) {
        $tweet = createTweetElement(tweet);
        $('#tweets-container').prepend($tweet); 
      }
    }
  
  
    const loadTweets = () => {
      $.get('/tweets')
        .then((tweets) => {
          renderTweets(tweets);
          $('textarea').focus();
        });
    };
    loadTweets();
  
  
    // adding an event listener and preventing the default behaviour
    $('form').on('submit', function(event) {
  
      // Preventing the default behaviour inside the handler function
      event.preventDefault();
      
      // Validate input to be present and within 140 characters
      if ($('textarea').val().length === 0) return $('#error-length-null').show().slideUp(2500);
      if ($('textarea').val().length > 140) return $('#error-length-exceed').show().slideUp(2500);
      
      // The jQuery .serialize() function turns a set of form data into a query string 
      const serializedData = $(this).serialize();
  
      // submit a POST request that sends the serialized data to the server
      $.post('/tweets', serializedData)
        .then(() => {
          loadTweets();  // The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
          // Clear the input field
          $('textarea').val('');
          $('output').val(140);        
  
        });
      
    });
  
    // Toggle input form
    $('.fa-angle-double-down').on('click', () => {
      $('form').slideToggle('slow');
      $('textarea').focus();
    });
  
  });
  