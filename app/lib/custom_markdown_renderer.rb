class CustomMarkdownRenderer < Redcarpet::Render::HTML
    def paragraph text
        "<p>#{pre_process(text.strip)}</p>\n"
    end

    private

    def pre_process text
        internal_link_markers = text.scan(/\[\[.*\]\]/)
        if internal_link_markers != []
            text.scan(/\[\[.*\]\]/).map{|link| link_internally link[2..-3]}
        else
            text.gsub('r', 'w')
        end
    end

    def link_internally link
        internal_link_markers = link.scan(/\[\[.*\]\]/)
        if internal_link_markers != []
            link.scan(/\[\[.*\]\]/).map{|l| link_internally l[2..-3]}
        else
            'don\'t'
        end
    end
end