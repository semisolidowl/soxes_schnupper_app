from flask import Flask,render_template, request,jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
 
app = Flask(__name__)
CORS(app)

 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flastesting'
 
mysql = MySQL(app)
 
@app.route('/getTODO')
def taskget():
    con = mysql.connection.cursor()

    con.execute('''SELECT * FROM taskdata''')
    row_headers=[x[0] for x in con.description]

    rv = con.fetchall()

    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))

    return jsonify(json_data)

@app.route('/postTODO', methods=['POST','GET'])
def add_TODO():
    cur = mysql.connection.cursor()
    txt=''

    jsonBody = request.json

    if jsonBody["content"] and jsonBody["status"] and jsonBody["userOwned"]:
        content = jsonBody["content"]
        status = jsonBody["status"]
        userOwned = jsonBody["userOwned"]

        cur.execute('INSERT INTO taskdata VALUES (NULL, %s, %s, %s)', (content, status, userOwned,))
        mysql.connection.commit()
        
        txt='added to content:'+content+' added to status:'+status+' gave to user with this id:'+userOwned
        
        return txt
    else:
        return "ERROR: Pleas give valid josn body!!!"

if __name__ == '__main__':
    app.run(debug=True)







