from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, URLField
from wtforms import validators
from wtforms.validators import NumberRange, InputRequired, Optional, URL
from wtforms.widgets.core import Input



class AddPets(FlaskForm):
    
    name = StringField('Name', validators=[InputRequired(message='Please enter a valid name')])
    species = SelectField('Species', validators=[InputRequired()], choices=[('Dog', 'Dog'), ('Cat', 'Cat'),('Porcupine', 'Porcupine'),('Unknown', 'Unknown')])
    photo_url = URLField('Photo URL', validators=[Optional(), URL(message='Please enter a valid URL')])
    age = IntegerField('Age', validators=[Optional(), NumberRange(min=0, max=30)])
    notes = StringField('Notes', validators=[Optional()])