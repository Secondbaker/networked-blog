class TextBlock < ApplicationRecord
    belongs_to :blog_post
    acts_as_list scope: :blog_post

    before_save :check_for_links

    def check_for_links
        puts 'checking for links'
        puts 'They\'ll look like this: '
        puts InternalLink.regex
        puts self.body
        self.body.gsub!(InternalLink.regex).each do |link|
            puts 'Found a link:  #{link}'
            InternalLink.recursive_check link
        end
    end
end
