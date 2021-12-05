$(document).ready(function() {
  
    $('#tweet-text').on('input', onInput);
    
  });
  
  const onInput = function() {
    const tweetCharRemaining = 140 - $(this).val().length; 
    const $counter = $(this).siblings('div').children('.counter');
    $counter.html(tweetCharRemaining);
    
    // if message length goes beyond 140 characters -> counter turns red
    tweetCharRemaining < 0 ? $counter.addClass('invalid') : $counter.removeClass('invalid')
  };