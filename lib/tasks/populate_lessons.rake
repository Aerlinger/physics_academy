namespace :db do
  desc "Populate lessons_content directories"
  task populate_lessons: :environment do

    Lesson.delete_all

    valid_filename_regexp = /[\s+\\\/*?:\"<>|]/

    root_path = "lib/assets/lessons_content"

    if Dir::exists?(root_path)

      puts "reading from Root directory: #{root_path}"

      Dir.glob("lib/assets/**/lesson-params.yml") do |file|
        puts "Reading lesson configuration file #{file}"
        data = YAML::load(File.open(file))

        create_lesson_from_yaml(data)
      end

    else
      puts "Could not find root directory#{root_path}."
    end

  end
end

def create_lesson_from_yaml(lesson_yaml)
  new_lesson = Lesson.new
  new_lesson.title        = lesson_yaml[:title]
  new_lesson.description  = lesson_yaml[:description]
  new_lesson.difficulty   = lesson_yaml[:difficulty]
  new_lesson.subject      = lesson_yaml[:subject]
  new_lesson.completed    = lesson_yaml[:completed]

  lesson_yaml[:challenges].each do |challenge|
    new_lesson.challenges.build(title: challenge, content: "Description for challenge goes here")
    puts challenge
  end

  puts y new_lesson

  new_lesson.save!
end