from boggle import Boggle
from flask import Flask, request, session, render_template, redirect, jsonify, flash

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'blueberries'

@app.route("/")
def home_page():
    """shows the home page"""
    return render_template('index.html')

@app.route('/game')
def render_game_page():
    """Shows the game page and sets session values"""
    boggle_board = boggle_game.make_board()
    session['board'] = boggle_board
    session['high-score'] = session.get('high-score', 0)
    session['previous-high-score'] = session['high-score']
    return render_template('board.html', board=boggle_board)

@app.route('/get-word/<word>', methods=["GET"])
def return_word(word):
    """checks the user guessed word for validity and returns the results in JSON"""
    word = word.strip()
    res = boggle_game.check_valid_word(session['board'], word)
    return jsonify(results=res, word=word)

@app.route('/update-score', methods=['POST'])
def update_user_info():
    """updates user information including highscore (if applicable) and returns the user infomration"""
    session['times-played'] = session.get('times-played', 0) + 1
    player_score = int(request.args['score'])
    if player_score > session['high-score']:
        session['previous-high-score'] = session['high-score']
        session['high-score'] = player_score
    return jsonify(high_score=session['high-score'],
                   times_played=session['times-played'], 
                   previous_high_score=session['previous-high-score'])