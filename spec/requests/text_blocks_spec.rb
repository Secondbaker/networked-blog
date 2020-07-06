 require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/text_blocks", type: :request do
  # TextBlock. As you add validations to TextBlock, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      TextBlock.create! valid_attributes
      get text_blocks_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      text_block = TextBlock.create! valid_attributes
      get text_block_url(text_block)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_text_block_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "render a successful response" do
      text_block = TextBlock.create! valid_attributes
      get edit_text_block_url(text_block)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new TextBlock" do
        expect {
          post text_blocks_url, params: { text_block: valid_attributes }
        }.to change(TextBlock, :count).by(1)
      end

      it "redirects to the created text_block" do
        post text_blocks_url, params: { text_block: valid_attributes }
        expect(response).to redirect_to(text_block_url(TextBlock.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new TextBlock" do
        expect {
          post text_blocks_url, params: { text_block: invalid_attributes }
        }.to change(TextBlock, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post text_blocks_url, params: { text_block: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested text_block" do
        text_block = TextBlock.create! valid_attributes
        patch text_block_url(text_block), params: { text_block: new_attributes }
        text_block.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the text_block" do
        text_block = TextBlock.create! valid_attributes
        patch text_block_url(text_block), params: { text_block: new_attributes }
        text_block.reload
        expect(response).to redirect_to(text_block_url(text_block))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        text_block = TextBlock.create! valid_attributes
        patch text_block_url(text_block), params: { text_block: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested text_block" do
      text_block = TextBlock.create! valid_attributes
      expect {
        delete text_block_url(text_block)
      }.to change(TextBlock, :count).by(-1)
    end

    it "redirects to the text_blocks list" do
      text_block = TextBlock.create! valid_attributes
      delete text_block_url(text_block)
      expect(response).to redirect_to(text_blocks_url)
    end
  end
end
