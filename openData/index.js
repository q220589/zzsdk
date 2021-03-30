/**
 * @author ForeverZi
 * @create date 2019-01-21 02:36:31
 * @modify date 2019-01-21 02:36:31
 * @desc [description]
 */
const Item = require("./Item");

const Cache = require("./Cache");

const List = require("./List");

const imgCache = new Cache(img => img = null);

const canvasCache = new Cache(canv => canv = null);

const RES_DIR = "";

// const ITEM_BG_PATH = [
//     'ui/rank/bg_rank_1.png',
//     'ui/rank/cell_rank_0.png',
//     'ui/rank/cell_rank_1.png',
//     'ui/rank/tag_rank_0.png',
//     'ui/rank/tag_rank_1.png',
//     'ui/rank/avater_default.png',
//     'ui/rank/bg_mask.png',
//     'ui/rank/cell_rank_2.png',
// ];
const ITEM_BG_PATH = [ "ui/rank/bg_rank_1.png", "ui/rank/cell_rank_0.png", "ui/rank/cell_rank_1.png", "ui/rank/avater_default.png", "ui/rank/bg_mask.png", "ui/rank/cell_rank_2.png" ];

const bgimgInfo = {
    width: 128,
    height: 128
};

//好友/群排行榜
const friendCfg = {
    y: 10,
    x: 20,
    top: 0,
    bottom: 10,
    left: 0,
    width: 558,
    height: 690,
    spaceY: 18,
    spaceX: 0,
    cellSize: {
        width: 558,
        height: 82
    },
    meOffsetY: 42
};

//小排行
const liteCfg = {
    y: 30,
    x: 30,
    top: 0,
    bottom: 0,
    left: 0,
    width: 600,
    height: 280,
    spaceY: 0,
    spaceX: 0,
    cellSize: {
        width: 180,
        height: 280
    }
};

//复活页超越好友
const overCfg = {
    y: 0,
    x: 0,
    top: 18,
    bottom: 0,
    left: 385,
    width: 750,
    height: 92,
    spaceY: 0,
    spaceX: 7,
    cellSize: {
        width: 50,
        height: 50
    }
};

//游戏中超越好友
const loopCfg = {
    y: 0,
    x: 0,
    top: 0,
    bottom: 0,
    left: 0,
    width: 242,
    height: 60,
    spaceY: 0,
    spaceX: 0,
    cellSize: {
        width: 242,
        height: 60
    }
};

class RankListRenderer {
    constructor() {
        this.ctx = null;
        this.meData = null;
        this.userAvatar = null;
        this.userRank = -1;
        //总排名
                this.userScore = -1;
        //游戏最高分
                this.overScore = 0;
        //本次游戏分数
                this.overRank = 0;
        //本次游戏排名
                this.loopFriend = null;
        //被超越的好友
                this.overAvatarUrl = null;
        this.userAvatar = [];
        this._existFriendRank = false;
        this._isLoadFinish = false;
    }
    showFriendRank() {
        let friendList = this.friendList;
        if (!friendList) {
            friendList = new List(friendCfg.width, friendCfg.height);
            friendList.y = friendCfg.y;
            friendList.x = friendCfg.x;
            friendList.top = friendCfg.top;
            friendList.bottom = friendCfg.bottom;
            friendList.left = friendCfg.left;
            friendList.spaceY = friendCfg.spaceY;
            friendList.spaceX = friendCfg.spaceX;
            this.friendList = friendList;
        }
        this.refreshRank();
        this.startFrame();
    }
    showLiteRank() {
        this.lites = [];
        this.refreshRank();
    }
    showOverRank() {
        this.refreshRank();
    }
    showLoopRank() {
        this.refreshRank();
    }
    initCanvas() {
        this.sharedCanvas = wx.getSharedCanvas();
        this.ctx = this.sharedCanvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = "high";
    }
    init() {
        // this.sysInfo = wx.getSystemInfoSync();
        this.listen();
    }
    listen() {
        let self = this;
        self.initCanvas();
        wx.onMessage(data => {
            if (data.cmd && !data.cmd.startsWith("touch")) {
                console.log("主域消息：", data.cmd, data);
                switch (data.cmd) {
                  case "submit_scroe":
                    self.refreshScroe(data.score);
                    break;

                  case "destroy_friend_rank":
                    self.destroy();
                    break;

                  case "open_friend_rank":
                    self.friendRankActive = true;
                    self.liteRankActive = false;
                    self.overRankActive = false;
                    self.loopRankActive = false;
                    self.showFriendRank();
                    break;

                  case "close_friend_rank":
                    self.friendRankActive = false;
                    self.hideFriendRank();
                    break;

                  case "open_lite_rank":
                    self.liteRankActive = true;
                    self.friendRankActive = false;
                    self.overRankActive = false;
                    self.loopRankActive = false;
                    self.showLiteRank();
                    break;

                  case "close_lite_rank":
                    self.liteRankActive = false;
                    // self.hideLiteRank();
                                        break;

                  case "open_over_friend":
                    self.overRankActive = true;
                    self.friendRankActive = false;
                    self.liteRankActive = false;
                    self.loopRankActive = false;
                    self.overScore = data.score;
                    self.showOverRank();
                    break;

                  case "close_over_friend":
                    self.overRankActive = false;
                    // self.hideOverRank();
                                        break;

                  case "open_loop_friend":
                    self.loopRankActive = true;
                    self.liteRankActive = false;
                    self.friendRankActive = false;
                    self.overRankActive = false;
                    self.overScore = data.score;
                    self.showLoopRank();
                    // self.hideLoopRank();
                                        break;

                  case "close_loop_friend":
                    self.loopRankActive = false;
                    // self.hideLoopRank();
                                        break;

                  case "restart_game":
                    this.overAvatarUrl = null;
                    break;
                }
            } else {
                this.friendList && this.friendList.touch(data);
            }
        });
    }
    hideFriendRank() {
        this.stopFrame();
        this.clear();
        if (this.friendList) {
            this.friendList.destroy();
            this.friendList = null;
        }
    }
    destroy() {
        this.hideFriendRank();
        for (const item of this.items) {
            item.destroy();
        }
        this.itemMe && this.itemMe.destroy();
        this.items = null;
        this.itemMe = null;
        imgCache.clear();
        canvasCache.clear();
    }
    refreshRank() {
        let self = this;
        self._isLoadFinish = false;
        if (!self.meData) {
            // console.log("refreshRank wx.getUserInfo");
            wx.getUserInfo({
                openIdList: [ "selfOpenId" ],
                //获取自己
                success: function(res) {
                    let info = res.data[0];
                    let nickname = "";
                    if (info.nickName) {
                        nickname = info.nickName;
                    } else if (info.nickname) {
                        nickname = info.nickname;
                    } else if (info.nick) {
                        nickname = info.nick;
                    }
                    let avatarUrl = "";
                    if (info.avatarUrl) {
                        avatarUrl = info.avatarUrl;
                    } else if (info.avatar) {
                        avatarUrl = info.avatar;
                    }
                    self.meData = {};
                    self.meData.avatarUrl = avatarUrl;
                    self.meData.nickName = nickname;
                    self.overAvatarUrl = avatarUrl;
                    self.getFriendRank();
                },
                fail: function(res) {
                    console.error("wx.getUserInfo fail!");
                }
            });
        } else {
            self.getFriendRank();
        }
    }
    getFriendRank() {
        var self = this;
        wx.getFriendCloudStorage({
            keyList: [ "score" ],
            success: res => {
                // console.log("getFriendRank");
                // console.log(res.data);
                const data = res.data;
                const details = [];
                for (const info of data) {
                    const detailItem = {};
                    detailItem.avatarUrl = info.avatarUrl != "" ? info.avatarUrl : "ui/rank/avater_default.png";
                    detailItem.nickName = info.nickname != "" ? info.nickname : "神秘玩家";
                    detailItem.score = 0;
                    const list = info.KVDataList;
                    const scoreInfo = list.find(e => e.key === "score");
                    if (scoreInfo) {
                        detailItem.score = JSON.parse(scoreInfo.value);
                    }
                    details.push(detailItem);
                }
                let rankCount = details.length;
                this._existFriendRank = rankCount > 0;
                if (!this._existFriendRank) {
                    console.error("rank data is null.");
                    return;
                }
                if (rankCount > 1) details.sort((a, b) => b.score - a.score);
                if (self.friendRankActive) self.createItems(details);
                if (self.liteRankActive) self.createLites(details);
                if (self.overRankActive || self.loopRankActive) self.createOver(details);
                self.loadImg();
            },
            fail: err => {
                console.log("获取排行榜失败：", err);
            }
        });
        //--以下是测试代码,测试时先注销上面的代码
        // const details2 = [];
        // for (let i = 0; i < 50; i++) {
        //     const detailItem = {};
        //     detailItem.score = Math.floor(Math.random() * (300 - 0 + 1) + 0);
        //     detailItem.avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/DtXoGW0dQkw6F0N26oDL8hj1f17IXpWOXHZL78bxVoNToaN2IddprEpQYwbia1KjRM22r9BBjqCDwgcFegpbEeQ/132?r=" + i;
        //     detailItem.nickName = "初田" + i;
        //     if (i == 10) {
        //         detailItem.nickName = "煊文" + i;
        //         detailItem.avatarUrl = self.meData.avatarUrl;
        //     }
        //     details2.push(detailItem);
        // }
        // this._existFriendRank = true;
        // if (self.friendRankActive) self.createItems(details2);
        // if (self.liteRankActive) self.createLites(details2);
        // if (self.overRankActive || self.loopRankActive) self.createOver(details2);
        // self.loadImg();
        }
    createOver(list) {
        let index = 0;
        let listCount = list.length;
        //超越最后一名
                let _overRank = listCount - 1;
        //查找当前分数的前一名
                for (const info of list) {
            if (info.score < this.overScore) {
                _overRank = index - 1;
                break;
            }
            index++;
        }
        //如果即将超越的人是自己，向前提一名
                if (list[_overRank] && list[_overRank].avatarUrl == this.meData.avatarUrl) {
            _overRank -= 1;
        }
        let rank = 0;
        this.overs = [];
        this.userAvatar = [];
        if (_overRank > 0) {
            if (this.overRankActive) {
                for (index = 0; index < 3; ++index) {
                    rank = _overRank - index;
                    if (rank >= 0) {
                        let info = list[rank];
                        let item = new Item(info, overCfg.cellSize.width, overCfg.cellSize.height);
                        item.setPosition(overCfg.left + index * (overCfg.spaceX + overCfg.cellSize.width), overCfg.top);
                        this.overs.push(item);
                        this.userAvatar.push(info.avatarUrl);
                    }
                }
            }
            rank = _overRank;
        }
        if (!this.loopFriend) {
            this.loopFriend = new Item(list[rank], loopCfg.cellSize.width, loopCfg.cellSize.height);
            this.loopFriend.setPosition(0, 0);
        } else {
            this.loopFriend.setInfo(list[rank]);
        }
        this.userAvatar.push(list[rank].avatarUrl);
        this.overRank = _overRank;
    }
    //动态排行榜
    createLites(list) {
        let i = 0;
        for (const info of list) {
            if (info.avatarUrl == this.meData.avatarUrl) {
                this.userRank = i;
                break;
            }
            i++;
        }
        let listCount = list.length;
        let userRanking = this.userRank;
        this.lites = [];
        if (listCount < 2) {
            let info = list[0];
            info.bgUrl = "ui/rank/cell_rank_1.png";
            info.rank = 0;
            let item = new Item(info, liteCfg.cellSize.width, liteCfg.cellSize.height);
            item.setPosition(liteCfg.x + liteCfg.cellSize.width, liteCfg.y);
            this.lites.push(item);
        } else {
            let last = listCount - 1;
            let left = 0;
            let center = 0;
            let right = 0;
            if (userRanking != -1) {
                //自己排名在之中
                left = userRanking - 1;
                center = userRanking;
                right = userRanking + 1;
                //自己是最后一名
                                if (userRanking == last) {
                    left = userRanking - 2;
                    center = userRanking - 1;
                    right = userRanking;
                    if (left < 0) {
                        left = userRanking - 1;
                        center = userRanking;
                        right = userRanking;
                    }
                }
                //自己第一名
                 else if (left < 0) {
                    left = userRanking;
                    center = userRanking + 1;
                    right = userRanking + 2;
                    if (right > last) {
                        left = userRanking;
                        center = userRanking + 1;
                        right = userRanking + 1;
                    }
                }
            } else {
                //自己未上榜
                left = last - 2;
                center = last - 1;
                right = last;
                if (left < 0) {
                    left = last - 1;
                    center = last;
                    right = last;
                }
            }
            let posX = 0;
            let posY = 0;
            let liteData = [ left, center, right ];
            let liteCount = listCount > 2 ? 3 : listCount;
            this.userAvatar = [];
            for (let i = 0; i < liteCount; ++i) {
                posX = liteCount > 1 ? i * liteCfg.cellSize.width : liteCfg.cellSize.width;
                let info = list[liteData[i]];
                info.bgUrl = "ui/rank/cell_rank_1.png";
                info.rank = i;
                let item = new Item(info, liteCfg.cellSize.width, liteCfg.cellSize.height);
                item.setPosition(posX + liteCfg.x, liteCfg.y);
                this.lites.push(item);
                this.userAvatar.push(info.avatarUrl);
            }
        }
    }
    createItems(infos) {
        this.items = [];
        this.userAvatar = [];
        this.itemMe = null;
        let i = 0;
        for (const info of infos) {
            info.bgUrl = ITEM_BG_PATH[0];
            info.rank = i;
            if (i < 50) {
                const item = new Item(info, friendCfg.cellSize.width, friendCfg.cellSize.height);
                this.items.push(item);
                this.userAvatar.push(info.avatarUrl);
            }
            if (info.avatarUrl == this.meData.avatarUrl) {
                this.userRank = i;
                this.userScore = info.score;
                this.itemMe = new Item(info, friendCfg.cellSize.width, friendCfg.cellSize.height);
                if (i >= 50) {
                    this.userAvatar.push(info.avatarUrl);
                    break;
                }
            }
            i++;
        }
    }
    loadImgFinish(url) {
        // 好友排行榜
        this._isLoadFinish = true;
        console.log("this._isLoadFinish =ture");
        if (this.friendRankActive) {
            //console.log("好友排行榜");
            for (const item of this.items) {
                item.drawFriend(imgCache.get(item.avatarUrl), imgCache.get(item.bgUrl));
            }
            this.friendList.update(this.items);
            if (this.itemMe) this.itemMe.drawFriend(imgCache.get(this.itemMe.avatarUrl), imgCache.get(this.itemMe.bgUrl));
        }
        // 动态排行榜
                if (this.liteRankActive) {
            //console.log("动态排行榜");
            this.ctx.clearRect(0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
            this.drawAtlas(0, 0, 600, 284, 0, 0, liteCfg.width, liteCfg.height, "ui/rank/cell_rank_2.png");
            let i = 0;
            for (const lite of this.lites) {
                lite.drawLite(imgCache.get(lite.avatarUrl), imgCache.get(lite.bgUrl));
                this.ctx.drawImage(lite.canvas, lite.x, lite.y);
                i++;
            }
        }
        // 超越好友
                let count = this.overs ? this.overs.length : 0;
        if (this.overRankActive) {
            this.ctx.clearRect(0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
            this.drawImg(0, 0, bgimgInfo.width, bgimgInfo.height, 0, 0, overCfg.width, overCfg.height, "ui/rank/bg_mask.png");
            this.drawImg(0, 0, 750, 92, 0, 0, overCfg.width, overCfg.height, "ui/rank/cell_rank_1.png");
            if (count > 0) {
                this.drawImg(0, 0, 126, 31, 232, 30, 126, 31, "ui/rank/tag_rank_0.png");
                for (const over of this.overs) {
                    over.drawOver(imgCache.get(over.avatarUrl));
                    this.ctx.drawImage(over.canvas, over.x, over.y);
                }
            } else {
                this.ctx.drawImage(imgCache.get("ui/rank/tag_rank_1.png"), 200, 26);
            }
        }
        //游戏中超越好友
                if (this.loopRankActive) {
            this.ctx.clearRect(0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
            let loop = this.loopFriend;
            if (loop.avatarUrl != this.overAvatarUrl) {
                this.overAvatarUrl = loop.avatarUrl;
                loop.drawLoop(imgCache.get(loop.avatarUrl), imgCache.get("ui/rank/cell_rank_0.png"), imgCache.get("ui/rank/tag_rank_0.png"), this.overRank);
                this.ctx.drawImage(loop.canvas, loop.x, loop.y);
            }
        }
    }
    startFrame() {
        this.stopFrame();
        // 开启每帧回调
                const fn = times => {
            if (this.onFrame) {
                this.onFrame(times);
            }
            this._updateHandler = requestAnimationFrame(fn);
        };
        this._updateHandler = requestAnimationFrame(fn);
    }
    stopFrame() {
        if (this._updateHandler) {
            cancelAnimationFrame(this._updateHandler);
            this._updateHandler = null;
        }
    }
    clear() {
        this.ctx.clearRect(0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
    }
    setFpsDeltaTimer(times) {
        if (!this.fpsStartTime) {
            this.fpsStartTime = times;
            this.fpsDeltaTimer = 16;
        } else {
            this.fpsDeltaTimer = times - this.fpsStartTime;
            this.fpsStartTime = times;
        }
    }
    onFrame() {
        this.setFpsDeltaTimer(new Date().getTime());
        this.clear();
        this.friendList.render(this.fpsDeltaTimer);
        this.ctx.drawImage(this.friendList.canvas, this.friendList.x, this.friendList.y);
        if (this.itemMe) {
            this.itemMe.setPosition(0 + friendCfg.x, friendCfg.height + friendCfg.meOffsetY + friendCfg.y);
            if (this.itemMe.rendered) {
                this.ctx.drawImage(this.itemMe.canvas, this.itemMe.x, this.itemMe.y);
            }
        }
        if (!this._isLoadFinish) {
            this.drawText("正在加载...", 100, 100, 60, "#000000");
        } else if (!this._existFriendRank) {
            this.drawText("未上榜", 100, 100, 60, "#000000");
        }
    }
    drawImg(clipX, clipY, clipW, clipH, posX, posY, displayW, displayH, bgUrl) {
        if (imgCache.get(bgUrl)) this.ctx.drawImage(imgCache.get(bgUrl), clipX, clipY, clipW, clipH, posX, posY, displayW ? displayW : clipW, displayH ? displayH : clipH);
    }
    drawText(text, x, y, fontSize, color, align, weight) {
        let _weight = weight ? weight : "normal";
        this.ctx.textBaseline = "hanging";
        this.ctx.font = `${_weight} ${fontSize}px Microsoft YaHei`;
        this.ctx.fillStyle = color || "#ffffff";
        this.ctx.textAlign = align || "left";
        this.ctx.fillText(text, x, y, 750);
    }
    //等待所有资源就绪，先加载背景，再加载头像
    loadImg() {
        let self = this;
        self.userAvatar.push.apply(self.userAvatar, ITEM_BG_PATH);
        Promise.all(self.userAvatar.map(path => self.imgReadyPromise(path))).then(urls => self.loadImgFinish(urls)).catch(err => console.error("load img fault. ", err));
    }
    imgReadyPromise(imgUrl) {
        return new Promise((resolve, reject) => {
            let iurl = imgUrl;
            if (!imgUrl.startsWith("http")) {
                iurl = RES_DIR + iurl;
            }
            if (imgCache.get(imgUrl)) {
                resolve(imgUrl);
                return;
            }
            const img = wx.createImage();
            img.src = iurl;
            img.onload = (() => {
                resolve(imgUrl);
            });
            img.onerror = (() => {
                reject(`${iurl} 加载失败`);
            });
            // 想了一下，还是在这里cache，不希望创建多个img，加载url失败了就let it crash吧
                        imgCache.put(imgUrl, img);
        });
    }
    refreshScroe(score) {
        console.log("setUserCloudStorage score");
        let self = this;
        //if (score > self.userScore) {
        //更新历史最高积分
                self.userScore = score;
        wx.setUserCloudStorage({
            KVDataList: [ {
                key: "score",
                value: score + ""
            } ],
            success: function(res) {
                console.log("refresh score finished.");
                self.refreshRank();
            },
            fail: function(res) {
                console.error("refresh score fault, for wechat opdata.");
            }
        });
        // } else {
        //     console.log("temp score");
        //     self.refreshRank();
        // }
        }
}

const renderer = new RankListRenderer();

renderer.init();