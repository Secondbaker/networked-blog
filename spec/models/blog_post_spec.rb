require 'rails_helper'

RSpec.describe BlogPost, type: :model do
  subject{ BlogPost.create(name: 'test', body: 'test') }
  context "is created normally" do 
    it "is created normally" do 
      expect(subject).to_not eq(nil)
    end
  end
end
