import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Calculator from '@/components/basic/Calculator'
import JoinForm from '@/components/member/JoinForm'
import MemberList from '@/components/member/ListTable'
import LoginForm from '@/components/member/LoginForm'




Vue.use(Router)

export default new Router({
 mode:'history',
 routes: [

   {path: '/',name: 'home',component: Home},
   {path: '/calculator',name: 'calculator',component: Calculator},
   {path: '/join-form',name: 'joinForm',component: JoinForm},
   {path: '/member-list',name: 'memberList',component: MemberList},
   {path: '/login-form',name: 'loginForm',component: LoginForm},
 ]
})