class BlogPost < ApplicationRecord
    has_many :internal_links, foreign_key: 'source_id', dependent: :destroy
    has_many :sources, through: :internal_links, foreign_key: 'source_id', class_name: 'TextBlock'
    
    has_many :text_blocks, -> { order(position: :asc) }, dependent: :destroy
    has_many :destinations, through: :text_blocks, foreign_key: 'destination_id', class_name: 'BlogPost'

    before_save :unlink_all, :convert_links
    after_save :update_links

    before_destroy :destroy_links

    validates_uniqueness_of :name
    
    def self.min_links
        10
    end

    def self.max_links
        10
    end

    def self.min_body_length
        10    
    end

    def self.max_body_length
        10
    end

    def render_name
        render_internal_links self.name
    end

    def render_body
        render_internal_links self.body
    end

    def create_link(post_name, body = '')
        other = BlogPost.find_or_create_by(name: post_name, body: body)
        self.link other
    end

    def link(other)
        if other.is_a? BlogPost
            if !self.destinations.include? other
                InternalLink.create(source: self, destination: other)
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

    

    private

    def destroy_links
        puts "Destroying Links"
        self.internal_links.destroy_all
    end

    def render_internal_links text
        output = ''
        index = 0
        while index < text.length do
            if text[index..index + 1] == '[['
                link_start = index
                link_end = text.index(']]', index) + 1
                link = text[link_start..link_end]
                output << '[[' + BlogPost.find(link[2..-3].to_i).render_name + ']]'
                index += link.length
            else
                output << text[index]
                index += 1
            end
        end
        output
    end
    
    def internal_link_regex
        InternalLink.regex
    end

    def update_links
        unless self.body.nil?
            puts 'updating links'
            self.body.scan(internal_link_regex).each do |link|
                find_and_add_links link
            end
        end

    end

    def find_and_add_links text
        puts 'find_and_add_links'
        strings_to_search = Queue.new
        depth = 0
        while text.size > 0 do

            text = text[1..] 
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
        unless self.name.nil?
            self.name.gsub!(internal_link_regex).each do |link|
                recursive_check link
            end
        end
    end

    #given an internal link reference formatted as [[destination.name]]
    #this searches within to find InternalLinks which [[are]][[adjacent]]
    #and ones which [[are [[nested]] in any configuration]]
    def recursive_check text
        #just to be safe - this should not really get called if the conditions aren't met
        if (text.nil? || text.size < 5)
            return text
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
                return "[[#{post.id}]]"
            end

            index += 1
        end
        text
    end
end