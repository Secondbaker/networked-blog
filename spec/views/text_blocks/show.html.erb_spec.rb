require 'rails_helper'

RSpec.describe "text_blocks/show", type: :view do
  before(:each) do
    @text_block = assign(:text_block, TextBlock.create!(
      body: "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/MyText/)
  end
end
