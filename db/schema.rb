# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120918031624) do

  create_table "badges", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "icon"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "circuit_elements", :force => true do |t|
    t.string   "name"
    t.string   "token_character"
    t.integer  "x1"
    t.integer  "y1"
    t.integer  "x2"
    t.integer  "y2"
    t.integer  "flags"
    t.text     "params"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
    t.integer  "circuit_simulation_id"
  end

  create_table "circuit_simulations", :force => true do |t|
    t.string   "name_unique"
    t.string   "title"
    t.text     "description"
    t.integer  "flags"
    t.float    "time_step"
    t.float    "sim_speed"
    t.float    "current_speed"
    t.float    "voltage_range"
    t.float    "power_range"
    t.datetime "created_at",                                         :null => false
    t.datetime "updated_at",                                         :null => false
    t.string   "topic"
    t.string   "completion_status", :default => "under_development"
  end

  create_table "lessons", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.string   "introduction"
    t.string   "image_url"
    t.string   "difficulty",   :default => "0"
    t.boolean  "completed"
    t.string   "subject"
  end

  create_table "lessons_content", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.string   "introduction"
    t.string   "image_url"
    t.string   "difficulty",   :default => "0"
    t.boolean  "completed"
    t.string   "subject"
  end

  create_table "mailing_lists", :force => true do |t|
    t.string   "email"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "quotes", :force => true do |t|
    t.string   "quote"
    t.string   "author",     :default => "anonymous"
    t.string   "source"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.integer  "date"
  end

  create_table "subscriptions", :force => true do |t|
    t.integer  "user_id"
    t.integer  "lesson_id"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.string   "completed_lessons"
    t.text     "completed_tasks"
    t.integer  "current_task_id",        :default => 1
    t.integer  "last_completed_task_id", :default => 0
    t.integer  "points",                 :default => 0
  end

  add_index "subscriptions", ["lesson_id"], :name => "index_subscriptions_on_lesson_id"
  add_index "subscriptions", ["user_id", "lesson_id"], :name => "index_subscriptions_on_user_id_and_lesson_id", :unique => true
  add_index "subscriptions", ["user_id"], :name => "index_subscriptions_on_user_id"

  create_table "tasks", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.text     "hint"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.integer  "lesson_id"
    t.integer  "points",     :default => 100
  end

  create_table "users", :force => true do |t|
    t.string   "name",                   :default => ""
    t.string   "email"
    t.integer  "num_completed_lessons",  :default => 0
    t.integer  "num_points",             :default => 0
    t.integer  "num_achievements",       :default => 0
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
    t.string   "password_digest"
    t.string   "remember_token"
    t.boolean  "admin",                  :default => false
    t.string   "location"
    t.text     "about_me"
    t.string   "website_url"
    t.string   "twitter"
    t.string   "linkedin_url"
    t.text     "avatar"
    t.string   "username"
    t.string   "encrypted_password",     :default => "",    :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "lazy_id"
    t.integer  "current_task_id"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
