class CustomMarkdownRenderer < Redcarpet::Render::HTML
    def paragraph text
        pre_process("<p>#{text.strip}</p>\n")
    end

    private

    def pre_process text
        return text.gsub('r', 'w')
    end
end