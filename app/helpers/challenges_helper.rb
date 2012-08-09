module ChallengesHelper

  def show_error(message)
    render partial: 'submission_response', locals: {type: "error", message: message}
  end

  def show_info(message)
    render partial: 'submission_response', locals: {type: "info", message: message}
  end

  def show_success(message)
    render partial: 'submission_response', locals: {type: "success", message: message}
  end

  def show_warning(message)
    render partial: 'submission_response', locals: {type: "warning", message: message}
  end

  def fetch_content_for_task(lesson_id, challenge_id)
    "challenges/lessons_content/#{lesson_id}/#{challenge_id}-challenge/task"
  end

  def challenge_list
    html = @lesson.challenges.all.each_with_index.collect do |challenge, index|

      icon      = @subscription.completed_challenge?(challenge) ? "<i class='icon-ok'> </i>" : "<i class='icon-book'> </i>"
      link_url  = lesson_challenge_path(lesson_id: @lesson.id, id: challenge.id, moar: :sup)
      link_text = icon.html_safe + "#{challenge.title}"

      class_type =
          if params[:id].to_i == (index+1)
             "active"
          elsif @subscription.completed_challenge?(challenge)
             "completed"
          end

      content_tag :li, link_to( link_text, link_url, data: { toggle: "tab#{index+1}" }, remote: true), class: class_type
    end

    raw( html.join(" ") )
  end

end