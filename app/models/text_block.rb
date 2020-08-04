class TextBlock < ApplicationRecord
    belongs_to :blog_post
    acts_as_list scope: :blog_post
end
