from unittest import TestCase
from app import app
from models import db

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_db_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['WTF_CSRF_ENABLED'] = False

db.drop_all()
db.create_all()