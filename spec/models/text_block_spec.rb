require 'rails_helper'

RSpec.describe TextBlock, type: :model do
  subject { BlogPost.create(name: 'test').text_blocks.create(body: 'test') }
  it "body can be updated" do
    expect(subject.body).to eq('test')
    subject.update(body: 'new')
    expect(subject.body).to eq('new') 
  end

  context 'links are added and removed' do
    bp = BlogPost.create(name: 'new test')
    subject.destinations << bp
    it 'links can be added' do
      expect(subject.destinations.include?(bp)).to be true
    end
    it 'dead links are removed' do
      count_destinations = subject.destinations.size
      bp.destroy
      expect(count_destinations > subject.destinations.size).to be true
    end
  end
end
