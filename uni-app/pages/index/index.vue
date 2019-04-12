<template>
	<view class="content">
        <image class="logo" src="/static/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'RongCloud IM SDK Connect'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 94upx;
        width: 300upx;
        margin-top: 15%;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
