
# Enable bootstrap properties
$(document).ready ->

  $('#pop').popover('hover')

  $('#btn-main').mousedown (event) ->
    event.stopPropagation()
    $(@).removeClass('btn-primary')
    $(@).addClass('btn-success')

  #$(".collapse").collapse()
  $('#myModal').modal(options)

  $(".alert").alert()