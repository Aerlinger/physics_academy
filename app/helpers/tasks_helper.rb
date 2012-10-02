module TasksHelper

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

  # build the path directory that contains the partial for lesson task.
  def path_for_lesson_task(lesson, task)

    # 1. Define the root directory where the lesson content resides
    lesson_root = "tasks/lessons_content"

    # 2. Get the name of the lesson folder.
    lesson_folder = clean_filename "#{lesson.index}-#{lesson.title.gsub(' ', '_')}"

    # 3. Get the name of the task folder
    task_folder = clean_filename "#{task.index}-#{task.title.gsub(' ', '_')}"

    task_file = "task"

    # 4. Return the spliced string
    "#{lesson_root}/#{lesson_folder}/#{task_folder}/#{task_file}"
  end

  def submit_button
    link_to "Submit", submit_lesson_task_path, class: "btn btn-info btn-large", method: :put, id: "submit"
  end

  def task_list

    html = @lesson.tasks.all.each_with_index.collect do |task, index|

      link_url = lesson_task_path(lesson_id: @lesson.id, id: task.id)

      task_completed = @subscription.completed_task_id?(task.id)
      class_type = "#{'active' if @task.index == (index+1)} #{'completed' if task_completed}"

      content_tag :li, class: class_type do
        link_to link_url, id: "task_#{index+1}", data: {task_id: task.id}, id_offset: :index do
          "#{task.title}"
        end
      end

    end

    raw(html.join(" "))
  end

end