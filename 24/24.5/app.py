import re
from flask import Flask, session, flash, render_template, redirect
from models import db, connect_db, User, Feedback
from forms import RegisterUserForm, LoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

app.config['SECRET_KEY'] = 'u_wot_m8'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route('/')
def home_page():
    if 'user_id' not in session:
        return redirect('/register')
    else:
        return render_template('home.html')
    
@app.route('/register', methods=['GET', 'POST'])
def register_user():
    if 'user_id' in session:
            flash("You're already logged in.", 'danger')
            return redirect('/')
    form = RegisterUserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        
        new_user = User.register(username, password, email, first_name, last_name)
        db.session.add(new_user)
        try: 
            db.session.commit()
        except IntegrityError:
            flash('Username taken. Please select another.', 'danger')
            return render_template('register.html', form=form)
        flash(f'Welcome {new_user.username}! Thanks for registering!', 'primary')
        session['user_id'] = new_user.username
        return redirect(f'/users/{new_user.username}')
    else:
        return render_template('register.html', form=form)
    
@app.route('/login', methods=['GET', 'POST'])
def login_user():
    if 'user_id' in session:
        flash("You're already logged in.", 'danger')
        return redirect('/')
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        
        user = User.authenticate(username, password)
        if user:
            session['user_id'] = user.username
            flash(f'Welcome back {user.username}!', 'success')
            return redirect(f'/users/{user.username}')
        else:
            flash('Invalid Username/Password.', 'danger')
            return render_template('login.html', form=form)
    return render_template('login.html', form=form)

@app.route('/logout', methods=['POST'])
def logout_user():
    session.pop('user_id')
    flash('Succesfully logged out', 'info')
    return redirect('/')

@app.route('/users/<username>')
def user_page(username):
    if 'user_id' in session and username == session['user_id']:
        user = User.query.get_or_404(username)
        posts = Feedback.query.filter_by(username=username).all()
        return render_template('users.html', user=user, posts=posts)
    else:
        flash('You do not have permission to access that', 'danger')
        return redirect('/')
    
@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'user_id' in session and username == session['user_id']:
        user = User.query.get_or_404(username)
        db.session.delete(user)
        db.session.commit()
        session.pop('user_id')
        flash('Account succesfully deleted', 'success')
        return redirect('/')
    else:
        flash('You do not have permission to do that', 'danger')
        return redirect('/')
    
@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback_post(username):
    if 'user_id' in session and username == session['user_id']:
        user = User.query.get_or_404(username)
        form = FeedbackForm()
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            username = username

            post = Feedback(title=title, content=content, username=username)
            db.session.add(post)
            db.session.commit()
            flash('Post successfully created', 'success')
            return redirect(f'/users/{username}')
        else:
            return render_template('feedback.html', form=form, user=user)
    else:
        flash("You don't have permission to do that", 'danger')
        return redirect('/')
    
@app.route('/feedback/<post_id>/update', methods=['GET', 'POST'])
def alter_post(post_id):
    post = Feedback.query.get_or_404(post_id)
    if 'user_id' in session and post.user.username == session['user_id']:
        form = FeedbackForm()
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            post.title = title
            post.content = content

            db.session.add(post)
            db.session.commit()
            flash('Post successfully updated', 'success')
            return redirect(f'/users/{post.user.username}')
        else:
            form.content.data = post.content
            return render_template('edit_feedback.html', post=post, user=post.user, form=form)
    else:
        flash("You don't have permission to do that", 'danger')
        return redirect('/')

@app.route('/feedback/<post_id>/delete', methods=['POST'])
def delete_post(post_id):
    post = Feedback.query.get_or_404(post_id)
    if 'user_id' in session and post.user.username == session['user_id']:
        user = post.user
        db.session.delete(post)
        db.session.commit()
        flash('Post successfully deleted', 'danger')
        return redirect(f'/users/{user.username}')
    else:
        flash('You do not have permission to do that', 'danger')
        return redirect('/')