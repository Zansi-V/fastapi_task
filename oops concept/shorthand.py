from ctypes.wintypes import VARIANT_BOOL


a = int(input("enter the a"))
b = int(input("enter the b"))

if a > b: print("a is greater than b")

print("b is grater than a") if b > a else print("a is grater than b")


# function and __doc__ string
c = sum((a,b))
print(c)

def func1(c,d):
    print("hello you are in function",c+d)

def func2(e,f):
    """ this is function which will calculate average of two string  """
    average =(a+b)/2
    print(average)
    """ this function work for two number"""
    return average
 
func1(2,7)
v = func2(5,6)
print(v)
print(func2.__dir__)

