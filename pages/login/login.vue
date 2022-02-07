<template>
	<view>
		<img src="../../static/logo-1.png" class="logo" mode="widthFix" alt="">
		<view class="logo-title">pumpkin在线打卡考勤系统</view>
		<view class="logo-subtitle">ver 2022.01</view>
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登陆系统</button>
		<view class="register-container" >
			没有账号？
			<text class="register" @tap="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toRegister:function(){
				uni.navigateTo({
					url:"../register/register"
				})
			},
			login: function(){
				let that = this ;
				uni.login({
					provider:'weixin',
					success:function(resp){
						let code = resp.code
						that.ajax(that.url.login , 'POST' , {'code':code} , function(resp){
							let permission = resp.data.permission
							uni.setStorageSync('permission',permission)
							console.log(permission)
							// 跳转到首页
							uni.switchTab({
								url:'../index/index'
							})
						})
						console.log('success')
					},
					fail:function(e){
						console.log(e)
						uni.showToast({
							title:'执行异常',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less") ;
</style>
