from flask import Flask, request, render_template, redirect, flash, session
# from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'blueberries'
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_route():
    return redirect('/users')

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
    return render_template('user_details.html', user=user)

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

@app.route('/users/<user_id>/delete')
def delete_user(user_id):
    """Route to delete the selected user from the database"""
    User.query.filter_by(id=user_id).delete()
    db.session.commit()
    return redirect('/users')

