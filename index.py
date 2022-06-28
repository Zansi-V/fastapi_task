from email.errors import HeaderDefect
from fastapi import Depends, FastAPI,HTTPException, Header,Request,status
from fastapi.security import HTTPBearer
from typing import MutableMapping, Optional,List,Union,Any
from httplib2 import Credentials
from numpy import s_
from pydantic import BaseModel
from datetime import datetime,timedelta
from requests import Session, session
from databse import engine,sessionlocal
from models import Base, User
from passlib.context import CryptContext
from email_validator import validate_email,EmailNotValidError
from jose import jwt,JWTError
from fastapi.templating import Jinja2Templates
from schemas import UserCreate, UserUpdate, userid, userpass,_UserBase,TokenData
from fastapi.middleware.cors import CORSMiddleware

from fastapi_pagination import Page,LimitOffsetPage,paginate,add_pagination
templates = Jinja2Templates(directory="htmldirectory")

Base.metadata.create_all(bind=engine)
JWTPayloadMapping = MutableMapping[str, Union[datetime,bool,str,List[str],List[int]]
]
_JWT_SECRET = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
Algorithm = "HS256"
security = HTTPBearer()

# origins = [ 
#      "http://localhost",
#      "http://localhost:8000",
#      "http://localhost:8080",
# ]


def get_databse_session():
    try:
        db = sessionlocal()
        yield db
    finally:
        db.close()

def create_access_token(data:dict,expire_delta:timedelta | None = None):
    to_encode = data.copy()
    if expire_delta:
      expire = datetime.utcnow() + expire_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, _JWT_SECRET, algorithm=Algorithm)
    return encoded_jwt
# def create_access_token(*,sub:str) -> str:
    # return _create_token(
    #     token_type = "access_token",
    #     lifetime = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES),
    #     sub = sub,
    # )


# def _create_token(
#     token_type:str,
#     lifetime:timedelta,
#     sub:str,
# ) -> str:
#    payload = {}
#    expire = datetime.utcnow() + lifetime
#    payload["type"] = token_type
#    payload["exp"] = expire
#    payload["iat"] = datetime.utcnow
#    payload["sub"]  = str(sub)

#    returnjwt = jwt.encode(payload, _JWT_SECRET, algorithm=Algorithm)
#    return returnjwt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
   
    allow_credentials = True,
    allow_origins  = ["*"],
    allow_methods=["*"],
    allow_headers = ["*"],
)

PWD_CONTEXT =  CryptContext(schemes=["bcrypt"],deprecated = "auto")
# register,signing, dashboard  student name,address,age,college name, 
# searching,filtering,sorting,pagging

@app.post("/sign_up")
async def create_user(user:UserCreate,db:Session=Depends(get_databse_session)):
    try:
        valid = validate_email(email=user.email)
        email = valid.email
    except EmailNotValidError:
        raise HTTPException(status_code = 404, detail="please enter a valid email")

    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code = 400,detail="username already exists")
    hashed_password = PWD_CONTEXT.hash(user.password)
    user_obj = User(username=user.username,email=email,password=hashed_password,address = user.address,age = user.age,college_name = user.college_name)
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj

def verify_password(plain_password:str,hashed_password:str) -> bool:
    return PWD_CONTEXT.verify(plain_password, hashed_password)

def authenticate(
    *,
    username:str,
    password:str,
    db:Session,

) -> Optional[User]:
  user = db.query(User).filter(User.username == username).first()
  if not user:
      return None
  if not verify_password(password,user.password):
      return None
  return user

@app.post("/login")
def login(form_data:userpass,db:session = Depends(get_databse_session)):
   user = authenticate(username=form_data.username,password=form_data.password,db=db)
   if not user:
       raise HTTPException(status_code = 400,detail="incorrect username or password")

#    return {
#      "access_token":create_access_token(sub = user.stud_id),
#      "access_type":"bearer",
#    }
   
   access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
   access_token = create_access_token(
        data={"sub": user.username}, expire_delta=access_token_expires
    )
   return {"access_token": access_token, "token_type": "bearer"}

# def search_job(query:str,db:Session):
#     name = db.query(User).filter(User.username.contains(query)).all()
#     return name
@app.post("/login1")
def login(form_data:userpass,db:session = Depends(get_databse_session)):
   user = authenticate(username=form_data.username,password=form_data.password,db=db)
   if not user:
       raise HTTPException(status_code = 400,detail="incorrect username or password")
   return user
   
@app.get("/authorize/")
def get_user(token:str |None =  Header(None),db:session=Depends(get_databse_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token,_JWT_SECRET, algorithms=[Algorithm])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = db.query(User.stud_id,User.username,User.email,User.address,User.age,User.college_name).filter(User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return {
      "stud_id":user[0],
      "username": user[1],
      "email": user[2],
      "address":user[3],
      "age":user[4],
      "college_name": user[5] }

@app.get("/getuser/{id}",tags=["search"])
def search_job(id: int, db: session = Depends(get_databse_session)):
    searchuser = db.query(User).with_entities(User.stud_id,User.username,User.email,User.address,User.age,User.college_name).filter(User.stud_id == id).first()
    return {
      "stud_id":searchuser[0],
      "username": searchuser[1],
      "email": searchuser[2],
      "address": searchuser[3],
      "age": searchuser[4],
      "college_name": searchuser[5] }
    
    
@app.get("/searchuser/{query}",tags=["search"])
def search_job(query: str, db: session = Depends(get_databse_session)):
    searchuser = db.query(User.stud_id,User.username,User.email,User.address,User.age,User.college_name).filter(User.username.like(query + "%")).all()
    return searchuser

@app.get("/searchuser/")
async def main(db:session =Depends(get_databse_session)):
   get_student = db.query(User.stud_id,User.username,User.email,User.address,User.age,User.college_name).all()
   return get_student

@app.put("/updateuser/{sid}")
async def upadate_user(sid:int,details:UserUpdate,token:str|None = Header(None),db:session = Depends(get_databse_session)):
   Credentials_exception =HTTPException(
     status_code=status.HTTP_401_UNAUTHORIZED,
     detail="Could not valid credentials",
     headers={"WWW-Authenticate":"bearer"}
   )
   try:
       payload = jwt.decode(token,_JWT_SECRET, algorithms=[Algorithm])
       username:str = payload.get("sub")
       if username is None:
          raise Credentials_exception
       token_data=TokenData(username=username)
   except JWTError:
        raise Credentials_exception
    

#    hashed_password = PWD_CONTEXT.hash(details.password)
   db.query(User).filter(User.stud_id == sid).update({User.username:details.username,User.email:details.email,User.address:details.address,User.age:details.age,User.college_name:details.college_name})
   
#    db.add(user_obj)
   db.commit()
   return {"message":"student successfully updated"}

@app.delete("/delete/{id}")
async def delete_student(id:int,token:str |None =  Header(None),db:session=Depends(get_databse_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token,_JWT_SECRET, algorithms=[Algorithm])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    u_student = db.query(User).filter(User.stud_id == id)
    if not u_student.first():
        return {"message":"no details for student ID {id}"}
    u_student.delete()
    db.commit()
    return {"message":"student NO {id} has been successfully deleted"}


@app.get("/search/")
def search(request: Request,db:session = Depends(get_databse_session)):
    # name = search_job(query,db = db)
    # jobs = search_job(query, db=db)

    name = db.query(User).all()
    return templates.TemplateResponse("document.html",{"request":request,"name":name})


# first youtube way - Pagination
@app.get('/app/default',response_model=Page[UserCreate],tags=["pagination"])
@app.get('/app/limit-offset',response_model=LimitOffsetPage[UserCreate],tags=["pagination"])
def allstudent(db:session = Depends(get_databse_session)):
    return paginate(db.query(User).all())
    # return paginate(users)

add_pagination(app)

# second myway
@app.get("/pagination2/{page_num}",tags=["pagination"])
def all_student(page_num:int=1,db:session = Depends(get_databse_session)):
    page_size=1
    start =(page_num - 1) * page_size
    end = start + page_size
    data = db.query(User.stud_id,User.username,User.email,User.address,User.age,User.college_name).all()
    data_length = len(data)
    response = {
    
       "data": data[start:end],
       "total":data_length,
       "page":page_num,
       "page_size":page_size,    
    }
    return response

# sorting
data = [{"username":"zansi","age":30},{"username":"mansi","age":20},{"username":"teena","age":40}]
@app.get("/hsorrting",tags=["sorting"])
def sort_student():
    tem = sorted(data,key = lambda x: (x["username"]))
    return tem

@app.get("/sorting/{key_pair}",tags=["sorting"])
def sort_student(key_pair:str,db:session = Depends(get_databse_session)):
    s_student = db.query(User.stud_id,User.username,User.email,User.address,User.age,User.college_name).all() 
    if key_pair == "stud_id":
        return sorted(s_student,key = lambda v:(v.stud_id))
    if key_pair == "username":
        return sorted(s_student,key = lambda v: (v.username))
    elif key_pair == "email":
        return sorted(s_student,key = lambda v: (v.email))
    elif key_pair == "age":
        return sorted(s_student,key = lambda v: (v.age))
    elif key_pair == "address":
        return sorted(s_student,key = lambda v : (v.address))
    elif key_pair == "college_name":
        return sorted(s_student,key = lambda v : (v.college_name))
    else:
        return "please valid key"


