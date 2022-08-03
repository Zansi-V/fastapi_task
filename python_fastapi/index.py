from datetime import date, datetime, timedelta
from typing import Union,Optional
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Header, Request, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from requests import Session, session
from sqlalchemy import null, true
from python_fastapi.databse import engine, sessionlocal
from python_fastapi.models import Base, User
from passlib.context import CryptContext
from email_validator import validate_email, EmailNotValidError
from jose import jwt, JWTError
from python_fastapi.elaticsearch import es
from python_fastapi.empdetail import  empdetail
from fastapi.templating import Jinja2Templates
import math
from python_fastapi.schemas import UserCreate, UserUpdate, userpass, _UserBase, TokenData,employeeinfo
from fastapi.middleware.cors import CORSMiddleware

from fastapi_pagination import Page, LimitOffsetPage, paginate, add_pagination
templates = Jinja2Templates(directory="htmldirectory")

Base.metadata.create_all(bind=engine)
# JWTPayloadMapping = MutableMapping[str, Union[datetime, bool, str, List[str], List[int]]
                                #    ]
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


def create_access_token(data: dict, expire_delta: timedelta | None = None):
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
#    return returnjw

app = FastAPI()


app.add_middleware(
    CORSMiddleware,

    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PWD_CONTEXT = CryptContext(schemes=["bcrypt"], deprecated="auto")
# register,signing, dashboard  student name,address,age,college name,
# searching,filtering,sorting,pagging


@app.post("/sign_up")
async def create_user(user: UserCreate, db: Session = Depends(get_databse_session)):
    try:
        valid = validate_email(email=user.email)
        email = valid.email
    except EmailNotValidError:
        raise HTTPException(
            status_code=404, detail="please enter a valid email")

    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="username already exists")
    hashed_password = PWD_CONTEXT.hash(user.password)
    user_obj = User(username=user.username, email=email, password=hashed_password,
                    address=user.address, age=user.age, college_name=user.college_name)
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return PWD_CONTEXT.verify(plain_password, hashed_password)


def authenticate(
    *,
    username: str,
    password: str,
    db: Session,

) -> Optional[User]:
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user


@app.post("/login")
def login(form_data: userpass, db: session = Depends(get_databse_session)):
    user = authenticate(username=form_data.username,
                        password=form_data.password, db=db)
    if not user:
        raise HTTPException(
            status_code=400, detail="incorrect username or password")

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
# @app.post("/login1")
# def login(form_data:userpass,db:session = Depends(get_databse_session)):
#    user = authenticate(username=form_data.username,password=form_data.password,db=db)
#    if not user:
#        raise HTTPException(status_code = 400,detail="incorrect username or password")
#    return user


@app.get("/authorize/")
def get_user(token: str | None = Header(None), db: session = Depends(get_databse_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, _JWT_SECRET, algorithms=[Algorithm])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = db.query(User.stud_id, User.username, User.email, User.address, User.age,
                    User.college_name).filter(User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return {
        "stud_id": user[0],
        "username": user[1],
        "email": user[2],
        "address": user[3],
        "age": user[4],
        "college_name": user[5]}


@app.get("/user/{id}")
def get_particular_user(id: int, db: session = Depends(get_databse_session)):
    searchuser = db.query(User).with_entities(User.stud_id, User.username, User.email,
                                              User.address, User.age, User.college_name).filter(User.stud_id == id).first()
    return {
        "stud_id": searchuser[0],
        "username": searchuser[1],
        "email": searchuser[2],
        "address": searchuser[3],
        "age": searchuser[4],
        "college_name": searchuser[5]}


# @app.get("/user/{query}", tags=["search"])
# def search_user(query: str, db: session = Depends(get_databse_session)):
#     if key == "username":

#      if key == "email":
#        searchuser = db.query(User.stud_id,User.username,User.email,User.address,User.age,User.college_name).filter(User.email.like(query + "%")).all()
#     return searchuser

# @app.get("/searchuser/")
# async def main(db:session =Depends(get_databse_session)):
#    get_student = db.query(User.stud_id,User.username,User.email,User.address,User.age,User.college_name).all()
#    return get_student


@app.put("/user/{sid}")
async def upadate_user(sid: int, details: UserUpdate, token: str | None = Header(None), db: session = Depends(get_databse_session)):
    Credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not valid credentials",
        headers={"WWW-Authenticate": "bearer"}
    )
    try:
        payload = jwt.decode(token, _JWT_SECRET, algorithms=[Algorithm])
        username: str = payload.get("sub")
        if username is None:
            raise Credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise Credentials_exception


#    hashed_password = PWD_CONTEXT.hash(details.password)
    db.query(User).filter(User.stud_id == sid).update({User.username: details.username, User.email: details.email,
                                                       User.address: details.address, User.age: details.age, User.college_name: details.college_name})

#    db.add(user_obj)
    db.commit()
    return {"message": "student successfully updated"}


@app.delete("/user/{id}")
async def delete_student(id: int, token: str | None = Header(None), db: session = Depends(get_databse_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, _JWT_SECRET, algorithms=[Algorithm])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    u_student = db.query(User).filter(User.stud_id == id)
    if not u_student.first():
        return {"message": "no details for student ID {id}"}
    u_student.delete()
    db.commit()
    return {"message": "student NO {id} has been successfully deleted"}

# first youtube way - Pagination
# @app.get('/app/default',response_model=Page[UserCreate],tags=["pagination"])
# @app.get('/app/limit-offset',response_model=LimitOffsetPage[UserCreate],tags=["pagination"])
# def allstudent(db:session = Depends(get_databse_session)):
#     return paginate(db.query(User).all())
#     # return paginate(users)
# add_pagination(app)

# second myway


@app.get("/user/")
def all_student(page_num: Optional[int] = 1,page_size:Optional[int]=5 ,search: Optional[str] = "", whichsort: Optional[str] = "", key1: Optional[str] = "Username", db: session = Depends(get_databse_session)):
    
    start = (page_num - 1) * page_size
    end = start + page_size
    if search != "":
        searchuser = db.query(User.stud_id, User.username, User.email, User.address, User.age, User.college_name).filter(
            (User.username.like(search + "%")) | (User.college_name.like(search + "%")) | (User.age.like(search + "%"))).all()
        data_length = len(searchuser)
        total = math.ceil(data_length/page_size)

        response = {
            "data": searchuser[start:end],
            "total": total,
            "totaldata": data_length,
            "page": page_num,
            "page_size": page_size,
        }
        return response
    else:

        data = db.query(User.stud_id, User.username, User.email,
                        User.address, User.age, User.college_name).all()
        # ?page_num=3&whichsort=desc&key1=age

        # if key1 == "":
        #     sortdata = data[start:end]
        #     data_length1 = len(data)
        #     data_length = math.ceil(data_length1/page_size)
        #     response = {
        #         "data": sortdata,
        #         "total": data_length,
        #         "page": page_num,
        #         "page_size": page_size,
        #     }
        #     return response
        if whichsort == "desc":
                if key1 == "No":
                    sortdata = sorted(data, key=lambda v: (
                        v.stud_id), reverse=True)
                if key1 == "Username":
                    sortdata = sorted(data, key=lambda v: (
                        v.username), reverse=True)
                if key1 == "Age":
                    sortdata = sorted(
                        data, key=lambda v: (v.age), reverse=True)
                if key1 == "College Name":
                    sortdata = sorted(data, key=lambda v: (
                        v.college_name), reverse=True)

        else:
                if key1 == "No":
                    sortdata = sorted(data, key=lambda v: (v.stud_id))
                if key1 == "Username":
                    sortdata = sorted(data, key=lambda v: (v.username))
                if key1 == "Age":
                    sortdata = sorted(data, key=lambda v: (v.age))
                if key1 == "College Name":
                    sortdata = sorted(
                        data, key=lambda v: (v.college_name))


        data_length1 = len(data)
        data_length = math.ceil(data_length1/page_size)
        response = {
                "data": sortdata[start:end],
                "total": data_length,
                "page": page_num,
                "page_size": page_size,
        }
        return response

@app.get("/get_specific_employee")
def employee(id:str,empdetail:empdetail=Depends(empdetail)):
       return empdetail.get_data(id)

@app.get("/get_all_employee_detail")
def employee_all(empdetail:empdetail=Depends(empdetail)):
       return empdetail.all()

@app.post("/insert_employee")
def insert_employee(employee:employeeinfo,empdetail:empdetail=Depends(empdetail)):
       return empdetail.insert_data(employee)

@app.put("/update_employee")
def update_employee(employee_id:str,employee:employeeinfo,empdetail:empdetail=Depends(empdetail)):
       return empdetail.update_employee(employee_id,employee)

@app.delete("/delete_emp")
def delete_employee(id:str,empdetail:empdetail=Depends(empdetail)):
       empdetail.delete_data(id)
       return "succesfully deleted"

@app.get("/searchexpirence")
def highest_expirence(expierence:int,empdetail:empdetail=Depends(empdetail)):
    return empdetail.biggerexpirence(expierence)

@app.get("/start_date")
def start_date(gt_date:date,le_date:date,empdetail:empdetail=Depends(empdetail)):
    return empdetail.starting_date(gt_date,le_date)
    

@app.get("/pagination")
def pagination(page_no:int,empdetail:empdetail=Depends(empdetail)):
    return empdetail.pagination(page_no)

@app.get("/city_wise_emplyee")
def city_wise_date(gt_date:date,le_date:date,empdetail:empdetail=Depends(empdetail)):
    return empdetail.city_wise_employee(gt_date,le_date)

@app.get("/get_record")
def get_recordby_name(empname:str,empdetail:empdetail=Depends(empdetail)):
    get_employee = empdetail.get_records_by_name(empname)
    return {"data":get_employee,"success":"true"}

class Item(BaseModel):
    name: str
    description: Union[str, None] = None
    price: float
    tax: Union[float, None] = None


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    results = {"item_id": item_id, "item": item}
    return results
