// use
var app =  {
    $wrapper : $wrapper = document.querySelector('#wrapper'),
    init : init
 };
 var customer = {
     login_form : login_form,
     join_form : join_form,
     join : join,
     count : count,
     login : login,
     mypage : mypage,
     mypage_form : mypage_form,
     remove : remove,
     update : update,
     update_form : update_form
 };
 var employee = {
     login : login,
     admin_login : admin_login,
     customer_list : customer_list,
     customer_list_form : customer_list_form
 };
 var session = {
     set_value  : set_value,
     get_value  : get_value
 };
 function customer_list_form(){
 return '<h2>고객 목록</h2>'
 +'<table>'
 +' <tr>'
 +'   <th>아이디</th>'
 +'   <th>고객명</th>'
 +'   <th>주민번호</th>'
 +'   <th>전화번호</th>'
 +'   <th>도시</th>'
 +' </tr><tbody id ="tbody"></tbody>' 
 +'</table>'
 }
 function set_value(x){
     sessionStorage.setItem(x.name,x.value);
 }
 function get_value(x) {
     return sessionStorage.getItem(x);
 }
 function init(){
     $wrapper.innerHTML = customer.login_form();
     document.querySelector('#join-btn')
             .addEventListener('click',()=>{
                 $wrapper.innerHTML = customer.join_form();
                 document.getElementById('confirm-btn')
                         .addEventListener('click', e=>{
                             e.preventDefault();
                             customer.join();
             });
     });
     document.querySelector('#login-btn')
             .addEventListener('click',e=>{
             e.preventDefault();
             customer.login(
                 {
                     userid : 'customerId',
                     domain : 'customers'
                 }
             );
     });
     document.querySelector('#admin-btn')
             .addEventListener('click',e=>{
             e.preventDefault();
             alert('관리자 버튼 클릭');
             employee.admin_login();
     });
 }
 function admin_login(){
     let isAdmin = confirm("관리자입니까?");
     if(isAdmin){
         let pass = prompt("관리자 번호를 입력하세요");
         if(pass == 1000){
             employee.customer_list("1");
         }else{
             alert('입력한 번호가 일치하지 않습니다.');    
         }
     }else{
         alert('관리자만 접속이 가능합니다.');
     }
 }
 function create_customer_row(x) {
     return  "<tr><td>"+x.customerId+"</td><td>"+x.customerName+"</td>"
                 +"<td>"+x.ssn+"</td><td>"+x.phone+"</td><td>"+x.city+"</td></tr>"; 
 }
 function customer_list(x){
     let xhr = new XMLHttpRequest();
      // pageNum, pageSize, blockSize
     xhr.open('GET', 'customers/page/'+x, true);
     xhr.onload=()=>{
         if(xhr.readyState=== 4 && xhr.status === 200){
             let d = JSON.parse(xhr.responseText);
             let wrapper = document.querySelector('#wrapper');
             wrapper.innerHTML = employee.customer_list_form();
             let tbody = document.getElementById('tbody');
             let i = 0;
             d.forEach((v, i)=>{
                 tbody.innerHTML+=create_customer_row(v);
             });
             let blocks = document.createElement('div');
             blocks.setAttribute('id', 'blocks');
             wrapper.appendChild(blocks);
             let spans = '';
             i = 1;
             for(;i<6;i++){
                 let span = document.createElement('span');
                 span.setAttribute('style',
                 'display:inline-block;padding-right:20px;'
                 +'border: 1px solid black;cursor:pointer')
                 span.innerHTML = i;
                 span.addEventListener('click', e=>{
                     e.preventDefault();
                     employee.customer_list(i);
                 });
                 blocks.appendChild(span)        
             }
             if(d.existPrev){
                 let prevBlock = document.createElement('span');
                 span.setAttribute('style',
                 'display:inline-block;padding-right:20px;'
                 +'border: 1px solid black;cursor:pointer');
                 blocks.prependChild(prevBlock)    
             }
             if(d.existNext){
                 let nextBlock = document.createElement('span');
                 span.setAttribute('style',
                 'display:inline-block;padding-right:20px;'
                 +'border: 1px solid black;cursor:pointer');
                 blocks.appendChild(nextBlock)    
             }
         }
     };
     xhr.send();
 }
 
 function login(x){
   
     id = document.getElementById(x.userid).value;
     pass = document.getElementById('password').value;
     alert(id)
     alert(pass)
     let xhr = new XMLHttpRequest();
     xhr.open('GET', x.domain+'/'+id+'/'+pass, true);
     
     
     xhr.onload=()=>{
         if(xhr.readyState=== 4 && xhr.status === 200){
              let d = JSON.parse(xhr.responseText);
 
             alert('세션에 들어간 이름: '+d.customerId)
             session.set_value({'name':'userid','value':d.customerId});
             session.set_value({'name':'username','value':d.customerName});
             if(d){
                 if(x.domain==='customers'){
                     customer.mypage(d);
                 }else{
                     employee.customer_list();
                 }
             }else{
                 app.init();
             }
             
         }
     };
     xhr.send();
 }
    function login_form(){
     return '<form action="/action_page.php">'
     +'  ID:<br>'
     +'  <input type="text" id="customerId" name="customerId">'
     +'  <br>'
     +'  Password:<br>'
     +'  <input type="text" id="password" name="password">'
     +'  <br><br>'
     +'  <input id="login-btn" type="button" value="LOGIN">'
     +'  <input id="join-btn" type="button" value="JOIN">'
     +'  <input id="admin-btn" type="button" value="관리자">'
     +'</form> ';
  };
  
  function join(){
     let xhr = new XMLHttpRequest()
     let data = {
         customerId : document.getElementById("customerId").value,
         customerName : document.getElementById("customerName").value,
         password : document.getElementById("password").value,
         ssn : document.getElementById("ssn").value,
         phone : document.getElementById("phone").value,
         city : document.getElementById("city").value,
         address : document.getElementById("address").value,
         postalcode : document.getElementById("postalcode").value
     };
     xhr.open('POST','customers',true);
     xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
     xhr.onload=()=>{
         if(xhr.readyState === 4 && xhr.status === 200){
             let d = JSON.parse(xhr.responseText);
             if(d.result === 'SUCCESS'){
                  alert('회원가입 성공' + d.result);
                  $wrapper.innerHTML = customer.login_form();
             }else{
                  alert('회원가입 실패');
             }
              
         }
          else{
              alert('ajax 실패');
          }
     }
  //    
     xhr.send(JSON.stringify(data));
 }
 
 
 
  function join_form(){
     return '<form>'
     +'I D<br>'
     +'    <input type="text" id="customerId" name="customerId"><br>'
     +'P W<br>'
     +'    <input type="password" id="password" name="password"><br>'
     +'Name<br>'
     +'    <input type="text"  id="customerName" name="customerName"><br>'
     +'ssn<br>'
     +'    <input type="text"  id="ssn" name="ssn"><br>'
     +'phone<br>'
     +'    <input type="text"  id="phone" name="phone"><br>'
     +'city<br>'
     +'    <input type="text"  id="city" name="city"><br>'
     +'address<br>'
     +'    <input type="text"  id="address" name="address"><br>'
     +'postalcode<br>'
     +'    <input type="text"  id="postalcode" name="postalcode"><br>'
     +'    <input id="confirm-btn" type="submit" value="확인">'
     +'    <input id="cancel-btn" type="reset" value="취소">'
     +'</form>';
  };
 
 
    function count(){
        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'customers/count', true);
        xhr.onload=()=>{
            if(xhr.readyState===4 && xhr.status === 200){
                alert('성공');
                let wrapper = document.querySelector('#wrapper');
                wrapper.innerHTML = '총 고객수 : <h1>'+xhr.responseText+'</h1>'
            }
        }
        xhr.send();
    }
 
 function mypage (x){
     $wrapper.innerHTML = customer.mypage_form(x);
     
     alert('마이페이지로 넘어온 객체명 :' + x.customerName)
     document.querySelector('#update-btn')
     .addEventListener('click',e=>{
         alert('세션 테스트' + session.get_value('user'));
     // customer.update(x);
     e.preventDefault();
 
     
     })
     document.querySelector('#remove-btn')
     .addEventListener('click',e=>{
      $wrapper.innerHTML = customer.remove(x);
      e.preventDefault();
     })   
     
 
 };
 function mypage_form(x){
     let custom = x;
     return '<spen>' + custom.customerName + '마이페이지' + '<br />'
     +'<spen> ID : ' + custom.customerId + '</spen><br/>'
     +'<spen> PW : ' + custom.password + '</spen><br/>'
     +'<spen> Name : ' + custom.customerName + '</spen><br/>'
     +'<spen> ssn : ' + custom.ssn +'</spen><br/>'
     +'<spen> phone : ' + custom.phone + '</spen><br/>'
     +'<spen> city : ' + custom.city + '</spen><br/>'
     +'<spen> address : ' + custom.address + '</spen><br/>'
     +'<spen> postalcode : ' + custom.postalcode + '</spen><br/>'
     +'<input id="update-btn" type="button" value="수  정">'
     +'<input id="remove-btn" type="button" value="탈  퇴">'
 }
 function update_form(x){
     let update = x;
     let template = '<form>'
     +'<spen> ID : ' + update.customerId + '</spen><br/>'
     +'P W<br>'
     +'    <input type="password" id="password" name="password" value="'+update.password+'"><br>'
     +'Name<br>'
     +'    <input type="text"  id="customerName" name="customerName" value="'+update.customerName+'"><br>'
     +'<spen> ssn : ' + update.ssn +'</spen><br/>'
     +'phone<br>'
     +'    <input type="text"  id="phone" name="phone" value="'+update.phone+'"><br>'
     +'city<br>'
     +'    <input type="text"  id="city" name="city" value="'+update.city+'"><br>'
     +'address<br>'
     +'    <input type="text"  id="address" name="address" value="'+update.address+'"><br>'
     +'postalcode<br>'
     +'    <input type="text"  id="postalcode" name="postalcode" value="'+update.postalcode+'"><br>'
     +'    <input id="complete-btn" type="button" value="완료" >'
     +'    <input id="cancel-btn" type="reset" value="취소">'
     +'</form>'
     return template;
  };
 function update(x){
     let wrapper = document.querySelector('#wrapper');
     wrapper.innerHTML = customer.update_form(x);
    
     alert(x.customerId);
     
     document.querySelector('#complete-btn')
             .addEventListener('click',e=>{
             e.preventDefault();
             let update_data ={
                 customerId : x.customerId,
                 customerName : document.getElementById("customerName").value,
                 password : document.getElementById("password").value,
                 ssn : x.ssn,
                 phone : document.getElementById("phone").value,
                 city : document.getElementById("city").value,
                 address : document.getElementById("address").value,
                 postalcode : document.getElementById("postalcode").value
             }
             alert(x.customerId);
             var xhr = new XMLHttpRequest();
             xhr.open('PUT', 'customers/'+x.customerId, true);
             xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
             xhr.onload=()=>{ 
                 if(xhr.readyState=== 4 && xhr.status === 200){
                     let d = JSON.parse(xhr.responseText);
                     alert('수정완료' +d.customerName)
                     alert(d);
                     if(d){
                         alert('수정완료' + d.result);
                         $wrapper.innerHTML = login_form();
                     }else{
                         alert("수정실패")
                         $wrapper.innerHTML = login_form();
                     }
                 }else{
                     alert("수정실패2")
 
                 }
             };
             xhr.send(JSON.stringify(update_data));
 
     })
     document.querySelector('#cancel-btn')
             .addEventListener('click',e=>{
             customer.mypage(x);
             e.preventDefault();
     })
         
     }
     
 function remove(x){
     let xhr = new XMLHttpRequest();
     xhr.open('delete','customers/' + x.customerId,true);
     xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
     xhr.onload=()=>{ 
         if(xhr.readyState=== 4 && xhr.status === 200){
             let d = JSON.parse(xhr.responseText);
             alert('탈퇴된 회원 이름 : ' +x.customerName)
             if(d){
                 alert('회원 탈퇴 완료')
                 app.init();
             }else{
                 alert('회원 탈퇴 실패')
                 app.init();
             }
         }
      };
         xhr.send(JSON.stringify(x));
 }
 