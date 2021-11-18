from unittest import TestCase
from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()

class TestRoutes(TestCase):
    """Tests the routes"""

    def setUp(self):
        """Clean up any existing users"""

        User.query.delete()
        
        user1 = User(first_name='Joe', last_name='Robinson', image_url='null')
        user2 = User(first_name='Jimmy', last_name='The Mage', image_url='null')
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()

    def tearDown(self):
        """Removes any leftover users after tests"""
        
        db.session.rollback()
        
    def test_user_list(self):
        """Tests the initial landing page"""
        with app.test_client() as client:
            resp = client.get('/users')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('Joe Robinson', html)
            self.assertIn('Jimmy The Mage', html)
            
    def test_new_user(self):
        """Tests the add new users page"""
        with app.test_client() as client:
            resp = client.get('/users/new')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<input type="text"', html)
            
    def test_new_user_post(self):
        """Tests the posting of a new user"""
        with app.test_client() as client:
            """Tests the redirect"""
            resp = client.post('/users/new', data=dict(first_name='Jimmy',
                                                       last_name ='The Mage',
                                                       url = 'null'))
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 302)
            self.assertIn('You should be redirected automatically', html)
        
        with app.test_client() as client:
            """Tests the followed redirect"""
            resp = client.post('/users/new', data=dict(first_name='Jimmy',
                                                       last_name ='The Mage',
                                                       url = 'null'), follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Jimmy The Mage', html) 
            
    def test_user_details(self):
        """Tests the add users function"""
        with app.test_client() as client:
            """Tests getting user id page with **valid** user query"""
            resp = client.get('/users/9')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('Joe Robinson', html)
            
        with app.test_client() as client:
            """Tests getting user id page with **invalid** user query"""
            resp = client.get('/users/89')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 404)
            self.assertIn('The requested URL was not found', html)
            
    def test_delete_user(self):
        """Tests the deletion function of the application"""
        with app.test_client() as client:
            resp = client.post('/users/10/delete')
            resp2 = client.get('/users/10')
            html = resp2.get_data(as_text=True)
            
            self.assertEqual(resp2.status_code, 404)
            self.assertIn('The requested URL was not found', html)