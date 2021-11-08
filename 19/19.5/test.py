from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    
    @classmethod
    def setUpClass(self):
        boggle_game = Boggle()
        boggle_board = boggle_game.make_board()
        
        session['board'] = boggle_board
        

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
            res = client.get('/get-word/blue')
            
            self.assertEqual(res.status_code, 200)
            
            
            