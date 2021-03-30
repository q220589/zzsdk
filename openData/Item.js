class Item {
    /**
     * @param {Object} info 显示的信息
     */
    constructor(info, w, h) {
        this.canvas = wx.createCanvas();
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.baseLine = "middle";
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = "high";
        this.avatarUrl = info.avatarUrl;
        this.bgUrl = info.bgUrl;
        this.info = info;
        this.rendered = false;
    }
    setInfo(info) {
        this.avatarUrl = info.avatarUrl;
        this.bgUrl = info.bgUrl;
        this.info = info;
    }
    destroy() {
        this.canvas = null;
    }
    drawFriend(avatarImg, bgImg) {
        this.clear();
        this.ctx.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(avatarImg, 80, 7, 68, 68);
        let name = this.info.nickName.length > 6 ? this.info.nickName.substr(0, 8) : this.info.nickName;
        this.drawText(name, 181, 30, 26, "#000000", "left");
        this.drawText(this.info.score, 537, 27, 26, "#000000", "right");
        let rank = this.info.rank + 1 + "";
        let lineWidth = 0;
        for (let str of rank) {
            lineWidth += this.ctx.measureText(str).width;
        }
        let width = 74;
        let size = lineWidth > width ? Math.floor(28 * width / lineWidth) : 28;
        this.drawText(rank, 38, 31, size, "#000000", "center", "bold");
        this.rendered = true;
    }
    drawLite(avatarImg, bgImg) {
        this.clear();
        let name = this.info.nickName.length > 6 ? this.info.nickName.substr(0, 6) : this.info.nickName;
        this.ctx.drawImage(avatarImg, 33, 52, 112, 112);
        this.drawText(this.info.rank + 1, 90, 0, 30, "#ffffff", "center", "bold");
        this.drawText(this.info.score, 90, 188, 31, "#ffffff", "center");
        this.rendered = true;
    }
    drawOver(avatarImg) {
        this.clear();
        this.ctx.drawImage(avatarImg, 0, 0, this.canvas.width, this.canvas.height);
        this.rendered = true;
    }
    //游戏中动态排行
    drawLoop(avatarImg, bgImg, tagImg, rank) {
        this.clear();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, 242, 60);
        this.ctx.drawImage(bgImg, 0, 0, 242, 60);
        this.ctx.drawImage(tagImg, 35, 14, 125, 31);
        this.ctx.drawImage(avatarImg, 182, 0, 60, 60);
        this.rendered = true;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawText(text, x, y, fontSize, color, align, weight) {
        let _weight = weight ? weight : "normal";
        this.ctx.textBaseline = "hanging";
        this.ctx.font = `${_weight} ${fontSize}px Microsoft YaHei`;
        this.ctx.fillStyle = color || "#ffffff";
        this.ctx.textAlign = align || "left";
        this.ctx.fillText(text, x, y, 750);
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

module.exports = Item;