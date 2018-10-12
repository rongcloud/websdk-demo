// ../lib/onyx/version.js
(function(t) {
    t && t.version && (t.version.onyx = "2.6.0-pre.4.dev")
})(enyo, this);

// ../lib/onyx/source/Icon.js
(function(t) {
    t.kind({
        name: "onyx.Icon",
        classes: "onyx-icon",
        published: {
            src: "",
            disabled: !1
        },
        create: function() {
            this.inherited(arguments),
            this.src && this.srcChanged(),
            this.disabledChanged()
        },
        disabledChanged: function() {
            this.addRemoveClass("disabled", this.disabled)
        },
        srcChanged: function() {
            this.applyStyle("background-image", "url(" + t.path.rewrite(this.src) + ")")
        }
    })
})(enyo, this);

// ../lib/onyx/source/Button.js
(function(t) {
    t.kind({
        name: "onyx.Button",
        kind: "enyo.Button",
        classes: "onyx-button enyo-unselectable",
        handlers: {
            ondown: "down",
            onenter: "enter",
            ondragfinish: "dragfinish",
            onleave: "leave",
            onup: "up"
        },
        down: function() {
            return this.disabled ? !0 : (this.addClass("pressed"), this._isPressed = !0, void 0)
        },
        enter: function() {
            return this.disabled ? !0 : (this._isPressed && this.addClass("pressed"), void 0)
        },
        dragfinish: function() {
            return this.disabled ? !0 : (this.removeClass("pressed"), this._isPressed = !1, void 0)
        },
        leave: function() {
            return this.disabled ? !0 : (this.removeClass("pressed"), void 0)
        },
        up: function() {
            return this.disabled ? !0 : (this.removeClass("pressed"), this._isPressed = !1, void 0)
        }
    })
})(enyo, this);

// ../lib/onyx/source/IconButton.js
(function(t) {
    t.kind({
        name: "onyx.IconButton",
        kind: "onyx.Icon",
        published: {
            active: !1
        },
        classes: "onyx-icon-button",
        handlers: {
            ondown: "down",
            onenter: "enter",
            ondragfinish: "dragfinish",
            onleave: "leave",
            onup: "up"
        },
        rendered: function() {
            this.inherited(arguments),
            this.activeChanged()
        },
        tap: function() {
            return this.disabled ? !0 : (this.setActive(!0), void 0)
        },
        down: function() {
            return this.disabled ? !0 : (this.addClass("pressed"), this._isPressed = !0, void 0)
        },
        enter: function() {
            return this.disabled ? !0 : (this._isPressed && this.addClass("pressed"), void 0)
        },
        dragfinish: function() {
            return this.disabled ? !0 : (this.removeClass("pressed"), this._isPressed = !1, void 0)
        },
        leave: function() {
            return this.disabled ? !0 : (this.removeClass("pressed"), void 0)
        },
        up: function() {
            return this.disabled ? !0 : (this.removeClass("pressed"), this._isPressed = !1, void 0)
        },
        activeChanged: function() {
            this.bubble("onActivate")
        }
    })
})(enyo, this);

// ../lib/onyx/source/Checkbox.js
(function(t) {
    t.kind({
        name: "onyx.Checkbox",
        classes: "onyx-checkbox",
        kind: "enyo.Checkbox",
        tag: "div",
        handlers: {
            onclick: ""
        },
        tap: function() {
            return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")),
            !this.disabled
        },
        dragstart: t.nop
    })
})(enyo, this);

// ../lib/onyx/source/Drawer.js
(function(t) {
    t.kind({
        name: "onyx.Drawer",
        kind: "enyo.Drawer"
    })
})(enyo, this);

// ../lib/onyx/source/Grabber.js
(function(t) {
    t.kind({
        name: "onyx.Grabber",
        classes: "onyx-grabber"
    })
})(enyo, this);

// ../lib/onyx/source/Groupbox.js
(function(t) {
    t.kind({
        name: "onyx.Groupbox",
        classes: "onyx-groupbox"
    }),
    t.kind({
        name: "onyx.GroupboxHeader",
        classes: "onyx-groupbox-header"
    })
})(enyo, this);

// ../lib/onyx/source/Input.js
(function(t) {
    t.kind({
        name: "onyx.Input",
        kind: "enyo.Input",
        classes: "onyx-input"
    })
})(enyo, this);

// ../lib/onyx/source/Popup.js
(function(t) {
    t.kind({
        name: "onyx.Popup",
        kind: "enyo.Popup",
        classes: "onyx-popup"
    })
})(enyo, this);

// ../lib/onyx/source/TextArea.js
(function(t) {
    t.kind({
        name: "onyx.TextArea",
        kind: "enyo.TextArea",
        classes: "onyx-textarea"
    })
})(enyo, this);

// ../lib/onyx/source/RichText.js
(function(t) {
    t.kind({
        name: "onyx.RichText",
        kind: "enyo.RichText",
        classes: "onyx-richtext"
    })
})(enyo, this);

// ../lib/onyx/source/InputDecorator.js
(function(t) {
    t.kind({
        name: "onyx.InputDecorator",
        kind: "enyo.ToolDecorator",
        tag: "label",
        classes: "onyx-input-decorator",
        published: {
            alwaysLooksFocused: !1
        },
        handlers: {
            onDisabledChange: "disabledChange",
            onfocus: "receiveFocus",
            onblur: "receiveBlur"
        },
        create: function() {
            this.inherited(arguments),
            this.updateFocus(!1)
        },
        alwaysLooksFocusedChanged: function() {
            this.updateFocus(this.focus)
        },
        updateFocus: function(t) {
            this.focused = t,
            this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused)
        },
        receiveFocus: function() {
            this.updateFocus(!0)
        },
        receiveBlur: function() {
            this.updateFocus(!1)
        },
        disabledChange: function(t, e) {
            this.addRemoveClass("onyx-disabled", e.originator.disabled)
        }
    })
})(enyo, this);

// ../lib/onyx/source/Tooltip.js
(function(t) {
    t.kind({
        name: "onyx.Tooltip",
        kind: "onyx.Popup",
        classes: "onyx-tooltip below left-arrow",
        autoDismiss: !1,
        showDelay: 500,
        defaultLeft: -6,
        handlers: {
            onRequestShowTooltip: "requestShow",
            onRequestHideTooltip: "requestHide"
        },
        requestShow: function() {
            return this.showJob = setTimeout(this.bindSafely("show"), this.showDelay),
            !0
        },
        cancelShow: function() {
            clearTimeout(this.showJob)
        },
        requestHide: function() {
            return this.cancelShow(),
            this.inherited(arguments)
        },
        showingChanged: function() {
            this.cancelShow(),
            this.adjustPosition(!0),
            this.inherited(arguments)
        },
        applyPosition: function(t) {
            var e = "";
            for (var i in t) e += i + ":" + t[i] + (isNaN(t[i]) ? "; ": "px; ");
            this.addStyles(e)
        },
        adjustPosition: function() {
            if (this.showing && this.hasNode()) {
                var t = this.node.getBoundingClientRect();
                t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)),
                t.left + t.width > window.innerWidth && (this.applyPosition({
                    "margin-left": -t.width,
                    bottom: "auto"
                }), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0))
            }
        },
        handleResize: function() {
            this.applyPosition({
                "margin-left": this.defaultLeft,
                bottom: "auto"
            }),
            this.addRemoveClass("left-arrow", !0),
            this.addRemoveClass("right-arrow", !1),
            this.adjustPosition(!0),
            this.inherited(arguments)
        }
    })
})(enyo, this);

// ../lib/onyx/source/TooltipDecorator.js
(function(t) {
    t.kind({
        name: "onyx.TooltipDecorator",
        kind: "enyo.Control",
        defaultKind: "onyx.Button",
        classes: "onyx-popup-decorator",
        handlers: {
            onenter: "enter",
            onleave: "leave"
        },
        enter: function() {
            this.requestShowTooltip()
        },
        leave: function() {
            this.requestHideTooltip()
        },
        tap: function() {
            this.requestHideTooltip()
        },
        requestShowTooltip: function() {
            this.waterfallDown("onRequestShowTooltip")
        },
        requestHideTooltip: function() {
            this.waterfallDown("onRequestHideTooltip")
        }
    })
})(enyo, this);

// ../lib/onyx/source/MenuDecorator.js
(function(t) {
    t.kind({
        name: "onyx.MenuDecorator",
        kind: "onyx.TooltipDecorator",
        defaultKind: "onyx.Button",
        classes: "onyx-popup-decorator enyo-unselectable",
        handlers: {
            onActivate: "activated",
            onHide: "menuHidden"
        },
        activated: function(t, e) {
            this.requestHideTooltip(),
            e.originator.active && (this.menuActive = !0, this.activator = e.originator, this.activator.addClass("active"), this.requestShowMenu())
        },
        requestShowMenu: function() {
            this.waterfallDown("onRequestShowMenu", {
                activator: this.activator
            })
        },
        requestHideMenu: function() {
            this.waterfallDown("onRequestHideMenu")
        },
        menuHidden: function() {
            this.menuActive = !1,
            this.activator && (this.activator.setActive(!1), this.activator.removeClass("active"))
        },
        enter: function() {
            this.menuActive || this.inherited(arguments)
        },
        leave: function() {
            this.menuActive || this.inherited(arguments)
        }
    })
})(enyo, this);

// ../lib/onyx/source/Menu.js
(function(t) {
    t.kind({
        name: "onyx.Menu",
        kind: "onyx.Popup",
        modal: !0,
        defaultKind: "onyx.MenuItem",
        classes: "onyx-menu",
        published: {
            maxHeight: 200,
            scrolling: !0,
            scrollStrategyKind: "TouchScrollStrategy"
        },
        handlers: {
            onActivate: "itemActivated",
            onRequestShowMenu: "requestMenuShow",
            onRequestHideMenu: "requestHide"
        },
        childComponents: [{
            name: "client",
            kind: "enyo.Scroller"
        }],
        showOnTop: !1,
        scrollerName: "client",
        create: function() {
            this.inherited(arguments),
            this.maxHeightChanged()
        },
        initComponents: function() {
            this.scrolling && this.createComponents(this.childComponents, {
                isChrome: !0,
                strategyKind: this.scrollStrategyKind
            }),
            this.inherited(arguments)
        },
        getScroller: function() {
            return this.$[this.scrollerName]
        },
        maxHeightChanged: function() {
            this.scrolling && this.getScroller().setMaxHeight(this.maxHeight + "px")
        },
        itemActivated: function(t, e) {
            return e.originator.setActive(!1),
            !0
        },
        showingChanged: function() {
            this.inherited(arguments),
            this.scrolling && this.getScroller().setShowing(this.showing),
            this.adjustPosition(!0)
        },
        requestMenuShow: function(t, e) {
            if (this.floating) {
                var i = e.activator.hasNode();
                if (i) {
                    var n = this.activatorOffset = this.getPageOffset(i);
                    this.applyPosition({
                        top: n.top + (this.showOnTop ? 0 : n.height),
                        left: n.left,
                        width: n.width
                    })
                }
            }
            return this.show(),
            !0
        },
        applyPosition: function(t) {
            var e = "";
            for (var i in t) e += i + ":" + t[i] + (isNaN(t[i]) ? "; ": "px; ");
            this.addStyles(e)
        },
        getPageOffset: function(t) {
            var e = t.getBoundingClientRect(),
            i = void 0 === window.pageYOffset ? document.documentElement.scrollTop: window.pageYOffset,
            n = void 0 === window.pageXOffset ? document.documentElement.scrollLeft: window.pageXOffset,
            o = void 0 === e.height ? e.bottom - e.top: e.height,
            s = void 0 === e.width ? e.right - e.left: e.width;
            return {
                top: e.top + i,
                left: e.left + n,
                height: o,
                width: s
            }
        },
        adjustPosition: function() {
            if (this.showing && this.hasNode()) {
                this.scrolling && !this.showOnTop && this.getScroller().setMaxHeight(this.maxHeight + "px"),
                this.removeClass("onyx-menu-up"),
                this.floating || this.applyPosition({
                    left: "auto"
                });
                var t = this.node.getBoundingClientRect(),
                e = void 0 === t.height ? t.bottom - t.top: t.height,
                i = void 0 === window.innerHeight ? document.documentElement.clientHeight: window.innerHeight,
                n = void 0 === window.innerWidth ? document.documentElement.clientWidth: window.innerWidth;
                if (this.menuUp = t.top + e > i && i - t.bottom < t.top - e, this.addRemoveClass("onyx-menu-up", this.menuUp), this.floating) {
                    var o = this.activatorOffset;
                    this.menuUp ? this.applyPosition({
                        top: o.top - e + (this.showOnTop ? o.height: 0),
                        bottom: "auto"
                    }) : t.top < o.top && i > o.top + (this.showOnTop ? 0 : o.height) + e && this.applyPosition({
                        top: o.top + (this.showOnTop ? 0 : o.height),
                        bottom: "auto"
                    })
                }
                if (t.right > n && (this.floating ? this.applyPosition({
                    left: n - t.width
                }) : this.applyPosition({
                    left: -(t.right - n)
                })), 0 > t.left && (this.floating ? this.applyPosition({
                    left: 0,
                    right: "auto"
                }) : "auto" == this.getComputedStyleValue("right") ? this.applyPosition({
                    left: -t.left
                }) : this.applyPosition({
                    right: t.left
                })), this.scrolling && !this.showOnTop) {
                    t = this.node.getBoundingClientRect();
                    var s;
                    s = this.menuUp ? this.maxHeight < t.bottom ? this.maxHeight: t.bottom: i > t.top + this.maxHeight ? this.maxHeight: i - t.top,
                    this.getScroller().setMaxHeight(s + "px")
                }
            }
        },
        handleResize: function() {
            this.inherited(arguments),
            this.adjustPosition()
        },
        requestHide: function() {
            this.setShowing(!1)
        }
    })
})(enyo, this);

// ../lib/onyx/source/MenuItem.js
(function(t) {
    t.kind({
        name: "onyx.MenuItem",
        kind: "enyo.Button",
        events: {
            onSelect: "",
            onItemContentChange: ""
        },
        classes: "onyx-menu-item",
        tag: "div",
        create: function() {
            this.silence(),
            this.inherited(arguments),
            this.unsilence(),
            this.active && this.bubble("onActivate")
        },
        tap: function() {
            this.inherited(arguments),
            this.bubble("onRequestHideMenu"),
            this.doSelect({
                selected: this,
                content: this.content
            })
        },
        contentChanged: function() {
            this.inherited(arguments),
            this.doItemContentChange({
                content: this.content
            })
        }
    })
})(enyo, this);

// ../lib/onyx/source/Submenu.js
(function(t) {
    t.kind({
        name: "onyx.Submenu",
        defaultKind: "onyx.MenuItem",
        initComponents: function() {
            this.createChrome([{
                name: "label",
                kind: "enyo.Control",
                classes: "onyx-menu-item",
                content: this.content || this.name,
                isChrome: !0,
                ontap: "toggleOpen"
            },
            {
                kind: "onyx.Drawer",
                name: "client",
                classes: "client onyx-submenu",
                isChrome: !0,
                open: !1
            }]),
            this.inherited(arguments)
        },
        toggleOpen: function() {
            this.setOpen(!this.getOpen())
        },
        setOpen: function(t) {
            this.$.client.setOpen(t)
        },
        getOpen: function() {
            return this.$.client.getOpen()
        }
    })
})(enyo, this);

// ../lib/onyx/source/PickerDecorator.js
(function(t) {
    t.kind({
        name: "onyx.PickerDecorator",
        kind: "onyx.MenuDecorator",
        classes: "onyx-picker-decorator",
        defaultKind: "onyx.PickerButton",
        handlers: {
            onChange: "change"
        },
        change: function(t, e) {
            this.waterfallDown("onChange", e)
        }
    })
})(enyo, this);

// ../lib/onyx/source/PickerButton.js
(function(t) {
    t.kind({
        name: "onyx.PickerButton",
        kind: "onyx.Button",
        handlers: {
            onChange: "change"
        },
        change: function(t, e) {
            void 0 !== e.content && this.setContent(e.content)
        }
    })
})(enyo, this);

// ../lib/onyx/source/Picker.js
(function(t) {
    t.kind({
        name: "onyx.Picker",
        kind: "onyx.Menu",
        classes: "onyx-picker enyo-unselectable",
        published: {
            selected: null
        },
        events: {
            onChange: ""
        },
        handlers: {
            onItemContentChange: "itemContentChange"
        },
        floating: !0,
        showOnTop: !0,
        initComponents: function() {
            this.setScrolling(!0),
            this.inherited(arguments)
        },
        showingChanged: function() {
            this.getScroller().setShowing(this.showing),
            this.inherited(arguments),
            this.showing && this.selected && this.scrollToSelected()
        },
        scrollToSelected: function() {
            this.getScroller().scrollToControl(this.selected, !this.menuUp)
        },
        itemActivated: function(t, e) {
            return this.processActivatedItem(e.originator),
            this.inherited(arguments)
        },
        processActivatedItem: function(t) {
            t.active && this.setSelected(t)
        },
        selectedChanged: function(t) {
            t && t.removeClass("selected"),
            this.selected && (this.selected.addClass("selected"), this.doChange({
                selected: this.selected,
                content: this.selected.content
            }))
        },
        itemContentChange: function(t, e) {
            e.originator == this.selected && this.doChange({
                selected: this.selected,
                content: this.selected.content
            })
        },
        handleResize: function() {
            this.inherited(arguments),
            this.adjustPosition()
        }
    })
})(enyo, this);

// ../lib/onyx/source/FlyweightPicker.js
(function(t) {
    t.kind({
        name: "onyx.FlyweightPicker",
        kind: "onyx.Picker",
        classes: "onyx-flyweight-picker",
        published: {
            count: 0
        },
        events: {
            onSetupItem: "",
            onSelect: ""
        },
        handlers: {
            onSelect: "itemSelect"
        },
        components: [{
            name: "scroller",
            kind: "enyo.Scroller",
            strategyKind: "TouchScrollStrategy",
            components: [{
                name: "flyweight",
                kind: "FlyweightRepeater",
                noSelect: !0,
                ontap: "itemTap"
            }]
        }],
        scrollerName: "scroller",
        initComponents: function() {
            this.controlParentName = "flyweight",
            this.inherited(arguments),
            this.$.flyweight.$.client.children[0].setActive(!0)
        },
        create: function() {
            this.inherited(arguments),
            this.countChanged()
        },
        rendered: function() {
            this.inherited(arguments),
            this.selectedChanged()
        },
        scrollToSelected: function() {
            var t = this.$.flyweight.fetchRowNode(this.selected);
            this.getScroller().scrollToNode(t, !this.menuUp)
        },
        countChanged: function() {
            this.$.flyweight.count = this.count
        },
        processActivatedItem: function(t) {
            this.item = t
        },
        selectedChanged: function(t) {
            if (this.item) {
                null != t && (this.item.removeClass("selected"), this.$.flyweight.renderRow(t));
                var e;
                null != this.selected && (this.item.addClass("selected"), this.$.flyweight.renderRow(this.selected), this.item.removeClass("selected"), e = this.$.flyweight.fetchRowNode(this.selected)),
                this.doChange({
                    selected: this.selected,
                    content: e && e.textContent || this.item.content
                })
            }
        },
        itemTap: function(t, e) {
            this.setSelected(e.rowIndex),
            this.doSelect({
                selected: this.item,
                content: this.item.content
            })
        },
        itemSelect: function(t, e) {
            return e.originator != this ? !0 : void 0
        }
    })
})(enyo, this);

// ../lib/onyx/source/DatePicker.js
(function(t, e) {
    t.kind({
        name: "onyx.DatePicker",
        classes: "onyx-toolbar-inline",
        published: {
            disabled: !1,
            locale: "en-US",
            dayHidden: !1,
            monthHidden: !1,
            yearHidden: !1,
            minYear: 1900,
            maxYear: 2099,
            value: null
        },
        events: {
            onSelect: ""
        },
        create: function() {
            this.inherited(arguments),
            e.ilib && (this.locale = e.ilib.getLocale()),
            this.initDefaults()
        },
        initDefaults: function() {
            var t;
            e.ilib ? (t = [], this._tf = new e.ilib.DateFmt({
                locale: this.locale,
                timezone: "local"
            }), t = this._tf.getMonthsOfYear({
                length: "long"
            })) : t = [void 0, "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            this.setupPickers(this._tf ? this._tf.getTemplate() : "mdy"),
            this.dayHiddenChanged(),
            this.monthHiddenChanged(),
            this.yearHiddenChanged();
            for (var i, n = this.value = this.value || new Date,
            o = 0; i = t[o + 1]; o++) this.$.monthPicker.createComponent({
                content: i,
                value: o,
                active: o == n.getMonth()
            });
            var s = n.getFullYear();
            for (this.$.yearPicker.setSelected(s - this.minYear), o = 1; this.monthLength(n.getYear(), n.getMonth()) >= o; o++) this.$.dayPicker.createComponent({
                content: o,
                value: o,
                active: o == n.getDate()
            })
        },
        monthLength: function(t, e) {
            return 32 - new Date(t, e, 32).getDate()
        },
        setupYear: function(t, e) {
            return this.$.year.setContent(this.minYear + e.index),
            !0
        },
        setupPickers: function(t) {
            var e, i, n, o = t.split(""),
            s = !1,
            r = !1,
            a = !1;
            for (i = 0, n = o.length; n > i; i++) switch (e = o[i], e.toLowerCase()) {
            case "d":
                a || (this.createDay(), a = !0);
                break;
            case "m":
                r || (this.createMonth(), r = !0);
                break;
            case "y":
                s || (this.createYear(), s = !0);
                break;
            default:
            }
        },
        createYear: function() {
            var t = this.maxYear - this.minYear;
            this.createComponent({
                kind: "onyx.PickerDecorator",
                onSelect: "updateYear",
                components: [{
                    classes: "onyx-datepicker-year",
                    name: "yearPickerButton",
                    disabled: this.disabled
                },
                {
                    name: "yearPicker",
                    kind: "onyx.FlyweightPicker",
                    count: ++t,
                    onSetupItem: "setupYear",
                    components: [{
                        name: "year"
                    }]
                }]
            })
        },
        createMonth: function() {
            this.createComponent({
                kind: "onyx.PickerDecorator",
                onSelect: "updateMonth",
                components: [{
                    classes: "onyx-datepicker-month",
                    name: "monthPickerButton",
                    disabled: this.disabled
                },
                {
                    name: "monthPicker",
                    kind: "onyx.Picker"
                }]
            })
        },
        createDay: function() {
            this.createComponent({
                kind: "onyx.PickerDecorator",
                onSelect: "updateDay",
                components: [{
                    classes: "onyx-datepicker-day",
                    name: "dayPickerButton",
                    disabled: this.disabled
                },
                {
                    name: "dayPicker",
                    kind: "onyx.Picker"
                }]
            })
        },
        localeChanged: function() {
            this.refresh()
        },
        dayHiddenChanged: function() {
            this.$.dayPicker.getParent().setShowing(this.dayHidden ? !1 : !0)
        },
        monthHiddenChanged: function() {
            this.$.monthPicker.getParent().setShowing(this.monthHidden ? !1 : !0)
        },
        yearHiddenChanged: function() {
            this.$.yearPicker.getParent().setShowing(this.yearHidden ? !1 : !0)
        },
        minYearChanged: function() {
            this.refresh()
        },
        maxYearChanged: function() {
            this.refresh()
        },
        valueChanged: function() {
            this.refresh()
        },
        disabledChanged: function() {
            this.$.yearPickerButton.setDisabled(this.disabled),
            this.$.monthPickerButton.setDisabled(this.disabled),
            this.$.dayPickerButton.setDisabled(this.disabled)
        },
        updateDay: function(t, e) {
            var i = this.calcDate(this.value.getFullYear(), this.value.getMonth(), e.selected.value);
            return this.doSelect({
                name: this.name,
                value: i
            }),
            this.setValue(i),
            !0
        },
        updateMonth: function(t, e) {
            var i = this.calcDate(this.value.getFullYear(), e.selected.value, this.value.getDate());
            return this.doSelect({
                name: this.name,
                value: i
            }),
            this.setValue(i),
            !0
        },
        updateYear: function(t, e) {
            if ( - 1 != e.originator.selected) {
                var i = this.calcDate(this.minYear + e.originator.selected, this.value.getMonth(), this.value.getDate());
                this.doSelect({
                    name: this.name,
                    value: i
                }),
                this.setValue(i)
            }
            return ! 0
        },
        calcDate: function(t, e, i) {
            return new Date(t, e, i, this.value.getHours(), this.value.getMinutes(), this.value.getSeconds(), this.value.getMilliseconds())
        },
        refresh: function() {
            this.destroyClientControls(),
            this.initDefaults(),
            this.render()
        }
    })
})(enyo, this);

// ../lib/onyx/source/TimePicker.js
(function(t, e) {
    t.kind({
        name: "onyx.TimePicker",
        classes: "onyx-toolbar-inline",
        published: {
            disabled: !1,
            locale: "en-US",
            is24HrMode: null,
            value: null
        },
        events: {
            onSelect: ""
        },
        create: function() {
            this.inherited(arguments),
            e.ilib && (this.locale = e.ilib.getLocale()),
            this.initDefaults()
        },
        initDefaults: function() {
            if (this._strAm = "AM", this._strPm = "PM", e.ilib) {
                this._tf = new e.ilib.DateFmt({
                    locale: this.locale
                });
                var t = new e.ilib.DateFmt({
                    locale: this.locale,
                    type: "time",
                    template: "a"
                }),
                i = e.ilib.Date.newInstance({
                    locale: this.locale,
                    hour: 1
                });
                this._strAm = t.format(i),
                i.hour = 13,
                this._strPm = t.format(i),
                null == this.is24HrMode && (this.is24HrMode = "24" == this._tf.getClock())
            } else null == this.is24HrMode && (this.is24HrMode = !1);
            this.setupPickers(this._tf ? this._tf.getTimeComponents() : "hma");
            var n, o = this.value = this.value || new Date;
            if (this.is24HrMode) for (n = 0; 24 > n; n++) this.$.hourPicker.createComponent({
                content: n,
                value: n,
                active: n == o.getHours()
            });
            else {
                var s = o.getHours();
                for (s = 0 === s ? 12 : s, n = 1; 12 >= n; n++) this.$.hourPicker.createComponent({
                    content: n,
                    value: n,
                    active: n == (s > 12 ? s % 12 : s)
                })
            }
            for (n = 0; 59 >= n; n++) this.$.minutePicker.createComponent({
                content: 10 > n ? "0" + n: n,
                value: n,
                active: n == o.getMinutes()
            });
            o.getHours() >= 12 ? this.$.ampmPicker.createComponents([{
                content: this._strAm
            },
            {
                content: this._strPm,
                active: !0
            }]) : this.$.ampmPicker.createComponents([{
                content: this._strAm,
                active: !0
            },
            {
                content: this._strPm
            }]),
            this.$.ampmPicker.getParent().setShowing(!this.is24HrMode)
        },
        setupPickers: function(t) { - 1 !== t.indexOf("h") && this.createHour(),
            -1 !== t.indexOf("m") && this.createMinute(),
            -1 !== t.indexOf("a") && this.createAmPm()
        },
        createHour: function() {
            this.createComponent({
                kind: "onyx.PickerDecorator",
                onSelect: "updateHour",
                components: [{
                    classes: "onyx-timepicker-hour",
                    name: "hourPickerButton",
                    disabled: this.disabled
                },
                {
                    name: "hourPicker",
                    kind: "onyx.Picker"
                }]
            })
        },
        createMinute: function() {
            this.createComponent({
                kind: "onyx.PickerDecorator",
                onSelect: "updateMinute",
                components: [{
                    classes: "onyx-timepicker-minute",
                    name: "minutePickerButton",
                    disabled: this.disabled
                },
                {
                    name: "minutePicker",
                    kind: "onyx.Picker"
                }]
            })
        },
        createAmPm: function() {
            this.createComponent({
                kind: "onyx.PickerDecorator",
                onSelect: "updateAmPm",
                components: [{
                    classes: "onyx-timepicker-ampm",
                    name: "ampmPickerButton",
                    disabled: this.disabled
                },
                {
                    name: "ampmPicker",
                    kind: "onyx.Picker"
                }]
            })
        },
        disabledChanged: function() {
            this.$.hourPickerButton.setDisabled(this.disabled),
            this.$.minutePickerButton.setDisabled(this.disabled),
            this.$.ampmPickerButton.setDisabled(this.disabled)
        },
        localeChanged: function() {
            this.is24HrMode = null,
            this.refresh()
        },
        is24HrModeChanged: function() {
            this.refresh()
        },
        valueChanged: function() {
            this.refresh()
        },
        updateHour: function(t, e) {
            var i = e.selected.value;
            if (!this.is24HrMode) {
                var n = this.$.ampmPicker.getParent().controlAtIndex(0).content;
                i = i + (12 == i ? -12 : 0) + (this.isAm(n) ? 0 : 12)
            }
            return this.setValue(this.calcTime(i, this.value.getMinutes())),
            this.doSelect({
                name: this.name,
                value: this.value
            }),
            !0
        },
        updateMinute: function(t, e) {
            return this.setValue(this.calcTime(this.value.getHours(), e.selected.value)),
            this.doSelect({
                name: this.name,
                value: this.value
            }),
            !0
        },
        updateAmPm: function(t, e) {
            var i = this.value.getHours();
            return this.is24HrMode || (i += i > 11 ? this.isAm(e.content) ? -12 : 0 : this.isAm(e.content) ? 0 : 12),
            this.setValue(this.calcTime(i, this.value.getMinutes())),
            this.doSelect({
                name: this.name,
                value: this.value
            }),
            !0
        },
        calcTime: function(t, e) {
            return new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate(), t, e, this.value.getSeconds(), this.value.getMilliseconds())
        },
        isAm: function(t) {
            return t == this._strAm ? !0 : !1
        },
        refresh: function() {
            this.destroyClientControls(),
            this.initDefaults(),
            this.render()
        }
    })
})(enyo, this);

// ../lib/onyx/source/RadioButton.js
(function(t) {
    t.kind({
        name: "onyx.RadioButton",
        kind: "enyo.Button",
        classes: "onyx-radiobutton"
    })
})(enyo, this);

// ../lib/onyx/source/RadioGroup.js
(function(t) {
    t.kind({
        name: "onyx.RadioGroup",
        kind: "enyo.Group",
        defaultKind: "onyx.RadioButton",
        highlander: !0
    })
})(enyo, this);

// ../lib/onyx/source/ToggleButton.js
(function(t) {
    t.kind({
        name: "onyx.ToggleButton",
        classes: "onyx-toggle-button",
        published: {
            active: !1,
            value: !1,
            onContent: "On",
            offContent: "Off",
            disabled: !1
        },
        events: {
            onChange: ""
        },
        handlers: {
            ondragstart: "dragstart",
            ondrag: "drag",
            ondragfinish: "dragfinish"
        },
        components: [{
            name: "contentOn",
            classes: "onyx-toggle-content on"
        },
        {
            name: "contentOff",
            classes: "onyx-toggle-content off"
        },
        {
            classes: "onyx-toggle-button-knob"
        }],
        create: function() {
            this.inherited(arguments),
            this.value = Boolean(this.value || this.active),
            this.onContentChanged(),
            this.offContentChanged(),
            this.disabledChanged()
        },
        rendered: function() {
            this.inherited(arguments),
            this.updateVisualState()
        },
        updateVisualState: function() {
            this.addRemoveClass("off", !this.value),
            this.$.contentOn.setShowing(this.value),
            this.$.contentOff.setShowing(!this.value),
            this.setActive(this.value)
        },
        valueChanged: function() {
            this.updateVisualState(),
            this.doChange({
                value: this.value
            })
        },
        activeChanged: function() {
            this.setValue(this.active),
            this.bubble("onActivate")
        },
        onContentChanged: function() {
            this.$.contentOn.setContent(this.onContent || ""),
            this.$.contentOn.addRemoveClass("empty", !this.onContent)
        },
        offContentChanged: function() {
            this.$.contentOff.setContent(this.offContent || ""),
            this.$.contentOff.addRemoveClass("empty", !this.onContent)
        },
        disabledChanged: function() {
            this.addRemoveClass("disabled", this.disabled)
        },
        updateValue: function(t) {
            this.disabled || this.setValue(t)
        },
        tap: function() {
            this.updateValue(!this.value)
        },
        dragstart: function(t, e) {
            return e.horizontal ? (e.preventDefault(), this.dragging = !0, this.dragged = !1, !0) : void 0
        },
        drag: function(t, e) {
            if (this.dragging) {
                var i = e.dx;
                return Math.abs(i) > 10 && (this.updateValue(i > 0), this.dragged = !0),
                !0
            }
        },
        dragfinish: function(t, e) {
            this.dragging = !1,
            this.dragged && e.preventTap()
        }
    })
})(enyo, this);

// ../lib/onyx/source/ToggleIconButton.js
(function(t) {
    t.kind({
        name: "onyx.ToggleIconButton",
        kind: "onyx.Icon",
        published: {
            active: !1,
            value: !1
        },
        events: {
            onChange: ""
        },
        classes: "onyx-icon-button onyx-icon-toggle",
        activeChanged: function() {
            this.addRemoveClass("active", this.value),
            this.bubble("onActivate")
        },
        updateValue: function(t) {
            this.disabled || (this.setValue(t), this.doChange({
                value: this.value
            }))
        },
        tap: function() {
            this.updateValue(!this.value)
        },
        valueChanged: function() {
            this.setActive(this.value)
        },
        create: function() {
            this.inherited(arguments),
            this.value = Boolean(this.value || this.active)
        },
        rendered: function() {
            this.inherited(arguments),
            this.valueChanged(),
            this.removeClass("onyx-icon")
        }
    })
})(enyo, this);

// ../lib/onyx/source/Toolbar.js
(function(t) {
    t.kind({
        name: "onyx.Toolbar",
        classes: "onyx onyx-toolbar onyx-toolbar-inline",
        create: function() {
            this.inherited(arguments),
            this.hasClass("onyx-menu-toolbar") && t.platform.android >= 4 && this.applyStyle("position", "static")
        }
    })
})(enyo, this);

// ../lib/onyx/source/ProgressBar.js
(function(t) {
    t.kind({
        name: "onyx.ProgressBar",
        classes: "onyx-progress-bar",
        published: {
            progress: 0,
            min: 0,
            max: 100,
            barClasses: "",
            showStripes: !0,
            animateStripes: !0,
            increment: 0
        },
        events: {
            onAnimateProgressFinish: ""
        },
        components: [{
            name: "progressAnimator",
            kind: "enyo.Animator",
            onStep: "progressAnimatorStep",
            onEnd: "progressAnimatorComplete"
        },
        {
            name: "bar",
            classes: "onyx-progress-bar-bar"
        }],
        create: function() {
            this.inherited(arguments),
            this.progressChanged(),
            this.barClassesChanged(),
            this.showStripesChanged(),
            this.animateStripesChanged()
        },
        barClassesChanged: function(t) {
            this.$.bar.removeClass(t),
            this.$.bar.addClass(this.barClasses)
        },
        showStripesChanged: function() {
            this.$.bar.addRemoveClass("striped", this.showStripes)
        },
        animateStripesChanged: function() {
            this.$.bar.addRemoveClass("animated", this.animateStripes)
        },
        progressChanged: function() {
            this.progress = this.clampValue(this.min, this.max, this.progress);
            var t = this.calcPercent(this.progress);
            this.updateBarPosition(t)
        },
        calcIncrement: function(t) {
            return Math.round(t / this.increment) * this.increment
        },
        clampValue: function(t, e, i) {
            return Math.max(t, Math.min(i, e))
        },
        calcRatio: function(t) {
            return (t - this.min) / (this.max - this.min)
        },
        calcPercent: function(t) {
            return 100 * this.calcRatio(t)
        },
        updateBarPosition: function(t) {
            this.$.bar.applyStyle("width", t + "%")
        },
        animateProgressTo: function(t) {
            this.$.progressAnimator.play({
                startValue: this.progress,
                endValue: t,
                node: this.hasNode()
            })
        },
        progressAnimatorStep: function(t) {
            return this.setProgress(t.value),
            !0
        },
        progressAnimatorComplete: function(t) {
            return this.doAnimateProgressFinish(t),
            !0
        }
    })
})(enyo, this);

// ../lib/onyx/source/ProgressButton.js
(function(t) {
    t.kind({
        name: "onyx.ProgressButton",
        kind: "onyx.ProgressBar",
        classes: "onyx-progress-button",
        events: {
            onCancel: ""
        },
        components: [{
            name: "progressAnimator",
            kind: "enyo.Animator",
            onStep: "progressAnimatorStep",
            onEnd: "progressAnimatorComplete"
        },
        {
            name: "bar",
            classes: "onyx-progress-bar-bar onyx-progress-button-bar"
        },
        {
            name: "client",
            classes: "onyx-progress-button-client"
        },
        {
            kind: "onyx.Icon",
            src: "$lib/onyx/images/progress-button-cancel.png",
            classes: "onyx-progress-button-icon",
            ontap: "cancelTap"
        }],
        cancelTap: function() {
            this.doCancel()
        }
    })
})(enyo, this);

// ../lib/onyx/source/Slider.js
(function(t) {
    t.kind({
        name: "onyx.Slider",
        kind: "onyx.ProgressBar",
        classes: "onyx-slider",
        published: {
            value: 0,
            lockBar: !0,
            tappable: !0
        },
        events: {
            onChange: "",
            onChanging: "",
            onAnimateFinish: ""
        },
        showStripes: !1,
        handlers: {
            ondragstart: "dragstart",
            ondrag: "drag",
            ondragfinish: "dragfinish"
        },
        moreComponents: [{
            kind: "Animator",
            onStep: "animatorStep",
            onEnd: "animatorComplete"
        },
        {
            classes: "onyx-slider-taparea"
        },
        {
            name: "knob",
            classes: "onyx-slider-knob"
        }],
        create: function() {
            this.inherited(arguments),
            this.moreComponents[2].ondown = "knobDown",
            this.moreComponents[2].onup = "knobUp",
            this.createComponents(this.moreComponents),
            this.valueChanged()
        },
        valueChanged: function() {
            this.value = this.clampValue(this.min, this.max, this.value),
            this.$.animator.isAnimating() || this.updateBar(this.value)
        },
        updateBar: function(t) {
            var e = this.calcPercent(t);
            this.updateKnobPosition(e),
            this.lockBar && this.setProgress(t)
        },
        updateKnobPosition: function(t) {
            this.$.knob.applyStyle("left", t + "%")
        },
        calcKnobPosition: function(t) {
            var e = t.clientX - this.hasNode().getBoundingClientRect().left;
            return e / this.getBounds().width * (this.max - this.min) + this.min
        },
        dragstart: function(t, e) {
            return e.horizontal ? (e.preventDefault(), this.dragging = !0, t.addClass("pressed"), !0) : void 0
        },
        drag: function(t, e) {
            if (this.dragging) {
                var i = this.calcKnobPosition(e);
                return i = this.increment ? this.calcIncrement(i) : i,
                this.setValue(this.clampValue(this.min, this.max, i)),
                this.doChanging({
                    value: this.value
                }),
                !0
            }
        },
        dragfinish: function(t, e) {
            return this.dragging = !1,
            e.preventTap(),
            this.doChange({
                value: this.value
            }),
            t.removeClass("pressed"),
            !0
        },
        tap: function(t, e) {
            if (this.tappable) {
                var i = this.calcKnobPosition(e);
                return i = this.increment ? this.calcIncrement(i) : i,
                this.tapped = !0,
                this.animateTo(i),
                !0
            }
        },
        knobDown: function() {
            this.$.knob.addClass("pressed")
        },
        knobUp: function() {
            this.$.knob.removeClass("pressed")
        },
        animateTo: function(t) {
            this.$.animator.play({
                startValue: this.value,
                endValue: t,
                node: this.hasNode()
            }),
            this.setValue(t)
        },
        animatorStep: function(t) {
            return this.updateBar(t.value),
            !0
        },
        animatorComplete: function(t) {
            return this.tapped && (this.tapped = !1, this.doChange({
                value: this.value
            })),
            this.doAnimateFinish(t),
            !0
        }
    })
})(enyo, this);

// ../lib/onyx/source/RangeSlider.js
(function(t) {
    t.kind({
        name: "onyx.RangeSlider",
        kind: "onyx.ProgressBar",
        classes: "onyx-slider",
        published: {
            rangeMin: 0,
            rangeMax: 100,
            rangeStart: 0,
            rangeEnd: 100,
            beginValue: 0,
            endValue: 0
        },
        events: {
            onChange: "",
            onChanging: ""
        },
        showStripes: !1,
        showLabels: !1,
        handlers: {
            ondragstart: "dragstart",
            ondrag: "drag",
            ondragfinish: "dragfinish",
            ondown: "down"
        },
        moreComponents: [{
            name: "startKnob",
            classes: "onyx-slider-knob"
        },
        {
            name: "endKnob",
            classes: "onyx-slider-knob onyx-range-slider-knob"
        }],
        create: function() {
            this.inherited(arguments),
            this.createComponents(this.moreComponents),
            this.initControls()
        },
        rendered: function() {
            this.inherited(arguments);
            var t = this.calcPercent(this.beginValue);
            this.updateBarPosition(t)
        },
        initControls: function() {
            this.$.bar.applyStyle("position", "relative"),
            this.refreshRangeSlider(),
            this.showLabels && (this.$.startKnob.createComponent({
                name: "startLabel",
                kind: "onyx.RangeSliderKnobLabel"
            }), this.$.endKnob.createComponent({
                name: "endLabel",
                kind: "onyx.RangeSliderKnobLabel"
            })),
            this.$.startKnob.ondown = "knobDown",
            this.$.startKnob.onup = "knobUp",
            this.$.endKnob.ondown = "knobDown",
            this.$.endKnob.onup = "knobUp"
        },
        refreshRangeSlider: function() {
            this.beginValue = this.calcKnobPercent(this.rangeStart),
            this.endValue = this.calcKnobPercent(this.rangeEnd),
            this.beginValueChanged(),
            this.endValueChanged()
        },
        calcKnobRatio: function(t) {
            return (t - this.rangeMin) / (this.rangeMax - this.rangeMin)
        },
        calcKnobPercent: function(t) {
            return 100 * this.calcKnobRatio(t)
        },
        beginValueChanged: function(t) {
            if (void 0 === t) {
                var e = this.calcPercent(this.beginValue);
                this.updateKnobPosition(e, this.$.startKnob)
            }
        },
        endValueChanged: function(t) {
            if (void 0 === t) {
                var e = this.calcPercent(this.endValue);
                this.updateKnobPosition(e, this.$.endKnob)
            }
        },
        calcKnobPosition: function(t) {
            var e = t.clientX - this.hasNode().getBoundingClientRect().left;
            return e / this.getBounds().width * (this.max - this.min) + this.min
        },
        updateKnobPosition: function(t, e) {
            e.applyStyle("left", t + "%"),
            this.updateBarPosition()
        },
        updateBarPosition: function() {
            if (void 0 !== this.$.startKnob && void 0 !== this.$.endKnob) {
                var t = this.calcKnobPercent(this.rangeStart),
                e = this.calcKnobPercent(this.rangeEnd) - t;
                this.$.bar.applyStyle("left", t + "%"),
                this.$.bar.applyStyle("width", e + "%")
            }
        },
        calcRangeRatio: function(t) {
            return t / 100 * (this.rangeMax - this.rangeMin) + this.rangeMin - this.increment / 2
        },
        swapZIndex: function(t) {
            "startKnob" === t ? (this.$.startKnob.applyStyle("z-index", 1), this.$.endKnob.applyStyle("z-index", 0)) : "endKnob" === t && (this.$.startKnob.applyStyle("z-index", 0), this.$.endKnob.applyStyle("z-index", 1))
        },
        down: function(t) {
            this.swapZIndex(t.name)
        },
        dragstart: function(t, e) {
            return e.horizontal ? (e.preventDefault(), this.dragging = !0, t.addClass("pressed"), !0) : void 0
        },
        drag: function(t, e) {
            if (this.dragging) {
                var i, n, o, s = this.calcKnobPosition(e);
                if ("startKnob" === t.name && s >= 0) {
                    if (! (this.endValue >= s && -1 === e.xDirection || this.endValue >= s)) return this.drag(this.$.endKnob, e);
                    this.setBeginValue(s),
                    i = this.calcRangeRatio(this.beginValue),
                    n = this.increment ? this.calcIncrement(i + .5 * this.increment) : i,
                    o = this.calcKnobPercent(n),
                    this.updateKnobPosition(o, this.$.startKnob),
                    this.setRangeStart(n),
                    this.doChanging({
                        value: n
                    })
                } else if ("endKnob" === t.name && 100 >= s) {
                    if (! (s >= this.beginValue && 1 === e.xDirection || s >= this.beginValue)) return this.drag(this.$.startKnob, e);
                    this.setEndValue(s),
                    i = this.calcRangeRatio(this.endValue),
                    n = this.increment ? this.calcIncrement(i + .5 * this.increment) : i,
                    o = this.calcKnobPercent(n),
                    this.updateKnobPosition(o, this.$.endKnob),
                    this.setRangeEnd(n),
                    this.doChanging({
                        value: n
                    })
                }
                return ! 0
            }
        },
        dragfinish: function(t, e) {
            this.dragging = !1,
            e.preventTap();
            var i;
            return "startKnob" === t.name ? (i = this.calcRangeRatio(this.beginValue), this.doChange({
                value: i,
                startChanged: !0
            })) : "endKnob" === t.name && (i = this.calcRangeRatio(this.endValue), this.doChange({
                value: i,
                startChanged: !1
            })),
            t.removeClass("pressed"),
            !0
        },
        knobDown: function(t) {
            t.addClass("pressed")
        },
        knobUp: function(t) {
            t.removeClass("pressed")
        },
        rangeMinChanged: function() {
            this.refreshRangeSlider()
        },
        rangeMaxChanged: function() {
            this.refreshRangeSlider()
        },
        rangeStartChanged: function() {
            this.refreshRangeSlider()
        },
        rangeEndChanged: function() {
            this.refreshRangeSlider()
        },
        setStartLabel: function(t) {
            this.$.startKnob.waterfallDown("onSetLabel", t)
        },
        setEndLabel: function(t) {
            this.$.endKnob.waterfallDown("onSetLabel", t)
        }
    }),
    t.kind({
        name: "onyx.RangeSliderKnobLabel",
        classes: "onyx-range-slider-label",
        handlers: {
            onSetLabel: "setLabel"
        },
        setLabel: function(t, e) {
            this.setContent(e)
        }
    })
})(enyo, this);

// ../lib/onyx/source/Item.js
(function(t) {
    t.kind({
        name: "onyx.Item",
        classes: "onyx-item",
        published: {
            tapHighlight: !0
        },
        handlers: {
            onhold: "hold",
            onrelease: "release"
        },
        hold: function(t, e) {
            this.tapHighlight && onyx.Item.addRemoveFlyweightClass(this.controlParent || this, "onyx-highlight", !0, e)
        },
        release: function(t, e) {
            this.tapHighlight && onyx.Item.addRemoveFlyweightClass(this.controlParent || this, "onyx-highlight", !1, e)
        },
        statics: {
            addRemoveFlyweightClass: function(t, e, i, n, o) {
                var s = n.flyweight;
                s && (o = void 0 !== o ? o: n.index, s.performOnRow(o,
                function() {
                    t.addRemoveClass(e, i)
                }))
            }
        }
    })
})(enyo, this);

// ../lib/onyx/source/Spinner.js
(function(t) {
    t.kind({
        name: "onyx.Spinner",
        classes: "onyx-spinner",
        stop: function() {
            this.setShowing(!1)
        },
        start: function() {
            this.setShowing(!0)
        },
        toggle: function() {
            this.setShowing(!this.getShowing())
        }
    })
})(enyo, this);

// ../lib/onyx/source/MoreToolbar.js
(function(t) {
    t.kind({
        name: "onyx.MoreToolbar",
        classes: "onyx-toolbar onyx-more-toolbar",
        menuClass: "",
        movedClass: "",
        layoutKind: "FittableColumnsLayout",
        noStretch: !0,
        handlers: {
            onHide: "reflow"
        },
        published: {
            clientLayoutKind: "FittableColumnsLayout"
        },
        tools: [{
            name: "client",
            noStretch: !0,
            fit: !0,
            classes: "onyx-toolbar-inline"
        },
        {
            name: "nard",
            kind: "onyx.MenuDecorator",
            showing: !1,
            onActivate: "activated",
            components: [{
                kind: "onyx.IconButton",
                classes: "onyx-more-button"
            },
            {
                name: "menu",
                kind: "onyx.Menu",
                scrolling: !1,
                classes: "onyx-more-menu"
            }]
        }],
        initComponents: function() {
            this.menuClass && this.menuClass.length > 0 && !this.$.menu.hasClass(this.menuClass) && this.$.menu.addClass(this.menuClass),
            this.createChrome(this.tools),
            this.inherited(arguments),
            this.$.client.setLayoutKind(this.clientLayoutKind)
        },
        clientLayoutKindChanged: function() {
            this.$.client.setLayoutKind(this.clientLayoutKind)
        },
        reflow: function() {
            this.inherited(arguments),
            this.isContentOverflowing() ? (this.$.nard.show(), this.popItem() && this.reflow()) : this.tryPushItem() ? this.reflow() : this.$.menu.children.length || (this.$.nard.hide(), this.$.menu.hide())
        },
        activated: function(t, e) {
            this.addRemoveClass("active", e.originator.active)
        },
        popItem: function() {
            var t = this.findCollapsibleItem();
            if (t) {
                this.movedClass && this.movedClass.length > 0 && !t.hasClass(this.movedClass) && t.addClass(this.movedClass),
                this.$.menu.addChild(t, null);
                var e = this.$.menu.hasNode();
                return e && t.hasNode() && t.insertNodeInParent(e),
                !0
            }
        },
        pushItem: function() {
            var t = this.$.menu.children,
            e = t[0];
            if (e) {
                this.movedClass && this.movedClass.length > 0 && e.hasClass(this.movedClass) && e.removeClass(this.movedClass),
                this.$.client.addChild(e);
                var i = this.$.client.hasNode();
                if (i && e.hasNode()) {
                    for (var n, o, s = 0; this.$.client.children.length > s; s++) {
                        var a = this.$.client.children[s];
                        if (void 0 !== a.toolbarIndex && a.toolbarIndex != s) {
                            n = a,
                            o = s;
                            break
                        }
                    }
                    if (n && n.hasNode()) {
                        e.insertNodeInParent(i, n.node);
                        var r = this.$.client.children.pop();
                        this.$.client.children.splice(o, 0, r)
                    } else e.appendNodeToParent(i)
                }
                return ! 0
            }
        },
        tryPushItem: function() {
            if (this.pushItem()) {
                if (!this.isContentOverflowing()) return ! 0;
                this.popItem()
            }
        },
        isContentOverflowing: function() {
            if (this.$.client.hasNode()) {
                var t = this.$.client.children,
                e = t.length && t[t.length - 1].hasNode();
                if (e) return this.$.client.reflow(),
                e.offsetLeft + e.offsetWidth > this.$.client.node.clientWidth
            }
        },
        findCollapsibleItem: function() {
            for (var t, e = this.$.client.children,
            i = e.length - 1; t = e[i]; i--) {
                if (!t.unmoveable) return t;
                void 0 === t.toolbarIndex && (t.toolbarIndex = i)
            }
        }
    })
})(enyo, this);

// ../lib/onyx/source/IntegerPicker.js
(function(t) {
    t.kind({
        name: "onyx.IntegerPicker",
        kind: "onyx.Picker",
        published: {
            value: 0,
            min: 0,
            max: 9
        },
        create: function() {
            this.inherited(arguments),
            this.rangeChanged()
        },
        minChanged: function() {
            this.destroyClientControls(),
            this.rangeChanged(),
            this.render()
        },
        maxChanged: function() {
            this.destroyClientControls(),
            this.rangeChanged(),
            this.render()
        },
        rangeChanged: function() {
            for (var t = this.min; this.max >= t; t++) this.createComponent({
                content: t,
                active: t === this.value ? !0 : !1
            })
        },
        valueChanged: function() {
            var t = this.getClientControls(),
            e = t.length;
            this.value = Math.min(this.max, Math.max(this.value, this.min));
            for (var i = 0; e > i; i++) if (this.value === parseInt(t[i].content, 10)) {
                this.setSelected(t[i]);
                break
            }
        },
        selectedChanged: function(t) {
            t && t.removeClass("selected"),
            this.selected && (this.selected.addClass("selected"), this.doChange({
                selected: this.selected,
                content: this.selected.content
            })),
            this.setValue(parseInt(this.selected.content, 10))
        }
    })
})(enyo, this);

// ../lib/onyx/source/ContextualPopup.js
(function(t) {
    t.kind({
        name: "onyx.ContextualPopup",
        kind: "enyo.Popup",
        modal: !0,
        autoDismiss: !0,
        floating: !1,
        classes: "onyx-contextual-popup enyo-unselectable",
        published: {
            maxHeight: 100,
            scrolling: !0,
            title: void 0,
            actionButtons: []
        },
        statics: {
            subclass: function(t, e) {
                var i = t.prototype;
                e.actionButtons && (i.kindActionButtons = e.actionButtons, delete i.actionButtons)
            }
        },
        vertFlushMargin: 60,
        horizFlushMargin: 50,
        widePopup: 200,
        longPopup: 200,
        horizBuffer: 16,
        events: {
            onTap: ""
        },
        handlers: {
            onActivate: "childControlActivated",
            onRequestShowMenu: "requestShow",
            onRequestHideMenu: "requestHide"
        },
        components: [{
            name: "title",
            classes: "onyx-contextual-popup-title"
        },
        {
            classes: "onyx-contextual-popup-scroller",
            components: [{
                name: "client",
                kind: "enyo.Scroller",
                vertical: "auto",
                classes: "enyo-unselectable",
                thumb: !1,
                strategyKind: "TouchScrollStrategy"
            }]
        },
        {
            name: "actionButtons",
            classes: "onyx-contextual-popup-action-buttons"
        }],
        scrollerName: "client",
        create: function() {
            this.inherited(arguments),
            this.maxHeightChanged(),
            this.titleChanged(),
            this.actionButtonsChanged()
        },
        getScroller: function() {
            return this.$[this.scrollerName]
        },
        titleChanged: function() {
            this.$.title.setContent(this.title)
        },
        actionButtonsChanged: function() {
            this.actionButtons ? t.forEach(this.actionButtons,
            function(t) {
                t.kind = "onyx.Button",
                t.classes = t.classes + " onyx-contextual-popup-action-button",
                t.popup = this,
                t.actionButton = !0,
                this.$.actionButtons.createComponent(t, {
                    owner: this.getInstanceOwner()
                })
            },
            this) : this.kindActionButtons && t.forEach(this.kindActionButtons,
            function(t) {
                t.kind = "onyx.Button",
                t.classes = t.classes + " onyx-contextual-popup-action-button",
                t.popup = this,
                t.actionButton = !0,
                this.$.actionButtons.createComponent(t, {
                    owner: this
                })
            },
            this),
            this.hasNode() && this.$.actionButtons.render()
        },
        maxHeightChanged: function() {
            this.scrolling && this.getScroller().setMaxHeight(this.maxHeight + "px")
        },
        showingChanged: t.inherit(function(t) {
            return function() {
                t.apply(this, arguments),
                this.scrolling && this.getScroller().setShowing(this.showing),
                this.showing || (this.activator = this.activatorOffset = null),
                this.adjustPosition()
            }
        }),
        childControlActivated: function() {
            return ! 0
        },
        requestShow: function(t, e) {
            return this.activator = e.activator.hasNode(),
            this.show(),
            !0
        },
        requestHide: function() {
            this.setShowing(!1)
        },
        applyPosition: function(t) {
            var e = "";
            for (var i in t) e += i + ":" + t[i] + (isNaN(t[i]) ? "; ": "px; ");
            this.addStyles(e)
        },
        getPageOffset: function(t) {
            var e = this.getBoundingRect(t),
            i = void 0 === window.pageYOffset ? document.documentElement.scrollTop: window.pageYOffset,
            n = void 0 === window.pageXOffset ? document.documentElement.scrollLeft: window.pageXOffset,
            o = void 0 === e.height ? e.bottom - e.top: e.height,
            s = void 0 === e.width ? e.right - e.left: e.width;
            return {
                top: e.top + i,
                left: e.left + n,
                height: o,
                width: s
            }
        },
        adjustPosition: function() {
            if (this.showing && this.hasNode() && this.activator) {
                this.resetPositioning(),
                this.activatorOffset = this.getPageOffset(this.activator);
                var t = this.getViewWidth(),
                e = this.getViewHeight(),
                i = this.vertFlushMargin,
                n = e - this.vertFlushMargin,
                o = this.horizFlushMargin,
                s = t - this.horizFlushMargin;
                if (i > this.activatorOffset.top + this.activatorOffset.height || this.activatorOffset.top > n) {
                    if (this.applyVerticalFlushPositioning(o, s)) return;
                    if (this.applyHorizontalFlushPositioning(o, s)) return;
                    if (this.applyVerticalPositioning()) return
                } else if ((o > this.activatorOffset.left + this.activatorOffset.width || this.activatorOffset.left > s) && this.applyHorizontalPositioning()) return;
                var a = this.getBoundingRect(this.node);
                if (a.width > this.widePopup) {
                    if (this.applyVerticalPositioning()) return
                } else if (a.height > this.longPopup && this.applyHorizontalPositioning()) return;
                if (this.applyVerticalPositioning()) return;
                if (this.applyHorizontalPositioning()) return
            }
        },
        initVerticalPositioning: function() {
            this.resetPositioning(),
            this.addClass("vertical");
            var t = this.getBoundingRect(this.node),
            e = this.getViewHeight();
            return this.floating ? e / 2 > this.activatorOffset.top ? (this.applyPosition({
                top: this.activatorOffset.top + this.activatorOffset.height,
                bottom: "auto"
            }), this.addClass("below")) : (this.applyPosition({
                top: this.activatorOffset.top - t.height,
                bottom: "auto"
            }), this.addClass("above")) : t.top + t.height > e && e - t.bottom < t.top - t.height ? this.addClass("above") : this.addClass("below"),
            t = this.getBoundingRect(this.node),
            t.top + t.height > e || 0 > t.top ? !1 : !0
        },
        applyVerticalPositioning: function() {
            if (!this.initVerticalPositioning()) return ! 1;
            var t = this.getBoundingRect(this.node),
            e = this.getViewWidth();
            if (this.floating) {
                var i = this.activatorOffset.left + this.activatorOffset.width / 2 - t.width / 2;
                i + t.width > e ? (this.applyPosition({
                    left: this.activatorOffset.left + this.activatorOffset.width - t.width
                }), this.addClass("left")) : 0 > i ? (this.applyPosition({
                    left: this.activatorOffset.left
                }), this.addClass("right")) : this.applyPosition({
                    left: i
                })
            } else {
                var n = this.activatorOffset.left + this.activatorOffset.width / 2 - t.left - t.width / 2;
                t.right + n > e ? (this.applyPosition({
                    left: this.activatorOffset.left + this.activatorOffset.width - t.right
                }), this.addRemoveClass("left", !0)) : 0 > t.left + n ? this.addRemoveClass("right", !0) : this.applyPosition({
                    left: n
                })
            }
            return ! 0
        },
        applyVerticalFlushPositioning: function(t, e) {
            if (!this.initVerticalPositioning()) return ! 1;
            var i = this.getBoundingRect(this.node),
            n = this.getViewWidth();
            return t > this.activatorOffset.left + this.activatorOffset.width / 2 ? (this.activatorOffset.left + this.activatorOffset.width / 2 < this.horizBuffer ? this.applyPosition({
                left: this.horizBuffer + (this.floating ? 0 : -i.left)
            }) : this.applyPosition({
                left: this.activatorOffset.width / 2 + (this.floating ? this.activatorOffset.left: 0)
            }), this.addClass("right"), this.addClass("corner"), !0) : this.activatorOffset.left + this.activatorOffset.width / 2 > e ? (this.activatorOffset.left + this.activatorOffset.width / 2 > n - this.horizBuffer ? this.applyPosition({
                left: n - this.horizBuffer - i.right
            }) : this.applyPosition({
                left: this.activatorOffset.left + this.activatorOffset.width / 2 - i.right
            }), this.addClass("left"), this.addClass("corner"), !0) : !1
        },
        initHorizontalPositioning: function() {
            this.resetPositioning();
            var t = this.getBoundingRect(this.node),
            e = this.getViewWidth();
            return this.floating ? e / 2 > this.activatorOffset.left + this.activatorOffset.width ? (this.applyPosition({
                left: this.activatorOffset.left + this.activatorOffset.width
            }), this.addRemoveClass("left", !0)) : (this.applyPosition({
                left: this.activatorOffset.left - t.width
            }), this.addRemoveClass("right", !0)) : this.activatorOffset.left - t.width > 0 ? (this.applyPosition({
                left: this.activatorOffset.left - t.left - t.width
            }), this.addRemoveClass("right", !0)) : (this.applyPosition({
                left: this.activatorOffset.width
            }), this.addRemoveClass("left", !0)),
            this.addRemoveClass("horizontal", !0),
            t = this.getBoundingRect(this.node),
            0 > t.left || t.left + t.width > e ? !1 : !0
        },
        applyHorizontalPositioning: function() {
            if (!this.initHorizontalPositioning()) return ! 1;
            var t = this.getBoundingRect(this.node),
            e = this.getViewHeight(),
            i = this.activatorOffset.top + this.activatorOffset.height / 2;
            return this.floating ? i >= e / 2 - .05 * e && e / 2 + .05 * e >= i ? this.applyPosition({
                top: this.activatorOffset.top + this.activatorOffset.height / 2 - t.height / 2,
                bottom: "auto"
            }) : e / 2 > this.activatorOffset.top + this.activatorOffset.height ? (this.applyPosition({
                top: this.activatorOffset.top - this.activatorOffset.height,
                bottom: "auto"
            }), this.addRemoveClass("high", !0)) : (this.applyPosition({
                top: this.activatorOffset.top - t.height + 2 * this.activatorOffset.height,
                bottom: "auto"
            }), this.addRemoveClass("low", !0)) : i >= e / 2 - .05 * e && e / 2 + .05 * e >= i ? this.applyPosition({
                top: (this.activatorOffset.height - t.height) / 2
            }) : e / 2 > this.activatorOffset.top + this.activatorOffset.height ? (this.applyPosition({
                top: -this.activatorOffset.height
            }), this.addRemoveClass("high", !0)) : (this.applyPosition({
                top: t.top - t.height - this.activatorOffset.top + this.activatorOffset.height
            }), this.addRemoveClass("low", !0)),
            !0
        },
        applyHorizontalFlushPositioning: function(t, e) {
            if (!this.initHorizontalPositioning()) return ! 1;
            var i = this.getBoundingRect(this.node),
            n = this.getViewHeight();
            return this.floating ? n / 2 > this.activatorOffset.top ? (this.applyPosition({
                top: this.activatorOffset.top + this.activatorOffset.height / 2
            }), this.addRemoveClass("high", !0)) : (this.applyPosition({
                top: this.activatorOffset.top + this.activatorOffset.height / 2 - i.height
            }), this.addRemoveClass("low", !0)) : i.top + i.height > n && n - i.bottom < i.top - i.height ? (this.applyPosition({
                top: i.top - i.height - this.activatorOffset.top - this.activatorOffset.height / 2
            }), this.addRemoveClass("low", !0)) : (this.applyPosition({
                top: this.activatorOffset.height / 2
            }), this.addRemoveClass("high", !0)),
            t > this.activatorOffset.left + this.activatorOffset.width ? (this.addClass("left"), this.addClass("corner"), !0) : this.activatorOffset.left > e ? (this.addClass("right"), this.addClass("corner"), !0) : !1
        },
        getBoundingRect: function(t) {
            var e = t.getBoundingClientRect();
            return e.width && e.height ? e: {
                left: e.left,
                right: e.right,
                top: e.top,
                bottom: e.bottom,
                width: e.right - e.left,
                height: e.bottom - e.top
            }
        },
        getViewHeight: function() {
            return void 0 === window.innerHeight ? document.documentElement.clientHeight: window.innerHeight
        },
        getViewWidth: function() {
            return void 0 === window.innerWidth ? document.documentElement.clientWidth: window.innerWidth
        },
        resetPositioning: function() {
            this.removeClass("right"),
            this.removeClass("left"),
            this.removeClass("high"),
            this.removeClass("low"),
            this.removeClass("corner"),
            this.removeClass("below"),
            this.removeClass("above"),
            this.removeClass("vertical"),
            this.removeClass("horizontal"),
            this.applyPosition({
                left: "auto"
            }),
            this.applyPosition({
                top: "auto"
            })
        },
        handleResize: function() {
            this.inherited(arguments),
            this.adjustPosition()
        }
    })
})(enyo, this);