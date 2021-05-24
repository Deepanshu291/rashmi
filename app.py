from flask import Flask,redirect,url_for,render_template,request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app=Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///User.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'

    sno = db.Column(db.Integer,
                   primary_key=True)
    name = db.Column(db.String,
                         nullable=False,
                         unique=False)
    email = db.Column(db.String(40),
                      unique=True,
                      nullable=False)
    phone = db.Column(db.Integer,
                         primary_key=False,
                         unique=False,
                         nullable=False)
    message = db.Column(db.String(200),
                      unique=False,
                      nullable=True)
    date = db.Column(db.DateTime, default= datetime.utcnow) 
                                           
    def __repr__(self):
        return '<User {}>'.format(self.name)

@app.route('/',methods=['GET','POST'])
def home():
    if request.method=='POST':
        return render_template('index.html')
    return render_template('index.html')

@app.route('/add', methods=['GET', 'POST'])
def Add():
   if request.method=='POST':
       name = request.form['name']
       user = User(name=name,phone=request.form['phone'],email=request.form['email'],message=request.form['message'])
    #    print(user)
       db.session.add(user) 
       db.session.commit()
       return redirect("/")
   return render_template("add.html")  

@app.route('/admin', methods=['GET', 'POST'])
def admin():
   
   if request.method=='POST':
       name = request.form['name']
       password = request.form['password']
       if name == 'Deepanshu' or password == 'Deepu@291':
          users = User.query.all() 
          return render_template('admin.html', users=users)
       else:
           redirect('/admin')   
   return render_template('login.html')   

@app.route('/adpanel', methods=['GET', 'POST'])
def AdPanel():
   users = User.query.all() 
   return render_template('admin.html', users=users)

@app.route('/delete/<int:sno>', methods=['GET', 'POST'])
def delete(sno):
   users = User.query.filter_by(sno=sno).first()
   db.session.delete(users)
   db.session.commit() 
   return redirect("/admin")

@app.route('/delete', methods=['GET', 'POST'])
def delete_all():
   db.session.query(User).delete()
   db.session.commit()
   return redirect("/admin")

if __name__ == '__main__':
    #DEBUG is SET to TRUE. CHANGE FOR PROD
    app.run(port=3000,debug=True)