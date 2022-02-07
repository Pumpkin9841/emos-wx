<template>
	<view class="message">
		<view class="header">
			<view class="desc">{{ sendTime }}</view>
			<view class="opt" @tap="deleteMsg">删除</view>
		</view>
		<view class="content">{{ msg }}</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				id: null,
				readFlag: null,
				refId: null,
				sendTime: '',
				msg: ''
			}
		},
		onLoad:function(options){
			let that = this ;
			that.id = options.id ;
			that.readFlag = options.readFlag=="true"?true:false ;
			that.refId = options.refId ;
			//如果是未读的消息，则改为已读状态
			if( !that.readFlag ){
				that.ajax(that.url.UpdateUnreadMesageById , 'POST' , {"id":that.refId} , function(resp){
					console.log("消息已读") ;
				})	
			}
		},
		onShow:function(){
			let that = this ;
			uni.setNavigationBarTitle({
				title:'系统通知' 
			})
			that.ajax(that.url.searchMessageById, 'POST' , {"id":that.id}, function(resp){
				let result = resp.data.result ;
				that.msg = result.msg ;
				that.sendTime = result.sendTime ;
			})
		},
		methods: {
			deleteMsg:function(){
				let that = this ;
				uni.showModal({
					title:"提示信息",
					content:"是否要删除？",
					success:function(resp){
						if(resp.confirm){
							that.ajax(that.url.DeleteMessageRefById , 'POST', {"id":that.refId} , function(resp){
								uni.showToast({
									icon:'success',
									title:'删除成功',
									complete:function(){
										setTimeout(function(){
											uni.navigateBack({
												delta:1
											})
										},1000)
										
									}
								})
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("message.less");
</style>

