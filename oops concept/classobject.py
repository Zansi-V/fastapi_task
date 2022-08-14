# class - template
from datetime import date


class Chhutti:
    
    def permission(self,name,date,reason):
        """save time,do not repeat code """
        print("Dear Sir,my name  is  "+name+" I need holiday for date:" + date +" because I am " + reason )

# object -instance of the class
obj_stud = Chhutti()
obj_stud.age = 20
print(obj_stud.age)
obj_stud.permission("zansi","2022-08-8","ill")
print(obj_stud.permission.__doc__)


class Employee():
    working_hours = 8



isha = Employee()
isha.name = "dipika"
isha.age = 20
isha.salary = 10000
lezza = Employee()
lezza.name = "lezza"
lezza.working_hours = 9

print(isha.name)
print(isha.working_hours)
print(lezza.name)
Employee.working_hours = 6
print(Employee.working_hours)
print(lezza.working_hours)

# class method



