module ApplicationHelper

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

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



end
