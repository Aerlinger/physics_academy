module ApplicationHelper

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i


  # Helper tag for a Newton canvas element, returns a DIV HTML tag formatted according to the required parameters for
  #    a Newton canvas element:
  #
  # For instance:
  #
  #    newton_tag( asset_path("newton/orbit/orbit.json"), id: "preview", width: 500, height: 300)
  #
  # will render:
  #
  #    <div id="preview" class="newton canvas_wrapper"
  #                   data-width="860" data-height="600" data-path=<%= asset_path("newton/orbit/orbit.json") %> >
  #    </div>
  def newton_tag(newton_url_json, params = {})
    content_tag :div, class: "newton canvas_wrapper", id: params[:id],
                data: {width: params[:width], height: params[:height], path: newton_url_json } do

    end
  end

  # Helper tag for a Faraday canvas element, returns a DIV HTML tag formatted according to the required parameters for
  #    a Faraday canvas element:
  #
  # For instance:
  #
  #    faraday_tag( asset_path("faraday/sample_circuits/bandpass.json"), id: "preview", width: 500, height: 300)
  #
  # will render:
  #
  #    <div id="preview" class="faraday canvas_wrapper" data-width="500" data-height="320"
  #                                                data-path=<%= asset_path("faraday/sample_circuits/bandpass.json")%> >
  # </div>
  def faraday_tag(circuit_url_json, params = {})
    content_tag :div, class: "faraday canvas_wrapper", id: params[:id],
                data: {width: params[:width], height: params[:height], path: circuit_url_json } do

    end
  end

  def full_title(page_title)
    base_title = 'Physics Academy'
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end

  def is_active?(page_name)
    "active" if current_page? page_name
  end

  def flash_key(message)
    case message
      when "alert"
        "error"
      when "notice"
        "info"
    end
  end

  # Removes invalid characters from a string
  def clean_filename(filename)
    valid_filename_regexp = /[\s+\\\/*?:\"<>|]/
    filename.gsub(valid_filename_regexp, '')
  end

end
