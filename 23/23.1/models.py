from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    # db.drop_all()
    # db.create_all()
    
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    first_name = db.Column(db.String(20),
                           nullable=False)

    last_name = db.Column(db.String(20),
                          nullable=True)

    image_url = db.Column(db.String(300),
                          nullable=True)
    
    def get_full_name(self):
        first = self.first_name
        last = self.last_name
        full_name = first + ' ' + last
        return full_name
    
class Posts(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    title = db.Column(db.String(30), nullable=False)

    content = db.Column(db.String(500), nullable=False)

    created_at =  db.Column(db.Text, nullable=False)
    
    edited_at = db.Column(db.Text, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user_info = db.relationship('User', backref='posts')
    
    post_tags = db.relationship('PostTags', backref='post')
    
class Tags(db.Model):
    __tablename__ = 'tags'
    
    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    name = db.Column(db.String(15),
                     unique=True,
                     nullable=False)
    
    post_tags = db.relationship('PostTags', backref='tag')


class PostTags(db.Model):
    __tablename__ = 'posttags'

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True )

    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)