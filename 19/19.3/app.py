from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.utils import redirect
from surveys import satisfaction_survey

app = Flask(__name__)

app.config['SECRET_KEY'] = 'bluebanana'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
deubug = DebugToolbarExtension(app)

survey = satisfaction_survey
responses = []


@app.route('/')
def home_page():
    """Shows home page"""
    return render_template('home.html', survey=survey)

@app.route('/question/<num>')
def questions(num):
    """shows the question pages"""
    num=int(num)
    args = request.args
    for x in args:
        print(x)
    if args:
        """adds question responses to the responses list variable"""
        try:
            session_update = session['responses']
            session_update.append(args[survey.questions[num - 1].question])
            session['responses'] = session_update
        except:
            """Prevents the user from answering questions out of order while query strings are in place"""
            flash('Please answer the questions in the appropriate order.')
            return redirect(f'/question/{len(session["responses"])}')
    
    if len(session['responses']) == len(survey.questions):
        """checks the responses list variable to see if all quesetions have been answered, 
        if so, redirects to the thank you page"""
        if session['survey_complete'] == True:
            flash("You've already answered all the questions.")
        session['survey_complete'] = True
        return redirect('/thank_you')
    
    if num > len(survey.questions) or num != len(session['responses']):
        """prevents the user from answering questions out of order and redirects to the appropriate question"""
        flash('Please answer the questions in the appropriate order.')
        return redirect(f'/question/{len(session["responses"])}')
    
    return render_template('questions.html', num=num, survey=survey)

@app.route('/thank_you')
def survey_finished():
    """Shows the thank you page after completing survey"""
    return render_template('thanks.html')

@app.route('/start', methods=['POST'])
def start_survey():
    session['responses'] = session.get('responses', responses)
    session['survey_complete'] = session.get('survey_complete', False)
    return redirect('/question/0')