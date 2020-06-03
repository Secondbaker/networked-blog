class BlogPost < ApplicationRecord
    has_many :internal_links, foreign_key: 'source_id', dependent: :destroy
    has_many :sources, through: :internal_links, foreign_key: 'source_id', class_name: 'BlogPost'
    has_many :destinations, through: :internal_links, foreign_key: 'destination_id', class_name: 'BlogPost'
    
    def link(other)
        if other.is_a? BlogPost
            if !self.destinations.include? other
                self.destinations << other
                other.destinations << self
                other.internal_links_count += 1
                true
            else
                false
            end
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
        BlogPost.order("LENGTH(body) asc").first.body.length
    end

    def self.max_body_length
        BlogPost.order("LENGTH(body) desc").first.body.length
    end
end
