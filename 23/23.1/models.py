from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    
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
    
    