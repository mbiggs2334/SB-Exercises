from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add')
def add_func():
    nums = request.args
    a = int(nums['a'])
    b = int(nums['b'])
    results = add(a,b)
    return str(results)

@app.route('/sub')
def sub_func():
    nums = request.args
    a = int(nums['a'])
    b = int(nums['b'])
    results = sub(a,b)
    return str(results)

@app.route('/mult')
def mult_func():
    nums = request.args
    a = int(nums['a'])
    b = int(nums['b'])
    results = mult(a,b)
    return str(results)

@app.route('/div')
def div_func():
    nums = request.args
    a = int(nums['a'])
    b = int(nums['b'])
    results = div(a,b)
    return str(results)

# single route method
operators = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}
@app.route('/math/<func>')
def math_funcs(func):
    nums = request.args
    a = int(nums['a'])
    b = int(nums['b'])
    results = operators[func](a,b)
    return str(results)