var XLSX = require('XLSX')
var fs = require('fs')

// Cell_cnt 
function Cell_cnt(cnt){
  cnt = {v: String(cnt), 
         s: {alignment: {horizontal: 'center'}}
        }
  return cnt
}

// func for 每日各寢用水 ###################################################
function calibratingRecord(input_file){
  var input_file1 = XLSX.readFile('raw_data/'+input_file)
  var input_sheet = input_file1.Sheets[input_file1.SheetNames[0]]  
  
  // create a new workbook ###############
  var output_file = XLSX.utils.book_new();
  var worksheet = {};   

  // worksheet range
  var range = {s:{r: 0, c: 0},
               e: {r: 1.3e4, c: 3}}               
  worksheet['!ref'] = XLSX.utils.encode_range(range)     

  // content    
  var floors = [0,0,22,30,30,30,30,22,22,22,14,14,14] // 2-12F 每樓戶數
      
  var a1 = floors[0]
  for (var j=2; j<=12; j++){ // 幾樓
    a1 += floors[j-1]
    for(var i=1; i<=floors[j]; i++){ // 每樓幾戶
      // 寫入寢號
      if (j<10){
        if (i<10) worksheet[XLSX.utils.encode_cell({r: a1+i-1, c: 0})] = Cell_cnt('70'+String(j)+'0'+String(i))        
        else worksheet[XLSX.utils.encode_cell({r: a1+i-1, c: 0})] = Cell_cnt('70'+String(j)+String(i))        
      }
      else{
        if (i<10) worksheet[XLSX.utils.encode_cell({r: a1+i-1, c: 0})] = Cell_cnt('7'+String(j)+'0'+String(i))        
        else worksheet[XLSX.utils.encode_cell({r: a1+i-1, c: 0})] = Cell_cnt('7'+String(j)+String(i))     
      }
      
      // 補缺失值
      // for (var k=1; k<=48; k++){
      //   if(input_sheet[XLSX.utils.encode_cell({r: (k+2)+48*(a1+i-1), c: 3})] == undefined) {
      //     input_sheet[XLSX.utils.encode_cell({r: (k+2)+48*(a1+i-1), c: 3})] = Cell_cnt(0)
      //   }
      // }

      // 寫入水表記錄
      var b1 = 0
      for (var k=1; k<48; k++){        
        if( // 1. 確保後一筆資料大於前一筆資料 2. 用水小於 1度才記錄
          Number(input_sheet[XLSX.utils.encode_cell({r: (k+3)+48*(a1+i-1), c: 3})].v) > Number(input_sheet[XLSX.utils.encode_cell({r: (k+2)+48*(a1+i-1), c: 3})].v) &&
            Number(input_sheet[XLSX.utils.encode_cell({r: (k+3)+48*(a1+i-1), c: 3})].v) - Number(input_sheet[XLSX.utils.encode_cell({r: (k+2)+48*(a1+i-1), c: 3})].v) < 1)
          b1 += Number(input_sheet[XLSX.utils.encode_cell({r: (k+3)+48*(a1+i-1), c: 3})].v) - Number(input_sheet[XLSX.utils.encode_cell({r: (k+2)+48*(a1+i-1), c: 3})].v)        
        else
          b1 = b1      
      }          
      worksheet[XLSX.utils.encode_cell({r: a1+i-1, c: 1})] = Cell_cnt(b1)
                  
      // 跳警報 
      // if(Number(input_sheet[XLSX.utils.encode_cell({r: 50+48*(a1+i-1), c: 3})].v) ==
      //   Number(input_sheet[XLSX.utils.encode_cell({r: 3+48*(a1+i-1), c: 3})].v)){
      //   console.log(String(j)+'樓'+String(i)+'號水表不動!!')
      // }
      // if(Number(input_sheet[XLSX.utils.encode_cell({r: 50+48*(a1+i-1), c: 3})].v) <
      //   Number(input_sheet[XLSX.utils.encode_cell({r: 3+48*(a1+i-1), c: 3})].v)){
      //   console.log(String(j)+'樓'+String(i)+'用水記錄為負!!')
      // }

    }
  }

  // output calibrated xlsx file
  output_file.SheetNames.push('record')
  output_file.Sheets.record = worksheet
  XLSX.writeFile(output_file, 'daily_data_for_each_room/' + input_file.substring(0, input_file.lastIndexOf('(')) + '(calibrated).xlsx')  
}

// calibratedRecordToJson #########################################
function calibratedRecordToJson(input_file){
  // input file
  var input_file1 = XLSX.readFile('daily_data_for_each_room/'+input_file.substring(0, input_file.lastIndexOf('(')) + '(calibrated).xlsx')
  var input_sheet = input_file1.Sheets[input_file1.SheetNames[0]]  

  var jsContent = 
    `{ \n  "data": [ \n`

  // 250 rooms
  for (var i=0; i<250; i++) {
    jsContent += '    {"id": ' + 
      input_sheet[XLSX.utils.encode_cell({r: i, c: 0})].v + 
      ', "value": ' + input_sheet[XLSX.utils.encode_cell({r: i, c: 1})].v 
      
    if(i<249) jsContent += '}, \n'
    else jsContent += '}\n  ]\n}'
  }

  fs.writeFile('daily_data_for_each_room/'+input_file.substring(0, input_file.lastIndexOf('(')) + '(calibrated).json',
   jsContent, function (err) {
    if (err)
        console.log(err);
    // else
    //     console.log('Write operation complete.');
  })

}

// excute func ############################################
var input_file = '2020-11-01的用水記錄(管理者專用).xls'

for (var i=13; i<=13; i++){
  console.log('11月'+String(i)+'號')
  if (i<10) input_file = '2020-11-0'+String(i)+'的用水記錄(管理者專用).xls'
  else input_file = '2020-11-'+String(i)+'的用水記錄(管理者專用).xls'

  calibratingRecord(input_file)
  calibratedRecordToJson(input_file)
}
