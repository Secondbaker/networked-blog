class BlogPost < ApplicationRecord
    has_many :internal_links, foreign_key: 'source_id', dependent: :destroy
    has_many :sources, through: :internal_links, foreign_key: 'source_id', class_name: 'BlogPost'
    has_many :destinations, through: :internal_links, foreign_key: 'destination_id', class_name: 'BlogPost'

    after_save :update_links

    validates_uniqueness_of :name
    
    def create_link(post_name, body = '')
        other = BlogPost.find_or_create_by(name: post_name, body: body)
        self.link other
    end

    def link(other)
        if other.is_a? BlogPost
            if !self.destinations.include? other
                self.destinations << other
                true
            else
                false
            end
        else
            puts 'this didn\'t work but that is right.'
            false
        end
    end
    
    def unlink(other)
        if other.is_a? BlogPost
            if self.destinations.include? other
                puts self.internal_links.where(destination_id: other.id).destroy_all
                true
            end
            false
        end
        false
    end

    def unlink_all
        self.internal_links.destroy_all
    end

    def self.min_links
        BlogPost.order(internal_links_count: :asc).limit(1).first.internal_links_count
    end

    def self.max_links
        BlogPost.order(internal_links_count: :desc).limit(1).first.internal_links_count
    end

    def self.min_body_length
        BlogPost.where.not(body: nil).order("LENGTH(body) asc").first.body.length
    end

    def self.max_body_length
        BlogPost.where.not(body: nil).order("LENGTH(body) desc").first.body.length
    end

    private
    
    def internal_link_regex
        /\[\[.*\]\]/
    end

    #here w
    def update_links
        self.destinations.each do |destination|
            self.unlink destination
        end
        self.body.scan(internal_link_regex).each do |link|
            puts link
        end
    end

end
