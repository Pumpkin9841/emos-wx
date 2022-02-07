<template>
	<view>
		<image src="../../static/logo-2.png" mode="widthFix" class="logo"></image>
		<view class="register-container">
			<input type="text" placeholder="输入你的邀请码" class="register-code" maxlength="6" v-model="registerCode" />
			<view class="register-desc">管理员创建员工账号之后，你可以从你的邮箱中获得注册邀请码</view>
			<button class="register-btn" open-type="getUserInfo" @tap="register()">执行注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registerCode: ''
			}
		},
		methods: {
			register:function(){
				let that = this
				if( that.registerCode==null || that.registerCode.length==0 ){
					uni.showToast({
						title: '邀请码不能为空',
						icon:'none'
					})
					return 
				}
				else if( /^[0-9]{6}$/.test(that.registerCode)==false){
					uni.showToast({
						title:'邀请码必须是6位数字',
						icon:'none'
					})
					return 
				}
				
				uni.login({
				  provider: 'weixin',
				  success: function (resp) {
				    let code = resp.code;
					console.log(code)
				    // 获取用户信息
				    uni.getUserProfile({
				      desc: '获取用户信息',
				      success: function (resp) {
				        let nickName = resp.userInfo.nickName;
				        let avatarUrl = resp.userInfo.avatarUrl;
						console.log(nickName) ;
						console.log(avatarUrl) ;
						let data = {
							code: code,
							nickname: nickName,
							photo: avatarUrl,
							registerCode: that.registerCode
						};
						that.ajax(that.url.register, 'POST', data, function(resp) {
							let permission = resp.data.permission;
							uni.setStorageSync('permission', permission);
							console.log(permission)
							//跳转到index页面
							uni.switchTab({
								url:'../index/index'
							})
						});

				      }
				    });
				  }
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less") ;
</style>
