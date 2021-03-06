# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_04_180811) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blog_posts", force: :cascade do |t|
    t.string "name"
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "internal_links_count", default: 0
    t.index ["name"], name: "index_blog_posts_on_name", unique: true
  end

  create_table "internal_links", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "source_id"
    t.bigint "destination_id"
    t.string "destination_name"
    t.index ["destination_id"], name: "index_internal_links_on_destination_id"
    t.index ["source_id"], name: "index_internal_links_on_source_id"
  end

  create_table "text_blocks", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "blog_post_id", null: false
    t.integer "position"
    t.index ["blog_post_id"], name: "index_text_blocks_on_blog_post_id"
  end

  add_foreign_key "text_blocks", "blog_posts"
end
