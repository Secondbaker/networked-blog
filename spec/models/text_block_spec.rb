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
      puts "BlogPost.all.inspect:  #{BlogPost.all.inspect}"
      bp = BlogPost.find_or_create_by(name: 'dew test')
      subject.destinations << bp
      count_destinations = subject.destinations.size
      puts "BlogPost.all.inspect:  #{BlogPost.all.inspect}"
      bp.destroy
      puts "BlogPost.all.inspect:  #{BlogPost.all.inspect}"
      puts "bp: #{bp.inspect}"
      puts "comparing #{count_destinations} and #{subject.destinations.size} where destinations are #{subject.destinations.all}"
      puts "BlogPost.all.inspect:  #{BlogPost.all.inspect}"
      puts "count_destinations > subject.destinations.size:  #{ count_destinations > subject.destinations.size}"
      puts "BlogPost.all.inspect:  #{BlogPost.all.inspect}"
      puts "compared #{count_destinations} and #{subject.destinations.size} and destinations are"
      subject.destinations.each do |destination|
        puts "#{destination.name} "
      end
      expect(subject.destinations.include? bp).to be false
    end
  end
end
