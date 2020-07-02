# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

verbose = true

BLOG_POST_TARGET = 25
BLOG_POST_MIN_SIZE = 0
BLOG_POST_MAX_SIZE = 30
MAX_LINKS_PER_POST = 1

if verbose
    puts 'Destroying InternalLink'
end
InternalLink.destroy_all
if verbose
    puts 'Destroying BlogPost'
end
BlogPost.destroy_all

BLOG_POST_TARGET.times do
    name = Faker::Games::Pokemon.unique.name
    if verbose
        puts name
    end
    body = ''
    rand(BLOG_POST_MIN_SIZE..BLOG_POST_MAX_SIZE).times do
        body += Faker::Markdown.random
    end
    if verbose
        puts body
    end
    post = BlogPost.create(name: name, body: body)
    rand(0..[MAX_LINKS_PER_POST, BlogPost.all.size].min).times do
        post.link BlogPost.order('RANDOM()').where.not(id: post.id).first
    end
end

puts 'Created ' + BlogPost.all.size.to_s + ' BlogPosts'
puts 'With ' + InternalLink.all.size.to_s + ' InternalLinks'