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

  # build the path directory that contains the partial for lesson challenge.
  def path_for_lesson_challenge(lesson, challenge)

    # 1. Define the root directory where the lesson content resides
    lesson_root = "challenges/lessons_content"

    # 2. Get the name of the lesson folder.
    lesson_folder = clean_filename "#{lesson.index}-#{lesson.title.gsub(' ', '_')}"

    # 3. Get the name of the challenge folder
    challenge_folder = clean_filename "#{challenge.index}-#{challenge.title.gsub(' ', '_')}"

    task_file = "task"

    # 4. Return the spliced string
    "#{lesson_root}/#{lesson_folder}/#{challenge_folder}/#{task_file}"
  end

  def challenge_list

    html = @lesson.challenges.all.each_with_index.collect do |challenge, index|

      icon      = @subscription.completed_challenge?(challenge) ? "<i class='icon-ok'> </i>" : "<i class='icon-book'> </i>"
      link_url  = lesson_challenge_path(lesson_id: @lesson.id, id: challenge.id)
      link_text = icon.html_safe + "#{challenge.title}"

      class_type =
        if @challenge.index == (index+1)
           "active"
        elsif @subscription.completed_challenge?(challenge)
           "completed"
        end

      content_tag :li, link_to( link_text, link_url, data: { toggle: "tab#{index+1}", challenge_id: challenge.id }, id_offset: :index), class: class_type
    end

    raw( html.join(" ") )
  end

end