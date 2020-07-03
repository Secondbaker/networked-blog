class BlogPost < ApplicationRecord
    has_many :internal_links, foreign_key: 'source_id', dependent: :destroy
    has_many :sources, through: :internal_links, foreign_key: 'source_id', class_name: 'BlogPost'
    has_many :destinations, through: :internal_links, foreign_key: 'destination_id', class_name: 'BlogPost'

    before_save :unlink_all, :convert_links
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

    def update_links
        unless self.body == nil
            puts 'updating links'
            self.body.gsub(internal_link_regex).each do |link|
                self.link BlogPost.find JSON.parse(link[2..-3])['id']
                link
            end
        end

    end

    def convert_links
        unless self.body == nil
            self.body.gsub!(internal_link_regex).each do |link|
                link_scan link
                post = BlogPost.find_or_create_by(name: link[2..-3])
                link = "[[#{{name: post.name, id: post.id}.to_json}]]"
                link
            end
        end
    end

    #given an internal link reference formatted as [[destination.name]]
    #this searches within to find InternalLinks which [[are]][[adjacent]]
    #and ones which [[are [[nested]] in any configuration]]
    def link_scan text
        formatted_link = ''
        formatted_link = recursive_check text
        puts 'formatted_link: ' + formatted_link
        formatted_link
    end

    def recursive_check text
        current_name = ''
        while text != '' do
            #until we reach the end of the string
            
            if text[0] == text[1] && text[0] == '['
                #we probably start here
                #every time we hit [[, we need to start a new search within it before this search can finish
                next_section = recursive_check(text[2..]).to_s
                text = text[(2 + next_section.length)..]
                return current_name << '[[' + next_section
            elsif text[0] == text[1] && text[0] == ']'
                #we finished a search and need to return everything since the last [[
                #however, we still need to check further if there is more to the string    
                text = text[2..]
                puts 'the end: ' + current_name
                current_post = BlogPost.find_or_create_by(name: current_name)
                formatted_post = "#{{name: current_post.name, id: current_post.id}.to_json}"
                return formatted_post + ']]' + recursive_check(text).to_s
            end
            current = text[0]
            current_name << text[0]
            puts current_name
            text = text [1..]
        end
        puts current_name
        return current_name
    end
end
