class CustomMarkdownRenderer < Redcarpet::Render::HTML
    def normal_text text
        text.gsub(/\[/, 'oops')
    end
end