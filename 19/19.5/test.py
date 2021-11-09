from unittest import TestCase
from app import app, boggle_game
from flask import session
from boggle import Boggle

boggle_board = boggle_game.make_board()

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    
    @classmethod
    def setUpClass(self):
        boggle_game = Boggle()
        boggle_board = boggle_game.make_board()
        

    def test_home_page(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Welcome to boggle!</h1>', html)
    
    def test_game_page(self):
        with app.test_client() as client:
            res = client.get('/game')
            html = res.get_data(as_text=True)
            
            self.assertEqual(res.status_code, 200)
            self.assertIn('<table id="boggle-board">', html)
            self.assertEqual(session['high-score'], 0)
            
    def test_get_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = boggle_board
            res = client.get('/get-word/blue')
            text_response = res.get_data(as_text=True)
            
            self.assertEqual(res.status_code, 200)
            self.assertIn('"word": "blue"', text_response)
            
    def test_update_score(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['times-played'] = 36
                change_session['high-score'] = 36
                change_session['previous-high-score'] = 36
            
            res = client.post('/update-score?score=27')
            text_response = res.get_data(as_text=True)
            
            self.assertTrue(res.status_code, 200)
            self.assertIn('"high_score": 36', text_response)
            self.assertIn('"times_played": 37', text_response)
            
            