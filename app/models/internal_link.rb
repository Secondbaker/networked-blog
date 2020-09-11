class InternalLink < ApplicationRecord
    belongs_to :source, class_name: 'TextBlock', optional: true
    belongs_to :destination, class_name: 'BlogPost', optional: true, counter_cache: true
    before_create :set_destination_name

    def self.regex
        /\[\[.+\]\]/
    end

    #given an internal link reference formatted as [[destination.name]]
    #this searches within to find InternalLinks which [[are]][[adjacent]]
    #and ones which [[are [[nested]] in any configuration]]
    def self.recursive_check text
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
                return "[[{name: #{post.name}, id: #{post.id}}]]"
            end

            index += 1
        end
        text
    end


    #scans the string for text that looks like internal links
    def self.convertToIDs string
        
    end

    private 
    def set_destination_name
        self.destination_name = self.destination.name
    end

    
end
