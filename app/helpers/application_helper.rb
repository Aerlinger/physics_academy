module ApplicationHelper

  def full_title(page_title)
    base_title = 'Physics Academy'
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end

  def flash_key(message)
    case message
      when "alert"
        "error"
      when "notice"
        "info"
    end

  end

end
