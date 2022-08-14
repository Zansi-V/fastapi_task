from enum import Enum, IntEnum


def add(x, y=1):
    return x + y


print(add(1, 2))
print(add(1))


class India:
    def capital(self):
        print("new delhi")


class USA(India):
    def capitl(self):
        print("ty")


obj_india = India()
obj_usa = USA()
print(obj_usa.capital())
for country in (obj_india, obj_usa):
    country.capital()

# multiple inheritance


class Father:
    fathername = ''

    def father(self):
        print(self.fathername)


class Mother:
    mothername = ''

    def mother(self):
        print(self.mothername)


class Son(Father, Mother):
    def parents(self):
        print(self.mothername, self.fathername)


obj_son = Son()
obj_son.mothername = "z"
obj_son.fathername = "k"
obj_son.parents()

# multilevel inheritance


class Grandfather:
    def __init__(self, grandfather):
        self.grandfather = grandfather


class Father(Grandfather):
    def __init__(self, father, grandfather):
        self._father = father
        Grandfather.__init__(self, grandfather)

    def _father():
        return "hi, i am your father"


class Son1(Father):
    def __init__(self, son, father, grandfather):
        self.son = son
        Father.__init__(self, father, grandfather)

    def print_name(self):
        print(self.grandfather)
        print(self._father)
        print(self.son)
        print(Father._father())


obj = Son1("zansi", "sureshbhai", "harjibhai")
print(obj.grandfather)
obj.print_name()

# 4. Hierarchical Inheritance
# ->  more than one direved class and one parent class.


class Prents():
    def parents(self):
        print("this is parent class")


class Child1(Prents):
    def child1(self):
        print("this is child1 class")


class Child2(Prents):
    def child2(self):
        print("this is child2 class")


obj_hirar = Child1()
obj_hirar2 = Child2()
obj_hirar.parents()
obj_hirar.child1()
obj_hirar2.parents()
obj_hirar.child1()

# hybrid inheritance
# ->  more than one type inheritance is called hybrid inheritance


class School:
    def func1(self):
        print("this is school class")


class Student1(School):
    def student1(self):
        print("this student1")


class Student2(School):
    def student2(self):
        print("this is student2")


class Student3(Student2, School):
    def student3(self):
        print("this student3")


obj_school = Student3()
obj_school.student3()
obj_school.func1()
obj_school.student2()

# public data member are accessible within and outside the class.all member variables of the classare by default public.


# Encapsulation:
# it is like capsule
# include inheritance,abstraction,polymorphism
# concept of budling data and method in unit.
# ex = class

# public member :accessible anywher from the outside class.
# private member : accesible within th class
# protected member :accesible class and sub-class

class Employee:
    def __init__(self, name, salary, project):
        # data hiding using access moodifiers
        self.name = name  # public member
        self.__salary = salary  # private member
        self._project = project  # protected member

    def __show(self):
        print("name:", self.name, "salary:",
              self.__salary, "project:", self._project)


obj_emp = Employee("zansi", 20000, "pharmaforceiq")
# accessing data member outside of the class  and name mangling for private member and function
print("name:", obj_emp.name, "salary:", obj_emp._Employee__salary)
obj_emp._Employee__show()

# Getter And Setter in python


class Employee1:
    def __init__(self, name, age):
        self.name = name
        self.__age = age

    # get method
    def get_data(self):
        return self.name, self.__age

    def set_data(self, age):
        self.__age = age


employee = Employee1("jessa", 22)
print(employee.get_data())
employee.set_data(23)
print(employee.get_data())
# uvicorn python_fastapi.index:app --reload --host 0.0.0.0


num = [[1, 2], [4, 5]]
for i in range(len(num)):
    for j in range(len(num[i])):
        num[i][j] -= 2
    print(num)
 


class erp(IntEnum):
    a = 7
    b = 6
    h = 9


print(c.name for c in sorted(erp))
