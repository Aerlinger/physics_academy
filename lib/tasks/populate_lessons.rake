namespace :db do
  desc "Reads data in lesson_content directory and populates the database according to folder names and lesson-setup.yml file"
  task populate_lessons: :environment do

    # Clear all lesson entries from the database
    Lesson.delete_all

    root_path = "app/views/lesson_templates"

    if Dir::exists?(root_path)

      puts "reading from Root directory: #{root_path}"

      files = Dir.glob("#{root_path}/**/lesson-params.yml").sort!

      files.each do |filename|
        puts "Reading lesson configuration file #{filename}"
        data = YAML::load(File.open(filename))

        create_lesson_from_yaml(data)
      end

    else
      puts "Could not find root directory#{root_path}."
    end

  end
end

def create_lesson_from_yaml(lesson_yaml)
  new_lesson              = Lesson.new
  new_lesson.title        = lesson_yaml[:title]
  new_lesson.description  = lesson_yaml[:description]
  new_lesson.difficulty   = lesson_yaml[:difficulty]

  lesson_yaml[:tasks].each do |task|
    new_lesson.tasks.build(title: task, content: "Description for task goes here")
    puts task
  end

  new_lesson.save!
end