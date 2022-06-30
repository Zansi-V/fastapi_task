from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATBASE_URL = "mysql+pymysql://root@localhost:3306/jwtlogin"
engine = create_engine(DATBASE_URL)
sessionlocal = sessionmaker(autocommit = False,autoflush = False,bind = engine)
Base =declarative_base()