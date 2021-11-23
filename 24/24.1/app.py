from flask import Flask, render_template, redirect, request, flash, session
from models import Pet
from forms import AddPets
from models import db, connect_db

app = Flask(__name__)

app.config['SECRET_KEY'] = 'ORANGE_BANANA_CREAM'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route('/', methods=['GET'])
def home_page():
    """Renders the home page and shows a list of current pets in the database"""
    
    pets = Pet.query.all()
    return render_template('index.html', pets=pets)

@app.route('/pets/new', methods=['GET', 'POST'])
def add_new_pet():
    """ **GET** requests will render the 'add pet' page. **POST** requests
    will create a new instance of Pet and add is to the database and redirect to the
    home page"""
    
    form = AddPets()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        
        pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        db.session.add(pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('add_pet.html', form=form)

@app.route('/pets/<int:pet_id>', methods=['GET'])
def pet_details_page(pet_id):
    """Renders a page that shows the details of a specific pet"""
    pet = Pet.query.get_or_404(pet_id)
    return render_template('pet_details.html', pet=pet)

@app.route('/pets/<int:pet_id>/edit', methods=['GET', 'POST'])
def edit_pet(pet_id):
    """ **GET** requests will render the edit pet page. **POST** requests
    will post any updated changes to the specific pet instance"""
    
    pet = Pet.query.get_or_404(pet_id)
    form = AddPets(obj=pet)
    
    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        db.session.add(pet)
        db.session.commit()
        return redirect(f'/pets/{pet_id}')
    else:
        return render_template('edit_pet.html', form=form, pet=pet)