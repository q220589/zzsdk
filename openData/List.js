class List {
    constructor(width, height) {
        //画布
        this.canvas = wx.createCanvas();
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        //滚动之后的减速系数
                this.SCROLL_BRAKE = .06;
        this.y = 10;
        this.x = 20;
        this.top = 0;
        this.bottom = 10;
        this.left = 0;
        this.spaceY = 18;
        this.spaceX = 0;
        this.items = [];
    }
    update(items) {
        this.startY = this.top;
        this.deltaY = this.startY;
        this.items = items;
        this.fpsStartTime = null;
        this.fpsDeltaTimer = 0;
        this.moveRange = 0;
        this.moveSpeed = null;
        let itemsHeigth = 0;
        for (const item of items) {
            itemsHeigth += item.canvas.height + this.spaceY;
        }
        this.maxDeltaY = -(itemsHeigth + this.bottom - this.canvas.height - this.spaceY);
    }
    destroy() {
        this.clear();
        this.canvas = null;
    }
    touch(data) {
        switch (data.cmd) {
          case "touch_start":
            this.moveSpeed = null;
            break;

          case "touch_move":
            this.scroll(data.deltaY);
            break;

          case "touch_end":
            this.startY = this.deltaY;
            this.moveRange = 0;
            this.moveSpeed = data.speed;
            break;

          case "touch_cancel":
            this.startY = this.deltaY;
            this.moveRange = 0;
            this.moveSpeed = data.speed;
            break;
        }
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
    * deltaY 指在一次触摸事件中，据触摸初始点的Y轴变更值
    */    scroll(deltaY) {
        // cocos和canvas坐标系Y轴方向相反
        this.deltaY = Math.min(this.top, Math.max(this.maxDeltaY, deltaY + this.startY));
    }
    autoScroll() {
        if (this.moveSpeed !== null) {
            this.moveRange += this.fpsDeltaTimer * this.moveSpeed;
            this.scroll(this.moveRange);
            if (this.moveSpeed > 0) {
                this.moveSpeed -= this.SCROLL_BRAKE;
                if (this.moveSpeed <= 0) {
                    this.moveSpeed = null;
                    this.startY = this.deltaY;
                    this.moveRange = 0;
                }
            } else {
                this.moveSpeed += this.SCROLL_BRAKE;
                if (this.moveSpeed >= 0) {
                    this.moveSpeed = null;
                    this.startY = this.deltaY;
                    this.moveRange = 0;
                }
            }
        }
    }
    render(delta) {
        this.fpsDeltaTimer = delta;
        this.autoScroll();
        this.clear();
        let i = 0;
        for (const item of this.items) {
            item.setPosition(0 + this.left, this.deltaY + i * (item.canvas.height + this.spaceY));
            this.renderItem(item);
            i++;
        }
    }
    renderItem(item) {
        if (!this.isItemVisible(item)) {
            return;
        }
        this.ctx.drawImage(item.canvas, item.x, item.y);
    }
    isItemVisible(item) {
        if (!item.rendered) {
            return false;
        }
        if (item.y < -item.canvas.height || item.y > this.canvas.height) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = List;