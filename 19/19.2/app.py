from flask import Flask, request, render_template

from stories import Story, story

app = Flask(__name__)

@app.route('/')
def home_page():
    return render_template('home.html', story=story)

@app.route('/story')
def story_page():
    story_text = story.generate(request.args)
    return render_template('story.html', story=story_text)