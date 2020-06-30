class InternalLink < ApplicationRecord
    belongs_to :source, class_name: 'BlogPost', optional: true
    belongs_to :destination, class_name: 'BlogPost', optional: true, counter_cache: true

end
