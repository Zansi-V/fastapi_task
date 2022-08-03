from datetime import date

from pydantic import BaseModel
from python_fastapi.elaticsearch import es
from python_fastapi.schemas import employeeinfo
from elasticsearch.helpers import scan

# def update(id:employeeinfo):
#    update = es.update(index="employee", id=id, doc={'name': 'radha'},)
#    return update
class empdeatil(BaseModel):
    name1:str
    age:int
    salary:str

class empdetail:
    def get_data(self, employeeid: str):
        return es.get(index="employee_deatils", id=employeeid)

#   def insert_record(self):

        #   return es.get(index="employee_deatils")
    def insert_data(self, employee: employeeinfo):
        data = {
            "name": employee.name,
            "age": employee.age,
            "salary": employee.salary,
            "work_start": employee.work_start,
            "work": {
                "company_name": employee.company_name,
                "city": employee.city,
                "expirence": employee.expirence,
                "start_date": employee.start_date
            }
        }
        return es.index(index="employee_deatils", body=data)

    def update_employee(self, employee_id: str, employee: employeeinfo):
        data = {
            "doc": {
                "name": employee.name,
                "age": employee.age,
                "salary": employee.salary,
                "work_start": employee.work_start,
                "work": {
                    "company_name": employee.company_name,
                    "city": employee.city,
                    "expirence": employee.expirence,
                    "start_date": employee.start_date
                }
            }
        }
        response = es.update(index='employee_deatils',
                             id=employee_id, body=data)
        return response

    def delete_data(self, employeeid: str):
        return es.delete(index="employee_deatils", id=employeeid)

    def all(self):
        return scan(
            es,
            index='employee_deatils',
            query={"query": {"match_all": {}}}
        )

    def biggerexpirence(self, expirence: int):
        #       s = Search(using = es, index = "employee_deatils").query("nested", path = "codeData", query = q)

        nestedquery = {"query": {
            "nested": {
                "path": "work",
                "query": {
                    "bool": {
                        "filter": [
                            {
                                "range": {
                                    "work.expirence": {
                                        "gte": expirence
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
        }
        result = es.search(index="employee_deatils", body=nestedquery)
        return result

    def starting_date(self, gt_date: date, le_date: date):
        startdate = {
            "query": {
                "nested": {
                    "path": "work",
                    "query": {
                        "bool": {
                            "filter": [
                                {
                                    "range": {
                                        "work.start_date": {
                                            "gte": gt_date,
                                            "lte": le_date
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
        search_start_date = es.search(index="employee_deatils", body=startdate)
        return search_start_date

    def pagination(self, page_no: int):
        pagination = {
            "query": {
                "match_all": {
                }
            },
            "size": 5,
            "from": page_no
        }
        return es.search(index="employee_deatils", body=pagination)

    def city_wise_employee(self, gt_date: date, le_date: date):
        city_wise_date = {
            "query": {
                "nested": {
                    "path": "work",
                    "query": {
                        "bool": {
                            "filter": [
                                {
                                    "range": {
                                        "work.start_date": {
                                            "gte": gt_date,
                                            "lte": le_date
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }

            },
            "aggs": {
                "work": {
                    "nested": {
                        "path": "work"
                    },
                    "aggs": {
                        "city_wise_count": {
                            "terms": {
                                "field": "work.city"
                            }
                        }
                    }
                }
            }
        }
        return es.search(index="employee_deatils",body=city_wise_date)

    def get_records_by_name(self,name:str):
        get_record = { 
            "query":{
                "match":{
                    "name":name
                }
            },
            "_source":[
                "name","age","salary"
            ]
            
        }
        # return Search.from_dict().using(es).index("employee_deatils").execute()
        record_query = es.search(index="employee_deatils", body=get_record)
        for doc in record_query["hits"]["hits"]:
            hi = doc["_source"]
            user = empdetail(**hi)
            print(user.name1)
        
            return doc["_source"]