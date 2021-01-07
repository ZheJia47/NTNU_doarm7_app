<template>
  <div>     

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
      
    };
  },  
  
  mounted() {    
    fetch('../../static/師大學七用水紀錄/2020/11月/daily_data_for_each_room/2020-11-01的用水記錄(calibrated).json')
     .then(res => res.json())
     .then(contents => this.dataJson = contents)
  },

  methods: {
    getData(){
      return 0
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
    
</style>