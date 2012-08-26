jQuery(function($) {

  // create a convenient toggleLoading function
  var toggleLoading = function() {};

  var intervalId = null;

  $(document)
    .live("ajax:loading",  toggleLoading)
    .live("ajax:complete", toggleLoading)
    .live("ajax:success", function(event, data, status, xhr) {

      console.log("Canvas AJAX was successful");

      clearInterval(intervalId);

      var JSON_response = JSON.parse(xhr.responseText);
      var world = loadBox2dFromJSON(JSON_response, $("#box2d"));
      createBounds(world);
      createBalls(world);

      intervalId = render(world);

    });

});

