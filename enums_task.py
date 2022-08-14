from more_itertools import bucket
from pydantic import BaseModel
# import colorsys
# from enum import Enum,auto
# import enum
# class Days(Enum):
#     Sun = 1
#     Mon = 2
#     Tue = 1
#     Wed = 4
#     Thu = 5


# #enum member name
# print(type(Days))
# print(Days.Mon.value)

# #print all enum member
# for weekday in Days:
#     print(weekday)

# #hashing enums
# Datatype = {}
# Datatype[Days.Sun] = 'Sun God'
# Datatype[Days.Mon] = 'Moon God'

# print(Datatype == {Days.Sun:'Sun God',Days.Mon:'Moon God'})

# # enum member accessed by name and value
# print(Days['Mon'])
# print(Days(2))

# if Days.Sun == Days.Tue:
#     print("both are equel")
# if Days.Mon != Days.Sun:
#     print("both are not same")

# class Colors(Enum):
#     RED = auto()
#     GREEEN = auto()
#     blue = auto()

#     def __str__(self):
#         return f'{self.name.lower()}({self.value})'

#     def __eq__(self, other):
#         if isinstance(other, int):
#             return self.value == other

#         if isinstance(other, Colors):
#             return self is other

#         return False

# class colorprority(Enum):
#     RED,GREEN,blue =range(3)

# def main():
#     day1 = Days.Sun
#     print(day1)
#     # Days.Sun = 100
#     print(day1 == Days.Sun)
#     print(day1 is Days.Sun)

#     print(Colors.GREEEN.value)
#     # day1.value=100
#     # print(day1)

# if  __name__ == "__main__":
#     main()

# #bool methods
# for member in Colors:
#     print(member, bool(member))


# print(Colors.GREEEN)

# # compare method
# colors_pority = 1
# if colors_pority < Colors.GREEEN.value:
#     print('The green poirty is small')

# class MilkShake():
#     def __init__(self,name:str,id:int):
#         self.name = name
#         self.id = id

# class Shake(Enum):
#     VANILLA= MilkShake("vanilla",1)
#     COCOA =MilkShake("cocoa",2)
#     BADAMPASTA = MilkShake("badampasta",3)

#     def get_object_by_name(name:str):
#         print(Shake(name))
# print(Shake.get_object_by_name("vanilla"))
class vendor_detail(BaseModel):
    vendor_name: str
    total: int


class vendor(BaseModel):
    month: str
    year: int
    vendor_data:list[vendor_detail]


data = {
    "aggregations": {
        "sales": {
            "buckets": [
                {
                    "key_as_string": "2015-01-01",
                    "key": 1420070400000,
                    "doc_count": 300,
                    "vendoor_name": {
                        "buckets": [
                            {
                                "vendoor": "eits",
                                "doc_count": 200
                            },
                            {
                                "vendoor": "pos",
                                "doc_count": 100
                            }
                        ]
                    }
                },
                {
                    "key_as_string": "2015-02-01",
                    "key": 1422748800000,
                    "doc_count": 400,
                    "vendoor_name": {
                        "buckets": [
                            {
                                "vendoor": "eits",
                                "doc_count": 200
                            }
                        ]
                    }
                },
                {
                    "key_as_string": "2015-03-01",
                    "key": 1425168000000,
                    "doc_count": 0,
                    "vendoor_name": {
                        "buckets": []
                    }
                }
            ]
        }
    }
}


def erp() -> vendor:
    proper = []
    
    for doc in data["aggregations"]["sales"]["buckets"]:
        doc1 = doc
        diffrent = vendor(month=doc1['key_as_string'], year=doc1['doc_count'],vendor_data=vendors)
        vendors = []
        for er in doc1['vendoor_name']['buckets']:
                  v = vendor_detail(vendor_name=er['vendoor'],total=er['doc_count'])
                  vendors.append(v)
        proper.append(diffrent)
    print(proper)


erp()


class User(BaseModel):
    name: str
    age: int


class Users(BaseModel):
    users: list[User]


user = {"name": "user1", "age": 15}, {"name": "user2", "age": 28}
# m = Users(users=users)
u = Users
u.users = user
print(u)


class Car:

    # create class attributes
    name = "c200"
    make = "mercedez"
    model = 2008


c = Car
print(c)
