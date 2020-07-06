require "rails_helper"

RSpec.describe TextBlocksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/text_blocks").to route_to("text_blocks#index")
    end

    it "routes to #new" do
      expect(get: "/text_blocks/new").to route_to("text_blocks#new")
    end

    it "routes to #show" do
      expect(get: "/text_blocks/1").to route_to("text_blocks#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/text_blocks/1/edit").to route_to("text_blocks#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/text_blocks").to route_to("text_blocks#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/text_blocks/1").to route_to("text_blocks#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/text_blocks/1").to route_to("text_blocks#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/text_blocks/1").to route_to("text_blocks#destroy", id: "1")
    end
  end
end
