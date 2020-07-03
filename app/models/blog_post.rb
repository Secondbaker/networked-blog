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
        unless self.body.nil?
            puts 'updating links'
            self.body.scan(internal_link_regex).each do |link|
                puts 'scanning'
                puts link
            end
        end

    end

    #looks through the body for InternalLinks, formatted as:
    #[[blog_post.name]]
    #and formats them for saving to the database as
    #[[{name: blog_post.name, id: blog_post.id}]]
    def convert_links
        unless self.body.nil?
            self.body.gsub!(internal_link_regex){|link|
                puts 'found a link'
                recursive_check link
            }
        end
    end

    #given an internal link reference formatted as [[destination.name]]
    #this searches within to find InternalLinks which [[are]][[adjacent]]
    #and ones which [[are [[nested]] in any configuration]]
    def recursive_check text
        #just to be safe - this should not really get called if the conditions aren't met
        if (text.nil? || text.size < 2)
            return
        end
        
        #the idea here is that we parse through the string linearly,
        #unless we run into another string starting with [[
        #in which case we recurse and parse through that string first

        #index: the index of the character in the string we are on
        index = 0

        until index >= text.length do
            puts text[index..]
            ##this is the recursion trigger
            if text[index] == text[index + 1] && text[index] == '['
                #We'll be replacing from (current index + 2 for the [[) to the next ]] with whatever link is within the [[]]
                #in other words, we're going to replace the section we're in with the nested_link
                nested_link = recursive_check text[(index + 2)..]
                #this is really error checking
                #usually, the section will just go to the next ]],
                #but in case we somehow have a string with no ]], this should rescue it
                section_end = !text.index(']]', index).nil? ? text.index(']]', index) : text[index..].length
                #we insert our new substring, then move the index beyond it
                text[index..(section_end + 1)] = nested_link
                index += nested_link.length - 1
            ##this is where we go when we've hit the end of a recursive branch
            elsif text[index] == text[index + 1] && text[index] == ']'
                #text[0] and text[1] should be [[
                #so the blog_post.name is everything from the [[ to ]] (where we are now)
                post_name = text[0..index - 1]
                #we get the corresponding BlogPost
                post = BlogPost.find_or_create_by(name: post_name)
                #and we return it in the proper format
                post_json = {name: post.name, id: post.id}.to_json
                return "[[#{post_json}]]"
            end

            index += 1
        end
        text
    end
end