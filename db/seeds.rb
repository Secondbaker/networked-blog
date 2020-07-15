# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

verbose = true

BLOG_POST_TARGET = 25
BLOG_POST_TEXT_BLOCKS_MIN = 1
BLOG_POST_TEXT_BLOCKS_MAX = 10
BLOG_POST_MIN_SIZE = 0
BLOG_POST_MAX_SIZE = 30
MAX_LINKS_PER_POST = 1

if verbose
    puts 'Destroying TextBlock'
end
TextBlock.destroy_all
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
    text_blocks = []
    rand(BLOG_POST_TEXT_BLOCKS_MIN..BLOG_POST_TEXT_BLOCKS_MAX).times do
        body = ''
        rand(BLOG_POST_MIN_SIZE..BLOG_POST_MAX_SIZE).times do
            body += "[[#{Faker::Games::Pokemon.name}]]"
        end
        if verbose
            puts body
        end
       # text_blocks << TextBlock.create(body: body)
    end

    post = BlogPost.create(name: name)
    post.text_blocks << text_blocks
    rand(0..[MAX_LINKS_PER_POST, BlogPost.all.size].min).times do
        post.link BlogPost.order('RANDOM()').where.not(id: post.id).first
    end
end

puts 'Created ' + BlogPost.all.size.to_s + ' BlogPosts'
puts 'With ' + InternalLink.all.size.to_s + ' InternalLinks'