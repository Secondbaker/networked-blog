require 'rails_helper'

RSpec.describe BlogPost, type: :model do
  
  subject{ BlogPost.create(name: 'test', body: 'test') }
  context "created using create" do 
    it "exists" do 
      expect(subject).to_not eq(nil)
    end
    it "has the expected attributes" do
      expect(subject).to have_attributes(name: eq('test'), body: eq('test'))
    end
  end
  
  context "upon deletion" do
    it "also deletes associated InternalLinks" do
      
    end
  end  
end
