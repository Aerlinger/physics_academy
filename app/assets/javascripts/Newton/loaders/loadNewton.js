$(function () {

  $('.newton').each(function (index) {

    var newton_wrapper = $(this);

    var width = newton_wrapper.data("width") || 420;
    var height = newton_wrapper.data("height") || 360;
    var jsonPath = newton_wrapper.data("path");

    newton_wrapper.prepend(
      "<canvas id='newton_" + index + "' class='newton_canvas' width=" + width + "'px' height=" + height + "'px'></canvas>"
    );

    newton_wrapper.css({'width':width + 4, 'height':height + 4});

    var canvasJQueryElm = $('.newton_canvas');

    loadBox2dFromJSON(jsonPath, canvasJQueryElm, function (world, jsonData) {

      if (jsonData.backgroundURL)
        canvasJQueryElm.css("background", 'url(' + util.splicePaths(jsonPath, jsonData.backgroundURL) + ') repeat');

      if (jsonData.description) {
        $('.newton .title').remove();
        newton_wrapper.prepend(
          "<a class='title' href='#'>" + jsonData.description + "</a>"
        );
        $('.newton .title').css("maxWidth", world.widthInPixels - 30);
      }

      var mouseResponder = new MouseResponder(world, canvasJQueryElm);
      var intervalId = render(world, mouseResponder, canvasJQueryElm);

      loadQuestions(util.splicePaths(jsonPath, "questions.json"), newton_wrapper);
    });

  });

});

