import pandas as pd
import os
from os.path import isfile

def Daily_rec_to_each_room_rec(year, month):
    input_path = str(year)+'/'+str(month)+'月/每日用水紀錄'
    output_path = str(year)+'/'+str(month)+'月/每層用水紀錄'

    # input file ##################################################    
    input_file = [None]
    for iday in range(1,10):
        if isfile(input_path+'/2020-09-0'+str(iday)+'的用水記錄(管理者專用).xls'):            
            input_file += [pd.read_excel(os.path.join(input_path, '/2020-09-0'+str(iday)+'的用水記錄(管理者專用).xls'))]
    # for iday in range(10,32):
    #     if isfile(input_path+'/2020-09-'+str(iday)+'的用水記錄(管理者專用).xls'):
    #         input_file += [pd.read_excel(input_path+'/2020-09-'+str(iday)+'的用水記錄(管理者專用).xls')]   

    # output file ##################################################    
        







# excute func. ##################################################
Daily_rec_to_each_room_rec(2020, 9)