<template>
	<view class="page">
		<image src="../../static/logo-3.jpg" mode="widthFix" class="logo"></image>
		<view class="add">
			<image src="../../static/icon-17.png" mode="widthFix" class="icon"></image>
			<text>创建会议</text>
		</view>
		<view v-for="one in list" :key="one.date">
			<view class="list-title">{{ one.date }}</view>
			<view class="item" v-for="meeting in one.list" :key="meeting.id">
				<view class="header">
					<view class="left">
						<image v-if="meeting.type == '线上会议'" src="../../static/icon-11.png" mode="widthFix" class="icon"></image>
						<image v-if="meeting.type == '线下会议'" src="../../static/icon-12.png" mode="widthFix" class="icon"></image>
						<text>{{ meeting.type }}</text>
						<text :class="meeting.status == '未开始' ? 'blue' : 'red'">（{{ meeting.status }}）</text>
					</view>
					<view class="right">
						<text>编辑</text>
					</view>
				</view>
				<view class="content">
					<view class="title">{{ meeting.title }}</view>
					<view class="attr">
						<view class="timer">
							<image src="../../static/icon-14.png" mode="widthFix" class="icon"></image>
							<text>{{ meeting.start }} ~ {{ meeting.end }}</text>
						</view>
						<view class="creator">
							<image src="../../static/icon-15.png" mode="widthFix" class="icon"></image>
							<text>{{ meeting.name }}</text>
						</view>
						<view class="place" v-if="meeting.type == '线下会议'">
							<image src="../../static/icon-16.png" mode="widthFix" class="icon"></image>
							<text>{{ meeting.place }}</text>
						</view>
					</view>
					<view class="desc">{{ meeting.desc }}</view>
					<button class="btn" v-if="meeting.type == '线上会议'">进入</button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				length: 20,
				list: [],
				isLastPage: false
			};

		},
		onShow:function(){
			let that = this ;
			that.page = 1 ;
			that.isLastPage = false ;
			that.list = [] ;
			that.loadMeetingList(that) ;
		},
		onReachBottom:function(){
			let that = this ;
			if( that.isLastPage ){
				return ;
			}
			that.page = that.page+1 ;
			that.loadMeetingList(that) ;
		},
		methods: {
			loadMeetingList: function(ref) {
				let data = {
					page: ref.page,
					length: ref.length
				};
				ref.ajax(ref.url.searchMyMeetingListByPage, 'POST', data, function(resp) {
					let result = resp.data.result;
					if (result == null || result.length == 0) {
						ref.isLastPage = true;
						ref.page = ref.page - 1;
						if (ref.page > 1) {
							uni.showToast({
								icon: 'none',
								title: '已经到底了'
							});
						}
					} else {
						for (let one of result) {
							for (let meeting of one.list) {
								if (meeting.type == 1) {
									meeting.type = '线上会议';
								} else if (meeting.type == 2) {
									meeting.type = '线下会议';
								}
			
								if (meeting.status == 3) {
									meeting.status = '未开始';
								} else if (meeting.status == 4) {
									meeting.status = '进行中';
								} else if (meeting.status == 5) {
									meeting.status = '已结束';
								}
							}
							if (ref.list.length > 0) {
								let last = ref.list[ref.list.length - 1];
			
								if (last.date == one.date) {
									last.list = last.list.concat(one.list);
								} else {
									ref.list.push(one);
								}
							} else {
								ref.list.push(one);
							}
						}
					}
				});
			}

		}
	}
</script>

<style lang="less">
	@import url("meeting_list.less") ;
</style>
