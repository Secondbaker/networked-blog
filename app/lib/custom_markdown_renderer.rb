class CustomMarkdownRenderer < Redcarpet::Render::HTML

    def link link, title, content
        puts 'link'
        puts link
        puts 'content'
        puts content
        puts "<span><a href=#{link}>#{content}</a></span>"
        return "<span><a href=#{link}>#{content}</a></span>"
    end
    
    def autolink link, type
        puts 'autolink'
        return link
    end

    def normal_text text
        puts 'normal_text'
        text
    end

    private

    
end