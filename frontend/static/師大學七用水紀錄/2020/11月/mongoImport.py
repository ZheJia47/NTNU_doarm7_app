import pymongo
import pandas as pd

# connect mongodb ###########################
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['data']
mycol = mydb['waterComsumption']

# input xlsx file ###########################
for iday in range(1,3):
    if iday<10: 
        data_path = 'daily_data_for_each_room/2020-11-0'+str(iday)+'的用水記錄(calibrated).xlsx'
    else: 
        data_path = 'daily_data_for_each_room/2020-11-'+str(iday)+'的用水記錄(calibrated).xlsx'

    df = pd.read_excel(data_path, header=None)

    # write document to mongodb ###########################
    date1 = data_path[25:35]
    print('read ' + date1 + ' data')

    for i in range(250):
        dic = {'room':int(df.iloc[i,0]), 'value':float(df.iloc[i,1]), 'date':date1}
        # 檢查這房號這天的資料是否已存在
        if len(list( mycol.find({'room':int(df.iloc[i,0]), 'date':date1}) )) > 0:
            pass
        else:
            mycol.insert_one(dic)
            print(str(df.iloc[i,0]) + ', ' + date1 + ' inserted')
    
	
	
