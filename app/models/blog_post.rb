class BlogPost < ApplicationRecord
    has_many :internal_links, foreign_key: 'source_id'
    has_many :sources, through: :internal_links, foreign_key: 'source_id', class_name: 'BlogPost'
    has_many :destinations, through: :internal_links, foreign_key: 'destination_id', class_name: 'BlogPost'

    def link(other)
        if other.is_a? BlogPost
            self.destinations << other
            other.destinations << self
            true
        else
            puts 'this didn\'t work but that is right.'
            false
        end
    end
end