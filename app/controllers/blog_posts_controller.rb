# frozen_string_literal: true

class BlogPostsController < ApplicationController
  before_action :set_blog_post, only: %i[show edit update destroy]

  # GET /blog_posts
  # GET /blog_posts.json
  def index
    @blog_posts = BlogPost.order('LENGTH(body) asc')
  end

  # GET /blog_posts/1
  # GET /blog_posts/1.json
  def show
    @internal_links = @blog_post.internal_links

    @related_posts = @blog_post.destinations
    destinations = @blog_post.destinations
    @related_posts.each do |related_post|
      @internal_links = @internal_links.merge related_post.internal_links
      destinations = destinations.merge related_post.destinations
    end

    @related_posts = destinations

    gon.related_posts = @related_posts
    gon.blog_post = @blog_post
    gon.internal_links = @internal_links
  end

  def graph
    @blog_posts = BlogPost.all
    @internal_links = InternalLink.all
    @graph_data = []
    @blog_posts.each do |blog_post|
      data_hash = { data: { id: blog_post.id } }
      @graph_data.push data_hash
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
  end

  # GET /blog_posts/new
  def new
    @blog_post = BlogPost.new
  end

  # GET /blog_posts/1/edit
  def edit; end

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

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_blog_post
    @blog_post = BlogPost.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def blog_post_params
    params.require(:blog_post).permit(:name, :body)
  end
end
