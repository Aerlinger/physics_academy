$(function () {
  console.log("Faraday starting...");

  $('.faraday').each(function (index) {

    var faraday_wrapper = $(this);

    var width = faraday_wrapper.data("width") || 420;
    var height = faraday_wrapper.data("height") || 360;
    var jsonPath = faraday_wrapper.data("path");

    faraday_wrapper.prepend(
      "<canvas id='faraday_" + index + "' class='faraday_canvas' width=" + width + "'px' height=" + height + "'px' style='background-color: white !important;'></canvas>"
    );

    faraday_wrapper.css({'width':width + 4, 'height':height + 4});

    var canvasJQueryElm = $('.faraday_canvas');

    loadCircuitFromJSON(jsonPath, canvasJQueryElm, function (jsonData) {

      if (jsonData.backgroundURL)
       canvasJQueryElm.css("background", 'url(' + splicePaths(jsonPath, jsonData.backgroundURL) + ') repeat');

      if (jsonData.description) {
        $('.faraday .title').remove();
        faraday_wrapper.prepend(
          "<a class='title' href='#'>" + jsonData.description + "</a>"
        );
      }

      //loadQuestions(splicePaths(jsonPath, "questions.json"), faraday_wrapper);
      Run(canvasJQueryElm);
    });

  });

});