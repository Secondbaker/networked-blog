# frozen_string_literal: true

class BlogPostsController < ApplicationController
  before_action :set_blog_post, only: %i[show edit update destroy new_text_block]
  

  # GET /blog_posts
  # GET /blog_posts.json
  def index
    @blog_posts = BlogPost.all
    @internal_links = InternalLink.all
    @graph_data = []
    @blog_posts.each do |blog_post|
      data_hash = { data: { id: blog_post.id } }
      @graph_data.push data_hash
    end
    @text_blocks = []
    @blog_posts.each do |blog_post|
      @text_blocks.concat blog_post.text_blocks
    end

    @json = []
    @blog_posts.each do |blog_post|
      @json << Jbuilder.encode do |json|
        json.id blog_post.id
        json.name blog_post.name
        json.body blog_post.body
        json.created_at blog_post.created_at
        json.text_blocks blog_post.text_blocks, :id, :body, :created_at, :updated_at
      end
    end


    @internal_links.each do |internal_link|
      data_id = internal_link.source_id.to_s + '' + internal_link.destination_id.to_s
      source_id = internal_link.source_id
      target_id = internal_link.destination_id
      data_hash = { data: { id: data_id, source: source_id, target: target_id } }
      @graph_data.push data_hash
    end
    gon.graph_data = @graph_data
    gon.blog_posts = @blog_posts
    gon.internal_links = @internal_links
    gon.max_links = BlogPost.max_links
    gon.min_links = BlogPost.min_links
    gon.max_body_length = BlogPost.max_body_length
    gon.min_body_length = BlogPost.min_body_length
    puts blog_posts_url
    gon.blog_post_path = blog_posts_url
  end

  # GET /blog_posts/1
  # GET /blog_posts/1.json
  def show
    @markdown_body = convert_internal_links_to_markdown @blog_post.body
    @internal_links = InternalLink.where(destination_id: @blog_post.id) + InternalLink.where(source_id: @blog_post.id)
    @destinations = []
    @sources = []
    @internal_links.each do |internal_link|
      @destinations.push internal_link.destination
      @sources.push internal_link.source
    end

    @related_posts = @destinations

    gon.destinations = @destinations
    gon.sources = @sources
    gon.blog_posts = [ @blog_post ]
    gon.internal_links = @internal_links
    gon.blog_post_path = blog_posts_url
  end

  # GET /blog_posts/new
  def new
    @blog_post = BlogPost.new
  end

  # GET /blog_posts/1/edit
  def edit
    @markdown_body = convert_markdown_links_to_internal_links(@blog_post.body)
    
  end

  # POST /blog_posts
  # POST /blog_posts.json
  def create
    
    @blog_post = BlogPost.new(blog_post_params)

    respond_to do |format|
      if @blog_post.save
        format.html { redirect_to @blog_post, notice: 'Blog post was successfully created.' }
        format.json { render :show, status: :created, location: @blog_post }
      else
        format.html { render :new }
        format.json { render json: @blog_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /blog_posts/1
  # PATCH/PUT /blog_posts/1.json
  def update

    respond_to do |format|
      if @blog_post.update(blog_post_params)
        format.html { redirect_to @blog_post, notice: 'Blog post was successfully updated.' }
        format.json { render :show, status: :ok, location: @blog_post }
      else
        format.html { render :edit }
        format.json { render json: @blog_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /blog_posts/1
  # DELETE /blog_posts/1.json
  def destroy
    @blog_post.destroy
    respond_to do |format|
      format.html { redirect_to blog_posts_url, notice: 'Blog post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def new_text_block
    puts 'here'
    puts 'text_blocks_controller'
    puts params.inspect
    puts @blog_post
    text_block = @blog_post.text_blocks.create(body: params[:text_block][:body])
    render json: text_block
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_blog_post
    @blog_post = BlogPost.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def blog_post_params
    params.require(:blog_post).permit(:name, :body)
  end

  def internal_link_regex
    /\[\[(?<link>(\{\"name\"\:\"(?<name>(.*))\"\,\"id\"\:(?<id>(.*))\}))\]\]/
  end

  def another_regex_for_now
    "[[#{BlogPost.find_by(id: $~[:id]).name}]]"
  end

  def markdown_link_regex
    /\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)*.*)\)/
  end

  # Change InternalLinks in text into a format that works with Markdown
  def convert_internal_links_to_markdown (text)
    unless text.nil?
      text.gsub(internal_link_regex){|link|
       
        link
      }
    end
  end

  # This is so we can nest internal links
  def check_for_internal_links (text)
    text.gsub(external_link_regex){|link|
      puts link
    }
  end

  def convert_markdown_links_to_internal_links text
    puts 'converting'
    unless text.nil?
      puts 'text found'
      puts text
      text = text.gsub(/\[\[.*\]\]/){|link|
        puts "link: " + link.to_s
        link = link.gsub(internal_link_regex){|internal_link_data|
            unless BlogPost.find_by(id: $~[:id]).name.nil?
              name = "[[#{BlogPost.find_by(id: $~[:id]).name}]]"
            else
              name = "#{$~[:name]}"
            end
            puts name
            name
          }
        puts "link after gsub: " + link.to_s
        link
      }
      puts text
    end
    text
  end
end
