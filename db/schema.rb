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

ActiveRecord::Schema.define(:version => 20120801203157) do

  create_table "badges", :force => true do |t|
    t.string   "title"
    t.text   "description"
    t.string   "icon"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "challenges", :force => true do |t|
    t.string   "title"
    t.text   "content"
    t.text   "hint"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "lesson_id"
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
    t.text   "description"
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
    t.string   "description"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.string   "introduction"
    t.string   "image_url"
    t.string   "difficulty",   :default => "0"
    t.boolean  "completed"
    t.string   "subject"
  end

  create_table "quotes", :force => true do |t|
    t.string   "quote"
    t.string   "author",     :default => "anonymous"
    t.string   "source"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.integer  "date"
  end

  create_table "rs_evaluations", :force => true do |t|
    t.string   "reputation_name"
    t.integer  "source_id"
    t.string   "source_type"
    t.integer  "target_id"
    t.string   "target_type"
    t.float    "value",           :default => 0.0
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  add_index "rs_evaluations", ["reputation_name", "source_id", "source_type", "target_id", "target_type"], :name => "index_rs_evaluations_on_reputation_name_and_source_and_target"
  add_index "rs_evaluations", ["reputation_name"], :name => "index_rs_evaluations_on_reputation_name"
  add_index "rs_evaluations", ["source_id", "source_type"], :name => "index_rs_evaluations_on_source_id_and_source_type"
  add_index "rs_evaluations", ["target_id", "target_type"], :name => "index_rs_evaluations_on_target_id_and_target_type"

  create_table "rs_reputation_messages", :force => true do |t|
    t.integer  "sender_id"
    t.string   "sender_type"
    t.integer  "receiver_id"
    t.float    "weight",      :default => 1.0
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "rs_reputation_messages", ["receiver_id", "sender_id", "sender_type"], :name => "index_rs_reputation_messages_on_receiver_id_and_sender"
  add_index "rs_reputation_messages", ["receiver_id"], :name => "index_rs_reputation_messages_on_receiver_id"
  add_index "rs_reputation_messages", ["sender_id", "sender_type"], :name => "index_rs_reputation_messages_on_sender_id_and_sender_type"

  create_table "rs_reputations", :force => true do |t|
    t.string   "reputation_name"
    t.float    "value",           :default => 0.0
    t.string   "aggregated_by"
    t.integer  "target_id"
    t.string   "target_type"
    t.boolean  "active",          :default => true
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
  end

  add_index "rs_reputations", ["reputation_name", "target_id", "target_type"], :name => "index_rs_reputations_on_reputation_name_and_target"
  add_index "rs_reputations", ["reputation_name"], :name => "index_rs_reputations_on_reputation_name"
  add_index "rs_reputations", ["target_id", "target_type"], :name => "index_rs_reputations_on_target_id_and_target_type"

  create_table "subscriptions", :force => true do |t|
    t.integer  "user_id"
    t.integer  "lesson_id"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "completed_lessons"
    t.text     "completed_challenges"
  end

  add_index "subscriptions", ["lesson_id"], :name => "index_subscriptions_on_lesson_id"
  add_index "subscriptions", ["user_id", "lesson_id"], :name => "index_subscriptions_on_user_id_and_lesson_id", :unique => true
  add_index "subscriptions", ["user_id"], :name => "index_subscriptions_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.integer  "num_completed_lessons"
    t.integer  "num_points"
    t.integer  "num_achievements"
    t.datetime "created_at",                               :null => false
    t.datetime "updated_at",                               :null => false
    t.string   "password_digest"
    t.string   "remember_token"
    t.boolean  "admin",                 :default => false
    t.string   "location"
    t.text     "about_me"
    t.string   "website_url"
    t.string   "twitter"
    t.string   "linkedin_url"
    t.text     "avatar"
    t.string   "username"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"

end
