require 'rails_helper'

RSpec.describe BlogPost, type: :model do
  PostBodyTest = Struct.new(:name, :result, keyword_init: true)
  post_body_tests = [
    PostBodyTest.new(name: '[[]]', result: /\[\[\]\]/),
    PostBodyTest.new(name: '[[test]]', result: /\[\[\{.*\}\]\]/)
  ]
  subject{ BlogPost.create(name: 'test', body: 'test') }
  context "created using create" do 
    it "exists" do 
      expect(subject).to_not eq(nil)
    end
    it "has the expected attributes" do
      expect(subject).to have_attributes(name: eq('test'), body: eq('test'))
    end
  end
  context "is updated" do
    post_body_tests.each do |post_body_test|
      it "to #{post_body_test.name}" do
        subject.update body: post_body_test.name
        expect(subject).to have_attributes(body: match(post_body_test.result))
      end

    end
  end

  context "has nested links" do
    it "links to blog posts which exist" do
      posts = []
      posts << BlogPost.create(name: 'double', body: '')
      posts << BlogPost.create(name: 'the [[double]] double', body: '')
      subject.update(body: '[[the [[double]] double]]')
      expect(subject.destinations).to include(posts)
    end
  end
end
