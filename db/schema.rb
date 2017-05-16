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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170515235506) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apartments", force: :cascade do |t|
    t.string   "address"
    t.integer  "sqft"
    t.integer  "baths"
    t.integer  "rent"
    t.integer  "bedrooms"
    t.string   "link"
    t.string   "pic"
    t.string   "neighborhood"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.float    "lat"
    t.float    "lng"
  end

  create_table "listing_likes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "apartment_id"
    t.string   "status"
    t.text     "note"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "sort_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_sort_types", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "sort_type_id"
    t.integer  "priority"
    t.boolean  "selected"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "phone_number"
    t.string   "password_digest"
    t.string   "work_address"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
