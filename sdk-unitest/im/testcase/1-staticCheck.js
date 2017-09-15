describe("RongIMLib", function() {
	var apiList = ["MentionedType","MethodType","BlacklistStatus","ConnectionChannel","CustomerType","GetChatRoomType","ConnectionStatus","ConversationNotificationStatus","ConversationType","DiscussionInviteStatus","ErrorCode","VoIPMediaType","MediaType","MessageDirection","FileType","RealTimeLocationErrorCode","RealTimeLocationStatus","ReceivedStatus","SearchType","SentStatus","ConnectionState","RongIMClient","Qos","Type","Channel","Socket","Client","Bridge","MessageHandler","MessageCallback","CallbackMapping","PublishCallback","QueryCallback","ConnectAck","Navigation","BaseMessage","ConnectMessage","ConnAckMessage","DisconnectMessage","PingReqMessage","PingRespMessage","RetryableMessage","PubAckMessage","PublishMessage","QueryMessage","QueryConMessage","QueryAckMessage","MessageOutputStream","MessageInputStream","Header","BinaryHelper","RongIMStream","SocketTransportation","PollingTransportation","Transportations","MessageUtil","MessageIdHandler","MessageContent","NotificationMessage","StatusMessage","ModelUtil","CustomerStatusMessage","ChangeModeResponseMessage","ChangeModeMessage","CustomerStatusUpdateMessage","HandShakeMessage","CustomerContact","EvaluateMessage","HandShakeResponseMessage","SuspendMessage","TerminateMessage","IsTypingStatusMessage","InformationNotificationMessage","CommandMessage","ContactNotificationMessage","ProfileNotificationMessage","CommandNotificationMessage","DiscussionNotificationMessage","GroupNotificationMessage","TextMessage","TypingStatusMessage","ReadReceiptMessage","VoiceMessage","RecallCommandMessage","ImageMessage","LocationMessage","RichContentMessage","JrmfReadPacketMessage","JrmfReadPacketOpenedMessage","UnknownMessage","PublicServiceCommandMessage","PublicServiceMultiRichContentMessage","SyncReadStatusMessage","ReadReceiptRequestMessage","ReadReceiptResponseMessage","PublicServiceRichContentMessage","FileMessage","AcceptMessage","RingingMessage","SummaryMessage","HungupMessage","InviteMessage","MediaModifyMessage","MemberModifyMessage","ChannelInfo","UserStatus","MentionedInfo","DeleteMessage","CustomServiceConfig","CustomServiceSession","Conversation","Discussion","Group","Message","MessageTag","PublicServiceMenuItem","PublicServiceProfile","UserInfo","ServerDataProvider","VCDataProvider","MemeoryProvider","LocalStorageProvider","UserDataProvider","FeatureDectector","FeaturePatcher","PublicServiceMap","ConversationMap","CheckParam","LimitableMap","RongAjax","RongUtil"];

	var objects = ["Qos","Type","MentionedType","MethodType","BlacklistStatus","ConnectionChannel","CustomerType","GetChatRoomType","ConnectionStatus","ConversationNotificationStatus","ConversationType","DiscussionInviteStatus","ErrorCode","VoIPMediaType","MediaType","MessageDirection","FileType","RealTimeLocationErrorCode","RealTimeLocationStatus","ReceivedStatus","SearchType","SentStatus","ConnectionState"];

	var RongIMLib = window.RongIMLib;

	var _space = ' \t \t \t \t';

	for(var i=0;i<apiList.length;i++){
		let name = apiList[i];
		let type = typeof RongIMLib[name];
		if( _.lastIndexOf(objects,name ) > -1){
			it( "RongIMLib." + name + _space + " should be object", function() {
		        expect(type).toEqual("object");
		    });
		}else{
			it( "RongIMLib." + name + _space + " should be function", function() {
		        expect(type).toEqual("function");
		    });
		}	
	}
});