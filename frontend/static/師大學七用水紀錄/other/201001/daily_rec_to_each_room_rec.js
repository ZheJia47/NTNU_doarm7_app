var XLSX = require('XLSX')
var path = require('path')
var fs = require('fs')


function Cell_cnt(cnt){
  cnt = {v: String(cnt)}
  return cnt
}

function FormatDate(numb) {
  if (numb != undefined) {
      let time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      let year = time.getFullYear() + ''
      let month = time.getMonth() + 1 + ''
      let date = time.getDate() + ''
      let hr = time.getHours() + ''
      let minute = time.getMinutes() + ''        
      
      if(Number(hr)-8 >= 0)
        return year+'/'+ month+'/'+ String(Number(date)-1)+' '+String(Number(hr)-8)+':'+minute 
      else
        return year+'/'+ month+'/'+ String(Number(date)-2)+' '+String(Number(hr)+16)+':'+minute 
      // return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
  }
}

function Daily_rec_to_each_room_rec(year, month){
  input_path = String(year)+'/'+String(month)+'月/每日用水紀錄'
  output_path = String(year)+'/'+String(month)+'月/每層用水紀錄'

  //  input file ###########################################################
  var input_file = [undefined]
  var input_sheet = [undefined]    
  for(var iday=1; iday<=9; iday++){
    if(fs.existsSync(path.join(input_path,'2020-09-0'+String(iday)+'的用水記錄(管理者專用).xls'))){
      input_file.push(XLSX.readFile(path.join(input_path,'2020-09-0'+String(iday)+'的用水記錄(管理者專用).xls')))
      input_sheet.push(input_file[iday].Sheets[input_file[iday].SheetNames[0]])
    }
    else{
      input_file.push(undefined)
      input_sheet.push(undefined)
    }
  }
  for(var iday=10; iday<=31; iday++){
    if(fs.existsSync(path.join(input_path,'2020-09-'+String(iday)+'的用水記錄(管理者專用).xls'))){
      input_file.push(XLSX.readFile(path.join(input_path,'2020-09-'+String(iday)+'的用水記錄(管理者專用).xls')))
      input_sheet.push(input_file[iday].Sheets[input_file[iday].SheetNames[0]])
    }
    else{
      input_file.push(undefined)
      input_sheet.push(undefined)
    }
  }
  
  // output ############################################################
  // each floor a file
  // each room a sheet

  // create a new workbook 
  var output_file = XLSX.utils.book_new();
  var output_sheet = {};   

  // worksheet range
  var range = {s:{r: 0, c: 0},
               e: {r: 1550, c: 2}}
               
  output_sheet['!ref'] = XLSX.utils.encode_range(range)    
  // FormatDate
  // write content
  // datetime | vale
  // for(var iday=1; iday<=31; iday++){ // scan date
  //   if(input_sheet[iday]!= undefined) 
  var iday=2
      for(var itime=0; itime<50; itime++){ // scan time interval
        if(input_sheet[iday][XLSX.utils.encode_cell({r: itime+3, c: 1})].v === 70201){          
          output_sheet[XLSX.utils.encode_cell({r: itime+1, c: 2*iday-2})] 
          = Cell_cnt(FormatDate(input_sheet[iday][XLSX.utils.encode_cell({r: itime+3, c: 2})].v))       
          output_sheet[XLSX.utils.encode_cell({r: itime+1, c: 2*iday-1})] 
          = Cell_cnt(input_sheet[iday][XLSX.utils.encode_cell({r: itime+3, c: 3})].v)
        }             
      }
  // }







  // save file
  output_file.SheetNames.push('push')
  output_file.Sheets.push = output_sheet
  XLSX.writeFile(output_file, 'test.xlsx')

  console.log(input_sheet[iday][XLSX.utils.encode_cell({r: 0+3, c: 3})].v)
}

// excute func. ###########################################################
Daily_rec_to_each_room_rec(2020,9)
