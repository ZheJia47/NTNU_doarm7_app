import pandas as pd

# input files
# input_files = '2020-12-04.xlsx'
input_files = '2020-09-16至2020-09-16全部房號的用水記錄報表.xls'

# func.
def convertCRLFtoLF(filename):  
    WINDOWS_LINE_ENDING = b'\r\n'
    UNIX_LINE_ENDING = b'\n'

    with open(filename, "rb") as f:
        content = f.read()
    
    with open(filename, "wb") as f:
        # content = content.replace(WINDOWS_LINE_ENDING, UNIX_LINE_ENDING)        
        content = content.replace("b'\t\t\r\n'","")
        content = content.replace("'\t","")
        content = content.replace("","")
        content = content.replace("","")
        
        f.write(content)

def CalibratingRecord(input_files1):
    # with open(input_files1, "rb") as f:
    #     for line in f.readlines():            
    #         print (line)
    input_files1 = pd.read_excel(input_files1)
    








# excute func.
CalibratingRecord(input_files)
