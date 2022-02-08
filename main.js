import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

let baseUrl = "http://192.168.10.12:8080/emos-wx-api"

Vue.prototype.url={
	register: baseUrl+"/user/register" ,
	login: baseUrl+"/user/login",
	checkin: baseUrl + "/checkin/checkin",
	createFaceModel: baseUrl + "/checkin/createFaceModel",
	validCanCheckin: baseUrl + "/checkin/validCanCheckin",
	searchTodayCheckin: baseUrl + "/checkin/searchTodayCheckin",
	searchUserSummary: baseUrl + "/user/searchUserSummary",
	searchMonthCheckin: baseUrl + "/checkin/searchMonthCheckin",
	refreshMessage: baseUrl + "/message/refreshMessage",
	searchMessageByPage: baseUrl+"/message/searchMessageByPage",
	searchMessageById: baseUrl + "/message/searchMessageById",
	UpdateUnreadMesageById: baseUrl + "/message/UpdateUnreadMesageById",
	DeleteMessageRefById: baseUrl + "/message/DeleteMessageRefById",
	searchMyMeetingListByPage: baseUrl + "/meeting/searchMyMeetingListByPage",
	searchUserGroupByDept: baseUrl + "/user/searchUserGroupByDept",
	searchMembers:baseUrl+"/user/searchMembers"
}

Vue.prototype.checkPermission = function(perms){
		let permission = uni.getStorageSync("permission");
		let result = false ;
		for(let one of perms ){
			if( permission.indexOf(one) != -1 ){
				result = true ;
				break ;
			}
		}
		return result;
}

Vue.prototype.ajax = function(url, method, data, fun) {
	uni.request({
		"url": url,
		"method": method,
		"header": {
			token: uni.getStorageSync('token')
		},
		"data": data,
		success: function(resp) {
			if (resp.statusCode == 401) {
				uni.redirectTo({
					url: '../login/login'
				});
			} else if (resp.statusCode == 200 && resp.data.code == 200) {
				
				let data = resp.data
				if (data.hasOwnProperty("token")) {
					console.log(resp.data)
					let token = data.token
					uni.setStorageSync("token", token)
				}
				fun(resp)
			} else {
				uni.showToast({
					icon: 'none',
					title: resp.data
				});
			}
		}
	});
}
