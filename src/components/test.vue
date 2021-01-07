<template>
  <div>     
    
    <input      
      v-model="input1" 
      placeholder="請輸入日期 (yyyy-mm-dd)"
    >
    <button @click="getData(input1)">確定</button>
        
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
export default {
  data() {
    return {      
      dataJson: [],
      input1: '',
            
    };
  },  
  
  mounted() {    
    // fetch('../../static/師大學七用水紀錄/2020/11月/daily_data_for_each_room/2020-11-01的用水記錄(calibrated).json')
    //  .then(res => res.json())
    //  .then(contents => this.dataJson = contents)
  },

  methods: {
    getData(date){
      var date1 = '../../static/師大學七用水紀錄/2020/11月/daily_data_for_each_room/' + 
        String(date)+
        '的用水記錄(calibrated).json'
      fetch(date1)
      .then(res => res.json())
      .then(contents => this.dataJson = contents)      
    }

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
    width: 30%;
    background-color: #201f25;  
    text-align: center;
    padding: 10px 0;
  }

  td {
    position: relative;
    width: 30%;
    background-color: #201f25;  
    text-align: center;
    padding: 10px 0;
  }

  input {    
    width: 10%;
    margin: 10px 0px 10px 3px; /* top right bottom left */
    padding: 2px;
    border: 2px solid rgb(45, 121, 235);
  
  }

  button {    
    background-color: rgb(78, 77, 77);
    margin: 0px 0px 10px; /* top left-right bottom */
  }

  
</style>