var XLSX = require('XLSX')

// Cell_cnt 
function Cell_cnt(cnt){
  cnt = {v: String(cnt), 
         s: {alignment: {horizontal: 'center'}}
        }
  return cnt
}

