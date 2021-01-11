var XLSX = require('XLSX')

// input files
var input_file = '2020-12-04的用水記錄(管理者專用).xls'

// Cell_cnt 
function Cell_cnt(cnt){
  cnt = {v: String(cnt), 
         s: {alignment: {horizontal: 'center'}}
        }
  return cnt
}

// func
function calibratingRecord(input_file){
  var input_file1 = XLSX.readFile('raw_data/'+input_file)
  var input_sheet = input_file1.Sheets[input_file1.SheetNames[0]]  
  
  // create a new workbook #################################
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
      
      // 寫入水表記錄
      var b1 = 0
      for (var k=1; k<48; k++){
        if(Number(input_sheet[XLSX.utils.encode_cell({r: (k+3)+48*(a1+i-1), c: 3})].v) > Number(input_sheet[XLSX.utils.encode_cell({r: (k+2)+48*(a1+i-1), c: 3})].v) &&
            Number(input_sheet[XLSX.utils.encode_cell({r: (k+3)+48*(a1+i-1), c: 3})].v) - Number(input_sheet[XLSX.utils.encode_cell({r: (k+2)+48*(a1+i-1), c: 3})].v) < 1)
          b1 += Number(input_sheet[XLSX.utils.encode_cell({r: (k+3)+48*(a1+i-1), c: 3})].v) - Number(input_sheet[XLSX.utils.encode_cell({r: (k+2)+48*(a1+i-1), c: 3})].v)        
        else
          b1 = b1      
      }          
      worksheet[XLSX.utils.encode_cell({r: a1+i-1, c: 1})] = Cell_cnt(b1)
      // worksheet[XLSX.utils.encode_cell({r: a1+i-1, c: 1})] = 
      //   Cell_cnt(Number(input_sheet[XLSX.utils.encode_cell({r: 50+48*(a1+i-1), c: 3})].v) -
      //   Number(input_sheet[XLSX.utils.encode_cell({r: 3+48*(a1+i-1), c: 3})].v))
      
      


      // 跳警報
      if(Number(input_sheet[XLSX.utils.encode_cell({r: 50+48*(a1+i-1), c: 3})].v) ==
        Number(input_sheet[XLSX.utils.encode_cell({r: 3+48*(a1+i-1), c: 3})].v)){
        console.log(String(j)+'樓'+String(i)+'號水表不動!!')
      }
      if(Number(input_sheet[XLSX.utils.encode_cell({r: 50+48*(a1+i-1), c: 3})].v) <
        Number(input_sheet[XLSX.utils.encode_cell({r: 3+48*(a1+i-1), c: 3})].v)){
        console.log(String(j)+'樓'+String(i)+'用水記錄為負!!')
      }

    }
  }

  










  // output file
  output_file.SheetNames.push('record')
  output_file.Sheets.record = worksheet
  XLSX.writeFile(output_file, 'daily_data_for_each_room/' + input_file.substring(0, input_file.lastIndexOf('(')) + '(calibrated).xlsx')
}

// excute func
calibratingRecord(input_file)