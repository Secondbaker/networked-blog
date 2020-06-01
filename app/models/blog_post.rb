class BlogPost < ApplicationRecord
    has_many :internal_links, foreign_key: 'source_id', dependent: :destroy
    has_many :sources, through: :internal_links, foreign_key: 'source_id', class_name: 'BlogPost'
    has_many :destinations, through: :internal_links, foreign_key: 'destination_id', class_name: 'BlogPost'
    
    def link(other)
        if other.is_a? BlogPost
            self.destinations << other
            other.destinations << self
            other.internal_links_count += 1
            true
        else
            puts 'this didn\'t work but that is right.'
            false
        end
    end

    def self.min_links
        BlogPost.order(internal_links_count: :asc).limit(1).first.internal_links_count
    end

    def self.max_links
        BlogPost.order(internal_links_count: :desc).limit(1).first.internal_links_count
    end

    def self.min_body_length
        BlogPost.limit(1).order("MIN(CHAR_LENGTH(body)) desc").group(:id).pluck(:body)
    end

    def self.max_body_length
        BlogPost.limit(1).order("MAX(CHAR_LENGTH(body)) desc").group(:id).pluck(:body)
    end
end
