from flask import Flask, json, render_template, jsonify, request, flash
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SECRET_KEY'] = 'orange_bananas'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route('/')
def home_page():
    cupcakes = Cupcake.query.all()
    return render_template('home.html', cupcakes=cupcakes)

@app.route('/api/cupcakes', methods=['GET'])
def get_all_cupcakes():
    cupcakes = [cake.serialize() for cake in Cupcake.query.all()]
    return jsonify(cupcakes)

@app.route('/api/cupcakes/<int:id>', methods=['GET'])
def get_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    serialized_cake = cupcake.serialize()
    return jsonify(serialized_cake)

@app.route('/api/cupcakes', methods=['POST'])
def post_cupcake():
    cupcake = Cupcake(flavor=request.json['flavor'],
                      size=request.json['size'],
                      rating=request.json['rating'],
                      image=request.json.get('image', 'https://tinyurl.com/demo-cupcake'))
    db.session.add(cupcake)
    db.session.commit()
    return jsonify(cupcake.serialize())

@app.route('/api/cupcakes/<int:id>', methods=['PATCH'])
def update_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    db.session.commit()
    return jsonify(cupcake.serialize())

@app.route('/api/cupcakes/<int:id>', methods=['DELETE'])
def delete_cupcake(id):
    Cupcake.query.filter_by(id=id).delete()
    db.session.commit()
    deleted = {
        "message": "deleted"
    }
    return jsonify(deleted)

