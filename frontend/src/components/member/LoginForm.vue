<template>
<div>
 <Nav></Nav>
 <form>
   <div class="form-group">
     <label for="email">Email:</label>
     <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email">
   </div>
   <div class="form-group">
     <label for="pwd">Password:</label>
     <input type="password" class="form-control" id="pwd" placeholder="Enter password" v-model="pwd">
   </div>
   <div class="checkbox">
     <label><input type="checkbox"> Remember me</label>
   </div>
   <button @click="loginChk" class="btn btn-default">Submit</button>
 </form>
 <Footer></Footer>
</div>
</template>

<script>
import Nav from '@/components/common/Nav.vue'
import Footer from'@/components/common/Footer.vue'
import axios from "axios"
export default {
 data(){
   loginYN: '';
 },
 components: {
   Nav,
   Footer
 },
 methods: {
   loginChk(e){
     e.preventDefault();
      axios.get('/customers'+'/count',{
        params: {
          test: 12345
       }
     }).then(d=>{
       alert('SUCESS')
       alert(d)
     }).catch(e=>{
       alert(e)
     })



// alert('로그인 시도 '+ this.email + this.pwd);
     // if(this.email === ''){
     //   alert('이메일을 입력하세요');
     //   this.$router.push({path:'/loginform'});
     // }else if(this.pwd === ''){
     //   alert('비밀번호를 입력하세요');
     //   this.$router.push({path:'/loginform'});
     // }
     // axios.get('/customers/count')
     //   .then(d=>{
     //     alert(`로그인 성공 count: ${d.data}`);
     //     this.loginYN = 'SUCCESS';
     //   })
     //   .catch(e=>{
     //     alert('ERROR');
     //   })
     // if(this.loginYN==='SUCCESS'){
     //   this.$router.push({path:'/'});
     // }else{
     //   alert('로그인 실패');
     // }
   }
 }
}
</script>

<style scoped>
</style>