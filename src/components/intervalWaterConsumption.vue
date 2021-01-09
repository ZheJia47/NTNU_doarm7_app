<template>
  <div>     
    <!-- 開始日期 -->
    <span>開始日期:</span>
    <input      
      v-model="input1" 
      placeholder="請輸入日期 (yyyy-mm-dd)"
      @keyup.enter="nextPlease"
    >
    <!-- 結束日期 -->
    <span>～ 結束日期:</span>
    <input      
      id="input2"
      v-model="input2" 
      placeholder="請輸入日期 (yyyy-mm-dd)"
      @keyup.enter="getEachDayData(input1)"
    >
    <button @click="getEachDayData(input1)">確定</button>






    <!-- todo: 清除 -->
    <!-- <button @click="input1=''">清除</button> -->
        
    <!-- table -->
    <table>
      <thead>
        <tr class='thColor'>
          <th>寢號</th>
          <th>用水度數</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in dataJson.data" :key="i">          
          <th>{{dataJson.data[i].id}}</th>
          <td>{{dataJson.data[i].value}}</td>
        </tr>
      </tbody>
    </table>


  </div>
</template>

<!-- script ##################################### -->
<script>
function fileName(date){
  // year
  var year = String(date).slice(0,4)
  // month
  var month = String(date).slice(5,7)
  var month_p = String(Number(month)) // for month path name
  // day
  var day = String(date).slice(8,10)
  // path of file
  var date1 = '../../static/師大學七用水紀錄/' +
    year + '/' + 
    month_p + '月/daily_data_for_each_room/' + 
    year+'-'+month+'-'+day+ 
    '的用水記錄(calibrated).json'

  return date1
}

export default {
  data() {
    return {      
      dataJson: [],
      dataJson2: [],
      input1: '', // 輸入開始日期
      input2: '', // 輸入結束日期
            
    };
  },     

  methods: {    
    getEachDayData(date){     
      var year1 = Number(String(date1).slice(0,4))
      var month1 = Number(String(date1).slice(5,7))
      var day1 = Number(String(date1).slice(8,10))
      


      var date1 = fileName(date)

      fetch(date1)
      .then(res => res.json())      
      .then(contents => this.dataJson = contents)      
    },
    
    getIntervalData(date1, date2){
      // 查詢開始日期 #################################
      var year1 = Number(String(date1).slice(0,4))
      var month1 = Number(String(date1).slice(5,7))
      var day1 = Number(String(date1).slice(8,10))
      // file name
      var file1 = fileName(date1)
      // get file
      fetch(file1)
      .then(res => res.json())      
      .then(contents => this.dataJson = contents)    
      
      // 查詢結束日期 #################################
      var year2 = Number(String(date2).slice(0,4))
      var month2 = Number(String(date2).slice(5,7))
      var day2 = Number(String(date2).slice(8,10))

      // 資料加總 #################################
      // todo: 同月份資料
      // todo: 同一年資料
      // todo: 不同年資料
      
      // for(var i=day1+1; i<=day2; i++){
      //   var file2 = fileName(date1)

      // }







      
      


    },

    nextPlease: function (event) {
        document.getElementById('input2').focus();
    },

  }
  
}
</script>

<!-- style ##################################### -->
<style scoped>
  .thColor {color: rgb(24, 141, 219)}
  table {
    width: 30%;      
  }

  th {
    position: relative;
    width: 20%;
    background-color: #201f25;  
    text-align: center;
    padding: 10px 0;
  }

  td {
    position: relative;
    width: 25%;
    background-color: #201f25;  
    text-align: center;
    padding: 10px 0;
  }

  input {    
    width: 155px;
    margin: 10px 0px 10px -2px; /* top right bottom left */
    padding: 2px;
    border: 2px solid rgb(45, 121, 235);
  
  }

  button {    
    background-color: rgb(78, 77, 77);
    margin: 0px 0px 10px; /* top left-right bottom */
  }

  
</style>