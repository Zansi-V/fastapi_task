import colorsys
from enum import Enum,auto
import enum
class Days(Enum):
    Sun = 1
    Mon = 2
    Tue = 1
    Wed = 4
    Thu = 5


#enum member name
print(type(Days))
print(Days.Mon.value)

#print all enum member
for weekday in Days:
    print(weekday)

#hashing enums
Datatype = {}
Datatype[Days.Sun] = 'Sun God'
Datatype[Days.Mon] = 'Moon God'

print(Datatype == {Days.Sun:'Sun God',Days.Mon:'Moon God'})

# enum member accessed by name and value
print(Days['Mon'])
print(Days(2))

if Days.Sun == Days.Tue:
    print("both are equel")
if Days.Mon != Days.Sun:
    print("both are not same")

class Colors(Enum):
    RED = auto()
    GREEEN = auto()
    blue = auto()

    def __str__(self):
        return f'{self.name.lower()}({self.value})'

    def __eq__(self, other):
        if isinstance(other, int):
            return self.value == other

        if isinstance(other, Colors):
            return self is other

        return False

class colorprority(Enum):
    RED,GREEN,blue =range(3)

def main():
    day1 = Days.Sun
    print(day1)
    # Days.Sun = 100
    print(day1 == Days.Sun)
    print(day1 is Days.Sun)

    print(Colors.GREEEN.value)
    # day1.value=100
    # print(day1)

if  __name__ == "__main__":
    main()

#bool methods
for member in Colors:
    print(member, bool(member))


print(Colors.GREEEN)

# compare method
colors_pority = 1
if colors_pority < Colors.GREEEN:
    print('The green poirty is small')


