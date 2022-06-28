from enum import unique
from sqlalchemy import  Column, Integer,String,Boolean
from databse import Base

# address,age,college name
class User(Base):
    __tablename__ = "student_info"
    stud_id = Column(Integer,primary_key = True,index = True)
    username = Column(String(100),unique = True,index = True)
    email = Column(String(50),unique=True,index=True)
    password = Column(String(200),unique=True)
    address = Column(String(300),unique=True)
    age = Column(Integer)
    college_name = Column(String(200))
    is_active = Column(Integer,default=0)

    
