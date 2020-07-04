class InternalLink < ApplicationRecord
    belongs_to :source, class_name: 'BlogPost', optional: true
    belongs_to :destination, class_name: 'BlogPost', optional: true, counter_cache: true
    before_create :set_destination_name

    private 
    def set_destination_name
        self.destination_name = self.destination.name
    end
end
