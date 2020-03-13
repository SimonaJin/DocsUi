<template>
  <div>
      <button @click="isShow=true">点击</button>
      <div class="mask" v-show="isShow"></div>
      <div class="dialogform"  v-show="isShow">
          <h3>编辑参数</h3>
          <p>常用参数常用参数常用参数常用参数常用参数常用参数常用参数常用参数</p>
          <input type="text" placeholder="输入">
          <input type="text" placeholder="输入">
           <button @click="isShow=false">取消</button>
           <button @click="handleClick">生成</button>
      </div>
  </div>
</template>
<script>

export default{
    name: 'test',
    data(){
        return {
            msg:"test 234",
            isShow: false,
        }
    },
    methods:{
        handleClick(){
            alert("生成")
            this.isShow = false
            // let url="http://localhost:8080/#/successPage"
            // window.location.href = url
        }
    }
}
</script>
<style>
button{
    width: 48%;
    height: 30px;
    font-size: 16px;
    background-color: brown;
    color: #fff;
}
input{
    height: 32px;
    padding: 2px;
    width: 100%;
}
.mask{
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
}
.dialogform{
    width: 70%;
    position: absolute;
    background: #fff;
    left: 15%;
    top: 45%;
    z-index: 50;
    padding: 10px;
}
</style>