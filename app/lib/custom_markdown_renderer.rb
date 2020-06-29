class CustomMarkdownRenderer < Redcarpet::Render::HTML
    def paragraph text
        "<p>#{pre_process(text.strip)}</p>\n"
    end

    private

    def pre_process text
        internal_link_markers = text.scan(/\[\[.*\]\]/)
        if internal_link_markers != []
            text.scan(/\[\[.*\]\]/).map{|link| search_for_links link[2..-3]}
        else
            text.gsub('r', 'w')
        end
    end

    def search_for_links link
        internal_link_markers = link.scan(/\[\[.*\]\]/)
        if internal_link_markers != []
            link.scan(/\[\[.*\]\]/).map{|l| search_for_links l[2..-3]}
        else
            'don\'t'
        end
        link_internally link
    end

    def link_internally link
        link_to = "blog_post/#{link}"
        return "<a href=#{link_to}><a>"
    end
end