from flask import Flask, request, render_template, redirect, flash, session
# from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Posts, Tags, PostTags
from functions import add_to_PostTags_table
import datetime

app = Flask(__name__)

app.jinja_env.add_extension('jinja2.ext.loopcontrols')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

# app.config['SECRET_KEY'] = 'blueberries'
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_route():
    posts = Posts.query.all()
    return render_template('home.html', posts=posts)

@app.route('/users')
def users_page():
    """Shows a list of current users in the database"""
    users = User.query.all()
    return render_template('users.html', users=users)

@app.route('/users/new')
def new_user_page():
    """Renders the add new user template"""
    return render_template('/users_new.html')

@app.route('/users/new', methods=['POST'])
def add_new_user():
    """Route to add new user to database and redirects back to user list"""
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['url']
    
    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<user_id>')
def users_details(user_id):
    """Renders the template with details about the selected user"""
    user = User.query.get_or_404(user_id)
    posts = Posts.query.filter_by(user_id=user_id).all()
    if len(posts) == 0:
        posts = None
    return render_template('user_details.html', user=user, posts=posts)

@app.route('/users/<user_id>/edit')
def edit_user_form(user_id):
    """Renders a template to show the edit user form"""
    user = User.query.get_or_404(user_id)
    return render_template('edit_user.html', user=user)

@app.route('/users/<user_id>/edit', methods=['POST'])
def edit_user_submit(user_id):
    """Post route to update any changes made to a user"""
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['url']
    
    db.session.add(user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<user_id>/delete', methods=['POST'])
def delete_user(user_id):
    """Route to delete the selected user from the database"""
    User.query.filter_by(id=user_id).delete()
    db.session.commit()
    return redirect('/users')

@app.route('/users/<user_id>/posts/new')
def new_post_page(user_id):
    """Routes to the create a new post page"""
    user = User.query.get_or_404(user_id)
    tags = Tags.query.all()
    return render_template('new_post.html', user=user, tags=tags)

@app.route('/users/<user_id>/posts/new', methods=['POST'])
def post_new_post(user_id):
    """Posts the new post to the server and redirects back to the user's detail page"""
    args = request.form
    title = request.form['title']
    content = request.form['content']
    timestamp = datetime.datetime.now().isoformat(timespec='minutes')
    timestamp = timestamp.replace('T', ' - ')
    
    post = Posts(title=title, content=content, created_at=timestamp, user_id=user_id)
    db.session.add(post)
    db.session.commit()
    
    new_post = Posts.query.filter_by(title=title, content=content, created_at=timestamp, user_id=user_id).all()
    add_to_PostTags_table(new_post, args)
    return redirect(f'/users/{user_id}')

@app.route('/posts/<post_id>')
def post_details_page(post_id):
    """Routes to the post's details page"""
    post = Posts.query.get_or_404(post_id)
    tags = post.post_tags
    
    return render_template('post_details.html', post=post, tags=tags)

@app.route('/posts/<post_id>/edit')
def edit_post_page(post_id):
    """Rotues to the edit post page"""
    post = Posts.query.get_or_404(post_id)
    tags = Tags.query.all()
    return render_template('edit_post.html', post=post, tags=tags)

@app.route('/posts/<post_id>/edit', methods=['POST'])
def post_post_edit(post_id):
    """submits any changes made to the user's post to the 
    database and redirects back to the post page"""
    args = request.form
    post = Posts.query.get_or_404(post_id)
    title = request.form['title']
    content = request.form['content']
    timestamp = datetime.datetime.now().isoformat(timespec='minutes')
    timestamp = timestamp.replace('T', ' - ')

    post.title = title
    post.content = content
    post.edited_at = timestamp
    
    PostTags.query.filter_by(post_id=post_id).delete()
    add_to_PostTags_table(post, args)
    
    db.session.add(post)
    db.session.commit()
    
    
    
    return redirect(f'/posts/{post_id}')

@app.route('/posts/<post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Deletes post from database"""
    PostTags.query.filter_by(post_id=post_id).delete()
    Posts.query.filter_by(id=post_id).delete()
    db.session.commit()
    return redirect('/users')

@app.route('/tags')
def list_tags_page():
    tags = Tags.query.all()
    return render_template('tags.html', tags=tags)

@app.route('/tags/<tag_id>')
def tag_info_page(tag_id):
    tag = Tags.query.get(tag_id)
    posts = tag.post_tags
    return render_template('tag_info.html', tag=tag, posts=posts)

@app.route('/tags/new')
def new_tag():
    return render_template('new_tag.html')

@app.route('/tags/new', methods=['POST'])
def submit_new_tag():
    name = request.form['name']
    
    tag = Tags(name=name)
    db.session.add(tag)
    db.session.commit()
    return redirect('/tags')

@app.route('/tags/<tag_id>/edit')
def edit_tag(tag_id):
    tag = Tags.query.get_or_404(tag_id)
    return render_template('edit_tag.html', tag=tag)

@app.route('/tags/<tag_id>/edit', methods=['POST'])
def edit_tag_submit(tag_id):
    name = request.form['name']
    tag = Tags.query.get_or_404(tag_id)
    
    tag.name = name
    db.session.add(tag)
    db.session.commit()
    return redirect('/tags')

@app.route('/tags/<tag_id>/delete', methods=['POST'])
def delete_tag(tag_id):
    PostTags.query.filter_by(tag_id=tag_id).delete()
    Tags.query.filter_by(id=tag_id).delete()
    db.session.commit()
    return redirect('/tags')