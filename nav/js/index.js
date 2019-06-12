var navDocsClass = new NavDocsClass();

navDocsClass.init();


function NavDocsClass() {
    /**
     *  docs 默认图标
     * @type {string}
     */
    this.defaultItemIconImage = 'https://www.rongcloud.cn/pc/images/mode-icon1.png';

    this.webSdkUrl = 'https://cdn.ronghub.com/RongIMLib-2.3.0.js';

    /**
     * 左侧导航栏导航数据
     */
    this.navConfigData = RCConf.navs;

    /**
     * 内容展示 数据配置
     */
    this.contentConfigData = RCConf.navi_items;

    this.selectedNav = '';

    /**
     * 初始化
     */
    this.init = function () {
        var navigationData = this.navConfigData.children;
        var contentData = this.contentConfigData;
        this.renderNavigationBar(navigationData);
        this.renderContent(contentData);

        this.addElementSelectedEvent();
    };

    /**
     * 渲染侧边栏
     */
    this.renderNavigationBar = function (navData) {
        var navElement = document.getElementById('web_demo_nav');
        var navContent = document.createElement('ul');
        navContent.classList = 'rong-navs';

        var navHtml = '';
        if (this.isArray(navData) && navData.length) {
            navData.forEach(function (item, index, arr) {
                var id = item.id;
                var name = item.name;
                var icon = item.icon;

                navHtml += '<a href="#' + id + '">';
                navHtml += '<li class="rong-nav">';
                navHtml += '<i class="iconfont ' + icon + '"></i>' + name;
                navHtml += '</li></a>'
            });
        }

        navContent.innerHTML = navHtml;
        navElement.appendChild(navContent);
    };

    /**
     * 渲染右侧展示内容
     * @param contentData
     */
    this.renderContent = function (contentData) {
        var that = this;
        var mainContentElement = document.getElementById('main_content');

        var elements = [];
        if (this.isArray(contentData) && contentData.length) {
            contentData.forEach(function (item, index, arr) {
                var html = '';
                var id = item.id;
                var name = item.name;
                var childrenData = item.children;

                html += '<div class="rong-content" id=' + id + '>';
                html += '<div class="rong-content-title">' + name + '</div>';
                html += that.getDocsItem(childrenData);
                html += '</div>';
                elements.push(html);
            });
        }

        var index = 0;
        var timer = setInterval(() => {
            var html = elements[index];
            if (!html) {
                return clearInterval(timer);
            }
            mainContentElement.innerHTML += html;
            index += 1;
        }, 200);
    };


    /**
     * 返回每一项html
     * @param itemData
     * @returns {string}
     */
    this.getDocsItem = function (itemData) {
        var that = this;
        var itemHtml = '';

        if (this.isArray(itemData) && itemData.length) {
            itemData.forEach(function (item, index, arr) {
                var name = item.name || '';
                var linkUrl = item.linkUrl || '';
                var icon = item.icon || that.defaultItemIconImage;
                var detail = item.detail || name;

                itemHtml += '<a href=' + linkUrl + ' target="_blank"><div class="rong-content-item">';
                itemHtml += '<div class="rong-content-logo rong-content-logo">' + '<div style="background-image: url(' + icon + ')"></div><span class="text-over-ellipsis">' + name + '</span></div>';
                itemHtml += '<div class="rong-content-desc">' + detail + '</div>';
                itemHtml += '</div></a>'
            });
        }

        return itemHtml;
    };

    /**
     * 添加选中效果
     */
    this.addElementSelectedEvent = function (event) {
        var that = this;
        var allNavElement = document.querySelectorAll('#web_demo_nav > ul > a');

        if (!allNavElement.length) return;

        let hash = location.hash, selectNode = null;
        allNavElement.forEach(function (node, index) {
            if (node.hash == hash) {
                selectNode = node;
            }
            node.addEventListener('click', function (event) {
                that.addSelect(node);
                that.removeNotActive();
            })
        });
        if (selectNode) {
            this.addSelect(selectNode);
        }
    };

    this.addSelect = function (node) {
        var id = node.attributes.href.value.replace(/^#/, '');

        if (this.selectedNav === id) return;
        this.selectedNav = id;
        node.classList.add('active-nav');
    };

    this.removeNotActive = function () {
        var that = this;
        var allNavElement = document.querySelectorAll('#web_demo_nav > ul > a');
        allNavElement.forEach(function (node, index) {
            var id = node.attributes.href.value.replace(/^#/, '');
            if (that.selectedNav !== id) node.classList.remove('active-nav');
        })
    };

    this.isArray = function (str) {
        return Object.prototype.toString.call(str) === "[object Array]";
    };
}

