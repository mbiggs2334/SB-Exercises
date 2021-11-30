from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import date

bcrypt = Bcrypt()
db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    # db.drop_all()
    # db.create_all()
    

class User(db.Model):
    __tablename__ = 'users'
    
    username = db.Column(db.String(20), primary_key=True)
    
    password = db.Column(db.Text, nullable=False)

    email = db.Column(db.String(50), nullable=False, unique=True)

    first_name = db.Column(db.String(30), nullable=False)

    last_name = db.Column(db.String(30), nullable=False)
    
    joined = db.Column(db.Text, nullable=False)
    
    @classmethod
    def register(cls, username, pwd, email, first_name, last_name):
        """Registers user w/hased password & returns user instance."""

        date_obj = date.today()
        today = f'{date_obj.month}/{date_obj.day}/{date_obj.year}'
        
        hashed = bcrypt.generate_password_hash(pwd, 14)
        hashed_utf8 = hashed.decode("utf8")
        
        return cls(username=username, password=hashed_utf8, email=email,
                   first_name=first_name, last_name=last_name, joined=today)
        
    @classmethod
    def authenticate(cls, username, pwd):
        """Validates that user exists and password is correct"""

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, pwd):
            return user
        else:
            return False

class Feedback(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    title = db.Column(db.String(100), nullable=False)

    content = db.Column(db.Text, nullable=False)

    username = db.Column(db.Text, db.ForeignKey('users.username'))
                         
    user = db.relationship('User', backref='posts')