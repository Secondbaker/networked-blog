class LinkScanner
    
    attr_accessor :text
    def initialize(text)
        @text = text
    end
    def render
        output = ''
        index = 0
        while index < text.length do
            if text[index..index + 1] == '[['
                
                link_start = index
                link_end = text.index(']]', index)  + 1
                link = text[link_start..link_end]
                output += '[[' + BlogPost.find(link[2..-3].to_i).name + ']]'
                index += link.length

            else
                output += text[index]
                index += 1
            end
        end
        output
    end
end