from openai import OpenAI
from secret import apiKey

client = OpenAI(api_key=apiKey)

def get_completion(prompt,model="gpt-3.5-turbo-1106"):
    messages = [{'role':'user','content':prompt}]
    response=client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0
    )
    return response.choices[0].message.content

from fastapi import FastAPI
app = FastAPI()

@app.post('/summerizeCode')
def summerize_code(data : dict):
    print("hello")
    sourceCode = data['sourceCode']
    prompt=f"""
        Analyze the source code delimited by triple backticks so that any one can understand what this code is doing . Also Find if the syntax is correct
        if not find the error and clerify it properly say no error otherwise. Also give the topic that is used in that source code 
        give me the answer in JSON fromat with keys:
        code_analysis,topics,error.
        Your code_analysis should be less than 100 words
        ```{sourceCode}```
    """
    response = get_completion(prompt)
    return response

@app.post('/summerizeStatement')
def summerize_statement(data: dict):
    statement = data['statement']
    # print(statement)
    prompt=f"""
        Analyze the statement of a progarmming problem delimited by triple backticks so that any one can understand what this problem is asking . Also Find all the neccesary topics that could be involved to solve this problem as hints . Lastly Also store find the mathmetical keywords with their description. Try to find the solution of the problem and give it as hints like :
        hint 1: 
        hint 2:
        .
        .
        hint 3:  
        give the the answer in JSON fromat with keys: statement_analysis,topics,keywords,keywords_description,solutionHints.
        Your statement_analysis should be less than 100 words
        ```{statement}```
    """
    response = get_completion(prompt)
    return response





# from flask import Flask,request,jsonify
# from flask_cors import CORS
# app = Flask(__name__)
# CORS(app)

# @app.route('/summerizeCode',methods=['POST'])
# def summerize_code():
#     code = request.json
#     print(code['sourceCode'])
#     sourceCode = code['sourceCode']
#     prompt=f"""
#         Analyze the source code delimited by triple backticks
#         so that any one can understand what this code is doing . Also Find if the syntax is correct
#         if not find the error and clerify it properly say no error otherwise
#         Also give the topic that is used in that source code 
#         give me the answer in JSON fromat with keys:
#         code_analysis,topics,error.
#         Your code_analysis should be less than 100 words
#         ```{sourceCode}```
#     """
#     response = get_completion(prompt)
#     # print(response)
#     return jsonify(response)



# @app.route('/summerizeStatement',methods=['POST'])
# def summerize_statement():
#     data = request.json
#     statement = data['statement']
#     print(statement)
#     prompt=f"""
#         Analyze the statement of a progarmming problem delimited by triple backticks so that any one can understand what this problem is asking . Also Find all the neccesary topics that could be involved to solve this problem as hints . Lastly Also store find the mathmetical keywords with their description. Try to find the solution of the problem and give it as hints like :
#         hint 1: 
#         hint 2:
#         .
#         .
#         hint 3:  
#         give the the answer in JSON fromat with keys:
#           statement_analysis,topics,keywords,keywords_description,solutionHints.
#         ```{statement}```
#     """
#     response = get_completion(prompt)
#     return jsonify(response)

# if __name__ == '__main__':
#         app.run(port=5001)





