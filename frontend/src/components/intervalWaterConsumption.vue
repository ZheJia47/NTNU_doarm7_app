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
      @keyup.enter="getIntervalData(input1, input2)"
    >
    
    <!-- <button @click="getEachDayData(input1)">確定</button> -->
    <button @click="getIntervalData(input1, input2)">確定</button>

    <!-- todo: 清除 -->
    <!-- <button @click="input1=''">清除</button> -->
    
    <!-- table -->
    <div v-if="ifShow">            
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

    
    

    
  </div>
</template>

<!-- script ##################################### -->
<script>
// import Vue from 'vue'

function fileName(date){  
  // year
  var year = String(date).slice(0,4)
  // month
  var month = String(date).slice(5,7)
  var month_p = String(Number(month)) // for month path name
  // day
  var day = String(date).slice(8,10)
  // path of file
  var file1 = '../../static/師大學七用水紀錄/' +
    year + '/' + 
    month_p + '月/daily_data_for_each_room/' + 
    year+'-'+month+'-'+day+ 
    '的用水記錄(calibrated).json'

  return file1
}

export default {
  data() {
    return {      
      dataJson: {data:[]},
      dataJson2: {data:[]},      
      input1: '', // 輸入開始日期
      input2: '', // 輸入結束日期      
      ifShow: false,
            
    };
  },     

  computed: {        

  },

  methods: {        
    getEachDayData(date){           
      var file1 = fileName(date)
      fetch(file1)
      .then(res => res.json())      
      .then(contents => this.dataJson = contents)      
    },
    
    getIntervalData(date1, date2){      
      this.$set(this.dataJson, 'data', [])  // 清空 dataJson            
      // 查詢開始日期 #################################
      var year1 = String(date1).slice(0,4)
      var month1 = String(date1).slice(5,7)
      var day1 = String(date1).slice(8,10)

      var year1_1 = Number(year1)
      var month1_1 = Number(month1)
      var day1_1 = Number(day1)            
      var file1 = fileName(date1)
      
      // 查詢結束日期 #################################
      var year2 = String(date2).slice(0,4)
      var month2 = String(date2).slice(5,7)
      var day2 = String(date2).slice(8,10)

      var year2_1 = Number(year2)
      var month2_1 = Number(month2)
      var day2_1 = Number(day2)      
      
      // 資料加總 #################################      
      // todo: 同一年資料
      // todo: 不同年資料
      
      var itimes=1
      if(day2_1 >= day1_1 && day2_1 < 31){ // 確保結束日期大於開始日期 & 結束日合理
        for (var iday=day1_1; iday<day2_1; iday++){        
          itimes++                      
          var day_next = iday+1
          
          if(day_next<10) day_next = '0' + String(day_next) 
          else day_next = String(day_next) 
          
          var date_next = year1 + '-' + month1 + '-' + day_next
          var file2 = fileName(date_next)            

          // get file2 #################
          fetch(file2)
          .then(res => res.json())      
          .then(contents2 => {                        
            this.$set(this.dataJson2, 'data', [])  // 清空 dataJson2
            this.dataJson2.data.splice(0, this.dataJson2.data.length)

            contents2.data.forEach(content2 => {
              this.dataJson2.data.splice(this.dataJson2.data.length, 0, content2)        
            })                 
          })

          // 第一筆資料          
          fetch(file1)
          .then(res => res.json())      
          .then(contents => {             
            
            contents.data.forEach(content => {
              this.dataJson.data.splice(this.dataJson.data.length, 0, content)        
            })        
        
            // 多日資料相加                
            // 兩個檔案資料加總
            if(itimes>1){
              console.log(this.dataJson2.data[0].value)           
              for (var i=0; i<250; i++) {              
                var v1 = this.dataJson.data[i].value + 
                  this.dataJson2.data[i].value
                
                this.$set(this.dataJson.data[i],'value',v1)              
              }
            }
            
                                                  
          })


                   
        }
      }


      this.$nextTick(() => {
        this.ifShow = true
      })      

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