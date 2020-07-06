require 'rails_helper'

RSpec.describe "text_blocks/edit", type: :view do
  before(:each) do
    @text_block = assign(:text_block, TextBlock.create!(
      body: "MyText"
    ))
  end

  it "renders the edit text_block form" do
    render

    assert_select "form[action=?][method=?]", text_block_path(@text_block), "post" do

      assert_select "textarea[name=?]", "text_block[body]"
    end
  end
end
