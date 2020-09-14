require 'rails_helper'

RSpec.describe TextBlock, type: :model do
  subject { BlogPost.create(name: 'test').text_blocks.create(body: 'test') }
  it "body can be updated" do
    expect(subject.body).to eq('test')
    subject.update(body: 'new')
    expect(subject.body).to eq('new') 
  end

  context 'links are added and removed' do
    
    it 'links can be added' do
      bp = BlogPost.find_or_create_by(name: 'new test')
      subject.destinations << bp
      expect(subject.destinations.include?(bp)).to be true
    end
    it 'dead links are removed' do
      bp = BlogPost.find_or_create_by(name: 'dew test')
      subject.destinations << bp
      count_destinations = subject.destinations.size
      bp.destroy
      
      subject.destinations.each do |destination|
        puts "#{destination.name} "
      end
      expect(subject.destinations.include? bp).to be false
    end
  end

  context 'are destroyed' do
    it 'also destroys associated InternalLinks' do
      subject.destinations << BlogPost.create(name: 'to be destroyed')
      il = subject.internal_links.all
      puts il
      subject.destroy
      puts il
      expect(il).to be_nil
    end

  end
end
