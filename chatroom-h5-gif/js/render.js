function render(data, template) {
    template = template || "";
    data = data || [""];
    var re = /{{((?:(?!}}).)+)}}/g, reExp = /(^( )?(var|if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
    var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    var match;
    while (match = re.exec(template)) {
        add(template.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(template.substr(cursor, template.length - cursor));
    code += 'return r.join("");';

    data = isNaN(data.length) ? [data] : data;
    var html = "";
    for (var i = 0, length = data.length; i < length; i++) {
        html += new Function(code.replace(/[\r\t\n]/g, '')).apply(data[i]);
    }
    return html;
}

function renderUI(data, tpl) {
    var _tpl = data.content.user ? ['<div class="rc-message">',
        '<div class="rc-message-main">',
        '<span class="rc-message-name">{{this.content.user.name}} :</span>',
        '    <span class="rc-message-content">{{this.content.content}}</span>',
        '</div>',
        '</div>'].join("") : ['<div class="rc-message">',
            '<div class="rc-message-main">',
            '    <span class="rc-message-content rc-content-color">{{this.content.content}}</span>',
            '</div>',
            '</div>'].join("");
    tpl = tpl || _tpl;

    return render(data, tpl);
}

function renderUserUI(data, tpl) {
    var _tpl = [' <div class="rc-user-main" id="{{this.id}}">',
        '<img class="rc-user-img" src="{{this.portrait}}">',
        '<div class="rc-user-info">',
        '    <span class="rc-user-name">{{this.name}}</span>',
        '    <span class="rc-user-num">进入了直播间</span>',
        '</div></div>'].join("");
    tpl = tpl || _tpl;

    return render(data, tpl);
}
