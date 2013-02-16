include ApplicationHelper

def complete_tasks(subscription, task_indices)
  subscription.reset

  points = 0
  tasks = subscription.lesson.tasks

  task_indices.each do |task_idx|
    task = tasks[task_idx]
    subscription.set_current_task_id=(task.id)
    points += subscription.complete_task
  end

  return points
end

def visit_first_lesson
  visit root_path
  click_link 'Lessons'
  click_link "lesson_#{1}_start"
end