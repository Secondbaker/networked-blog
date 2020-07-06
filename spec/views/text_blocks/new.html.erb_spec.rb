require 'rails_helper'

RSpec.describe "text_blocks/new", type: :view do
  before(:each) do
    assign(:text_block, TextBlock.new(
      body: "MyText"
    ))
  end

  it "renders new text_block form" do
    render

    assert_select "form[action=?][method=?]", text_blocks_path, "post" do

      assert_select "textarea[name=?]", "text_block[body]"
    end
  end
end
