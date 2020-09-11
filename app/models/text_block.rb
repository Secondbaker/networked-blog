class TextBlock < ApplicationRecord
    belongs_to :blog_post
    acts_as_list scope: :blog_post
    has_many :internal_links, foreign_key: 'source_id', dependent: :destroy
    has_many :destinations, through: :internal_links, foreign_key: 'destination_id', class_name: 'BlogPost'
    before_save :handle_internal_links

    def handle_internal_links
        self.prune_links
        
    end

    def prune_links
        self.internal_links.each do |link|
            puts "making sure #{link.inspect} has a destination"
            unless(BlogPost.find_by(id: link.destination_id))
                self.internal_links.remove(link)
                link.destroy

            end
        end
    end

    

    def display
        puts 'displaying'

    end
end
