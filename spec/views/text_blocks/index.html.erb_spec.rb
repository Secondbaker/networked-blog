require 'rails_helper'

RSpec.describe "text_blocks/index", type: :view do
  before(:each) do
    assign(:text_blocks, [
      TextBlock.create!(
        body: "MyText"
      ),
      TextBlock.create!(
        body: "MyText"
      )
    ])
  end

  it "renders a list of text_blocks" do
    render
    assert_select "tr>td", text: "MyText".to_s, count: 2
  end
end
