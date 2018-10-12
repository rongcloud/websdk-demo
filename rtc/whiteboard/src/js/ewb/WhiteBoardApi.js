/*
 * WhiteBoardApi.js - Javascript API for White Borad
 *
 */
function WhiteBoardApi() {
    this.canvasHeight = -1;
    this.canvasWidth = -1;
    this.canvasNode = null;
    this.cname = '';
    this.uid = '';
    this.vid = '';
    this.role = ''
    this.redis = '';
    this.ticket = '';
    this.expired = 1440;

    this.defaultCanvasHeight = function() {
        return this.canvasNode ? $(this.canvasNode).height() : 600;
    }
    this.defaultCanvasWidth = function() {
        return this.canvasNode ? $(this.canvasNode).width() : 800;
    }

    this.join = function(params) {
        var key = params.key,
            cname = params.cname,
            uinfo = params.uinfo,
            role = params.role,
            mode = params.mode,
            expired = params.expired,
            onJoin = params.onJoin;

        this.cname = cname;
        this.role = role || 'host';
        if (expired !== undefined && expired !== null) {
            this.expired = expired;
        }
        this.render();
    }

    this.render = function() {
        if (!this.canvasNode) {
            return;
        }
        this.app = new App();
        this.app.setCanvasHeight(this.canvasHeight == -1 ? this.defaultCanvasHeight() : this.canvasHeight);
        this.app.setCanvasWidth(this.canvasWidth == -1 ? this.defaultCanvasWidth() : this.canvasWidth);
        this.app.setRoom(this.cname);
        this.app.setUid(this.uid);
        this.app.setVid(this.vid);
        this.app.setRole(this.role);
        this.app.setRedis(this.redis);
        this.app.setTicket(this.ticket);
        //this.app.setExpiredMinutes(this.expired);
        this.app.expiredMinutes = this.expired;
        this.app.renderInto(this.canvasNode);
    }
}