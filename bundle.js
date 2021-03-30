(function() {
    "use strict";
    class SceneManager {
        static OnLoadLevelok(url, callder, callback, scene) {
            console.log("OnLoadLevelok ", url);
            callback.call(callder, scene);
        }
        static LoadSceneByNameAtAsset(name, callder, callbackFunc) {
            let url = "res3d/GameAsset/Conventional/" + name + ".ls";
            console.log(" Laya.Scene3D.load ", url);
            Laya.Scene3D.load(url, Laya.Handler.create(SceneManager, SceneManager.OnLoadLevelok, [ url, callder, callbackFunc ]));
        }
    }
    SceneManager.example_animatorUrl = "res3d/LayaScene_Example_Animator/Conventional/Example_Animator.ls";
    class GameObject {
        constructor(node) {
            this.node = node;
            this.sprite3d = node;
        }
        static getFullPath(obj) {
            if (obj == null) {
                console.error("You must select Obj first!");
                return;
            }
            let path = [];
            path.push(obj.name);
            let selectChild = obj;
            if (selectChild != null) {
                while (selectChild.parent != null) {
                    selectChild = selectChild.parent;
                    path.push(selectChild.name);
                }
            }
            let rs = "";
            for (let index = path.length - 1; index >= 0; index--) {
                rs += path[index] + "/";
            }
            console.log(rs);
        }
        static GetChilds(node, childName) {
            let list = [];
            for (let index = 0; index < node.numChildren; index++) {
                let child = node.getChildAt(index);
                if (child.name == childName) list.push(child);
            }
            return list;
        }
        static GetChildsByDeth(node, childName) {
            let list = GameObject.getAllChilds(node);
            let filerList = [];
            for (let index = 0; index < list.length; index++) {
                let child = list[index];
                if (child.name == childName) filerList.push(child);
            }
            return filerList;
        }
        static Find(node, name) {
            var depth = name.split("/");
            var gob = node.getChildByName(depth[0]);
            for (let index = 1; index < depth.length; index++) {
                gob = gob.getChildByName(depth[index]);
            }
            return gob;
        }
        static FindChilds(name, node) {
            let list = [];
            for (let index = 0; index < node.numChildren; index++) {
                let c = node.getChildAt(index);
                if (name == c.name) list.push(c);
            }
            return list;
        }
        static Instantiate(go) {
            var newGo = Laya.Sprite3D.instantiate(go.sprite3d);
            return newGo;
        }
        Clone_sprite3d() {
            return Laya.Sprite3D.instantiate(this.sprite3d);
        }
        static Instantiate2Scene(go, node) {
            var newGo = Laya.Sprite3D.instantiate(go);
            node.addChild(newGo);
            return newGo;
        }
        static Instantiate2Scene_Particle3d(go, node) {
            var newGo = go.clone();
            node.addChild(newGo);
            return newGo;
        }
        static Instantiate2SceneUseScene(go, Scene) {
            var newGo = Laya.Sprite3D.instantiate(go);
            Scene.addChild(newGo);
            return newGo;
        }
        static InstantiateGob(go) {
            if (go == null) return null;
            var newGo = Laya.Sprite3D.instantiate(go);
            return newGo;
        }
        static Add2Scene(go, node) {
            node.addChild(go);
        }
        static InstantiateNoScene(go) {
            var newGo = Laya.Sprite3D.instantiate(go);
            return newGo;
        }
        static GetTypeInChildren(t, _class) {
            for (const iterator of t._children) {
                if (iterator instanceof _class) return iterator;
            }
            return null;
        }
        static GetTypesInChildren(t, _class) {
            var list = [];
            for (const iterator of t._children) {
                if (iterator instanceof _class) list.push(iterator);
            }
            return list;
        }
        static FindUseNode(name, node) {
            let depth = name.split("/");
            if (depth == null || depth.length == 0) {
                return node.getChildByName(name);
            }
            let gob = node.getChildByName(depth[0]);
            for (let index = 1; index < depth.length; index++) {
                gob = gob.getChildByName(depth[index]);
            }
            return gob;
        }
        static FindUseNodeNoDeth(name, node) {
            var gob = node.getChildByName(name);
            return gob;
        }
        static FindChildAtUseNode(idx, node) {
            let gob = node.getChildAt(idx);
            return gob;
        }
        static getChildAttUseNode(idx, node) {
            let gob = node.getChildAt(idx);
            return gob;
        }
        static GetComponentsInChildren(t, _class) {
            if (t == null) return null;
            var allchilds = GameObject.getChildsDeth(t);
            var list = [];
            for (const iterator of allchilds) {
                if (iterator instanceof _class) list.push(iterator);
            }
            return list;
        }
        static GetComponentsInChildrenU3d(t, _class) {
            if (t == null) return null;
            var allchilds = GameObject.getChildsDeth(t);
            var list = [];
            for (const iterator of allchilds) {
                let com = iterator.getComponent(_class);
                if (com != null) list.push(com);
            }
            return list;
        }
        static FindChilds_deth(node, name) {
            if (node == null) return null;
            var allchilds = GameObject.getChildsDeth(node);
            var list = [];
            for (const iterator of allchilds) {
                let isok = iterator.name == name;
                if (isok) list.push(iterator);
            }
            return list;
        }
        static getAllChilds(owner) {
            var list = [];
            var _children = [];
            for (let index = 0; index < owner.numChildren; index++) {
                _children.push(owner.getChildAt(index));
            }
            for (const iterator of _children) {
                list.push(iterator);
            }
            for (let index = 0; index < _children.length; index++) {
                var t = this.getAllChilds(_children[index]);
                for (const iterator of t) {
                    list.push(iterator);
                }
            }
            return list;
        }
        static getChildsByNameDeth(owner, name) {
            var list = [];
            var arr = GameObject.getAllChilds(owner);
            for (const iterator of arr) {
                if (iterator.name == name) list.push(iterator);
            }
            return list;
        }
        static getChildsDeth(owner) {
            var list = [];
            var arr = GameObject.getAllChilds(owner);
            for (const iterator of arr) {
                list.push(iterator);
            }
            return list;
        }
    }
    class MonoBehaviour extends Laya.Script {
        onAwake() {
            this.gameObject = this.owner;
            this.transform = this.gameObject.transform;
        }
        Find(path) {
            return GameObject.Find(this.gameObject, path);
        }
        GetComponentsInChildren(componentType) {
            return GameObject.GetComponentsInChildrenU3d(this.gameObject, componentType);
        }
    }
    class Time extends Laya.Script {}
    Time.fixedDeltaTime = 0;
    Time.deltaTime = 0;
    Time.time = 0;
    Time.deltaTimeMin = 1e16;
    Time.deltaTimeMax = 0;
    Time.deltaTimeEvr = 0;
    class Input extends Laya.Script {
        constructor() {
            super();
            this.count = 0;
            this.counttime = 0;
            this.preMouseX = 0;
            this.firstX = -12345678;
            this.seconx = 0;
            this.mouseDown_y = 0;
            this.mouseDown_y_Time = 0;
            this.slide_mouseDown_x = 0;
            this.sensitivity = .3;
        }
        onAwake() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.p_onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.p_onMouseUp);
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDownEvent);
            Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUpEvent);
            this.preMouseX = Laya.MouseManager.instance.mouseX;
        }
        onKeyDownEvent(e) {
            Input.dicKeyDown[e.keyCode] = true;
            Input.dicKeyUpdate[e.keyCode] = true;
        }
        onKeyUpEvent(e) {
            Input.dicKeyDown[e.keyCode] = false;
            Input.dicKeyUpdate[e.keyCode] = false;
        }
        p_onMouseDown() {
            Input.mouseButton0down = true;
            Input.mouseButton0Up = false;
            Input.mouseButton0DwonHold = true;
        }
        p_onMouseUp() {
            Input.mouseButton0Up = true;
            Input.mouseButton0down = false;
            Input.mouseButton0DwonHold = false;
        }
        onLateUpdate() {
            Input.mouseButton0down = false;
            Input.mouseButton0Up = false;
            Input.GetAxisRaw_Mouse_X = 0;
            Input.slideUp = false;
            Input.slidedown = false;
            Input.slideLeft = false;
            Input.slideRight = false;
            if (Laya.Browser.onPC) {
                for (let k in Input.dicKeyDown) {
                    Input.dicKeyDown[k] = false;
                }
                for (let k in Input.dicKeyUpdate) {
                    Input.dicKeyUpdate[k] = false;
                }
            }
        }
        onUpdate() {
            this.onUpdate_mouse();
        }
        static GetKeyDown(e) {
            if (Laya.Browser.onPC == false) return false;
            return Input.dicKeyDown[e];
        }
        static GetKey(e) {
            if (Laya.Browser.onPC == false) return false;
            if (Input.dicKeyUpdate[e] == null) return false;
            return Input.dicKeyUpdate[e];
        }
        onUpdate_mouse() {
            if (Input.mouseButton0DwonHold) {
                if (this.firstX == -12345678) {
                    this.firstX = Laya.stage.mouseX;
                } else {
                    this.seconx = Laya.stage.mouseX;
                    var movementX = this.seconx - this.firstX;
                    this.firstX = this.seconx;
                    Input.GetAxisRaw_Mouse_X = movementX;
                }
            }
            if (Input.mouseButton0Up) {
                Input.GetAxisRaw_Mouse_X = 0;
                this.firstX = -12345678;
                this.seconx = 0;
            }
            if (Input.mouseButton0down) {
                this.mouseDown_y = Laya.MouseManager.instance.mouseY;
                this.mouseDown_y_Time = Time.time;
                this.slide_mouseDown_x = Laya.MouseManager.instance.mouseX;
            }
            if (Input.mouseButton0Up) {
                let mouse_up_y = Laya.MouseManager.instance.mouseY;
                let mouse_up_x = Laya.MouseManager.instance.mouseX;
                let mouse_up_y_time = Time.time;
                let OpTime = mouse_up_y_time - this.mouseDown_y_Time < .3;
                let ydis = this.mouseDown_y - mouse_up_y;
                if (OpTime) {
                    if (ydis > 100 * this.sensitivity) {
                        Input.slideUp = true;
                        console.log("slideUp", ydis);
                        Input.slideYdis = ydis;
                    } else if (ydis < -100 * this.sensitivity) {
                        console.log("slideDown", ydis);
                        Input.slidedown = true;
                        Input.slideYdis = ydis;
                    }
                    if (this.slide_mouseDown_x - mouse_up_x > 100 * this.sensitivity) {
                        Input.slideLeft = true;
                        console.log("slide left");
                        Input.slideXdis = this.slide_mouseDown_x - mouse_up_x;
                    } else if (mouse_up_x - this.slide_mouseDown_x > 100 * this.sensitivity) {
                        console.log("slide right");
                        Input.slideRight = true;
                        Input.slideXdis = mouse_up_x - this.slide_mouseDown_x;
                    }
                }
            }
        }
    }
    Input.mouseButton0down = false;
    Input.mouseButton0Up = false;
    Input.mouseButton0DwonHold = false;
    Input.dicKeyDown = {};
    Input.dicKeyUpdate = {};
    Input.GetAxisRaw_Mouse_X = 0;
    Input.slideUp = false;
    Input.slidedown = false;
    Input.slideLeft = false;
    Input.slideRight = false;
    Input.slideXdis = 0;
    Input.slideYdis = 0;
    class Mathf {
        static Sin(t) {
            return Math.sin(t);
        }
        static Abs(v) {
            return Math.abs(v);
        }
        static Cos(x) {
            return Math.cos(x);
        }
        static LerpAngle(a, b, t) {
            var num = Mathf.Repeat(b - a, 360);
            if (num > 180) num -= 360;
            return a + num * Mathf.Clamp01(t);
        }
        static Repeat(t, length) {
            return t - Mathf.Floor(t / length) * length;
        }
        static Floor(f) {
            return Math.floor(f);
        }
        static Clamp01(value) {
            if (value < 0) return 0;
            if (value > 1) return 1;
            return value;
        }
        static Acos(value) {
            return Math.acos(value);
        }
        static Atan2(x, y) {
            return Math.atan2(x, y);
        }
        static Lerp(a, b, t) {
            return a + (b - a) * Mathf.Clamp01(t);
        }
        static InverseLerp(a, b, value) {
            if (a != b) return Mathf.Clamp01((value - a) / (b - a)); else return 0;
        }
        static Max(a, b) {
            return a > b ? a : b;
        }
        static Min(a, b) {
            return a < b ? a : b;
        }
        static Clamp(value, min, max) {
            if (value < min) value = min; else if (value > max) value = max;
            return value;
        }
        static PingPong(t, length) {
            t = this.Repeat(t, length * 2);
            return length - Mathf.Abs(t - length);
        }
    }
    Mathf.Deg2Rad = .0174532924;
    Mathf.Rad2Deg = 57.29578;
    Mathf.PI = 3.14159274;
    class CallBackRegisiter {
        constructor() {}
    }
    class GameDesgin {}
    GameDesgin.showaabbBoxLine = !!0;
    GameDesgin.enableCollsion = !!1;
    GameDesgin.logFps = false;
    GameDesgin.spwanFish = true;
    GameDesgin.spwanObstacle = true;
    class EventType {}
    EventType.ShapeThreeDEnterWorld = "ShapeThreeDEnterWorld";
    EventType.AD_VIDEO_CLOSE_EVENT = "AD_VIDEO_CLOSE_EVENT";
    EventType.WxOnShow = "WxOnShow";
    EventType.SHARE_Ok = "SHARE_Ok";
    EventType.UpdateGoldItemUi = "UpdateGoldItemUi";
    EventType.ShopSelectChrater = "onSelectChrater";
    EventType.ShopSelectHat = "ShopSelectHat";
    EventType.CharaterIniOk = "CharaterIniOk";
    class EventMgr extends Laya.EventDispatcher {
        static get instance() {
            if (EventMgr._instance == null) EventMgr._instance = new EventMgr();
            return EventMgr._instance;
        }
    }
    class CollsionManagerThreeD extends Laya.Script {
        constructor() {
            super();
            this.detectObjs = [];
            this.Itemlist = [];
            this.enterList = [];
            this.exitList = [];
            this.datacg = {};
            this.filerZList = [];
        }
        onAwake() {
            CollsionManagerThreeD.instantce = this;
            EventMgr.instance.on(EventType.ShapeThreeDEnterWorld, this, this.OnShapeThreeDEnterWorld);
        }
        OnShapeThreeDEnterWorld(o) {
            this.Itemlist.push(o);
            this.UpdateDetectMap();
        }
        SetDetectObj(o) {
            this.detectObjs.push(o);
            this.UpdateDetectMap();
        }
        UpdateDetectMap() {
            for (let i = 0; i < this.detectObjs.length; i++) {
                for (let j = 0; j < this.Itemlist.length; j++) {
                    const item = this.Itemlist[j];
                    if (this.detectObjs[i].detectmap[item.id] == null) this.detectObjs[i].detectmap[item.id] = false;
                }
            }
        }
        onLateUpdate() {
            if (GameDesgin.enableCollsion) {
                if (this.detectObjs.length >= 1) {
                    for (let i = 0; i < this.detectObjs.length; i++) {
                        let detectAABB = this.detectObjs[i];
                        this.GetFilterZItems(this.detectObjs[i].transform.position.z, detectAABB);
                        this.Detect(detectAABB, detectAABB.moveSpeed);
                    }
                }
            }
        }
        Detect(source, movedir) {
            let sourcraabb = source;
            let testCount = 0;
            for (let index = 0; index < this.filerZList.length; index++) {
                let element = this.filerZList[index];
                let isCollstionTest = (source.collisionMask & 1 << element.mask) > 0;
                if (source.id != element.id && isCollstionTest) {
                    let targetId = element.id;
                    let targetaabb = element;
                    let collsion = false;
                    if (source.detectmap[targetId]) testCount += 1;
                    let t = new Laya.Vector3();
                    collsion = sourcraabb.Intersects(targetaabb);
                    if (collsion) {
                        let collsioning = false;
                        if (source.detectmap[targetId] == false) {
                            source.TriggerEnterEvent(source, element);
                            source.detectmap[targetId] = true;
                        }
                    } else {
                        if (source.detectmap[targetId]) {
                            source.TriggerExitEvent(source, element);
                            source.detectmap[targetId] = false;
                        }
                    }
                }
            }
        }
        GetFilterZItems(zStart, remove_aabb) {
            this.filerZList = [];
            for (let index = 0; index < this.Itemlist.length; index++) {
                let element = this.Itemlist[index];
                if (element.gameObject.displayedInStage == false) continue;
                if (element.gameObject.activeInHierarchy == false) continue;
                if (element.gameObject.id == remove_aabb.gameObject.id) continue;
                if (Math.abs(zStart - element.transform.position.z) > 30) continue;
                this.filerZList.push(this.Itemlist[index]);
            }
        }
        IsSweepTestCollision(from, other, movement) {
            let deltaX = movement.x;
            let deltaY = movement.y;
            let deltaZ = movement.z;
            if (from.maxPoint.y > other.minPoint.y && from.minPoint.y < other.maxPoint.y && from.maxPoint.z > other.minPoint.z && from.minPoint.z < other.maxPoint.z) {
                let d1 = 0;
                if (deltaX > 0 && from.maxPoint.x <= other.minPoint.x) {
                    d1 = other.minPoint.x - from.maxPoint.x;
                    if (d1 < deltaX) {
                        deltaX = d1;
                        return true;
                    }
                } else if (deltaX < 0 && from.minPoint.x >= other.maxPoint.x) {
                    d1 = other.maxPoint.x - from.minPoint.x;
                    if (d1 > deltaX) {
                        deltaX = d1;
                        return true;
                    }
                }
            }
            if (from.maxPoint.x > other.minPoint.x && from.minPoint.x < other.maxPoint.x && from.maxPoint.z > other.minPoint.z && from.minPoint.z < other.maxPoint.z) {
                let d1;
                if (deltaY > 0 && from.maxPoint.y <= other.minPoint.y) {
                    d1 = other.minPoint.y - from.maxPoint.y;
                    if (d1 < deltaY) {
                        deltaY = d1;
                        return true;
                    }
                } else if (deltaY < 0 && from.minPoint.y >= other.maxPoint.y) {
                    d1 = other.maxPoint.y - from.minPoint.y;
                    if (d1 > deltaY) {
                        deltaY = d1;
                        return true;
                    }
                }
            }
            if (from.maxPoint.x > other.minPoint.x && from.minPoint.x < other.maxPoint.x && from.maxPoint.y > other.minPoint.y && from.minPoint.y < other.maxPoint.y) {
                let d1;
                if (deltaZ > 0 && from.maxPoint.z <= other.minPoint.z) {
                    d1 = other.minPoint.z - from.maxPoint.z;
                    if (d1 < deltaZ) {
                        deltaZ = d1;
                        return true;
                    }
                } else if (deltaZ < 0 && from.minPoint.z >= other.maxPoint.z) {
                    d1 = other.maxPoint.z - from.minPoint.z;
                    if (d1 > deltaZ) {
                        deltaZ = d1;
                        return true;
                    }
                }
            }
            return false;
        }
        SweepTestCollision(from, other, movement) {
            let deltaX = movement.x;
            let deltaY = movement.y;
            let deltaZ = movement.z;
            if (from.maxPoint.y > other.minPoint.y && from.minPoint.y < other.maxPoint.y && from.maxPoint.z > other.minPoint.z && from.minPoint.z < other.maxPoint.z) {
                let d1 = 0;
                if (deltaX > 0 && from.maxPoint.x <= other.minPoint.x) {
                    d1 = other.minPoint.x - from.maxPoint.x;
                    if (d1 < deltaX) {
                        deltaX = d1;
                    }
                } else if (deltaX < 0 && from.minPoint.x >= other.maxPoint.x) {
                    d1 = other.maxPoint.x - from.minPoint.x;
                    if (d1 > deltaX) {
                        deltaX = d1;
                    }
                }
            }
            if (from.maxPoint.x > other.minPoint.x && from.minPoint.x < other.maxPoint.x && from.maxPoint.z > other.minPoint.z && from.minPoint.z < other.maxPoint.z) {
                let d1;
                if (deltaY > 0 && from.maxPoint.y <= other.minPoint.y) {
                    d1 = other.minPoint.y - from.maxPoint.y;
                    if (d1 < deltaY) {
                        deltaY = d1;
                    }
                } else if (deltaY < 0 && from.minPoint.y >= other.maxPoint.y) {
                    d1 = other.maxPoint.y - from.minPoint.y;
                    if (d1 > deltaY) {
                        deltaY = d1;
                    }
                }
            }
            if (from.maxPoint.x > other.minPoint.x && from.minPoint.x < other.maxPoint.x && from.maxPoint.y > other.minPoint.y && from.minPoint.y < other.maxPoint.y) {
                let d1;
                if (deltaZ > 0 && from.maxPoint.z <= other.minPoint.z) {
                    d1 = other.minPoint.z - from.maxPoint.z;
                    if (d1 < deltaZ) {
                        deltaZ = d1;
                    }
                } else if (deltaZ < 0 && from.minPoint.z >= other.maxPoint.z) {
                    d1 = other.maxPoint.z - from.minPoint.z;
                    if (d1 > deltaZ) {
                        deltaZ = d1;
                    }
                }
            }
            return new Laya.Vector3(deltaX, deltaY, deltaZ);
        }
    }
    class CollisionMask {}
    CollisionMask.Character = 1;
    CollisionMask.Obstacle = 2;
    CollisionMask.Fish = 3;
    CollisionMask.Award = 4;
    class ShapeThreeD extends Laya.Script3D {
        constructor() {
            super();
            this.collisionEnter = [];
            this.collisionExit = [];
            this.collisionRayHit = [];
            this.mask = 0;
            this.detectmap = {};
            this.collisionMask = ~0;
            this.moveSpeed = new Laya.Vector3(0, 0, 0);
        }
        SetMask(p) {
            this.mask = p;
        }
        onAwake() {
            this.gameObject = this.owner;
            this.transform = this.gameObject.transform;
        }
        onStart() {
            EventMgr.instance.event(EventType.ShapeThreeDEnterWorld, this);
        }
        onDestroy() {
            EventMgr.instance.event(EventType.ShapeThreeDEnterWorld, this);
        }
        RegisetCollsionEnter(callder, func) {
            let pCallBackRegisiter = new CallBackRegisiter();
            pCallBackRegisiter.regisiter = callder;
            pCallBackRegisiter.enterCallbackFunc = func;
            this.collisionEnter.push(pCallBackRegisiter);
        }
        RegisetCollsionExit(callder, func) {
            let pCallBackRegisiter = new CallBackRegisiter();
            pCallBackRegisiter.regisiter = callder;
            pCallBackRegisiter.enterCallbackFunc = func;
            this.collisionExit.push(pCallBackRegisiter);
        }
        TriggerEnterEvent(source, target) {
            for (var iterator of this.collisionEnter) {
                var registerObj = iterator.regisiter;
                var func = iterator.enterCallbackFunc;
                func.apply(registerObj, [ source, target ]);
            }
        }
        TriggerExitEvent(source, target) {
            for (var iterator of this.collisionExit) {
                var registerObj = iterator.regisiter;
                var func = iterator.ExitCallbackFunc;
                func.apply(registerObj, [ source, target ]);
            }
        }
        RegisetRayHitEnter(callBackRegisiter) {
            this.collisionRayHit.push(callBackRegisiter);
        }
        OnShapeRayHit(obb) {
            for (var iterator of this.collisionRayHit) {
                var registerObj = iterator.regisiter;
                var func = iterator.enterCallbackFunc;
                func.apply(registerObj, [ obb ]);
            }
        }
        ActiveDetec() {
            CollsionManagerThreeD.instantce.SetDetectObj(this);
        }
    }
    class PathLineDrawer extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.phasorSpriter3D = new Laya.PixelLineSprite3D(10, "my");
        }
        onEnable() {}
        onStart() {
            GameObject.Add2Scene(this.phasorSpriter3D, SceneManager.game);
        }
        onUpdate() {}
        onDisable() {}
        OnDrawGizmos() {
            this.phasorSpriter3D.clear();
            this.phasorSpriter3D.addLine(this.start, this.end, Laya.Color.RED, Laya.Color.RED);
        }
        clear() {
            this.phasorSpriter3D.clear();
        }
        addLine(pstart, pend) {
            this.phasorSpriter3D.addLine(pstart, pend, Laya.Color.RED, Laya.Color.RED);
        }
    }
    class Vector3Ext {
        static normalize(vec) {
            Laya.Vector3.normalize(vec, vec);
        }
        static mul_Num(vec, l) {
            return new Laya.Vector3(vec.x * l, vec.y * l, vec.z * l);
        }
        static mul_Num_Fast(vec, l, out) {
            out.x = vec.x * l;
            out.y = vec.y * l;
            out.z = vec.z * l;
        }
        static mul_Num_gc(vec, l, outVec) {
            outVec.x = vec.x * l;
            outVec.y = vec.y * l;
            outVec.z = vec.z * l;
        }
        static mul(a, b) {
            var c = new Laya.Vector3();
            Laya.Vector3.multiply(a, b, c);
            return c;
        }
        static add(a, b) {
            var c = new Laya.Vector3();
            Laya.Vector3.add(a, b, c);
            return c;
        }
        static add_Fast(a, b, c) {
            Laya.Vector3.add(a, b, c);
        }
        static sub(a, b) {
            var c = new Laya.Vector3();
            Laya.Vector3.subtract(a, b, c);
            return c;
        }
        static sub_Fast(a, b, c) {
            Laya.Vector3.subtract(a, b, c);
        }
        static Lerp_u3d(a, b, t) {
            t = Mathf.Clamp01(t);
            return new Laya.Vector3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
        }
        static Lerp(a, b, t) {
            t = Mathf.Clamp01(t);
            return new Laya.Vector3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
        }
        static Lerp_Fast(a, b, c, t) {
            t = Mathf.Clamp01(t);
            c.x = a.x + (b.x - a.x) * t;
            c.y = a.y + (b.y - a.y) * t;
            c.z = a.z + (b.z - a.z) * t;
        }
    }
    Vector3Ext.Up = new Laya.Vector3(0, 1, 0);
    Vector3Ext.up = new Laya.Vector3(0, 1, 0);
    Vector3Ext.Zero = new Laya.Vector3(0, 0, 0);
    Vector3Ext.zero = new Laya.Vector3(0, 0, 0);
    Vector3Ext.forward = new Laya.Vector3(0, 0, -1);
    Vector3Ext.forwardU3d = new Laya.Vector3(0, 0, 1);
    Vector3Ext.down = new Laya.Vector3(0, -1, 0);
    Vector3Ext.one = new Laya.Vector3(1, 1, 1);
    Vector3Ext.left = new Laya.Vector3(-1, 0, 0);
    Vector3Ext.right = new Laya.Vector3(1, 0, 0);
    class AABBShape extends ShapeThreeD {
        constructor() {
            super();
            this.drawAABBLine = false;
            this.minPoint = new Laya.Vector3();
            this.maxPoint = new Laya.Vector3();
            this.halfSize = new Laya.Vector3();
            this.center = new Laya.Vector3();
            this._center = new Laya.Vector3();
        }
        onStart() {
            super.onStart();
        }
        onUpdate() {
            this.UpdateShape(this.transform);
            if (this.line != null) {
                this.line.clear();
                var list = this.FacePonintsA();
                this.line.addLine(list[0], list[1]);
                this.line.addLine(list[2], list[3]);
                this.line.addLine(list[4], list[5]);
                this.line.addLine(list[6], list[7]);
                var list2 = this.FacePonintsTop();
                this.line.addLine(list2[0], list2[1]);
                this.line.addLine(list2[2], list2[3]);
                this.line.addLine(list2[4], list2[5]);
                this.line.addLine(list2[6], list2[7]);
            }
        }
        onAwake() {
            super.onAwake();
            this.onUpdate();
            if (GameDesgin.showaabbBoxLine) this.line = this.owner.addComponent(PathLineDrawer);
        }
        onEnable() {}
        onDisable() {
            if (this.line != null) {
                this.line.clear();
            }
        }
        rightBottomPonint() {
            return new Laya.Vector3(0, this.minPoint.y, this.maxPoint.z);
        }
        FacePonintsA() {
            var list = [];
            var minz = this.minPoint.z;
            list.push(new Laya.Vector3(this.minPoint.x, this.minPoint.y, minz));
            list.push(new Laya.Vector3(this.maxPoint.x, this.minPoint.y, minz));
            list.push(new Laya.Vector3(this.minPoint.x, this.maxPoint.y, minz));
            list.push(new Laya.Vector3(this.maxPoint.x, this.maxPoint.y, minz));
            list.push(new Laya.Vector3(this.minPoint.x, this.minPoint.y, minz));
            list.push(new Laya.Vector3(this.minPoint.x, this.maxPoint.y, minz));
            list.push(new Laya.Vector3(this.maxPoint.x, this.minPoint.y, minz));
            list.push(new Laya.Vector3(this.maxPoint.x, this.maxPoint.y, minz));
            return list;
        }
        FacePonintsTop() {
            var list = [];
            var maxz = this.maxPoint.z;
            var minz = this.minPoint.z;
            list.push(new Laya.Vector3(this.minPoint.x, this.maxPoint.y, minz));
            list.push(new Laya.Vector3(this.maxPoint.x, this.maxPoint.y, minz));
            list.push(new Laya.Vector3(this.minPoint.x, this.maxPoint.y, maxz));
            list.push(new Laya.Vector3(this.minPoint.x, this.maxPoint.y, minz));
            list.push(new Laya.Vector3(this.maxPoint.x, this.maxPoint.y, maxz));
            list.push(new Laya.Vector3(this.maxPoint.x, this.maxPoint.y, minz));
            list.push(new Laya.Vector3(this.minPoint.x, this.maxPoint.y, maxz));
            list.push(new Laya.Vector3(this.maxPoint.x, this.maxPoint.y, maxz));
            return list;
        }
        UpdateShape(transform) {
            Vector3Ext.add_Fast(this.center, transform.position, this._center);
            Vector3Ext.mul_Num_Fast(this.size, .5, this.halfSize);
            Vector3Ext.sub_Fast(this._center, this.halfSize, this.minPoint);
            Vector3Ext.add_Fast(this._center, this.halfSize, this.maxPoint);
        }
        Intersects(aabb) {
            return this.minPoint.x < aabb.maxPoint.x && this.minPoint.y < aabb.maxPoint.y && this.minPoint.z < aabb.maxPoint.z && aabb.minPoint.x < this.maxPoint.x && aabb.minPoint.y < this.maxPoint.y && aabb.minPoint.z < this.maxPoint.z;
        }
    }
    class PlayerPrefs {
        static GetInt(key, defaultnum) {
            return PlayerPrefs.GetValueNum(key, defaultnum);
        }
        static SetInt(key, defaultnum) {
            PlayerPrefs.SetValueNum(key, defaultnum);
        }
        static DeleteAll() {
            Laya.LocalStorage.clear();
        }
        static GetValueNum(value_name, defaul) {
            var jsonData = Laya.LocalStorage.getItem(value_name);
            if (jsonData == null || jsonData == "") return defaul;
            var d = Number(jsonData);
            return d;
        }
        static SetValueNum(value, num) {
            Laya.LocalStorage.setItem(value, num.toString());
        }
    }
    class AudioClip {
        constructor(p_url, pminRate) {
            this.preTime = 0;
            this.minRate = 0;
            this.url = p_url;
            this.minRate = pminRate;
        }
        Play() {
            if (Time.time - this.preTime < this.minRate) return;
            SoundMgr.instance.PlayOneShot(this.url);
            this.preTime = Time.time;
        }
        PlayByNum(n) {
            if (Time.time - this.preTime < this.minRate) return;
            SoundMgr.instance.PlayByNum(this.url, n);
            this.preTime = Time.time;
        }
    }
    class SoundMgr {
        constructor() {
            this.bgmurl = "res/sound/main/bgm.mp3";
            this.bgmurl2 = "res/sound/game/bgm.mp3";
            this.clcik = new AudioClip("res/sound/main/click.mp3", 0);
            this.FishCollection = new AudioClip("res/sound/game/FishCollection.mp3", .5);
            this.CatDeath = new AudioClip("res/sound/game/CatDeath.mp3", 1);
            this.CatJump = new AudioClip("res/sound/game/CatJump.mp3", 0);
            this.BuyOk = new AudioClip("res/sound/main/buyItem.mp3", 0);
            this.wineffect = new AudioClip("res/sound/game/jiasu.mp3", 0);
            this.powerUp = new AudioClip("res/sound/game/powerUp.mp3", 0);
            this.starAward = new AudioClip("res/sound/game/starAward.mp3", 0);
            this.hit = new AudioClip("res/sound/game/hit.mp3", .3);
            this.prebgmurl = "";
            EventMgr.instance.on(EventType.AD_VIDEO_CLOSE_EVENT, this, this.onAD_VIDEO_CLOSE_EVENT);
            EventMgr.instance.on(EventType.WxOnShow, this, this.ReSumeBgm);
        }
        static get instance() {
            if (SoundMgr.minstance == null) SoundMgr.minstance = new SoundMgr();
            return SoundMgr.minstance;
        }
        static isPlaySound() {
            return PlayerPrefs.GetInt("PlaySound", 1) == 1;
        }
        static setPlaySound(isPlaySound) {
            PlayerPrefs.SetInt("PlaySound", isPlaySound ? 1 : 0);
        }
        onAD_VIDEO_CLOSE_EVENT() {
            this.ReSumeBgm();
        }
        play(url) {
            Laya.SoundManager.playSound(url, 1);
        }
        PlayOneShot(url) {
            if (SoundMgr.isPlaySound()) {
                Laya.SoundManager.playSound(url, 1);
            }
        }
        PlayByNum(url, n) {
            if (SoundMgr.isPlaySound()) {
                Laya.SoundManager.playSound(url, n);
            }
        }
        BgmPlay() {
            this.PlayBgm(this.bgmurl, true);
        }
        PlayGameBgm() {
            this.PlayBgm(this.bgmurl2, true);
        }
        BgmPlaySetting() {
            this.PlayBgm(this.bgmurl, true);
        }
        ReSumeBgm() {
            console.log("ReSumeBgm");
            let isPlaySound = SoundMgr.isPlaySound();
            if (!isPlaySound && this.curbgm_SoundChannel != null) return;
            {
                this.curbgm_SoundChannel.resume();
            }
        }
        pauseBgm() {
            if (this.curbgm_SoundChannel != null) this.curbgm_SoundChannel.pause();
        }
        PlayBgm(url, loop) {
            if (this.prebgmurl != url) this.curbgm_SoundChannel = null;
            let isPlaySound = SoundMgr.isPlaySound();
            console.log("isPlaySound=" + isPlaySound);
            if (isPlaySound) {
                console.log("PlayBgm");
                let num = 1;
                if (loop) num = 0;
                if (this.curbgm_SoundChannel == null) {
                    let channel = Laya.SoundManager.playMusic(url, num);
                    this.curbgm_SoundChannel = channel;
                } else this.curbgm_SoundChannel.play();
            }
        }
    }
    class Wxmgr {
        constructor() {
            this.wxAppid = "wxdadef0330ce7168d";
            this.wxScecret = "cea168aa0323eaceb493dfdaaed1bb43";
            this.share_title = "能通关的人不到1%";
            this.share_img = "https://mmocgame.qpic.cn/wechatgame/iaG8OsnmtXCybia2TG6uqJbiby1iam9Bn1tLeW3f716nIrJ1PHEBmGUeylo9BaSePTMP/0.png";
            this._statuShareGame = false;
            this._shareStartTime = 0;
            this.evnID = "chengjiu-65v8j";
        }
        static get instance() {
            if (Wxmgr.minstance == null) Wxmgr.minstance = new Wxmgr();
            return Wxmgr.minstance;
        }
        init() {
            if (!Laya.Browser.onMiniGame) {
                return;
            }
            console.log("wxmgr init");
            this.wx_window = Laya.Browser.window.wx;
            this.launchOptions = this.wx_window.getLaunchOptionsSync();
            this.wxsysInfo = this.wx_window.getSystemInfoSync();
            this.wx_window.showShareMenu({
                withShareTicket: true,
                menus: [ "shareAppMessage", "shareTimeline" ]
            });
            this._regisiterWXShareCallback();
            this.getlunchData();
            this.wx_window.onShow(Wxmgr.onShowEvent);
            this.wx_window.onAudioInterruptionEnd(this.onAudioInterruptionEnd);
            this.CheckUpdate();
        }
        onAudioInterruptionEnd() {
            SoundMgr.instance.ReSumeBgm();
        }
        static onShowEvent(res) {
            console.log("onShowEvent");
            if (Wxmgr.instance._statuShareGame) {
                Wxmgr.instance._statuShareGame = false;
                let shareEndTime = new Date().getTime();
                let sleepTimer = shareEndTime - Wxmgr.instance._shareStartTime;
                let isShare = sleepTimer < 2500 ? false : true;
                if (isShare) EventMgr.instance.event(EventType.SHARE_Ok);
                Wxmgr.instance._shareStartTime = new Date().getTime() + 86e3;
            }
        }
        shareFriend() {
            if (!Laya.Browser.onWeiXin) {
                console.log("分享失败，非微信环境");
                return;
            }
            let shareObj;
            let self = this;
            self._shareStartTime = new Date().getTime();
            self._statuShareGame = true;
            shareObj = {
                title: self.share_title,
                imageUrl: self.share_img,
                success: function(res) {},
                fail: function() {},
                complete: function() {}
            };
            this.wx_window.shareAppMessage({
                title: this.share_img,
                imageUrl: this.share_img,
                query: "share_id=testUser"
            });
        }
        CheckUpdate() {
            let sf = this;
            const updateManager = sf.wx_window.getUpdateManager();
            updateManager.onCheckForUpdate(function(res) {
                console.log("最新版本:" + res.hasUpdate);
            });
            updateManager.onUpdateReady(function() {
                sf.wx_window.showModal({
                    showCancel: false,
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success(res) {
                        updateManager.applyUpdate();
                    },
                    fail(res) {
                        updateManager.applyUpdate();
                    }
                });
            });
        }
        _regisiterWXShareCallback() {
            let self = this;
            if (Laya.Browser.onMiniGame) {
                this.wx_window.onShareAppMessage(function() {
                    let shareObj = {
                        title: self.share_title,
                        imageUrl: self.share_img,
                        success: function(res) {},
                        fail: function() {}
                    };
                    return shareObj;
                });
            }
        }
        openOtherApp(info) {
            if (!Laya.Browser.onMiniGame) {
                console.log("跳转失败，非微信环境");
                return;
            }
            let self = this;
            this.wx_window.navigateToMiniProgram({
                appId: info.app_id,
                path: info.app_path,
                success: function(res) {
                    let openid = self.user_openid;
                    console.log("跳转小程序成功", openid);
                    self.requestBmobData("tiaozhuan", info.app_id);
                },
                fail: function(res) {
                    console.log("跳转小程序失败");
                }
            });
        }
        login() {
            if (!Laya.Browser.onMiniGame) {
                return;
            }
            let self = this;
            let pwx = this.wx_window;
            pwx.login({
                success: function(loginRes) {
                    let code = loginRes.code;
                    self.request_Wxauth_code2Session(code);
                }
            });
        }
        getlunchData() {
            let self = this;
            let launchOptions = self.launchOptions;
            let param = {};
            if (launchOptions.scene) {
                param.scene_id = launchOptions.scene;
            }
            if (launchOptions.referrerInfo && launchOptions.referrerInfo.appId) {
                param.appid = launchOptions.referrerInfo.appId;
            }
            if (launchOptions.query) {
                if (launchOptions.query.path) param.path = launchOptions.query.path;
            }
            console.log("启动信息");
            console.log(param);
            if (param.appid != null) this.requestBmobData("tiaozhuan", param.app_id);
        }
        request_Wxauth_code2Session(wxLoginCode) {
            console.log("向微信获取用户信息" + wxLoginCode);
            let httpRequest = new Laya.HttpRequest();
            httpRequest.once(Laya.Event.COMPLETE, this, this.Onrequest_Wxauth_code2Session);
            httpRequest.once(Laya.Event.ERROR, this, this.errorHandler);
            let url = "https://api.weixin.qq.com/sns/jscode2session?";
            let data = {};
            data.appid = this.wxAppid;
            data.secret = this.wxScecret;
            data.js_code = wxLoginCode;
            data.grant_type = "authorization_code";
            httpRequest.send(url, data, "get", "json", [ "Content-Type", "application/json;charset=UTF-8" ]);
        }
        Onrequest_Wxauth_code2Session(res) {
            console.log("On_request_Wxauth_code2Session");
            console.log(res);
            this.user_openid = res.openid;
        }
        errorHandler(res) {
            console.log(res);
        }
        response(res) {
            console.log("HTTP 响应：");
            console.log(res);
        }
        onFrientMouseEvent(event) {
            if (!Laya.Browser.onMiniGame) {
                return;
            }
            this.wx_window.getOpenDataContext().postMessage(event);
        }
        showFriendRank(isShow) {
            if (!Laya.Browser.onMiniGame) {
                return;
            }
            EventMgr.instance.event("show_friend_rank_event", {
                isShow: isShow
            });
            let tag = isShow ? "open_friend_rank" : "close_friend_rank";
            let openDataContext = this.wx_window.getOpenDataContext();
            openDataContext.postMessage({
                cmd: tag
            });
        }
        UpLoadScore(score) {
            let maxScore = Number.parseInt(Laya.LocalStorage.getItem("maxScore"));
            if (isNaN(maxScore)) {
                maxScore = 0;
                Laya.LocalStorage.setItem("maxScore", "0");
            }
            if (score == 0) {
                console.log("0分不提交 " + score);
                return;
            }
            if (maxScore < score) {
                console.log("主域提交分数" + score);
                this._submitScroe(score);
                Laya.LocalStorage.setItem("maxScore", score.toString());
                let param = {};
                param.score = score;
            } else {
                console.log("不提交分数 " + maxScore + "/" + score);
            }
        }
        _submitScroe(score) {
            if (!Laya.Browser.onWeiXin) {
                console.log("上传分数失败，非微信环境");
                return;
            }
            let openDataContext = this.wx_window.getOpenDataContext();
            openDataContext.postMessage({
                cmd: "submit_scroe",
                score: score
            });
            EventMgr.instance.event("submit_scroe_event", {});
        }
        requestBmobData(tabel, p_key) {
            return;
            let httpRequest = new Laya.HttpRequest();
            let head = [ "Content-Type", "application/json", "X-Bmob-Application-Id", "2b7dbd684264db7e3bae4f2ea86ae958", "X-Bmob-REST-API-Key", "c7677c038ec1c4110b435e5df1fc182f" ];
            var data2 = {
                key: p_key,
                p_table: tabel
            };
            console.log(data2);
            httpRequest.once(Laya.Event.COMPLETE, this, this.response);
            httpRequest.once(Laya.Event.ERROR, this, this.errorHandler);
            httpRequest.send("https://api.bmob.cn/1/functions/tongji_Table", JSON.stringify(data2), "post", "text", head);
        }
        wxtongji(p_branchDim, p_eventType) {
            if (this.wx_window != null && this.wx_window.reportUserBehaviorBranchAnalytics != null) this.wx_window.reportUserBehaviorBranchAnalytics({
                branchId: "BCBgAAoXHx5d0VRMbudsy5",
                branchDim: p_branchDim.toString(),
                eventType: p_eventType
            });
        }
        GetGetAccessToken() {
            let httpRequest = new Laya.HttpRequest();
            httpRequest.once(Laya.Event.COMPLETE, this, this.OnAccessToken);
            httpRequest.once(Laya.Event.ERROR, this, this.errorHandler);
            httpRequest.send("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + this.wxAppid + "&secret=" + this.wxScecret + "", null, "get", "json");
        }
        OnAccessToken(res) {
            this.wxCouldaccessToken = res.access_token;
            let httpRequest = new Laya.HttpRequest();
            httpRequest.once(Laya.Event.COMPLETE, this, this.OnLuShuOk);
            httpRequest.once(Laya.Event.ERROR, this, this.errorHandler);
            let u = "https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=" + this.wxCouldaccessToken + "&env=chengjiu-65v8j&name=zonglushu";
            console.log(u);
            httpRequest.send(u, null, "post", "json");
        }
        OnLuShuOk(res) {
            console.log(res);
        }
    }
    class Platform {
        static setplatformInfo() {
            GameSample.commonData.windowTT = window["tt"];
            GameSample.commonData.onplatformTT = GameSample.commonData.windowTT != null;
            if (GameSample.commonData.onplatformTT) {} else if (Laya.Browser.onVVMiniGame) {
                GameSample.commonData.OnAndroid = true;
            } else if (Laya.Browser.onQGMiniGame) {
                GameSample.commonData.OnAndroid = true;
            } else if (Laya.Browser.onMiniGame && GameSample.commonData.onplatformTT == false) {
                GameSample.commonData.onplatformWX = window["wx"] != null;
                GameSample.commonData.windowWX = window["wx"];
            } else if (Laya.Browser.onPC) {
                GameSample.commonData.OnPc = true;
            }
            if (Laya.Browser.onQQMiniGame) {
                let sysInfo = Laya.Browser.window.qq.getSystemInfoSync();
                if (sysInfo && sysInfo.platform.startsWith("ios")) GameSample.commonData.OnIOS = true;
                if (sysInfo && sysInfo.system.startsWith("iOS")) GameSample.commonData.OnIOS = true;
                console.log("LayaSample.commonData.OnIOS=" + GameSample.commonData.OnIOS);
                if (sysInfo && sysInfo.platform.startsWith("android")) GameSample.commonData.OnAndroid = true;
                if (sysInfo && sysInfo.brand.startsWith("devtools")) GameSample.commonData.devtools = true;
                GameSample.commonData.onplatformWX = false;
            }
            if (GameSample.commonData.onplatformWX) {
                let sysInfo;
                if (GameSample.commonData.onplatformWX) sysInfo = window["wx"].getSystemInfoSync(); else if (GameSample.commonData.onplatformTT) {
                    sysInfo = GameSample.commonData.windowTT.getSystemInfoSync();
                }
                {
                    if (sysInfo && sysInfo.platform.startsWith("ios")) GameSample.commonData.OnIOS = true;
                    if (sysInfo && sysInfo.system.startsWith("iOS")) GameSample.commonData.OnIOS = true;
                    console.log("LayaSample.commonData.OnIOS=" + GameSample.commonData.OnIOS);
                    console.log(sysInfo);
                    if (sysInfo && sysInfo.platform.startsWith("android")) GameSample.commonData.OnAndroid = true;
                    if (sysInfo && sysInfo.brand.startsWith("devtools")) GameSample.commonData.devtools = true;
                }
            }
            if (GameSample.commonData.onplatformWX) {
                new Wxmgr();
            }
        }
        static loadSubpackage_Single(wxSubloadNameJson, callder, callbackFunc) {
            if (GameSample.commonData.onplatformTT) {
                console.error("不支持分包");
            } else if (Laya.Browser.onMiniGame) {
                let LoadSubpackageTask = wx["loadSubpackage"]({
                    name: wxSubloadNameJson,
                    success: function(res) {
                        console.log(wxSubloadNameJson + " 分包加载成功");
                        callbackFunc.apply(callder, [ true ]);
                    },
                    fail: function(res) {
                        console.error(wxSubloadNameJson + "分包加载失败");
                        callbackFunc.apply(callder, [ false ]);
                    }
                });
                return LoadSubpackageTask;
            } else if (Laya.Browser.onQQMiniGame) {
                let LoadSubpackageTask = window["qq"].loadSubpackage({
                    name: wxSubloadNameJson,
                    success: function(res) {
                        console.log(wxSubloadNameJson + " qq 分包加载成功");
                        callbackFunc.apply(callder, [ true ]);
                    },
                    fail: function(res) {
                        console.error(wxSubloadNameJson + " qq 分包加载失败");
                        callbackFunc.apply(callder, [ false ]);
                    }
                });
                return LoadSubpackageTask;
            } else if (Laya.Browser.onQGMiniGame) {
                let LoadSubpackageTask = qg.loadSubpackage({
                    name: wxSubloadNameJson,
                    success: function(res) {
                        console.log(wxSubloadNameJson + "分包加载成功");
                        callbackFunc.apply(callder, [ true ]);
                    },
                    fail: function(res) {
                        console.error(wxSubloadNameJson + "分包加载失败");
                        console.error(JSON.stringify(res));
                        callbackFunc.apply(callder, [ false ]);
                    }
                });
                return LoadSubpackageTask;
            } else {
                let p_qg = qg;
                let loadTask = p_qg.loadSubpackage({
                    name: wxSubloadNameJson,
                    success: function(res) {
                        console.log(wxSubloadNameJson + "分包加载成功");
                        callbackFunc.apply(callder, [ true ]);
                    },
                    fail: function(res) {
                        console.error(wxSubloadNameJson + "分包加载失败", res);
                        callbackFunc.apply(callder, [ false ]);
                    }
                });
                return loadTask;
            }
        }
        static supportSubPackage() {
            if (GameSample.commonData.onplatformTT) {
                console.log("不支持分包");
                return false;
            } else if (GameSample.commonData.onplatformWX) {
                console.log("onplatformWX");
                return true;
            } else if (Laya.Browser.onVVMiniGame) {
                return true;
            } else if (Laya.Browser.onQGMiniGame) {
                return false;
            } else if (Laya.Browser.onQQMiniGame) {
                return true;
            } else {
                return false;
            }
        }
        static isPlayVibrate() {
            return PlayerPrefs.GetInt("Vibrate", 1) == 1;
        }
        static setPlayVibrate(isPlayVibrate) {
            PlayerPrefs.SetInt("Vibrate", isPlayVibrate ? 1 : 0);
        }
        static vibrateLong() {
            if (Platform.isPlayVibrate()) {
                if (GameSample.commonData.onplatformWX) {
                    let obj = {
                        success: function() {},
                        fail: function() {},
                        complete: function() {}
                    };
                    window["wx"].vibrateLong(obj);
                } else if (GameSample.commonData.onplatformTT) {
                    GameSample.commonData.windowTT.vibrateLong({
                        success(res) {
                            console.log(`${res}`);
                        },
                        fail(res) {
                            console.log(`vibrateLong调用失败`);
                        }
                    });
                } else if (Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame) {
                    let obj = {
                        success: function() {},
                        fail: function() {},
                        complete: function() {}
                    };
                    qg.vibrateLong(obj);
                    console.log("qg.vibrateLong");
                } else if (Laya.Browser.onQQMiniGame) {
                    let obj = {
                        success: function() {},
                        fail: function() {},
                        complete: function() {}
                    };
                    window["qq"].vibrateLong(obj);
                } else {
                    if (Laya.Browser.window["qg"] == null) return;
                    if (Laya.Browser.window["qg"].vibrateLong == null) return;
                    let obj = {
                        success: function() {},
                        fail: function() {},
                        complete: function() {}
                    };
                    qg.vibrateLong(obj);
                }
            }
        }
        static showToast(msg) {
            if (GameSample.commonData.OnPc) {
                return;
            }
            if (GameSample.commonData.onplatformTT) {
                GameSample.commonData.windowTT.showToast({
                    title: msg,
                    duration: 2e3,
                    success(res) {},
                    fail(res) {}
                });
            } else if (GameSample.commonData.onplatformWX) {
                let object = {
                    title: msg,
                    icon: "",
                    image: "",
                    duration: 1500,
                    success: () => {},
                    fail: () => {},
                    complete: () => {},
                    mask: false
                };
                qg.showToast(object);
            } else if (Laya.Browser.onVVMiniGame) {
                let object = {
                    title: msg,
                    icon: "",
                    image: "",
                    duration: 1500,
                    success: () => {},
                    fail: () => {},
                    complete: () => {},
                    mask: false
                };
                window["qg"].showToast(object);
            } else if (Laya.Browser.onQGMiniGame) {
                console.log("oppo showToast", msg);
                let object = {
                    title: msg,
                    icon: "",
                    image: "",
                    duration: 1500,
                    success: () => {},
                    fail: () => {},
                    complete: () => {},
                    mask: false
                };
                window["qg"].showToast(object);
            }
        }
    }
    class JTools {
        static normalizeNum(num) {
            if (num >= 1e-13) return 1; else if (num <= -1e-11) return -1;
            return 0;
        }
        static getRandomIntArry(num) {
            let idx = JTools.getRandomInt(0, num.length - 1);
            return num[idx];
        }
        static removeArrySetSize(arr, j) {
            for (let i = j; i < arr.length - 1; i++) arr[i] = arr[i + 1];
            arr.pop();
        }
        static isNull(obj) {
            if (obj == 0 || obj == null || obj == "" || obj == undefined) {
                return true;
            }
            return false;
        }
        static getRandomInt(min, max) {
            var Range = max - min;
            var Rand = Math.random();
            return min + Math.round(Rand * Range);
        }
        static getRandomIntNotInClueMax(min, max) {
            var s = this.getRandomInt(min, max);
            if (s >= max) s -= 1;
            return s;
        }
        static GetRanDom(min, max) {
            return JTools.getRandomInt(min, max);
        }
        static getRandomFloat0_1(min, max) {
            return Math.random();
        }
        static GetChilds(scene, childName) {
            var list = [];
            for (let index = 0; index < scene.numChildren; index++) {
                var child = scene.getChildAt(index);
                if (child.name == childName) list.push(child);
            }
            return list;
        }
        static GetChildsByLayerReTrunTransform(scene, layer) {
            var list = [];
            for (let index = 0; index < scene.numChildren; index++) {
                var child = scene.getChildAt(index);
                if (child.layer == layer) list.push(child.transform);
            }
            return list;
        }
        static getComponentsInChilds(owner, type) {
            var list = [];
            list = owner.getComponents(type);
            for (let index = 0; index < owner.numChildren; index++) {
                var t = this.getComponentsInChilds(owner.getChildAt(index), type);
                t.forEach(element => {
                    list.push(element);
                });
            }
            return list;
        }
        static setBitComputing(value, mask, t) {
            if (t) {
                value |= 1 << mask;
            } else {
                value &= ~(1 << mask);
            }
            return value;
        }
        static getBitComputing(value, mask) {
            return 0 != (value & 1 << mask);
        }
    }
    class Utils {
        constructor() {}
        static addClickEvent(btn, self, p_cb, soundId) {
            if (btn == null) return;
            btn.offAllCaller(self);
            let callback = function(event) {
                if (p_cb) {
                    p_cb.call(self, event);
                }
            };
            btn.on(Laya.Event.CLICK, self, callback);
            {
                let scaleTime = 60;
                let wRatio = 1;
                btn.pivotX = btn.width * .5;
                btn.pivotY = btn.height * .5;
                btn.x += btn.width * .5;
                btn.y += btn.height * .5;
                let cbDown = function(event) {
                    event.stopPropagation();
                    Laya.Tween.to(btn, {
                        scaleX: .95,
                        scaleY: .95
                    }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_DOWN, self, cbDown);
                let cbUp = function(event) {
                    event.stopPropagation();
                    Laya.Tween.to(btn, {
                        scaleX: 1,
                        scaleY: 1
                    }, scaleTime);
                    soundId === 0 || soundId;
                };
                btn.on(Laya.Event.MOUSE_UP, self, cbUp);
                let cbOut = function(event) {
                    event.stopPropagation();
                    Laya.Tween.to(btn, {
                        scaleX: 1,
                        scaleY: 1
                    }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_OUT, self, cbOut);
            }
        }
        static addClickEventScale(btn, self, p_cb, sacle, soundId) {
            if (btn == null) return;
            btn.offAllCaller(self);
            let callback = function(event) {
                if (p_cb) {
                    p_cb.call(self, event);
                }
            };
            btn.on(Laya.Event.CLICK, self, callback);
            {
                let scaleTime = 60;
                let wRatio = 1;
                btn.pivotX = btn.width * .5;
                btn.pivotY = btn.height * .5;
                btn.x += btn.width * .5;
                btn.y += btn.height * .5;
                let cbDown = function(event) {
                    event.stopPropagation();
                    Laya.Tween.to(btn, {
                        scaleX: sacle - .05,
                        scaleY: sacle - .05
                    }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_DOWN, self, cbDown);
                let cbUp = function(event) {
                    event.stopPropagation();
                    Laya.Tween.to(btn, {
                        scaleX: sacle,
                        scaleY: sacle
                    }, scaleTime);
                    soundId === 0 || soundId;
                };
                btn.on(Laya.Event.MOUSE_UP, self, cbUp);
                let cbOut = function(event) {
                    event.stopPropagation();
                    Laya.Tween.to(btn, {
                        scaleX: sacle,
                        scaleY: sacle
                    }, scaleTime);
                };
                btn.on(Laya.Event.MOUSE_OUT, self, cbOut);
            }
        }
        tweenShake(target, tweenTimer) {
            let timeLine = new Laya.TimeLine();
            let pivotX = target.pivotX;
            target.pivotX = target.width / 2;
            timeLine.addLabel("shake1", 0).to(target, {
                rotation: target.rotation + 5
            }, 50, null, 0).addLabel("shake2", 0).to(target, {
                rotation: target.rotation - 6
            }, 50, null, 0).addLabel("shake3", 0).to(target, {
                rotation: target.rotation - 13
            }, 50, null, 0).addLabel("shake4", 0).to(target, {
                rotation: target.rotation + 3
            }, 50, null, 0).addLabel("shake5", 0).to(target, {
                rotation: target.rotation - 5
            }, 50, null, 0).addLabel("shake6", 0).to(target, {
                rotation: target.rotation + 2
            }, 50, null, 0).addLabel("shake7", 0).to(target, {
                rotation: target.rotation - 8
            }, 50, null, 0).addLabel("shake8", 0).to(target, {
                rotation: target.rotation + 3
            }, 50, null, 0).addLabel("shake9", 0).to(target, {
                rotation: 0
            }, 50, null, 0);
            if (!tweenTimer) {
                timeLine.on(Laya.Event.COMPLETE, this, function() {
                    timeLine.destroy();
                    target.rotation = 0;
                    target.pivotX = pivotX;
                });
            } else {
                Laya.timer.once(500, this, function() {
                    timeLine.destroy();
                    target.rotation = 0;
                    target.pivotX = pivotX;
                });
            }
            timeLine.play(0, true);
        }
        compareVersion(v1, v2) {
            v1 = v1.split(".");
            v2 = v2.split(".");
            let len = Math.max(v1.length, v2.length);
            while (v1.length < len) {
                v1.push("0");
            }
            while (v2.length < len) {
                v2.push("0");
            }
            for (let i = 0; i < len; i++) {
                let num1 = parseInt(v1[i]);
                let num2 = parseInt(v2[i]);
                if (num1 > num2) {
                    return 1;
                } else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        }
    }
    class Dictionary {
        constructor() {
            this._count = 0;
            this._maps = {};
            this._hashMaps = {};
            this._objKeys = [];
            this._objDatum = [];
        }
        get Maps() {
            return this._maps;
        }
        addList(list) {
            let length = list.length;
            let value;
            for (let i = 0; i < length; i++) {
                value = list[i];
                this.add(value.key, value.data);
            }
        }
        addNumberKey(key, data) {
            if (null == this._maps[key]) {
                this._count++;
            }
            this._maps[key] = data;
        }
        getNumberKey(key) {
            return this._maps[key];
        }
        addStringKey(key, data) {
            if (null == this._maps[key]) {
                this._count++;
            }
            this._maps[key] = data;
        }
        getStringKey(key) {
            return this._maps[key];
        }
        add(key, data) {
            if (typeof key != "object") {
                if (null == this._maps[key]) {
                    this._count++;
                }
                this._maps[key] = data;
            } else {
                var index = this._objKeys.lastIndexOf(key);
                if (index == -1) {
                    this._objKeys.push(key);
                    this._objDatum.push(data);
                    this._count++;
                } else {
                    this._objDatum[index] = data;
                }
            }
        }
        set(key, data) {
            this.add(key, data);
        }
        remove(key) {
            var index;
            if (typeof key != "object") {
                if (null != this._maps[key]) {
                    delete this._maps[key];
                    this._count--;
                }
            } else {
                index = this._objKeys.lastIndexOf(key);
                if (index != -1) {
                    this._objKeys.splice(index, 1);
                    this._objDatum.splice(index, 1);
                    this._count--;
                }
            }
        }
        getValue(key) {
            if (typeof key != "object") {
                return this._maps[key];
            } else {
                var index = this._objKeys.lastIndexOf(key);
                if (index != -1) {
                    return this._objDatum[index];
                }
                return null;
            }
        }
        has(key) {
            if (typeof key != "object") {
                return this._maps[key] ? true : false;
            } else {
                var index = this._objKeys.lastIndexOf(key);
                if (index != -1) {
                    return true;
                }
                return false;
            }
        }
        get count() {
            return this._count;
        }
        forEach(callback, thisObject = null) {
            var name, arr;
            for (name in this._maps) {
                callback.call(thisObject, name, this._maps[name]);
            }
            for (name in this._hashMaps) {
                arr = this._hashMaps[name];
                callback.call(thisObject, arr[0], arr[1]);
            }
            for (var j = 0; j < this._objKeys.length; j++) {
                var key = this._objKeys[j];
                callback.call(thisObject, this._objKeys[j], this._objDatum[j]);
                if (key != this._objKeys[j]) {
                    j--;
                }
            }
        }
        get elements() {
            var _list = [];
            var name, arr;
            for (name in this._maps) {
                _list.push({
                    key: name,
                    data: this._maps[name]
                });
            }
            for (name in this._hashMaps) {
                arr = this._hashMaps[name];
                _list.push({
                    key: arr[0],
                    data: arr[1]
                });
            }
            var len = this._objKeys.length;
            for (var j = 0; j < len; j++) {
                _list.push({
                    key: this._objKeys[j],
                    data: this._objDatum[j]
                });
            }
            return _list;
        }
        get keys() {
            var _list = [];
            var name;
            for (name in this._maps) {
                _list.push(name);
            }
            for (name in this._hashMaps) {
                _list.push(this._hashMaps[name][0]);
            }
            _list = _list.concat(this._objKeys);
            return _list;
        }
        get datum() {
            var _list = [];
            var name;
            for (name in this._maps) {
                _list.push(this._maps[name]);
            }
            for (name in this._hashMaps) {
                _list.push(this._hashMaps[name][1]);
            }
            _list = _list.concat(this._objDatum);
            return _list;
        }
        destroy() {
            this._maps = {};
            this._hashMaps = {};
            this._objKeys.length = 0;
            this._objDatum.length = 0;
        }
        dump() {
            var name, arr;
            for (name in this._maps) {
                console.log("key:", name, "---\x3e data:", this._maps[name]);
            }
            for (name in this._hashMaps) {
                arr = this._hashMaps[name];
                console.log("key:", arr[0], "---\x3e data:", arr[1]);
            }
            var len = this._objKeys.length;
            for (var j = 0; j < len; j++) {
                console.log("key:", typeof this._objKeys[j], " ---\x3e data:", this._objDatum[j]);
            }
        }
        getValueByIndex(index) {
            return this.datum[index];
        }
        test() {}
    }
    class TweenMgr {
        constructor() {
            this.targets = [];
            this.dic = new Dictionary();
        }
        static get instance() {
            if (this._instance == null) {
                this._instance = new TweenMgr();
            }
            return this._instance;
        }
        toAlpha(target, alpha, duration, isLoop = false, startAlpha = 1) {
            this.saveTarget(target);
            target.alpha = startAlpha;
            alpha1();
            function alpha1() {
                let handler = isLoop ? new Laya.Handler(this, alpha2) : null;
                Laya.Tween.to(target, {
                    alpha: alpha
                }, duration, null, handler);
            }
            function alpha2() {
                Laya.Tween.to(target, {
                    alpha: 1
                }, duration, null, Laya.Handler.create(this, alpha1));
            }
        }
        toScale(target, scale, duration, isReset, isLoop = false, scaley = scale) {
            this.saveTarget(target);
            target.scaleX = 1;
            target.scaleY = 1;
            scale1();
            function scale1() {
                let handler = isLoop || isReset ? new Laya.Handler(this, scale2) : null;
                Laya.Tween.to(target, {
                    scaleX: scaley,
                    scaleY: scaley
                }, duration, null, handler);
            }
            function scale2() {
                let handler = isLoop ? new Laya.Handler(this, scale1) : null;
                Laya.Tween.to(target, {
                    scaleX: 1,
                    scaleY: 1
                }, duration, null, handler);
            }
        }
        toScale_Jie(target, x, y, x2, y2, duration, duration2, ease) {
            this.saveTarget(target);
            Laya.Tween.to(target, {
                scaleX: x,
                scaleY: y
            }, duration, ease);
            Laya.Tween.to(target, {
                scaleX: x2,
                scaleY: y2
            }, duration2, ease, null, duration);
        }
        toTop(target, y, duration, ease) {
            this.saveTarget(target);
            Laya.Tween.to(target, {
                top: y
            }, duration, ease);
        }
        toPosition(target, pos, duration, isLoop = false, type = 0) {
            this.saveTarget(target);
            let curPos = new Laya.Vector2(target.x, target.y);
            pos1();
            function pos1() {
                if (isLoop) {
                    switch (type) {
                      case 0:
                        var handler = new Laya.Handler(this, pos2);
                        break;

                      case 1:
                        var handler = new Laya.Handler(this, pos3);
                        break;
                    }
                }
                Laya.Tween.to(target, {
                    x: pos.x,
                    y: pos.y
                }, duration, null, handler);
            }
            function pos2() {
                Laya.Tween.to(target, {
                    x: curPos.x,
                    y: curPos.y
                }, duration, null, Laya.Handler.create(this, pos1));
            }
            function pos3() {
                target.x = curPos.x;
                target.y = curPos.y;
                pos1();
            }
        }
        toPositionEase(target, pos, duration, isLoop = false, ease, type = 0) {
            this.saveTarget(target);
            let curPos = new Laya.Vector2(target.x, target.y);
            pos1();
            function pos1() {
                if (isLoop) {
                    switch (type) {
                      case 0:
                        var handler = new Laya.Handler(this, pos2);
                        break;

                      case 1:
                        var handler = new Laya.Handler(this, pos3);
                        break;
                    }
                }
                Laya.Tween.to(target, {
                    x: pos.x,
                    y: pos.y
                }, duration, ease, handler);
            }
            function pos2() {
                Laya.Tween.to(target, {
                    x: curPos.x,
                    y: curPos.y
                }, duration, null, Laya.Handler.create(this, pos1));
            }
            function pos3() {
                target.x = curPos.x;
                target.y = curPos.y;
                pos1();
            }
        }
        toPositionRePlay(target, endpos, duration) {
            this.saveTarget(target);
            let satrtPos = new Laya.Vector2(target.x, target.y);
            pos1();
            function pos1() {
                target.x = satrtPos.x;
                target.y = satrtPos.y;
                var compeltehandler = new Laya.Handler(this, pos1);
                Laya.Tween.to(target, {
                    x: endpos.x,
                    y: endpos.y
                }, duration, null, compeltehandler);
            }
        }
        toPositionRePlayEase(target, endpos, duration, ease) {
            this.saveTarget(target);
            let satrtPos = new Laya.Vector2(target.x, target.y);
            pos1();
            function pos1() {
                target.x = satrtPos.x;
                target.y = satrtPos.y;
                var compeltehandler = new Laya.Handler(this, pos1);
                Laya.Tween.to(target, {
                    x: endpos.x,
                    y: endpos.y
                }, duration, ease, compeltehandler);
            }
        }
        fromAlpha(target, alpha, duration, isLoop = false) {
            this.saveTarget(target);
            target.alpha = 1;
            alpha1();
            function alpha1() {
                let handler = isLoop ? new Laya.Handler(this, alpha2) : null;
                Laya.Tween.from(target, {
                    alpha: alpha
                }, duration, null, handler);
            }
            function alpha2() {
                Laya.Tween.from(target, {
                    alpha: 1
                }, duration, null, Laya.Handler.create(this, alpha1));
            }
        }
        fromScale(target, scale, duration, isLoop = false) {
            this.saveTarget(target);
            scale1();
            function scale1() {
                let handler = isLoop ? new Laya.Handler(this, scale2) : null;
                Laya.Tween.from(target, {
                    scaleX: scale,
                    scaleY: scale
                }, duration, null, handler);
            }
            function scale2() {
                Laya.Tween.from(target, {
                    scaleX: 1,
                    scaleY: 1
                }, duration, null, Laya.Handler.create(this, scale1));
            }
        }
        numberAnim(start, end, duration, methon, caller) {
            let target = {};
            target.value = start;
            let ud = Laya.Tween.to(target, {
                value: end
            }, duration);
            ud.update = new Laya.Handler(this, function() {
                methon.call(target.value, caller);
            });
        }
        saveTarget(target) {
            let targets = this.dic.getStringKey(target.scene.url);
            if (targets) {
                targets.push(target);
            } else {
                targets = [];
                targets.push(target);
                this.dic.set(target.scene.url, targets);
            }
        }
        clearAll(target) {
            let targets = this.dic.getStringKey(target.scene.url);
            if (!targets) return;
            targets.forEach(t => {
                Laya.Tween.clearAll(t);
            });
            targets = [];
        }
        toScaleExt(target, p_startx, p_starty, p_scalex, p_scaley, duration, isLoop) {
            this.saveTarget(target);
            target.scaleX = p_startx;
            target.scaleY = p_starty;
            scale1();
            function scale1() {
                let handler = isLoop ? new Laya.Handler(this, scale2) : null;
                Laya.Tween.to(target, {
                    scaleX: p_scalex,
                    scaleY: p_scaley
                }, duration, Laya.Ease.linearOut, handler);
            }
            function scale2() {
                let handler = isLoop ? new Laya.Handler(this, scale1) : null;
                Laya.Tween.to(target, {
                    scaleX: 1,
                    scaleY: 1
                }, duration, Laya.Ease.linearOut, handler);
            }
        }
        toPositionExt(target, pos, duration) {
            this.saveTarget(target);
            Laya.Tween.to(target, {
                x: pos.x,
                y: pos.y
            }, duration, Laya.Ease.linearOut);
        }
        toPositionPingPongOnece(target, pos, duration) {
            this.saveTarget(target);
            Laya.Tween.clearTween(target);
            let startPos = new Laya.Vector2(target.x, target.y);
            let handler = new Laya.Handler(this, backToStartPos);
            function backToStartPos() {
                Laya.Tween.to(target, {
                    x: startPos.x,
                    t: startPos.y
                }, duration, Laya.Ease.linearOut, null);
            }
            Laya.Tween.to(target, {
                x: pos.x,
                y: pos.y
            }, duration, Laya.Ease.linearOut, handler);
        }
        toPosition_PingPong_Onece_delay(target, pos, duration, delay) {
            this.saveTarget(target);
            Laya.Tween.clearTween(target);
            let startPos = new Laya.Vector2(target.x, target.y);
            let handler = new Laya.Handler(this, backToStartPos);
            function backToStartPos() {
                Laya.Tween.to(target, {
                    x: startPos.x,
                    t: startPos.y
                }, duration, Laya.Ease.quadInOut, null, delay);
            }
            Laya.Tween.to(target, {
                x: pos.x,
                y: pos.y
            }, duration, Laya.Ease.quartIn, handler);
        }
        toPosition__Box_PingPong_Onece_delay(target, p_right, duration, delay) {
            this.saveTarget(target);
            Laya.Tween.clearTween(target);
            let startright = target.right;
            let handler = new Laya.Handler(this, backToStartPos);
            function backToStartPos() {
                Laya.Tween.to(target, {
                    right: startright
                }, duration, Laya.Ease.quadInOut, null, delay);
            }
            Laya.Tween.to(target, {
                right: p_right
            }, duration, Laya.Ease.quartIn, handler);
        }
        toScaleRePlay(target, endpos, duration) {
            this.saveTarget(target);
            let satrtScale = new Laya.Vector2(target.scaleX, target.scaleY);
            pos1();
            function pos1() {
                target.scaleX = satrtScale.x;
                target.scaleY = satrtScale.y;
                var compeltehandler = new Laya.Handler(this, pos1);
                Laya.Tween.to(target, {
                    scaleX: endpos.x,
                    scaleY: endpos.y
                }, duration, null, compeltehandler);
            }
        }
    }
    class BaseView extends Laya.Scene {
        constructor() {
            super();
        }
        onAwake() {
            this.height = Laya.stage.height;
        }
    }
    class GameView extends BaseView {
        constructor() {
            super();
            this.hitfontIdx = 1;
        }
        onAwake() {
            super.onAwake();
            GameView.instance = this;
            this.fishImage.visible = GameDesgin.spwanFish;
            Utils.addClickEvent(this.shop, this, this.shopClick);
            Utils.addClickEvent(this.startbox, this, this.startboxClick);
            Utils.addClickEvent(this.challenge, this, this.OnchallengeClick);
            this.samllBar._with = 150;
            this.startBar._with = 200;
            this.startBar.leftToRight = true;
        }
        OnchallengeClick() {
            if (GameSample.needPlayGuide()) {
                ViewMgr.instance.ShowToas("完成一局游戏后开启");
                return;
            }
            ViewMgr.instance.OpenChalle();
        }
        showHit(n) {
            let timems = 300;
            let scalex = 3;
            if (this.hitfontIdx == 1) {
                this.hit1.visible = true;
                this.hitfont1.value = n.toString();
                this.hit1.scale(0, 0, true);
                this.hit1.centerX = JTools.getRandomInt(-125, 125);
                Laya.Tween.clearAll(this.hit1);
                TweenMgr.instance.toScale_Jie(this.hit1, scalex, scalex, 0, 0, timems, timems, Laya.Ease.circInOut);
            }
            if (this.hitfontIdx == 2) {
                this.hit2.visible = true;
                this.hit2.scale(0, 0, true);
                this.hit2.centerX = JTools.getRandomInt(-125, 125);
                this.hitfont2.value = n.toString();
                Laya.Tween.clearAll(this.hit2);
                TweenMgr.instance.toScale_Jie(this.hit2, scalex, scalex, 0, 0, timems, timems, Laya.Ease.circInOut);
            }
            if (this.hitfontIdx == 3) {
                this.hit3.centerX = JTools.getRandomInt(-125, 125);
                this.hit3.visible = true;
                this.hitfont3.value = n.toString();
                this.hit3.scale(0, 0, true);
                Laya.Tween.clearAll(this.hit3);
                TweenMgr.instance.toScale_Jie(this.hit3, scalex, scalex, 0, 0, timems, timems, Laya.Ease.circInOut);
            }
            this.hitfontIdx += 1;
            if (this.hitfontIdx >= 4) this.hitfontIdx = 1;
        }
        ShowHitEnd(score) {
            this.endHitFont.value = score.toString();
            this.endHitFont.visible = true;
            this.endHitFont.scale(0, 0, true);
            TweenMgr.instance.toScale_Jie(this.endHitFont, 3, 3, 1, 1, 1500, 300, Laya.Ease.circInOut);
            Laya.Tween.to(this.endHitFont, {
                scaleX: 0,
                scaleY: 0
            }, 300, null, null, 2e3);
            Laya.timer.once(500, this, () => {
                SoundMgr.instance.starAward.Play();
            });
            this.endHitFont.centerX = 0;
            this.endHitFont.top = 215;
            Laya.Tween.to(this.endHitFont, {
                centerX: -266,
                top: 80
            }, 300, null, null, 1500);
        }
        shopClick() {
            ViewMgr.instance.OpenShop();
        }
        startboxClick() {
            if (Game.instance == null || Game.instance.initOk == false) return;
            Game.instance.startGmae();
            this.startbox.visible = false;
        }
        DoShowGuideFinger(type) {
            this.finger.visible = true;
            let centerX = this.width * .5;
            let centerY = this.height * .5;
            if (type == 0) {
                this.finger.y = centerY + 300;
                this.finger.x = centerX;
                TweenMgr.instance.toPositionRePlay(this.finger, new Laya.Vector2(centerX, centerY - 300), 1e3);
            }
            if (type == 1) {
                this.finger.y = centerY - 300;
                this.finger.x = centerX;
                TweenMgr.instance.toPositionRePlay(this.finger, new Laya.Vector2(centerX, centerY + 300), 1e3);
            }
            if (type == 2) {
                this.finger.y = centerY;
                this.finger.x = centerX - 250;
                TweenMgr.instance.toPositionRePlay(this.finger, new Laya.Vector2(centerX + 250, centerY), 1e3);
            }
            if (type == 3) {
                this.finger.y = centerY;
                this.finger.x = centerX + 250;
                TweenMgr.instance.toPositionRePlay(this.finger, new Laya.Vector2(centerX - 250, centerY), 1e3);
            }
            if (type == 4) {
                this.samlljump.visible = true;
                this.finger.y = centerY;
                this.finger.x = centerX;
                TweenMgr.instance.toScaleRePlay(this.finger, new Laya.Vector2(1.2, 1.2), 1e3);
            }
        }
        ClearFinger() {
            this.samlljump.visible = false;
            TweenMgr.instance.clearAll(this.finger);
            this.finger.visible = false;
        }
        onClosed() {
            this.offAll();
        }
    }
    class XiaoSenLinApp {
        constructor() {
            this.android_appid = "";
            this.android_path = "";
            this.appid = "wxfda19241d125329e";
            this.appname = "拯救小宝";
            this.creative_base_id = "4728";
            this.creative_id = "10095";
            this.device = "all";
            this.frame = "1";
            this.heat = "3";
            this.id = "10095";
            this.image = "https://static.2719.cn/Uploads/202011/creative-b7832678-8706-0942-a593-b624828f4bd9.jpg";
            this.image_r = "https://static.2719.cn/Uploads/202011/creative-b7832678-8706-0942-a593-b624828f4bd9_r.png";
            this.path = "?wxgamecid=CCBgAAoXkpQAMyiDA9XDSilA";
            this.product_base_id = "1791";
            this.product_id = "6242";
            this.type = "wxa";
            this.weight = "5";
        }
    }
    class JiuJiuWXAPP {
        constructor() {
            this.appid = "wxfa1332d8be62d018";
            this.image = "https://oss.99huyu.cn/tthuyu/61189bfa55dc1639ed94a74071feb8ca.jpg";
            this.title = "";
            this.path = "";
            this.icon = "";
        }
    }
    class Config {
        constructor() {
            this.front_pass_gate = 2;
            this.front_wuchu_scene = "1001|1037|1038|1089|1103|1104|1095";
            this.is_allow_area = -1;
            this.front_start_game_switch = -1;
            this.front_clean_start_level = -1;
            this.front_clean_level_interval = -1;
            this.front_export_banner_appear = -1;
            this.front_export_banner_hide = -1;
            this.front_close_appear = -1;
        }
    }
    class JiuJiuCFGModel {}
    class JiujiuhuyuSdk {
        static init() {
            let thisappid = JiujiuhuyuSdk.this_appid;
            window["jjsdk"] = JiujiuhuyuSdk;
            let httpRequest = new Laya.HttpRequest();
            var onwxurl = "https://7070-ppzs-hpzix-1304089908.tcb.qcloud.la/juzhen.txt?sign=3031d8ed6269a5598fa41d27b7436afc&t=1606714522";
            httpRequest.send(onwxurl, null, "get", "json", [ "Content-Type", "application/json;charset=UTF-8" ]);
            httpRequest.once(Laya.Event.COMPLETE, this, _Value => {
                JiujiuhuyuSdk.cfg = new JiuJiuCFGModel();
                JiujiuhuyuSdk.cfg.config = _Value.config;
                JiujiuhuyuSdk.cfg.jiuJiuWXAPP = [];
                let d = _Value.applist;
                for (let index = 0; index < d.length; index++) {
                    if (d[index].appid != thisappid) JiujiuhuyuSdk.cfg.jiuJiuWXAPP.push(d[index]);
                }
                let ad_Data = [];
                for (let index = 0; index < JiujiuhuyuSdk.cfg.jiuJiuWXAPP.length; index++) {
                    let item = JiujiuhuyuSdk.cfg.jiuJiuWXAPP[index];
                    let t = new XiaoSenLinApp();
                    t.appid = item.appid;
                    t.appname = item.title;
                    t.image = item.icon;
                    t.image_r = item.icon;
                    t.path = item.path;
                    ad_Data.push(t);
                }
                let max = ad_Data.length;
                for (let index = ad_Data.length; index < 20; index++) {
                    let idx = index % max;
                    let item = JiujiuhuyuSdk.cfg.jiuJiuWXAPP[idx];
                    let t = new XiaoSenLinApp();
                    t.appid = item.appid;
                    t.appname = item.title;
                    t.image = item.icon;
                    t.image_r = item.icon;
                    t.path = item.path;
                    ad_Data.push(t);
                }
                let json = {
                    space: [ {
                        type: "drawer_pull",
                        device: "all",
                        width: "0rpx",
                        height: "0rpx"
                    }, {
                        type: "float",
                        device: "all",
                        width: "0rpx",
                        height: "0rpx"
                    }, {
                        type: "inter_four",
                        device: "all",
                        width: "0rpx",
                        height: "0rpx"
                    }, {
                        type: "inter_full",
                        device: "all",
                        width: "0rpx",
                        height: "0rpx"
                    }, {
                        type: "inter_full_large",
                        device: "all",
                        width: "0rpx",
                        height: "0rpx"
                    }, {
                        type: "inter_full_list",
                        device: "all",
                        width: "0rpx",
                        height: "0rpx"
                    }, {
                        type: "inter_six",
                        device: "all",
                        width: "0rpx",
                        height: "0rpx"
                    }, {
                        type: "youlike_normal",
                        device: "all",
                        width: "0rpx",
                        height: "0rpx"
                    } ],
                    creative: [],
                    aliyun_log_field: [ "creative_id", "product_id" ]
                };
                json.creative = ad_Data;
                window["ad_DataExt"] = ad_Data;
                console.log("九九初始完毕");
                JiujiuhuyuSdk.initOk = true;
                let d3 = JiujiuhuyuSdk.MakeConfig();
                window["jjcfg"] = d3;
                xslsdk.Init();
            });
        }
        static OnError(e) {}
        cfg2() {}
        static MakeConfig() {
            let d = {
                space: [ {
                    type: "drawer_pull",
                    device: "all",
                    width: "0rpx",
                    height: "0rpx"
                }, {
                    type: "float",
                    device: "all",
                    width: "0rpx",
                    height: "0rpx"
                }, {
                    type: "inter_four",
                    device: "all",
                    width: "0rpx",
                    height: "0rpx"
                }, {
                    type: "inter_full",
                    device: "all",
                    width: "0rpx",
                    height: "0rpx"
                }, {
                    type: "inter_full_large",
                    device: "all",
                    width: "0rpx",
                    height: "0rpx"
                }, {
                    type: "inter_full_list",
                    device: "all",
                    width: "0rpx",
                    height: "0rpx"
                }, {
                    type: "inter_six",
                    device: "all",
                    width: "0rpx",
                    height: "0rpx"
                }, {
                    type: "youlike_normal",
                    device: "all",
                    width: "0rpx",
                    height: "0rpx"
                } ],
                creative: []
            };
            return d;
        }
        static wuchuzongkaiguan() {
            return false;
        }
        static GetWxChannel() {
            let launchOptions = GameSample.commonData.launchOptions;
            let param = {};
            if (GameSample.commonData.OnPc) {
                param.scene = 1001;
                return param;
            }
            if (launchOptions.scene) {
                param.scene = launchOptions.scene;
            }
            if (launchOptions.query) {
                if (launchOptions.query.id) param.share_user_id = parseInt(launchOptions.query.id);
                if (launchOptions.query.share_id) param.share_id = parseInt(launchOptions.query.share_id);
                if (launchOptions.query.channel && launchOptions.query.channel != "") param.channel = launchOptions.query.channel;
            } else if (launchOptions.referrerInfo && launchOptions.referrerInfo.extraData && launchOptions.referrerInfo.extraData.channel && launchOptions.referrerInfo.extraData.channel != "") {
                param.channel = launchOptions.referrerInfo.extraData.channel;
            }
            return param;
        }
        static IsVideoCheat() {
            return JiujiuhuyuSdk.wuchuzongkaiguan() && JiujiuhuyuSdk.cfg.config.front_start_game_switch == 1;
        }
        static IsBaoXiangWUchu() {
            return false;
        }
        static Ald_APPClick() {
            if (Laya.Browser.onMiniGame == false) return;
            let pwx = window["wx"];
            pwx.aldSendEvent("导出-总点击数");
            console.log("阿拉丁统计导出");
        }
        static Ald_JumpOk() {
            let pwx = window["wx"];
            pwx.aldSendEvent(" 导出成功-总用户数");
            console.log("导出成功-总用户数");
        }
        static Ald_JumpOk_Name(appname) {
            if (Laya.Browser.onMiniGame == false) return;
            let pwx = window["wx"];
            pwx.aldSendEvent(" 导出成功-游戏名", {
                name: appname
            });
            console.log("导出成功-游戏名", appname);
        }
        static ALD_PlayLevel(level) {
            if (Laya.Browser.onMiniGame == false) return;
            let pwx = window["wx"];
            pwx.aldSendEvent("开始关卡" + level);
        }
        static ALD_PlayLevelCompelet(level) {
            if (Laya.Browser.onMiniGame == false) return;
            let pwx = window["wx"];
            pwx.aldSendEvent("完成关卡" + level);
        }
    }
    JiujiuhuyuSdk.initOk = false;
    JiujiuhuyuSdk.this_appid = "wx1f0e7df65b8d6305";
    class BannerAndVideo1 {
        static InitVideo() {
            if (!GameSample.commonData.onplatformWX) return;
            BannerAndVideo1.curVideo = Laya.Browser.window.wx.createRewardedVideoAd({
                adUnitId: BannerAndVideo1.videlAdUnitId[0]
            });
            BannerAndVideo1.curVideo.onLoad(() => {
                console.log("激励视频 广告加载成功");
                this.videoLoadCom = true;
            });
            BannerAndVideo1.curVideo.onError(err => {
                console.log("激励视屏加载失败:" + err);
                this.videoLoadCom = false;
            });
            BannerAndVideo1.curVideo.onClose(res => {
                console.log("激励视频关闭:" + res.isEnded);
                if (res && res.isEnded || res === undefined) {
                    this.videoCallback && this.videoCallback(true);
                } else {
                    this.videoCallback && this.videoCallback(false);
                }
                let isEnd = res && res.isEnded || res === undefined;
                EventMgr.instance.event(EventType.AD_VIDEO_CLOSE_EVENT);
            });
        }
        static ShowVideo(callder, callback) {
            if (Laya.Browser.onPC) {
                callback.call(callder, true);
            } else if (GameSample.commonData.onplatformWX) {
                if (BannerAndVideo1.videoLoadCom) {
                    console.log("showVideoAd:" + BannerAndVideo1.videoLoadCom);
                    BannerAndVideo1.videoCallback = callback;
                    BannerAndVideo1.curVideo.show().catch(err => {
                        console.log(err);
                        ViewMgr.instance.ShowToas("视频拉取失败，请重试");
                        callback(false);
                    });
                } else {
                    BannerAndVideo1.shareCallder = callder;
                    BannerAndVideo1.shareFunction = callback;
                    EventMgr.instance.off(EventType.SHARE_Ok, BannerAndVideo1, BannerAndVideo1.OnShareOk);
                    Wxmgr.instance.shareFriend();
                    EventMgr.instance.on(EventType.SHARE_Ok, BannerAndVideo1, BannerAndVideo1.OnShareOk);
                }
            }
        }
        static OnShareOk() {
            BannerAndVideo1.shareFunction.call(BannerAndVideo1.shareCallder, true);
        }
        static OpenBanner(callVack = null, iswait = false) {
            if (Laya.Browser.onPC) {
                ViewMgr.instance.openDevBanner();
            }
            if (GameSample.commonData.onplatformWX == false) return;
            BannerAndVideo1.canshowbanner = true;
            this.curBannerId = 0;
            let idd = BannerAndVideo1.bannerAdUnitId[this.curBannerId];
            console.log("adUnitId:" + idd);
            let newBanner = Laya.Browser.window.wx.createBannerAd({
                adUnitId: idd,
                style: {
                    left: 0,
                    top: 0,
                    width: 460
                }
            });
            newBanner.onError(err => {
                console.log("banner err");
                console.log(err);
                if (callVack != null) callVack(null);
            });
            newBanner.onLoad(() => {
                console.log("banner 新的");
                if (this.curbanner) this.curbanner.destroy();
                this.curbanner = newBanner;
                let info = Laya.Browser.window.wx.getSystemInfoSync();
                this.curbanner.style.width = info.windowWidth;
                this.curbanner.style.top = info.windowHeight - this.curbanner.style.realHeight - 5;
                var hight = Laya.stage.height / info.windowHeight * this.curbanner.style.realHeight;
                if (callVack != null) {
                    callVack(hight);
                }
                console.log("baneronLoad do show?", this.canshowbanner, !iswait);
                if (this.canshowbanner && !iswait) {
                    this.curbanner.show();
                } else {
                    this.curbanner.hide();
                }
            });
            newBanner.onResize(res => {
                if (this.canshowbanner == false) newBanner.hide();
            });
        }
        static hidebanner() {
            if (this.curbanner != null) this.curbanner.hide();
        }
        static showbanner() {
            if (!GameSample.commonData.onplatformWX) return;
            if (this.canshowbanner) if (BannerAndVideo1.curbanner) BannerAndVideo1.curbanner.show();
        }
        static Clear() {
            if (Laya.Browser.onPC) ViewMgr.instance.CloseDevBanner(); else if (!GameSample.commonData.onplatformWX) return;
            Laya.timer.clearAll(BannerAndVideo1);
            Laya.Tween.clearAll(BannerAndVideo1);
            BannerAndVideo1.canshowbanner = false;
            if (BannerAndVideo1.curbanner) BannerAndVideo1.curbanner.hide();
        }
        static CheatBanner(btn, complete = null) {
            if (!BannerAndVideo1.bannerCanMove || !btn) {
                console.log("ignorecheat");
                BannerAndVideo1.OpenBanner();
            } else {
                btn.bottom = NaN;
                btn.y = Laya.stage.height - btn.height - 40;
                BannerAndVideo1.OpenBanner(height => {
                    if (!height) {
                        return;
                    } else {
                        btn.mouseEnabled = false;
                        var end = Laya.stage.height - height - btn.height - 20;
                        Laya.timer.once(1e3, this, () => {
                            btn.mouseEnabled = true;
                            console.log("temp  showbanner");
                            this.showbanner();
                            Laya.Tween.to(btn, {
                                y: end
                            }, 500, null, Laya.Handler.create(this, () => {
                                if (complete != null) {
                                    complete();
                                }
                            }));
                        });
                    }
                }, true);
            }
        }
        static showInterstitialAd() {
            if (!GameSample.commonData.onplatformWX) return;
            let interstitialAd = null;
            let wx = Laya.Browser.window.wx;
            if (wx.createInterstitialAd) {
                interstitialAd = wx.createInterstitialAd({
                    adUnitId: "adunit-c07481e5d2727778"
                });
            }
            if (interstitialAd) {
                interstitialAd.show().catch(err => {
                    console.error(err);
                });
            }
        }
    }
    BannerAndVideo1.canshowbanner = false;
    BannerAndVideo1.bannerAdUnitId = [ "adunit-dfe9de3e114a252f" ];
    BannerAndVideo1.videlAdUnitId = [ "adunit-5b2f80c44a1c1946" ];
    BannerAndVideo1.curBannerId = 0;
    BannerAndVideo1.videoLoadCom = false;
    BannerAndVideo1.bannerCanMove = true;
    class xslsdk {
        static Init() {
            this.adNode = new Laya.Sprite();
            Laya.stage.addChild(this.adNode);
            this.adNode.zOrder = 10;
            if (Laya.Browser.onMiniGame == false) {
                xslsdk.initOk = true;
                return;
            }
            var openid = "";
            openid = Laya.Browser.window.wx ? openid : null;
            var zzsdkui = Laya.Browser.window["zzsdkui"];
            zzsdkui && zzsdkui.initSDK(0, "1.0.0", "", "wx5209a921db2ae53b", openid, xslsdk.ShieldInit, null);
        }
        static ShieldInit() {
            xslsdk.initOk = true;
            console.log("!!!!!!!!!!!!!!jie sdk ok!!!!!!!!!!!!!!!!!!!!!");
        }
        static OnError(e) {
            console.log(e);
            Laya.timer.once(2e3, this, () => {
                xslsdk.reInit();
            });
        }
        static CreateDrawer(y, showCb) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            this.drawer = Laya.Browser.window["zzsdkui"].createDrawer_pull("drawer_pull", null, function() {
                console.log("drawer_pull", "取消跳转");
            }, y, null, null, null, showCb);
            this.drawer && this.adNode.addChild(this.drawer);
        }
        static reInit() {
            var openid = "";
            openid = Laya.Browser.window.wx ? openid : null;
            var zzsdkui = Laya.Browser.window["zzsdkui"];
            zzsdkui && zzsdkui.initSDK(0, "1.0.0", "https://wxa.332831.com/xsl/wx5209a921db2ae53b/v1.0.0/config.json", "wx5209a921db2ae53b", openid, xslsdk.ShieldInit);
        }
        static OpenDrawer() {
            if (!!GameSample.commonData.onplatformWX || !this.initOk) return;
            this.drawer && this.drawer.openAd();
            console.log("openDrawer");
        }
        static ClearDeawer() {
            this.drawer && this.drawer.clear();
            this.drawer = null;
        }
        static timerOpenBanner() {
            this.canhide = true;
            BannerAndVideo1.OpenBanner(v => {
                console.log("banner hide v1");
                if (this.canhide && JiujiuhuyuSdk.cfg.config.front_export_banner_hide != -1) Laya.timer.once(JiujiuhuyuSdk.cfg.config.front_export_banner_hide, this, this.timerClsoeBanner);
            });
        }
        static timerClsoeBanner() {
            this.canhide = false;
            BannerAndVideo1.Clear();
        }
        static CreateInterFull(backCallback = null, goonCallback = null) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            if (JiujiuhuyuSdk.cfg.config.front_export_banner_appear != -1) Laya.timer.once(JiujiuhuyuSdk.cfg.config.front_export_banner_appear, this, this.timerOpenBanner);
            console.log("CreateInterFull");
            this.inter_full = Laya.Browser.window["zzsdkui"].createFullscroll("inter_full", () => {
                console.log("interfull,", "点击返回");
                BannerAndVideo1.hidebanner();
                Laya.timer.clear(this, this.timerOpenBanner);
                Laya.timer.clear(this, this.timerClsoeBanner);
                backCallback && backCallback();
            }, () => {
                console.log("interfull,", "点击继续游戏");
                BannerAndVideo1.hidebanner();
                goonCallback && goonCallback();
                Laya.timer.clear(this, this.timerOpenBanner);
                Laya.timer.clear(this, this.timerClsoeBanner);
            });
            this.inter_full && this.adNode.addChild(this.inter_full);
        }
        static ClearInterFull() {
            this.inter_full && this.inter_full.clear();
            this.inter_full = null;
        }
        static CreateInterFullLarge(backCallback = null, goonCallback = null) {
            BannerAndVideo1.Clear();
            if (JiujiuhuyuSdk.cfg.config.front_export_banner_appear != -1) Laya.timer.once(JiujiuhuyuSdk.cfg.config.front_export_banner_appear, this, this.timerOpenBanner);
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            this.inter_full_large = Laya.Browser.window["zzsdkui"].createFullLarge("inter_full_large", () => {
                console.log("interfulllarge,", "点击返回");
                BannerAndVideo1.hidebanner();
                Laya.timer.clear(this, this.timerOpenBanner);
                Laya.timer.clear(this, this.timerClsoeBanner);
                backCallback && backCallback();
                this.ClearInterFullLarge();
            }, () => {
                console.log("interfulllarge,", "点击继续游戏");
                BannerAndVideo1.hidebanner();
                Laya.timer.clear(this, this.timerOpenBanner);
                Laya.timer.clear(this, this.timerClsoeBanner);
                goonCallback && goonCallback();
                this.ClearInterFullLarge();
            });
            console.log("CreateInterFullLarge");
            this.inter_full_large && this.adNode.addChild(this.inter_full_large);
        }
        static ClearInterFullLarge() {
            this.inter_full_large && this.inter_full_large.clear();
            this.inter_full_large = null;
        }
        static CreateFloat(x, y) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            let float = Laya.Browser.window["zzsdkui"].createFloat(x, y, null, () => {
                console.log("float", "点击取消");
                xslsdk.CreateInterFullLarge(() => {
                    xslsdk.OpenDrawer();
                });
            });
            float && this.adNode.addChild(float);
            this.float.push(float);
        }
        static CreateFloat_defultIndex(x, y, index) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            let bgurl = null;
            let p_cancelCallback = () => {
                console.log("float", "点击取消");
                xslsdk.CreateInterFullLarge(() => {
                    xslsdk.OpenDrawer();
                });
            };
            let float = Laya.Browser.window["zzsdkui"].createFloat(x, y, null, p_cancelCallback, bgurl, index);
            float && this.adNode.addChild(float);
            this.float.push(float);
            return float;
        }
        static ClearFloat() {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            this.float.forEach(element => {
                element && element.clear();
            });
            this.float = [];
        }
        static CreateYouLike(y, cancelCallback = null) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            this.youlike = Laya.Browser.window["zzsdkui"].createYoulike(null, y, null, () => {
                console.log("youlike点击取消");
                cancelCallback && cancelCallback();
            });
            this.youlike && this.adNode.addChild(this.youlike);
        }
        static CreateYouLikeByJIE(y, cancelCallback = null) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return new Laya.Sprite();
            console.log("CreateYouLikeByJIE");
            let py = Laya.Browser.window["zzsdkui"].createYoulike(null, y, null, () => {
                console.log("youlike点击取消");
                cancelCallback && cancelCallback();
            });
            this.youlike = py;
            return py;
        }
        static ClearYouLike() {
            this.youlike && this.youlike.clear();
            this.youlike = null;
        }
        static CreateInter3_2UseScele(x, y, cancelCallback = null, x1, x2) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return new Laya.Sprite();
            this.inter_four3_2 = Laya.Browser.window["zzsdkui"].createInter("3*2", x, y, null, () => {
                console.log("inter_four点击取消");
                cancelCallback && cancelCallback();
            });
            let sp = this.inter_four3_2;
            sp.scale(x1, x2);
            return sp;
        }
        static CreateInter2x2(x, y, cancelCallback = null, x1, x2) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return new Laya.Sprite();
            this.inter_2_2 = Laya.Browser.window["zzsdkui"].createInterFour("inter_four", x, y, null, () => {
                console.log("inter_four点击取消");
                cancelCallback && cancelCallback();
            });
            let sp = this.inter_2_2;
            sp.scale(x1, x2);
            return sp;
        }
        static ClearInter2_2() {
            this.inter_2_2 && this.inter_2_2.clear();
            this.inter_2_2 = null;
        }
        static ClearInter3_2() {
            this.inter_four3_2 && this.inter_four3_2.clear();
            this.inter_four3_2 = null;
        }
        static OpenMainViewAd() {
            console.log("OpenMainViewAd", GameSample.commonData.onplatformWX, this.initOk);
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            let yoffset = 420 + 150;
            this.floatL = xslsdk.CreateFloat_defultIndex(0, Laya.stage.height - yoffset, 0);
            this.floatR = xslsdk.CreateFloat_defultIndex(Laya.stage.width - 170, Laya.stage.height - yoffset, 1);
            xslsdk.CreateDrawer(30 + 465, xslsdk.MainViewDrawerOnshow);
        }
        static MainViewDrawerOnshow(b) {
            if (b == false) {
                console.log(xslsdk.MainViewdrawerCloseCount);
                if (xslsdk.MainViewdrawerCloseCount >= 1) xslsdk.RndOpenAd();
                xslsdk.MainViewdrawerCloseCount += 1;
            }
        }
        static RndOpenAd() {}
        static ClearMainViewAd() {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            this.MainViewdrawerCloseCount = 0;
            xslsdk.ClearInterFull();
            xslsdk.ClearDeawer();
            xslsdk.ClearFloat();
        }
        static SendEnterLevel() {}
        static SendLevelOk() {}
        static CreateDrawerGameView(y, viewnode, callder, showCb) {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            console.log("CreateDrawer_GameView");
            this.drawer_Gameview = Laya.Browser.window["zzsdkui"].createDrawer_pull("drawer_pull", null, null, y, null, null, null, pshow => {
                if (showCb != null) {
                    showCb.call(callder, pshow);
                }
            });
            viewnode.addChildAt(this.drawer_Gameview, viewnode.numChildren - 2);
        }
        static Gameview_openDrawer() {
            if (!GameSample.commonData.onplatformWX || !this.initOk) return;
            this.drawer_Gameview && this.drawer_Gameview.openAd();
        }
        static CreateFullList() {
            this.interfull_list = window["zzsdkui"].createFullList("inter_full_list", function() {
                xslsdk.Clear_FullList();
            });
            this.interfull_list && this.adNode.addChild(this.interfull_list);
        }
        static Clear_FullList() {
            this.interfull_list && this.interfull_list.clear();
            this.interfull_list = null;
        }
    }
    xslsdk.use = false;
    xslsdk.initOk = false;
    xslsdk.canhide = false;
    xslsdk.float = [];
    xslsdk.MainViewdrawerCloseCount = 0;
    class LoadingViewArg {
        constructor() {
            this.subpackgeName = "";
        }
    }
    class LoadingView extends BaseView {
        constructor() {
            super(...arguments);
            this.fileLoadOk = false;
            this.currentProgress = 0;
        }
        onAwake() {
            super.onAwake();
            LoadingView.instance = this;
            this.loadingProgressBar.value = 0;
        }
        startLoad() {
            console.log("Platform.supportSubPackage()", Platform.supportSubPackage());
            if (Platform.supportSubPackage() == false) this.fileLoadOk = true; else {
                let sf = this;
                console.log("加载分包", this.arg.subpackgeName);
                let task = Platform.loadSubpackage_Single(this.arg.subpackgeName, this, this.subpackgeLoadOk);
                task.onProgressUpdate(function(res) {
                    sf.currentProgress = res.progress;
                    console.log(res.progress);
                });
            }
            Laya.timer.frameLoop(10, this, this.loopUpdate);
        }
        subpackgeLoadOk(isok) {
            console.log("subpackgeLoadresulet", isok);
            this.fileLoadOk = isok;
        }
        loopUpdate() {
            if (GameSample.commonData.OnIOS || GameSample.commonData.OnPc || Laya.Browser.onQGMiniGame || Laya.Browser.onVVMiniGame) {
                if (this.fileLoadOk) {
                    this.currentProgress = 1;
                }
                this.currentProgress *= 1;
                this.loadingProgressBar.value = this.currentProgress;
                this.loadingProgressLabel.text = Math.floor(this.currentProgress * 100) + "%";
            } else {
                if (this.fileLoadOk) {
                    this.currentProgress = 100;
                }
                this.currentProgress *= .01;
                this.loadingProgressBar.value = this.currentProgress;
                this.loadingProgressLabel.text = Math.floor(this.currentProgress * 100) + "%";
            }
            if (this.fileLoadOk && xslsdk.initOk) {
                console.log("this.fileLoadOk", this.fileLoadOk);
                Laya.timer.clear(this, this.loopUpdate);
                this.arg.loadokfunc.call(this.arg.callder);
            }
        }
        onClosed() {
            LoadingView.instance = null;
            super.onClosed();
            Laya.timer.clear(this, this.loopUpdate);
            this.destroy(true);
            Laya.Resource.destroyUnusedResources();
        }
    }
    class ViewMgr {
        constructor() {
            this.canshowRank = false;
        }
        static get instance() {
            if (ViewMgr.minstance == null) ViewMgr.minstance = new ViewMgr();
            return ViewMgr.minstance;
        }
        OpenGame(callder, callbackFunc) {
            Laya.Scene.open("views/game.scene", false, Laya.Handler.create(callder, view => {
                let viewtype = view;
                if (callbackFunc != null) callbackFunc.apply(callder);
            }));
        }
        OpenHome(callder, callbackFunc) {
            Laya.Scene.open("views/home.scene", false, Laya.Handler.create(callder, view => {
                let s = view;
                if (callbackFunc != null) callbackFunc.apply(callder);
            }));
        }
        OpenOver() {
            console.log("OpenOver");
            Laya.Scene.open("views/over.scene", false, Laya.Handler.create(this, view => {
                let s = view;
            }));
        }
        OpenHome_loadingeffect(callder, callbackFunc) {
            Laya.Scene.open("views/loadind.scene", false, Laya.Handler.create(callder, view => {
                let loadingView = view;
                let viewArg = new LoadingViewArg();
                viewArg.subpackgeName = "Home";
                viewArg.callder = this;
                let sf = this;
                viewArg.loadokfunc = (() => {
                    sf.OpenHome(callder, callbackFunc);
                });
                loadingView.arg = viewArg;
                loadingView.startLoad();
            }));
        }
        OpenGame_loadingeffect(callder, callbackFunc) {
            Laya.Scene.open("views/loadind.scene", false, Laya.Handler.create(callder, view => {
                let loadingView = view;
                let viewArg = new LoadingViewArg();
                viewArg.subpackgeName = "Game";
                viewArg.callder = this;
                viewArg.loadokfunc = (() => {
                    Laya.Scene.open("views/game.scene", false, Laya.Handler.create(callder, view => {
                        let s = view;
                        if (callbackFunc != null) callbackFunc.apply(callder);
                    }));
                });
                loadingView.arg = viewArg;
                loadingView.startLoad();
            }));
        }
        openDevBanner() {
            console.log("pc banner open");
            Laya.Scene.open("views/devad.scene", false, Laya.Handler.create(this, view => {
                this.devBanner = view;
            }));
        }
        CloseDevBanner() {
            this.devBanner.close();
        }
        ShowToas(str) {
            if (this.toastView == null) {
                Laya.Scene.open("views/toast.scene", false, Laya.Handler.create(this, view => {
                    var s = view;
                    s.zOrder = 999999999;
                    this.toastView = s;
                    this.toastView.Pushtoas(str);
                }));
            } else {
                this.toastView.Pushtoas(str);
                this.toastView.visible = true;
            }
        }
        openRank_old() {
            let rank = "views/rank.scene";
            Laya.Scene.open(rank, false, Laya.Handler.create(this, v => {
                v;
            }));
        }
        openRank(b) {
            this.canshowRank = b;
            if (b == false && this.mRankView != null) {
                this.mRankView.close();
                this.mRankView.clear();
            } else {
                let rank = "views/rankOver.scene";
                Laya.Scene.open(rank, false, Laya.Handler.create(this, v => {
                    this.mRankView = v;
                    if (this.canshowRank == false) this.openRank(false);
                }));
            }
        }
        OpenShop() {
            let shop = "views/shop.scene";
            Laya.Scene.open(shop, false, Laya.Handler.create(this, view => {
                GameView.instance.visible = false;
            }));
        }
        OpenChalle() {
            let viewName = "views/challenge.scene";
            Laya.Scene.open(viewName, false, Laya.Handler.create(this, view => {
                GameView.instance.visible = false;
            }));
        }
        OpenChallengeEnd() {
            let v = "views/challengeEnd.scene";
            Laya.Scene.open(v, false, Laya.Handler.create(this, view => {
                let v = view;
                GameView.instance.visible = false;
            }));
        }
    }
    class Player extends MonoBehaviour {
        constructor() {
            super(...arguments);
            this.canJump = true;
            this.localx = 0;
            this.isdeath = false;
            this.guiderIdx = -1;
            this.jumpy = 0;
            this.readBigJump = 0;
            this.fasRunTime = 0;
            this.isJump = false;
            this.IsFastRun = false;
            this.IsWudi = false;
            this.IsPowerFull = false;
            this.maxPowerFull = 1;
            this.curstarPower = 0;
            this.initOk = false;
            this.actionLeft = 2;
            this.actionRight = 3;
            this.actionUp = 0;
            this.actionDown = 1;
            this.actionSamllJump = 4;
            this.challengeEnd = false;
            this.fanzhuanyidong = false;
            this.baseHitScore = 0;
            this.rebornRead = false;
            this.addpowerTime = 0;
            this.samllJumpTime = 0;
            this.isbigJump = false;
            this.jumpTime = 0;
            this.issliderDwon = false;
            this.cameraOrz = -6.13;
        }
        onAwake() {
            super.onAwake();
            let aabbshape = new AABBShape();
            aabbshape.mask = CollisionMask.Character;
            aabbshape.collisionMask = 1 << CollisionMask.Obstacle | 1 << CollisionMask.Fish | 1 << CollisionMask.Award;
            aabbshape.size = new Laya.Vector3(.6, 1.2, .3);
            aabbshape.center = new Laya.Vector3(0, .6, 0);
            this.aabbshape = this.gameObject.addComponentIntance(aabbshape);
            aabbshape.ActiveDetec();
            aabbshape.RegisetCollsionEnter(this, this.OnCollisionEnter);
            let charaterIdx = PlayerPrefs.GetInt("onSelectChrater", 0);
            this.changgeSkin(charaterIdx);
            let hatIdx = PlayerPrefs.GetInt("shopSelectHat", 0);
            this.ShopSelectHat(hatIdx);
            EventMgr.instance.on(EventType.ShopSelectChrater, this, this.ShopSelectChrater);
            EventMgr.instance.on(EventType.ShopSelectHat, this, this.ShopSelectHat);
            this.winEffect = this.gameObject.getChildByName("FX_Wind");
            GameView.instance.samllBar.value = 0;
            let cameraAnimationGob = this.gameObject.parent.getChildByName("cameraAnimation");
            if (cameraAnimationGob != null) {
                this.cameraAnimator = cameraAnimationGob.getComponent(Laya.Animator);
                this.cameraAnimatorTrs = cameraAnimationGob.transform;
            }
            this.UIhitEffect = this.gameObject.getChildByName("UIhit");
        }
        ShopSelectChrater(idx) {
            this.changgeSkin(idx);
        }
        ShopSelectHat(idx) {
            if (this.curAvater.name == "Cat") {
                let mesh = this.curAvater.getChildByName("Mesh");
                for (let index = 0; index < 3; index++) {
                    const element = mesh.getChildAt(index + 1).active = false;
                }
                if (idx == 1) mesh.getChildByName("ConstructionGearMesh").active = true;
                if (idx == 2) mesh.getChildByName("HatandTie").active = true;
                if (idx == 3) mesh.getChildByName("PartHatandBowtie").active = true;
            } else {
                let mesh = this.curAvater.getChildByName("Mesh");
                for (let index = 0; index < 2; index++) {
                    const element = mesh.getChildAt(index).active = false;
                }
                if (idx == 1) mesh.getChildByName("ConstructionGearMesh").active = true;
                if (idx == 3) mesh.getChildByName("PartHatandBowtie").active = true;
            }
        }
        OnCollisionEnter(source, target) {
            if (target.mask == CollisionMask.Fish) {
                target.gameObject.active = false;
                Game.instance.playerEatFish();
            } else if (target.mask == CollisionMask.Award) {
                console.log("Award");
                this.UIhitEffect.active = false;
                this.UIhitEffect.active = true;
                SoundMgr.instance.starAward.Play();
                target.owner.active = false;
                if (target.gameObject.transform.localScaleX >= 2) this.PowerAdd2(1); else this.PowerAdd2(.3);
            } else if (Game.instance.guideSetp == false && target.mask == CollisionMask.Obstacle) {
                if (this.IsFastRun) {
                    SoundMgr.instance.hit.Play();
                    this.baseHitScore += 2;
                    GameView.instance.showHit(this.baseHitScore);
                }
                if (this.IsFastRun == false) this.Fail();
                let obstalcle = Game.instance.obstacleSpawn.itemMap.getNumberKey(target.gameObject.id);
                if (target.tag == "Rat") {
                    target.objdata.ani.play("Dead");
                    target.objdata.collider.enabled = false;
                } else {
                    obstalcle.ani.play("death");
                    obstalcle.collider.enabled = false;
                }
            }
        }
        PowerAdd2(n) {
            let pre = this.curstarPower;
            this.curstarPower += n;
            let t3 = this.curstarPower / this.maxPowerFull;
            GameView.instance.samllBar.value = t3;
            if (t3 >= 1) {
                if (pre / this.maxPowerFull < 1) SoundMgr.instance.powerUp.Play();
                this.IsPowerFull = true;
            }
        }
        Fail() {
            if (Game.instance.guideSetp) return;
            if (this.IsWudi) return;
            if (this.isdeath) return;
            Platform.vibrateLong();
            Game.instance.speed = 0;
            this.animator.play("Cat_Death");
            SoundMgr.instance.CatDeath.Play();
            Wxmgr.instance.UpLoadScore(Game.instance.floorScore());
            this.isJump = false;
            Game.instance.jumpaddspeed = 0;
            Game.instance.addspeed = 0;
            Laya.timer.once(1e3, this, () => {
                ViewMgr.instance.OpenOver();
            });
            GameView.instance.fishfont.visible = false;
            GameView.instance.score.visible = false;
            ViewMgr.instance.openRank(true);
            this.isdeath = true;
            Game.instance.StopCountDown();
        }
        Reborn() {
            this.rebornRead = true;
            this.isdeath = false;
            this.isbigJump = false;
            this.animator.crossFade("Cat_Idle", .2);
            GameView.instance.startbox.visible = true;
            ViewMgr.instance.openRank(false);
            GameView.instance.fishfont.visible = true;
            GameView.instance.score.visible = true;
            this.transform.localPositionY = 0;
        }
        onUpdate() {
            if ((Input.slideLeft || Input.slideRight) && (Input.slideUp || Input.slidedown)) {
                if (Math.abs(Input.slideXdis) >= Math.abs(Input.slideYdis)) {
                    Input.slideUp = false;
                    Input.slidedown = false;
                } else {
                    Input.slideLeft = false;
                    Input.slideRight = false;
                }
            }
            let action = -1;
            if (Game.instance.guideSetp) {
                action = this.GuiDeUpdate();
                if (Game.instance.cureentZ >= 114 + 7) Game.instance.GuideOk();
            } else {
                action = this.GetPlayerAciont();
                if (Input.GetKeyDown(Laya.Keyboard.LEFT)) action = this.actionLeft;
                if (Input.GetKeyDown(Laya.Keyboard.RIGHT)) action = this.actionRight;
                if (this.canJump == false && (action == this.actionSamllJump || action == this.actionUp)) {
                    action = -1;
                }
                if (this.fanzhuanyidong && action == this.actionRight) action = this.actionLeft; else if (this.fanzhuanyidong && action == this.actionLeft) action = this.actionRight;
            }
            if (this.isbigJump) {
                let t = (Time.time - this.jumpTime) / .7;
                if (t >= 1) {
                    t = 1;
                    this.isbigJump = false;
                }
                let y = Math.sin(t * 3.14) * 1.5;
                if (y <= 0) y = 0;
                this.transform.localPositionY = y;
            }
            if (this.IsFastRun) {
                let t = (Time.time - this.fasRunTime) / 8;
                if (t >= 1) {
                    t = 1;
                    this.IsFastRun = false;
                    this.FastRunOver();
                }
                let t1 = Math.sin(t * 3.14);
                Game.instance.addspeed = t1 * .5;
                if (this.IsFastRun == false) Game.instance.addspeed = 0;
                let tca = t1;
                t1 = t1 * 3;
                if (t1 >= 1) t1 = 1;
                this.transform.localPositionZ = t1 * 3;
                Game.instance.camera.fieldOfView = 60 + this.cameraAnimatorTrs.localPositionZ;
                if (Math.floor(t * 100) % 2 == 0) GameView.instance.bar.value = 1 - t;
            }
            if (this.isJump) {
                let t = (Time.time - this.samllJumpTime) / .2;
                if (t >= 1) t = 1;
                let t1 = Math.sin(t * 3.14);
                Game.instance.jumpaddspeed = t1 * .05;
            }
            if (this.isdeath || Game.instance.isPlay == false || this.rebornRead || this.challengeEnd) return;
            if (this.IsPowerFull && this.IsFastRun == false) {
                this.FastRun();
                this.IsPowerFull = false;
            }
            if (action == this.actionLeft) {
                this.localx += 1.25;
                this.powerAdd(this.actionLeft);
            } else if (action == this.actionRight) {
                this.localx -= 1.25;
                this.powerAdd(this.actionRight);
            }
            if (action == this.actionDown) this.sliderDwon();
            if (this.localx >= 1.25) this.localx = 1.25; else if (this.localx <= -1.25) this.localx = -1.25;
            if (action == this.actionUp) {
                this.BigJump();
            } else if (action == this.actionSamllJump) {
                this.Samlljump();
            }
            if (Input.GetKeyDown(Laya.Keyboard.SPACE)) this.FastRun();
            if (Input.GetKeyDown(Laya.Keyboard.W)) this.IsWudi = true;
            this.transform.localPositionX = Mathf.Lerp(this.transform.localPositionX, this.localx, .2);
        }
        FastRunOver() {
            GameView.instance.ShowHitEnd(this.baseHitScore);
            Game.instance.fastRunScore += this.baseHitScore;
            this.baseHitScore = 0;
        }
        powerAdd(actiontype) {
            if (Time.time - this.addpowerTime <= .5) return;
            this.addpowerTime = Time.time;
            this.PowerAdd2(.075);
        }
        GetPlayerAciont() {
            if (Input.mouseButton0Up && !Input.slideLeft && !Input.slideRight && !Input.slidedown && !Input.slideUp) {
                return this.actionSamllJump;
            } else if (Input.slidedown && this.isbigJump == false) {
                return this.actionDown;
            }
            if (Input.slideLeft) {
                return this.actionLeft;
            } else if (Input.slideRight) {
                return this.actionRight;
            }
            if (Input.slideUp) {
                return this.actionUp;
            }
            return -1;
        }
        Samlljump() {
            if (this.isJump) return;
            if (this.isbigJump) return;
            this.powerAdd(this.actionSamllJump);
            this.samllJumpTime = Time.time;
            this.isJump = true;
            console.log("samllJump");
            SoundMgr.instance.CatJump.Play();
            this.animator.play("Cat_Jump", 0, .2);
            this.aabbshape.center.y = 1.41;
            Laya.timer.once(400, this, this.crossFadeRun);
        }
        BigJump() {
            if (this.isbigJump) return;
            this.powerAdd(this.actionUp);
            console.log("bigJump");
            SoundMgr.instance.CatJump.Play();
            this.animator.speed = .8;
            this.animator.play("Cat_Jump", 0, 0);
            Laya.timer.once(700, this, this.crossFadeRun);
            Laya.timer.once(700, this, this.RestAnimatiorSpeed);
            this.isbigJump = true;
            this.jumpTime = Time.time;
        }
        RestAnimatiorSpeed() {
            this.animator.speed = 1;
        }
        leftRightjump() {}
        sliderDwon() {
            if (this.issliderDwon) return;
            this.issliderDwon = true;
            this.aabbshape.center.y = -.18;
            this.animator.play("Cat_Slide", 0, .15);
            Laya.timer.once(500, this, this.crossFadeRun);
            Laya.timer.once(500, this, () => {
                this.issliderDwon = false;
            });
            this.powerAdd(this.actionDown);
        }
        GuiDeUpdate() {
            let aciont = this.GetPlayerAciont();
            if (this.guiderIdx == 0 && aciont == this.actionSamllJump) {
                this.animator.speed = 1;
                Game.instance.NextGuide();
                this.guiderIdx = -1;
                return aciont;
            }
            if (this.guiderIdx == 1 && aciont == this.actionDown) {
                this.animator.speed = 1;
                Game.instance.NextGuide();
                this.guiderIdx = -1;
                return aciont;
            }
            if (this.guiderIdx == 2 && aciont == this.actionRight) {
                this.animator.speed = 1;
                Game.instance.NextGuide();
                this.guiderIdx = -1;
                return aciont;
            }
            if (this.guiderIdx == 3 && aciont == this.actionLeft) {
                this.animator.speed = 1;
                this.guiderIdx = -1;
                Game.instance.NextGuide();
                return aciont;
            }
            if (this.guiderIdx == 4 && aciont == this.actionUp) {
                this.animator.speed = 1;
                this.guiderIdx = -1;
                Game.instance.WaitGuiEnd();
                return aciont;
            }
            return -1;
        }
        crossFadeRun() {
            if (this.isdeath) return;
            if (this.challengeEnd) return;
            this.isbigJump = false;
            this.isJump = false;
            this.aabbshape.center.y = .6;
            this.animator.crossFade("Cat_RunLong", .2);
        }
        ChallenggeCrossFadeIdel() {
            console.log("this.challengeEnd");
            this.challengeEnd = true;
            this.animator.crossFade("Cat_Idle", .2);
        }
        changgeSkin(idx) {
            if (this.raccoon == null) this.raccoon = GameObject.Find(Game.instance.scene, "Racoon");
            if (this.cat == null) this.cat = GameObject.Find(Game.instance.scene, "Cat");
            if (idx == 1) {
                this.gameObject.addChild(this.raccoon);
                this.raccoon.active = true;
                this.animator = this.raccoon.getComponent(Laya.Animator);
                this.animator.play("Cat_Idle");
                this.cat.removeSelf();
                this.curAvater = this.raccoon;
            } else {
                this.gameObject.addChild(this.cat);
                this.cat.active = true;
                this.animator = this.cat.getComponent(Laya.Animator);
                this.animator.play("Cat_Idle");
                this.raccoon.removeSelf();
                this.curAvater = this.cat;
            }
            this.curAvater.transform.localRotationEulerY = 180;
        }
        StartRun() {
            this.curAvater.transform.localRotationEulerY = 0;
            this.animator.play("Cat_Start");
            Laya.timer.frameOnce(90 * 2, this, this.crossFadeRun);
        }
        FastRun() {
            this.IsPowerFull = false;
            GameView.instance.samllBar.value = 0;
            this.IsFastRun = true;
            this.fasRunTime = Time.time;
            this.winEffect.active = true;
            this.maxPowerFull += 1;
            this.curstarPower = 0;
            this.cameraAnimator.play("CameraFastRun", 0, 0);
            Laya.timer.once(6e3, this, () => {
                this.winEffect.active = false;
            });
            SoundMgr.instance.wineffect.PlayByNum(2);
            Laya.timer.once(8e3, this, () => {
                GameView.instance.bar.visible = false;
                if (this.IsPowerFull) {
                    this.FastRun();
                }
            });
            Laya.timer.once(5e3, this, () => {
                Game.instance.useSpwanobstacle = false;
            });
            Laya.timer.once(5500, this, () => {
                Game.instance.useSpwanobstacle = true;
            });
            GameView.instance.bar.visible = true;
        }
        onDestroy() {
            EventMgr.instance.off(EventType.ShopSelectChrater, this, this.ShopSelectChrater);
            EventMgr.instance.off(EventType.ShopSelectHat, this, this.ShopSelectHat);
            EventMgr.instance.offAllCaller(this);
        }
        FaceToCamera(b) {}
        StartGuider(idx) {
            this.animator.speed = 0;
            this.guiderIdx = idx;
        }
        onEnable() {
            Laya.timer.frameOnce(2, this, () => {
                EventMgr.instance.event(EventType.CharaterIniOk);
                this.winEffect.active = false;
                this.UIhitEffect.active = false;
            });
        }
    }
    class Rat extends MonoBehaviour {
        constructor() {
            super(...arguments);
            this.m_CurrentPos = 0;
            this.m_MaxSpeed = 0;
        }
        onStart() {}
        onUpdate() {}
    }
    class SeedRnd {
        constructor(p_seed) {
            this.seed = 1;
            this.seed = p_seed;
        }
        rnd() {
            this.seed = (this.seed * 9301 + 49297) % 233280;
            return this.seed / 233280;
        }
        getRandomInt(min, max) {
            let range = max - min;
            return min + Math.round(this.rnd() * range);
        }
        getRandomInt_NotIncludeMax(min, max) {
            return this.getRandomInt(min, max - 1);
        }
        getRandomIntArry(num) {
            let idx = this.getRandomInt(0, num.length - 1);
            return num[idx];
        }
    }
    class SpwanItemData {
        constructor() {
            this.goName = "";
            this.length = 0;
            this.active = false;
        }
    }
    class SpawnItem {}
    class SpwanConfigObj {
        constructor() {
            this.findRoot = "";
            this.startCreateZ = 0;
            this.CreateLength = 0;
            this.recoverOffset = 0;
        }
    }
    class BaseSpawn extends Laya.Script {
        constructor() {
            super(...arguments);
            this.runtimeItems = [];
            this.poolsignMap = new Dictionary();
            this.currentZ = 0;
            this.startCreateZ = 0;
            this.seed = new SeedRnd(0);
        }
        onStart() {
            this.startCreateZ = this.spwanConfigObj.startCreateZ;
            this.Create2End();
        }
        endZ() {
            return this.currentZ + this.spwanConfigObj.CreateLength;
        }
        Create2End() {
            var p_endZ = this.endZ();
            while (this.startCreateZ < p_endZ) {
                let spawnItem = this.DoSpawnItem(this.startCreateZ);
                this.startCreateZ += spawnItem.spwanItemData.length;
            }
        }
        DoSpawnItem(z) {
            let rndIdx = this.seed.getRandomInt_NotIncludeMax(0, this.spwanConfigObj.spwanItemDatas.length);
            var spwanItemData = this.spwanConfigObj.spwanItemDatas[rndIdx];
            var item = Laya.Pool.getItemByCreateFun(spwanItemData.goName, () => {
                return this.CreateSpwanItem(spwanItemData);
            }, this);
            this.scene.addChild(item.gob);
            this.onSpawn(item.gob, spwanItemData, z);
            item.gob.active = true;
            return item;
        }
        CreateSpwanItem(spwanItemData) {
            var gob = GameObject.Find(this.scene, this.spwanConfigObj.findRoot + "/" + spwanItemData.goName);
            var newGo = Laya.Sprite3D.instantiate(gob);
            this.scene.addChildren(newGo);
            newGo.active = true;
            let spawnItem = new SpawnItem();
            spawnItem.gob = newGo;
            spawnItem.spwanItemData = spwanItemData;
            this.runtimeItems.push(spawnItem);
            this.poolsignMap.add(spwanItemData.goName, "poolsign");
            return spawnItem;
        }
        onSpawn(newGo, spwanItemData, z) {}
        onUpdate() {
            this.Create2End();
            this.recoverLessZ();
        }
        recoverLessZ() {
            for (const spwanitem of this.runtimeItems) {
                if (spwanitem.gob.displayedInStage) {
                    let length = spwanitem.spwanItemData.length;
                    if (spwanitem.gob.transform.position.z + length * .5 < this.currentZ + this.spwanConfigObj.recoverOffset) {
                        Laya.Pool.recover(spwanitem.spwanItemData.goName, spwanitem);
                        spwanitem.gob.removeSelf();
                    }
                }
            }
        }
        recoverAll() {
            for (const spwanitem of this.runtimeItems) {
                if (true) {
                    {
                        Laya.Pool.recover(spwanitem.spwanItemData.goName, spwanitem);
                        spwanitem.gob.removeSelf();
                    }
                }
            }
        }
        onDestroy() {
            for (const iterator of this.poolsignMap.keys) {
                Laya.Pool.clearBySign(iterator);
            }
        }
    }
    class Obstacle {}
    class ObstacleSpawn extends BaseSpawn {
        constructor() {
            super(...arguments);
            this.itemMap = new Dictionary();
            this.gap = 10;
            this.challengeFishEndZ = 0;
            this.challengeCreateEndZ = 0;
            this.challengeIdx = -1;
            this.starBigSacle = new Laya.Vector3(2, 2, 2);
            this.starsamllSacle = new Laya.Vector3(1, 1, 1);
            this.guideIdx = 0;
            this.challgengeGap = 0;
            this.challgengArrx = [];
            this.arrxIdx = 0;
        }
        Create2End() {
            var p_endZ = this.endZ();
            if (this.challengeIdx != -1) {
                if (this.challengeCreateEndZ > this.startCreateZ) while (this.startCreateZ < p_endZ) {
                    let spwanitem = null;
                    if (Game.instance.useSpwanobstacle) {
                        spwanitem = this.DoSpawnItemChallgeIdx_0(this.startCreateZ);
                        this.startCreateZ += spwanitem.spwanItemData.length + this.gap + this.challgengeGap;
                    } else {
                        this.startCreateZ += 50 + this.gap;
                    }
                }
            } else {
                while (this.startCreateZ < p_endZ) {
                    let spwanitem = null;
                    let guiderOffser = 0;
                    if (this.guideIdx <= 4 && Game.instance.guideSetp) {
                        spwanitem = this.DoSpawnItemGuider(this.startCreateZ);
                        guiderOffser = 10;
                        Game.instance.guiderz[this.guideIdx - 1] = this.startCreateZ - 1.5;
                        if (this.guideIdx - 1 >= 2) Game.instance.guiderz[this.guideIdx - 1] -= 1.5;
                    } else if (Game.instance.useSpwanobstacle) spwanitem = this.DoSpawnItem(this.startCreateZ);
                    if (Game.instance.useSpwanobstacle) this.startCreateZ += spwanitem.spwanItemData.length + this.gap + guiderOffser; else {
                        this.startCreateZ += 50 + this.gap + guiderOffser;
                    }
                }
            }
        }
        DoSpawnItem(z) {
            let rndIdx = 0;
            let rnd = Math.random();
            if (rnd >= 1 - .2) rndIdx = 2; else if (rnd >= 1 - .3) rndIdx = 3; else if (rnd >= 1 - .4) rndIdx = 1; else {
                let rnd2 = Math.random();
                if (rnd2 >= 1 - .2) rndIdx = 0; else rndIdx = 4;
            }
            var spwanItemData = this.spwanConfigObj.spwanItemDatas[rndIdx];
            let item = Laya.Pool.getItemByCreateFun(spwanItemData.goName, () => {
                return this.CreateSpwanItem(spwanItemData);
            }, this);
            this.scene.addChild(item.gob);
            this.onSpawn(item.gob, spwanItemData, z);
            if (spwanItemData.goName == "ObstacleRoadworksBarrier") {
                let rnd = Math.random();
                if (rnd >= 1 - .2) {
                    let item2 = Laya.Pool.getItemByCreateFun(spwanItemData.goName, () => {
                        return this.CreateSpwanItem(spwanItemData);
                    }, this);
                    this.scene.addChild(item2.gob);
                    this.SpawnObstacle2(item2.gob, z, item.gob.transform.position.x);
                }
                let rndstar = Math.random();
                if (rndstar >= 1 - .5) {
                    let starData = this.spwanConfigObj.spwanItemDatas[5];
                    let star = Laya.Pool.getItemByCreateFun(starData.goName, () => {
                        return this.CreateSpwanStar(starData);
                    }, this);
                    this.scene.addChild(star.gob);
                    star.gob.active = true;
                    star.gob.transform.position = item.gob.transform.position.clone();
                    star.gob.transform.localPositionY += 2;
                    star.gob.transform.localScale = this.starBigSacle;
                }
            } else if (spwanItemData.goName == "ObstacleRoadworksCone") {
                let rndstar = Math.random();
                if (rndstar >= 1 - .2) {
                    let starData = this.spwanConfigObj.spwanItemDatas[5];
                    let star = Laya.Pool.getItemByCreateFun(starData.goName, () => {
                        return this.CreateSpwanStar(starData);
                    }, this);
                    this.scene.addChild(star.gob);
                    star.gob.active = true;
                    star.gob.transform.position = item.gob.transform.position.clone();
                    star.gob.transform.localScale = this.starsamllSacle;
                    let y = JTools.getRandomInt(150, 250) * .01;
                    star.gob.transform.localPositionY += y;
                }
            }
            return item;
        }
        DoSpawnItemGuider(z) {
            let rndIdx = this.guideIdx;
            let x = 0;
            if (this.guideIdx == 0) rndIdx = 3;
            if (this.guideIdx == 1) rndIdx = 1;
            if (this.guideIdx == 2) {
                rndIdx = 4;
                x = 0;
            }
            if (this.guideIdx == 3) {
                rndIdx = 4;
                x = -1.27;
            }
            if (this.guideIdx == 4) {
                rndIdx = 0;
                x = 0;
            }
            var spwanItemData = this.spwanConfigObj.spwanItemDatas[rndIdx];
            let item = Laya.Pool.getItemByCreateFun(spwanItemData.goName, () => {
                return this.CreateSpwanItem(spwanItemData);
            }, this);
            this.scene.addChild(item.gob);
            this.onSpawnGuide(item.gob, spwanItemData, z, x);
            if (this.guideIdx == 4) {
                var starData = this.spwanConfigObj.spwanItemDatas[5];
                let star = Laya.Pool.getItemByCreateFun(starData.goName, () => {
                    return this.CreateSpwanStar(starData);
                }, this);
                this.scene.addChild(star.gob);
                star.gob.active = true;
                star.gob.transform.position = item.gob.transform.position.clone();
                star.gob.transform.localPositionY += 2;
                star.gob.transform.localScale = this.starBigSacle;
            }
            this.guideIdx += 1;
            return item;
        }
        onSpawn(newGo, spwanItemData, z) {
            if (spwanItemData.goName == "ObstacleRoadworksBarrier" || spwanItemData.goName == "ObstacleRoadworksCone") {
                let arryNum = [ -1.27, 0, 1.27 ];
                let x = this.seed.getRandomIntArry(arryNum);
                newGo.transform.position = new Laya.Vector3(x, 0, z);
            } else {
                newGo.transform.position = new Laya.Vector3(0, 0, z);
            }
            let obstacle = this.itemMap.getNumberKey(newGo.id);
            if (spwanItemData.goName == "Rat") {
                let time = Math.random();
                obstacle.ani.play("Run", 0, time);
            } else obstacle.ani.play("idle", 0, 0);
            obstacle.collider.enabled = true;
        }
        onSpawnGuide(newGo, spwanItemData, z, x) {
            newGo.transform.position = new Laya.Vector3(x, 0, z);
            let obstacle = this.itemMap.getNumberKey(newGo.id);
            obstacle.ani.play("idle", 0, 0);
            obstacle.collider.enabled = true;
        }
        SpawnObstacle2(newGo, z, x) {
            let rnd = Math.random();
            if (x < 0) {
                if (rnd >= 1 - .5) x = 1.27; else x = 0;
            }
            if (x == 0) {
                if (rnd >= 1 - .5) x = -1.27; else x = 1.27;
            }
            if (x > 0) {
                if (rnd >= 1 - .5) x = -1.27; else x = 0;
            }
            newGo.transform.position = new Laya.Vector3(x, 0, z);
            let obstacle = this.itemMap.getNumberKey(newGo.id);
            obstacle.ani.play("idle", 0, 0);
            obstacle.collider.enabled = true;
        }
        CreateSpwanItem(spwanItemData) {
            let spwanitem = super.CreateSpwanItem(spwanItemData);
            let newgo = spwanitem.gob;
            let obstacle = new Obstacle();
            obstacle.ani = newgo.getChildAt(0).getComponent(Laya.Animator);
            this.itemMap.add(newgo.id, obstacle);
            let boxCollider = new AABBShape();
            boxCollider.mask = CollisionMask.Obstacle;
            boxCollider.collisionMask = 0;
            let collidergob = newgo;
            if (spwanItemData.goName == "ObstacleRoadworksBarrier") {
                boxCollider.center = new Laya.Vector3(0, .7, 0);
                boxCollider.size = new Laya.Vector3(1, 1, .6);
            } else if (spwanItemData.goName == "ObstacleRoadworksCone") {
                boxCollider.center = new Laya.Vector3(0, .4, 0);
                boxCollider.size = new Laya.Vector3(1, .5, .6);
            } else if (spwanItemData.goName == "ObstacleHighBarrier") {
                boxCollider.center = new Laya.Vector3(0, 1.4, 0);
                boxCollider.size = new Laya.Vector3(4.8, .5, .6);
            } else if (spwanItemData.goName == "RoadWorksBarrierLow") {
                boxCollider.center = new Laya.Vector3(0, .2, 0);
                boxCollider.size = new Laya.Vector3(4.8, .5, .6);
            } else if (spwanItemData.goName == "Rat") {
                boxCollider.tag = "Rat";
                boxCollider.center = new Laya.Vector3(0, .6, 0);
                boxCollider.size = new Laya.Vector3(.5, .1, .5);
                collidergob = spwanitem.gob.getChildAt(0);
                let rat = spwanitem.gob.addComponent(Rat);
                boxCollider.objdata = obstacle;
            } else if (spwanItemData.goName == "Star") {
                boxCollider.mask = CollisionMask.Award;
                boxCollider.collisionMask = 0;
                boxCollider.center = new Laya.Vector3(0, 0, 0);
                boxCollider.size = new Laya.Vector3(.5, .5, .5);
            }
            collidergob.addComponentIntance(boxCollider);
            obstacle.ani = newgo.getChildAt(0).getComponent(Laya.Animator);
            obstacle.collider = boxCollider;
            return spwanitem;
        }
        CreateSpwanStar(spwanItemData) {
            let spwanitem = super.CreateSpwanItem(spwanItemData);
            let newgo = spwanitem.gob;
            let obstacle = new Obstacle();
            this.itemMap.add(newgo.id, obstacle);
            let boxCollider = new AABBShape();
            let collidergob = newgo;
            boxCollider.mask = CollisionMask.Award;
            boxCollider.collisionMask = 0;
            boxCollider.center = new Laya.Vector3(0, 0, 0);
            boxCollider.size = new Laya.Vector3(.5, .5, .5);
            collidergob.addComponentIntance(boxCollider);
            obstacle.collider = boxCollider;
            return spwanitem;
        }
        DoSpawnItemChallgeIdx_0(z) {
            let spwanStar = false;
            let doubleKuaLan = false;
            let forceX = -999;
            let startype = 0;
            let rndIdx = 3;
            if (this.challengeIdx == 0) rndIdx = 4;
            if (this.challengeIdx == 1) {
                rndIdx = 3;
                spwanStar = true;
            }
            if (this.challengeIdx == 2) {
                rndIdx = 1;
                spwanStar = false;
            }
            if (this.challengeIdx == 3) {
                rndIdx = 1;
                spwanStar = true;
            }
            if (this.challengeIdx == 4) {
                rndIdx = 0;
                spwanStar = true;
                this.challgengeGap = 16;
                doubleKuaLan = false;
                startype = 0;
                forceX = 0;
            }
            let useArrx = false;
            if (this.challengeIdx == 5) {
                rndIdx = 0;
                spwanStar = true;
                this.challgengeGap = 4;
                doubleKuaLan = false;
                startype = 0;
                if (this.challgengArrx.length == 0) {
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(-1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(-1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(-1.27);
                }
                useArrx = true;
            }
            if (this.challengeIdx == 6) {
                rndIdx = 0;
                spwanStar = true;
                this.challgengeGap = 2;
                doubleKuaLan = false;
                startype = 0;
                if (this.challgengArrx.length == 0) {
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(-1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(-1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(1.27);
                    this.challgengArrx.push(0);
                    this.challgengArrx.push(-1.27);
                }
                useArrx = true;
            }
            let starSpwnChllenge7 = false;
            if (this.challengeIdx == 7) {
                rndIdx = 4;
                spwanStar = false;
                this.challgengeGap = -2;
                doubleKuaLan = false;
                startype = 0;
                forceX = 0;
                starSpwnChllenge7 = true;
            }
            if (this.challengeIdx == 8) {
                rndIdx = 4;
                spwanStar = false;
                this.challgengeGap = 0;
                doubleKuaLan = false;
                startype = 0;
                forceX = 0;
                starSpwnChllenge7 = true;
            }
            var spwanItemData = this.spwanConfigObj.spwanItemDatas[rndIdx];
            let item = Laya.Pool.getItemByCreateFun(spwanItemData.goName, () => {
                return this.CreateSpwanItem(spwanItemData);
            }, this);
            this.scene.addChild(item.gob);
            this.onSpawn(item.gob, spwanItemData, z);
            if (useArrx) {
                item.gob.transform.localPositionX = this.challgengArrx[this.arrxIdx];
                this.arrxIdx += 1;
            }
            if (spwanItemData.goName == "ObstacleRoadworksBarrier") {
                if (forceX != -999) item.gob.transform.localPositionX = forceX;
                let rnd = Math.random();
                if (doubleKuaLan && rnd >= 1 - .2) {
                    let item2 = Laya.Pool.getItemByCreateFun(spwanItemData.goName, () => {
                        return this.CreateSpwanItem(spwanItemData);
                    }, this);
                    this.scene.addChild(item2.gob);
                    this.SpawnObstacle2(item2.gob, z, item.gob.transform.position.x);
                }
                {
                    let starData = this.spwanConfigObj.spwanItemDatas[5];
                    let star = Laya.Pool.getItemByCreateFun(starData.goName, () => {
                        return this.CreateSpwanStar(starData);
                    }, this);
                    this.scene.addChild(star.gob);
                    star.gob.active = true;
                    star.gob.transform.position = item.gob.transform.position.clone();
                    star.gob.transform.localPositionY += 2;
                    star.gob.transform.localScale = this.starsamllSacle;
                }
            } else if (spwanItemData.goName == "ObstacleRoadworksCone") {
                if (forceX != -999) item.gob.transform.localPositionX = forceX;
                let rndstar = Math.random();
                if (rndstar >= 1 - .2 && spwanStar) {
                    let starData = this.spwanConfigObj.spwanItemDatas[5];
                    let star = Laya.Pool.getItemByCreateFun(starData.goName, () => {
                        return this.CreateSpwanStar(starData);
                    }, this);
                    this.scene.addChild(star.gob);
                    star.gob.active = true;
                    star.gob.transform.position = item.gob.transform.position.clone();
                    star.gob.transform.localScale = this.starsamllSacle;
                    let y = JTools.getRandomInt(150, 250) * .01;
                    star.gob.transform.localPositionY += y;
                }
                if (starSpwnChllenge7) {
                    let starData = this.spwanConfigObj.spwanItemDatas[5];
                    let star = Laya.Pool.getItemByCreateFun(starData.goName, () => {
                        return this.CreateSpwanStar(starData);
                    }, this);
                    this.scene.addChild(star.gob);
                    star.gob.active = true;
                    star.gob.transform.position = item.gob.transform.position.clone();
                    star.gob.transform.localScale = this.starsamllSacle;
                    star.gob.transform.localPositionZ += 4;
                    star.gob.transform.localPositionY = .5;
                }
            } else if (spwanItemData.goName == "RoadWorksBarrierLow") {
                let arryNum = [ -1.27, 0, 1.27 ];
                let x = this.seed.getRandomIntArry(arryNum);
                let rndstar = Math.random();
                if (true) {
                    let starData = this.spwanConfigObj.spwanItemDatas[5];
                    let star = Laya.Pool.getItemByCreateFun(starData.goName, () => {
                        return this.CreateSpwanStar(starData);
                    }, this);
                    this.scene.addChild(star.gob);
                    star.gob.active = true;
                    star.gob.transform.position = item.gob.transform.position.clone();
                    star.gob.transform.localScale = this.starsamllSacle;
                    let y = 1.5;
                    star.gob.transform.localPositionY += y;
                    star.gob.transform.localPositionX = x;
                }
            } else if (spwanItemData.goName == "ObstacleHighBarrier") {
                let arryNum = [ -1.27, 0, 1.27 ];
                let x = this.seed.getRandomIntArry(arryNum);
                let rndstar = Math.random();
                if (spwanStar) {
                    let starData = this.spwanConfigObj.spwanItemDatas[5];
                    let star = Laya.Pool.getItemByCreateFun(starData.goName, () => {
                        return this.CreateSpwanStar(starData);
                    }, this);
                    this.scene.addChild(star.gob);
                    star.gob.active = true;
                    star.gob.transform.position = item.gob.transform.position.clone();
                    star.gob.transform.localScale = this.starsamllSacle;
                    let y = .5;
                    star.gob.transform.localPositionY += y;
                    star.gob.transform.localPositionX = x;
                }
            }
            return item;
        }
    }
    class FishSpwan extends BaseSpawn {
        constructor() {
            super(...arguments);
            this.gap = 0;
            this.xpos = 0;
        }
        Create2End() {
            var p_endZ = this.endZ();
            while (this.startCreateZ < p_endZ) {
                let arryNum = [ -1.25, 0, 1.25 ];
                this.xpos = this.seed.getRandomIntArry(arryNum);
                for (let index = 0; index < 5; index++) {
                    let spawnItem = this.DoSpawnItem(this.startCreateZ);
                    this.startCreateZ += spawnItem.spwanItemData.length;
                }
                this.gap = this.seed.getRandomInt(10, 30);
                this.startCreateZ += this.gap;
            }
        }
        onSpawn(newGo, spwanItemData, z) {
            newGo.transform.position = new Laya.Vector3(this.xpos, .41, z);
            newGo.active = true;
        }
        CreateSpwanItem(spwanItemData) {
            let item = super.CreateSpwanItem(spwanItemData);
            let newgo = item.gob;
            let boxCollider = new AABBShape();
            boxCollider.mask = CollisionMask.Fish;
            boxCollider.collisionMask = 0;
            boxCollider.size = new Laya.Vector3(1, 1, .34);
            boxCollider.center = new Laya.Vector3(0, 0, 0);
            newgo.addComponentIntance(boxCollider);
            return item;
        }
    }
    class VertexColor extends Laya.Material {
        constructor() {
            super();
            this.setShaderName("VertexColor");
            this._shaderValues.addDefine(VertexColor.SHADERDEFINE_ENABLEVERTEXCOLOR);
        }
        static initShader() {
            if (VertexColor.hasInt) return;
            VertexColor.hasInt = true;
            VertexColor.SHADERDEFINE_ENABLEVERTEXCOLOR = Laya.Shader3D.getDefineByName("ENABLEVERTEXCOLOR");
            var attributeMap = {
                a_Position: Laya.VertexMesh.MESH_POSITION0,
                a_Color: Laya.VertexMesh.MESH_COLOR0
            };
            var uniformMap = {
                u_MvpMatrix: Laya.Shader3D.PERIOD_SPRITE
            };
            let VS = `\n            attribute vec4 a_Position;\n            uniform mat4 u_MvpMatrix;\n            \n            #if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\n                attribute vec4 a_Color;\n                varying vec4 v_Color;\n            #endif\n\n            void main()\n            {\n                #if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\n                v_Color = a_Color;\n                #endif\n                gl_Position = u_MvpMatrix * a_Position;\n            } `;
            let FS = `\n        //不能少写这行\n        #ifdef FSHIGHPRECISION\n                precision highp float;\n            #else\n                precision mediump float;\n            #endif\n        \n        #if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\n        varying vec4 v_Color;\n        #endif\n       \n        void main()\n        {\n        \n           #if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\n              gl_FragColor=v_Color;\n            #else\n              gl_FragColor=vec4(1.0);\n            #endif\n          \n        }\n        `;
            var LightSh = Laya.Shader3D.add("VertexColor");
            var subShader = new Laya.SubShader(attributeMap, uniformMap);
            LightSh.addSubShader(subShader);
            subShader.addShaderPass(VS, FS);
        }
    }
    VertexColor.hasInt = false;
    class BuildSpawn extends BaseSpawn {
        constructor() {
            super(...arguments);
            this.runtimeItems = [];
            this.poolsignMap = new Dictionary();
            this.currentZ = 0;
            this.startCreateZ = 0;
            this.seed = new SeedRnd(0);
        }
        onStart() {
            this.startCreateZ = this.spwanConfigObj.startCreateZ;
            this.Create2End();
        }
        endZ() {
            return this.currentZ + this.spwanConfigObj.CreateLength;
        }
        Create2End() {
            var p_endZ = this.endZ();
            while (this.startCreateZ < p_endZ) {
                let spawnItem = this.DoSpawnItem(this.startCreateZ);
                this.startCreateZ += spawnItem.spwanItemData.length;
            }
        }
        DoSpawnItem(z) {
            let rndIdx = this.seed.getRandomInt_NotIncludeMax(0, this.spwanConfigObj.spwanItemDatas.length);
            var spwanItemData = this.spwanConfigObj.spwanItemDatas[rndIdx];
            var item = Laya.Pool.getItemByCreateFun(spwanItemData.goName, () => {
                return this.CreateSpwanItem(spwanItemData);
            }, this);
            this.scene.addChild(item.gob);
            this.onSpawn(item.gob, spwanItemData, z);
            return item;
        }
        CreateSpwanItem(spwanItemData) {
            var gob = GameObject.Find(this.scene, this.spwanConfigObj.findRoot + "/" + spwanItemData.goName);
            var newGo = Laya.Sprite3D.instantiate(gob);
            this.scene.addChildren(newGo);
            newGo.active = true;
            let spawnItem = new SpawnItem();
            spawnItem.gob = newGo;
            spawnItem.spwanItemData = spwanItemData;
            this.runtimeItems.push(spawnItem);
            this.poolsignMap.add(spwanItemData.goName, "poolsign");
            return spawnItem;
        }
        onSpawn(newGo, spwanItemData, z) {
            newGo.transform.position = new Laya.Vector3(0, 0, z);
            let scale = newGo.transform.localScale;
            let arryNum = [ -1, 1 ];
            let x = this.seed.getRandomIntArry(arryNum);
            scale.x = x;
            newGo.transform.localScale = scale;
        }
        onUpdate() {
            this.Create2End();
            this.recoverLessZ_build();
        }
        recoverLessZ_build() {
            for (const spwanitem of this.runtimeItems) {
                if (spwanitem.gob.displayedInStage) {
                    let length = spwanitem.spwanItemData.length;
                    if (spwanitem.gob.transform.position.z + length * .5 < this.currentZ + this.spwanConfigObj.recoverOffset) {
                        Laya.Pool.recover(spwanitem.spwanItemData.goName, spwanitem);
                        spwanitem.gob.removeSelf();
                    }
                }
            }
        }
        onDestroy() {
            for (const iterator of this.poolsignMap.keys) {
                Laya.Pool.clearBySign(iterator);
            }
        }
    }
    class ChallengLevel {
        constructor() {
            this.star3_time = 0;
            this.star2_time = 0;
            this.star1_time = 30;
            this.startCreateZ = 0;
            this.finshEndZ = 0;
            this.createEndZ = -1;
            this.maxPoweFull = 0;
            this.tip = "";
            this.canJump = true;
            this.fanzhuanyidong = false;
        }
    }
    class ChallengeMgr {
        constructor() {
            this.star = 0;
            this.levels = [];
        }
        static get instance() {
            if (ChallengeMgr.m_instance == null) {
                ChallengeMgr.m_instance = new ChallengeMgr();
                ChallengeMgr.m_instance.init();
            }
            return ChallengeMgr.m_instance;
        }
        init() {
            let level1 = new ChallengLevel();
            level1.star3_time = 15;
            level1.star2_time = 17;
            level1.startCreateZ = 30;
            level1.finshEndZ = 200;
            level1.createEndZ = 200;
            level1.maxPoweFull = 1;
            let str = "200米能量赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关\n诀窍：多走位积累能量";
            level1.tip = str;
            this.levels.push(level1);
            level1 = new ChallengLevel();
            level1.star3_time = 13;
            level1.star2_time = 15;
            level1.startCreateZ = 30;
            level1.finshEndZ = 150;
            level1.createEndZ = 150;
            level1.maxPoweFull = 3;
            str = "150米小跳赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关";
            level1.tip = str;
            this.levels.push(level1);
            level1 = new ChallengLevel();
            level1.star3_time = 90;
            level1.star2_time = 100;
            level1.startCreateZ = 30;
            level1.finshEndZ = 150;
            level1.createEndZ = 150;
            level1.maxPoweFull = 3;
            level1.star1_time = 200;
            str = "150米滑铲赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关";
            level1.tip = str;
            this.levels.push(level1);
            level1 = new ChallengLevel();
            level1.star3_time = 13;
            level1.star2_time = 17;
            level1.startCreateZ = 30;
            level1.finshEndZ = 200;
            level1.createEndZ = 200;
            level1.maxPoweFull = 3;
            str = "200米滑铲赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关";
            level1.tip = str;
            this.levels.push(level1);
            level1 = new ChallengLevel();
            level1.star3_time = 18 + 1;
            level1.star2_time = 20 + 1;
            level1.startCreateZ = 30;
            level1.finshEndZ = 250;
            level1.createEndZ = 200;
            level1.maxPoweFull = 2.5;
            str = "200米跨栏赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关";
            level1.tip = str;
            this.levels.push(level1);
            level1 = new ChallengLevel();
            level1.star3_time = 18;
            level1.star2_time = 20;
            level1.startCreateZ = 30;
            level1.finshEndZ = 250;
            level1.createEndZ = 200;
            level1.maxPoweFull = 4;
            str = "200米蛇形跨栏赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关";
            level1.tip = str;
            this.levels.push(level1);
            level1 = new ChallengLevel();
            level1.star3_time = 18;
            level1.star2_time = 20;
            level1.startCreateZ = 30;
            level1.finshEndZ = 250;
            level1.createEndZ = 200;
            level1.maxPoweFull = 3.8;
            str = "究极200米蛇形跨栏赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关";
            level1.tip = str;
            this.levels.push(level1);
            level1 = new ChallengLevel();
            level1.star3_time = 19;
            level1.star2_time = 22;
            level1.startCreateZ = 30;
            level1.finshEndZ = 250;
            level1.createEndZ = 200;
            level1.maxPoweFull = 6.5;
            level1.canJump = false;
            str = "200米蛇形走位赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关 \n规则:禁止跳跃";
            level1.tip = str;
            this.levels.push(level1);
            level1 = new ChallengLevel();
            level1.star3_time = 19;
            level1.star2_time = 22;
            level1.startCreateZ = 30;
            level1.finshEndZ = 250;
            level1.createEndZ = 200;
            level1.maxPoweFull = 5;
            level1.canJump = false;
            level1.fanzhuanyidong = true;
            str = "究极200米蛇形走位赛\n3星: " + level1.star3_time + "秒内通关 \n2星: " + level1.star2_time + "秒内通关 \n规则:禁止跳跃&反向操作";
            level1.tip = str;
            this.levels.push(level1);
        }
    }
    class Game extends Laya.Script {
        constructor() {
            super(...arguments);
            this.cureentZ = 0;
            this.speed = .15;
            this.baseSpeed = .15;
            this.addspeed = 0;
            this.jumpaddspeed = 0;
            this.spwans = [];
            this.fishCount = 0;
            this.isPlay = false;
            this.guiderz = [];
            this.guiderzIdx = 0;
            this.guideSetp = true;
            this.waitGuide = true;
            this.useSpwanobstacle = true;
            this.initOk = false;
            this.fastRunScore = 0;
            this.challengIdx = -1;
            this.canJump = false;
            this.challengeCosTime = 0;
            this.start1v = true;
            this.start2v = true;
            this.isfadeToIdel = false;
            this.challengeOk = false;
            this.challengeOkTime = 0;
            this.guideAcionOk = false;
        }
        onAwake() {
            Game.instance = this;
            this.scene = SceneManager.game;
            this.scene.addComponent(CollsionManagerThreeD);
            this.fishCount = GameSample.GetGold();
            GameView.instance.fishfont.value = this.fishCount.toString();
            if (Platform.supportSubPackage() && Game.subSoundIsOk == false) Platform.loadSubpackage_Single("SoundGame", this, this.onsubpackgeLoadOk);
            if (Platform.supportSubPackage() == false) Game.subSoundIsOk = true;
            let sky = GameObject.Find(this.scene, "PlayerPivot/Sky");
            VertexColor.initShader();
            sky.meshRenderer.material = new VertexColor();
            this.camera = GameObject.Find(this.scene, "PlayerPivot/Main Camera");
            this.guideSetp = GameSample.needPlayGuide();
        }
        onsubpackgeLoadOk(isok) {
            Game.subSoundIsOk = true;
            if (isok && this.isPlay) SoundMgr.instance.PlayGameBgm();
        }
        onStart() {
            let bulidjsonStr = '{"findRoot":"Resources/BuildItem","spwanItemDatas":[{"goName":"IndustrialWarehouse01","length":18.0},{"goName":"IndustrialWarehouse03","length":27.0}],"startCreateZ":0.0,"CreateLength":100.0,"recoverOffset":-15.0}';
            let fishjsonStr = '{"findRoot":"Resources/items","spwanItemDatas":[{"goName":"Fish","length":1.0}],"startCreateZ":30.0,"CreateLength":100.0,"recoverOffset":-5.0}';
            let obstaclejsonStr = '{"findRoot":"Resources/items","spwanItemDatas":[' + '{"goName":"ObstacleRoadworksBarrier","length":1.0},' + '{"goName":"ObstacleHighBarrier","length":1.0},' + '{"goName":"Rat","length":1.0},' + '{"goName":"RoadWorksBarrierLow","length":1.0},' + '{"goName":"ObstacleRoadworksCone","length":1.0},' + '{"goName":"Star","length":1.0}' + '],"startCreateZ":30.0,"CreateLength":100.0,"recoverOffset":-10.0}';
            let buildSpwan = new BuildSpawn();
            buildSpwan.spwanConfigObj = JSON.parse(bulidjsonStr);
            buildSpwan.scene = this.scene;
            this.scene.addComponentIntance(buildSpwan);
            this.spwans.push(buildSpwan);
            if (GameDesgin.spwanFish) {
                let fishSpwan = new FishSpwan();
                fishSpwan.spwanConfigObj = JSON.parse(fishjsonStr);
                fishSpwan.scene = this.scene;
                this.scene.addComponentIntance(fishSpwan);
                this.spwans.push(fishSpwan);
            }
            if (GameDesgin.spwanObstacle) {
                let p_ObstacleSpawn = new ObstacleSpawn();
                p_ObstacleSpawn.spwanConfigObj = JSON.parse(obstaclejsonStr);
                p_ObstacleSpawn.scene = this.scene;
                this.scene.addComponentIntance(p_ObstacleSpawn);
                this.spwans.push(p_ObstacleSpawn);
                this.obstacleSpawn = p_ObstacleSpawn;
            }
            this.playerPivot = this.scene.getChildByName("PlayerPivot");
            let charater = GameObject.Find(this.scene, "PlayerPivot/charater");
            this.player = charater.addComponent(Player);
            this.qizi = GameObject.Find(Game.instance.scene, "beibaiqi");
            this.qizi.active = false;
            this.updateScore();
            this.initOk = true;
        }
        openUIReadUi(b) {
            GameView.instance.shop.visible = b;
            GameView.instance.challenge.visible = b;
        }
        startGmae() {
            if (this.player.rebornRead) {
                this.player.StartRun();
                if (this.challengIdx != -1) this.StartChallengeTime(true);
                this.openUIReadUi(false);
                Laya.timer.frameOnce(90 * 2 + 20, this, () => {
                    this.isPlay = true;
                    this.speed = this.baseSpeed;
                    this.player.rebornRead = false;
                });
                Laya.timer.once(4e3, this, () => {
                    Game.instance.RebronStarCountDown();
                });
                if (Game.subSoundIsOk) SoundMgr.instance.PlayGameBgm();
                return;
            }
            this.player.StartRun();
            if (this.challengIdx != -1) this.StartChallengeTime(false);
            Laya.timer.loop(300, this, this.updateScore);
            this.openUIReadUi(false);
            Laya.timer.frameOnce(90 * 2 + 20, this, () => {
                this.isPlay = true;
            });
            if (Game.subSoundIsOk) SoundMgr.instance.PlayGameBgm();
        }
        StartChallengeTime(isReborn) {
            if (!isReborn) this.challengeCosTime = 0;
            GameView.instance.timeCountDown.value = this.challengeCosTime.toString();
            GameView.instance.timeCountDown.visible = this.challengIdx >= 0;
            if (!isReborn) Laya.timer.loop(1e3, this, this.TimeAdd);
        }
        TimeAdd() {
            this.challengeCosTime += 1;
            GameView.instance.timeCountDown.value = this.challengeCosTime.toString();
            this.calStar();
            GameView.instance.startBar.value = this.challengeCosTime / ChallengeMgr.instance.curChallengLevel.star1_time;
        }
        updateScore() {
            GameView.instance.score.value = this.floorScore().toString();
        }
        floorScore() {
            return Math.floor(this.cureentZ) + this.fastRunScore;
        }
        onUpdate() {
            if (Input.GetKeyDown(Laya.Keyboard.T)) ViewMgr.instance.ShowToas("test");
            if (Input.GetKeyDown(Laya.Keyboard.N)) GameView.instance.showHit(JTools.getRandomInt(1, 9));
            if (Input.GetKeyDown(Laya.Keyboard.M)) GameView.instance.ShowHitEnd(JTools.getRandomInt(1, 9));
            if (Input.GetKeyDown(Laya.Keyboard.NUMBER_9)) {
                GameSample.cheatGold();
            }
            if (Input.GetKeyDown(Laya.Keyboard.P)) {
                if (this.speed != 0) this.speed = 0; else this.speed = this.baseSpeed;
            }
            if (this.isPlay) {
                if (this.speed <= 0) this.speed = 0;
                let combineSpeed = (this.speed + this.addspeed + this.jumpaddspeed) * Time.deltaTime * 100;
                if (combineSpeed <= .01 && this.isfadeToIdel == false && this.challengeOk) {
                    this.isfadeToIdel = true;
                    this.player.ChallenggeCrossFadeIdel();
                    this.CalChallengeRank();
                    ViewMgr.instance.OpenChallengeEnd();
                }
                this.cureentZ += combineSpeed;
                if (this.guideSetp && this.challengIdx == -1 && this.guideAcionOk == false && this.cureentZ >= this.guiderz[this.guiderzIdx]) {
                    this.cureentZ = this.guiderz[this.guiderzIdx];
                    if (this.waitGuide) {
                        this.player.StartGuider(this.guiderzIdx);
                        if (this.guiderzIdx == 4) {
                            GameView.instance.DoShowGuideFinger(0);
                            this.cureentZ -= 1;
                        } else if (this.guiderzIdx == 0) {
                            GameView.instance.DoShowGuideFinger(4);
                        } else GameView.instance.DoShowGuideFinger(this.guiderzIdx);
                    }
                    this.waitGuide = false;
                }
            }
            for (let index = 0; index < this.spwans.length; index++) {
                this.spwans[index].currentZ = this.cureentZ;
            }
        }
        onLateUpdate() {
            let pos = this.playerPivot.transform.position;
            pos.z = this.cureentZ;
            this.playerPivot.transform.position = pos;
            if (this.challengIdx != -1 && this.cureentZ >= this.obstacleSpawn.challengeFishEndZ && this.challengeOk == false) {
                this.challengeOkTime = Time.time;
                this.challengeOk = true;
                Laya.timer.clear(this, this.TimeAdd);
                this.calStar();
            }
            if (this.challengeOk) {
                let t = (Time.time - this.challengeOkTime) / 2;
                this.speed -= t * .02;
            }
        }
        CalChallengeRank() {
            if (this.challengeCosTime <= ChallengeMgr.instance.curChallengLevel.star3_time) {
                ChallengeMgr.instance.star = 3;
            } else if (this.challengeCosTime <= ChallengeMgr.instance.curChallengLevel.star2_time) {
                ChallengeMgr.instance.star = 2;
            } else {
                ChallengeMgr.instance.star = 1;
            }
            console.log(this.challengeCosTime);
            console.log(ChallengeMgr.instance.curChallengLevel.star3_time, ChallengeMgr.instance.curChallengLevel.star2_time);
            console.log(ChallengeMgr.instance.star);
        }
        calStar() {
            if (this.challengIdx == -1) return;
            if (this.start1v && !(this.challengeCosTime <= ChallengeMgr.instance.curChallengLevel.star3_time)) {
                this.start1v = false;
                TweenMgr.instance.toScale_Jie(GameView.instance.star1, 3.5, 3.5, 0, 0, 700, 300, Laya.Ease.linearNone);
            }
            if (this.start2v && !(this.challengeCosTime <= ChallengeMgr.instance.curChallengLevel.star2_time)) {
                this.start2v = false;
                TweenMgr.instance.toScale_Jie(GameView.instance.star2, 3.5, 3.5, 0, 0, 700, 300, Laya.Ease.linearNone);
            }
        }
        playerEatFish() {
            this.fishCount += 1;
            GameView.instance.fishfont.value = this.fishCount.toString();
            SoundMgr.instance.FishCollection.Play();
        }
        NextGuide() {
            this.guiderzIdx += 1;
            this.waitGuide = true;
            GameView.instance.ClearFinger();
        }
        WaitGuiEnd() {
            this.guideAcionOk = true;
            GameView.instance.ClearFinger();
        }
        GuideOk() {
            this.guideSetp = false;
            GameSample.GuideOK();
            console.log("GuideOk");
            GameView.instance.ClearFinger();
        }
        onDestroy() {
            GameSample.SetGold(this.fishCount);
            GameView.instance.destroy();
            ViewMgr.instance.openRank(false);
            Game.instance = null;
        }
        StopCountDown() {
            if (this.challengIdx != -1) Laya.timer.clear(this, this.TimeAdd);
        }
        RebronStarCountDown() {
            if (this.challengIdx != -1) Laya.timer.loop(1e3, this, this.TimeAdd);
        }
    }
    Game.subSoundIsOk = false;
    class CommonData {
        constructor() {
            this.devtools = false;
            this.onplatformTT = false;
            this.onplatformWX = false;
            this.OnIOS = false;
            this.OnPc = false;
            this.OnAndroid = false;
            this.launchOptions = {};
        }
    }
    class GameSample {
        static OnGameSceneLoadOk(p_Scene3D) {
            Laya.stage.addChildAt(p_Scene3D, 0);
            SceneManager.game = p_Scene3D;
            EventMgr.instance.once(EventType.CharaterIniOk, this, () => {
                if (LoadingView.instance != null) {
                    LoadingView.instance.close();
                }
            });
            p_Scene3D.addComponent(Game);
        }
        static StartGame() {
            ViewMgr.instance.OpenGame(this, view => {
                SceneManager.LoadSceneByNameAtAsset("Game", this, this.OnGameSceneLoadOk);
            });
        }
        static GotoHome() {
            ViewMgr.instance.OpenHome(null, null);
        }
        static GotoHomeLoadEffect() {
            ViewMgr.instance.OpenHome_loadingeffect(null, null);
        }
        static StartGame_LoadEffect() {
            ViewMgr.instance.OpenGame_loadingeffect(this, view => {
                SceneManager.LoadSceneByNameAtAsset("Game", this, this.OnGameSceneLoadOk);
            });
        }
        static GetGold() {
            return PlayerPrefs.GetInt("gold", 0);
        }
        static GetGoldStr() {
            return PlayerPrefs.GetInt("gold", 0).toString();
        }
        static SetGold(g) {
            PlayerPrefs.SetInt("gold", g);
        }
        static cheatGold() {
            console.log("cheatGold");
            PlayerPrefs.SetInt("gold", 99999999999999);
        }
        static addGold(g) {
            let d = GameSample.GetGold() + g;
            PlayerPrefs.SetInt("gold", g);
        }
        static needPlayGuide() {
            return PlayerPrefs.GetInt("Guidev2", 0) == 0;
        }
        static GuideOK() {
            PlayerPrefs.SetInt("Guidev2", 1);
        }
        static StartChallenge(idx) {
            Game.instance.obstacleSpawn.recoverAll();
            let d = ChallengeMgr.instance.levels[idx];
            Game.instance.obstacleSpawn.startCreateZ = d.startCreateZ;
            Game.instance.obstacleSpawn.challengeIdx = idx;
            Game.instance.obstacleSpawn.Create2End();
            Game.instance.challengIdx = idx;
            Game.instance.qizi.active = true;
            Game.instance.obstacleSpawn.challengeFishEndZ = d.finshEndZ;
            Game.instance.qizi.transform.localPositionZ = d.finshEndZ;
            Game.instance.obstacleSpawn.challengeCreateEndZ = d.createEndZ;
            Game.instance.player.maxPowerFull = d.maxPoweFull;
            ChallengeMgr.instance.curChallengLevel = d;
            Wxmgr.instance.wxtongji(idx + 1, 1);
            Game.instance.player.canJump = d.canJump;
            Game.instance.player.fanzhuanyidong = d.fanzhuanyidong;
            Game.instance.openUIReadUi(false);
            GameView.instance.star1.x = d.star3_time / d.star1_time * 200;
            GameView.instance.star2.x = d.star2_time / d.star1_time * 200;
            GameView.instance.startBar.value = 0;
            GameView.instance.startBar.visible = true;
        }
        static SetLevelStar(level, star) {
            let oldStar = GameSample.GetLevelStar(level);
            if (oldStar > star) return;
            Wxmgr.instance.wxtongji(level + 1, 2);
            PlayerPrefs.SetInt("level" + level, star);
        }
        static GetLevelStar(level) {
            return PlayerPrefs.GetInt("level" + level, 0);
        }
    }
    GameSample.commonData = new CommonData();
    class ChallengeView extends BaseView {
        onAwake() {
            ChallengeView.instance = this;
            super.onAwake();
            EventMgr.instance.on(EventType.UpdateGoldItemUi, this, this.onUpdateGoldItemUi);
            Utils.addClickEvent(this.startChallenge, this, this.startChallengeClcik);
        }
        startChallengeClcik() {
            GameSample.StartChallenge(ChallengeView.challengeIdx);
            this.close();
            GameView.instance.visible = true;
        }
        onEnable() {
            this.coinFont.value = GameSample.GetGoldStr();
        }
        onUpdateGoldItemUi() {
            this.coinFont.value = GameSample.GetGoldStr();
        }
    }
    ChallengeView.challengeIdx = 0;
    class FunCallBackItem {}
    class SystemAcion {
        constructor() {
            this.funcs = [];
            this.hastregiser = false;
        }
        regiser(callder, func) {
            this.hastregiser = true;
            let t = new FunCallBackItem();
            t.callder = callder;
            t.func = func;
            this.funcs.push(t);
        }
        Invoke() {
            for (const iterator of this.funcs) {
                iterator.func.apply(iterator.callder);
            }
        }
        Invoke_par(argarry) {
            for (const iterator of this.funcs) {
                iterator.func.call(iterator.callder, argarry);
            }
        }
        static callMethod(arg, caller, method) {
            method.call(caller, arg);
        }
    }
    class Theme {
        constructor() {
            this.require_type = 0;
        }
    }
    class Item {}
    class ChallengeGrid extends Laya.Script {
        constructor() {
            super(...arguments);
            this.buyKey = "Challenge";
            this.theme = [];
            this.selectSkin = "";
            this.unselecSkin = "";
            this.childs = [];
            this.goldsLabel = [];
            this.lastSelectIdx = -1;
            this.lastSelectStr = "";
            this.ontabSelect = new SystemAcion();
            this.itemArry = [];
            this.items = [];
            this.defultIdx = 0;
        }
        Show(visble) {
            let b = this.owner;
            b.visible = visble;
        }
        onEnable() {
            this._onStart();
        }
        initData() {
            let lockUrl = "Textrue/loock.png";
            let t = new Theme();
            t.require_type = 1;
            this.theme.push(t);
            t = new Theme();
            t.require_type = 2;
            this.theme.push(t);
            t = new Theme();
            t.require_type = 2;
            this.theme.push(t);
            t = new Theme();
            t.require_type = 2;
            this.theme.push(t);
            t = new Theme();
            t.require_type = 2;
            this.theme.push(t);
            t = new Theme();
            t.require_type = 2;
            this.theme.push(t);
            t = new Theme();
            t.require_type = 2;
            this.theme.push(t);
            t = new Theme();
            t.require_type = 2;
            this.theme.push(t);
            t = new Theme();
            t.require_type = 2;
            this.theme.push(t);
        }
        _onStart() {
            this.initData();
            this.root = this.owner;
            let levelGround = this.root.getChildByName("levelGround");
            for (let index = 0; index < this.theme.length; index++) {
                {
                    let item = levelGround.getChildAt(index);
                    let icon = item.getChildAt(0);
                    this.childs.push(item);
                    this.itemArry.push(item);
                    let isCoin = false;
                    if (this.theme[index].require_type == 1) {
                        PlayerPrefs.SetInt(this.buyKey + index, 1);
                    }
                    let t = new Item();
                    let lockIcon = item.getChildAt(0);
                    t.lock = lockIcon;
                    t.star1 = item.getChildAt(1);
                    t.star2 = item.getChildAt(2);
                    t.star3 = item.getChildAt(3);
                    t.level = item.getChildAt(4);
                    t.level.value = (index + 1).toString();
                    this.items.push(t);
                    Utils.addClickEventScale(item, this, () => {
                        this.Select(index);
                    }, .9);
                }
            }
            this.updateView();
            this.Select(this.defultIdx);
        }
        updateView() {
            let saveData = [];
            for (let index = 0; index < this.theme.length; index++) {
                let isHas = PlayerPrefs.GetInt(this.buyKey + index, 0) == 1;
                if (index >= 1) {
                    isHas = GameSample.GetLevelStar(index - 1) >= 3;
                }
                if (isHas) {
                    this.items[index].lock.visible = false;
                    this.items[index].level.visible = true;
                    this.items[index].star1.visible = true;
                    this.items[index].star2.visible = true;
                    this.items[index].star3.visible = true;
                    let star = GameSample.GetLevelStar(index);
                    if (star == 3) {
                        this.items[index].star1.getChildAt(0).visible = true;
                        this.items[index].star2.getChildAt(0).visible = true;
                        this.items[index].star3.getChildAt(0).visible = true;
                    } else if (star == 2) {
                        this.items[index].star1.getChildAt(0).visible = true;
                        this.items[index].star2.getChildAt(0).visible = true;
                        this.items[index].star3.getChildAt(0).visible = false;
                    } else if (star == 1) {
                        this.items[index].star1.getChildAt(0).visible = true;
                        this.items[index].star2.getChildAt(0).visible = false;
                        this.items[index].star3.getChildAt(0).visible = false;
                    } else {
                        this.items[index].star1.getChildAt(0).visible = false;
                        this.items[index].star2.getChildAt(0).visible = false;
                        this.items[index].star3.getChildAt(0).visible = false;
                    }
                } else {
                    this.items[index].lock.visible = true;
                    this.items[index].level.visible = false;
                    this.items[index].star1.visible = false;
                    this.items[index].star2.visible = false;
                    this.items[index].star3.visible = false;
                }
            }
        }
        onVideoEndRope(idx) {
            this.updateView();
        }
        Select(idx) {
            let isHas = PlayerPrefs.GetInt(this.buyKey + idx, 0) == 1;
            if (idx >= 1) {
                isHas = GameSample.GetLevelStar(idx - 1) >= 3;
            }
            if (!isHas) {
                ViewMgr.instance.ShowToas("上一关获得3星即可解锁");
                return;
            }
            if (this.lastSelectIdx != -1) {
                this.unSelect(this.lastSelectIdx);
            }
            this.childs[idx].skin = this.selectSkin;
            this.lastSelectIdx = idx;
            this.updateView();
            this.ontabSelect.Invoke_par(idx);
        }
        unSelect(idx) {
            this.childs[idx].skin = this.unselecSkin;
        }
        buyRope(idx) {}
    }
    class ChallengeCtrl extends Laya.Script {
        onAwake() {
            this.shopView = this.owner;
            Utils.addClickEvent(this.btnBack, this, this.onBackClick);
            let itemKey = this.challengeGrid.buyKey;
            this.challengeGrid.defultIdx = 0;
            this.challengeGrid.ontabSelect.regiser(this, this.onSelectChallenge);
            this.ontabSelect(0);
        }
        onEnable() {
            this.challengeGrid.defultIdx = 0;
        }
        onSelectHat(idx) {
            console.log("Hat", idx);
            PlayerPrefs.SetInt("shopSelectHat", idx);
            EventMgr.instance.event(EventType.ShopSelectHat, idx);
        }
        onBackClick() {
            this.shopView.close();
            Game.instance.camera.transform.localPositionY = 4;
            Game.instance.camera.transform.localPositionZ = -5;
            GameView.instance.visible = true;
        }
        ontabSelect(idx) {
            console.log("tab", idx);
            this.challengeGrid.Show(true);
        }
        onSelectChallenge(idx) {
            ChallengeView.challengeIdx = idx;
            ChallengeView.instance.tip.text = ChallengeMgr.instance.levels[idx].tip;
        }
        onDisable() {}
    }
    class ChallengeEndView extends BaseView {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake();
        }
        onOpened(data) {
            Utils.addClickEvent(this.fullstarAward, this, this.fullstarAwardClcik);
            Utils.addClickEvent(this.no, this, this.noclick);
            Utils.addClickEvent(this.JuZhenCloseImg, this, this.JuZhenCloseImgClick);
            Utils.addClickEvent(this.gotohome, this, this.gotohomeClick);
            BannerAndVideo1.OpenBanner();
            if (ChallengeMgr.instance.star == 3) {
                this.star1.visible = true;
                this.star2.visible = true;
                this.star3.visible = true;
            } else if (ChallengeMgr.instance.star == 2) {
                this.star1.visible = true;
                this.star2.visible = true;
                this.star3.visible = false;
            } else {
                this.star1.visible = true;
                this.star2.visible = false;
                this.star3.visible = false;
            }
            GameSample.SetLevelStar(Game.instance.challengIdx, ChallengeMgr.instance.star);
            let t = xslsdk.CreateYouLikeByJIE(0, () => {
                xslsdk.CreateInterFullLarge();
            });
            this.addChildren(t);
            t.y = 300;
        }
        JuZhenCloseImgClick() {}
        fullstarAwardClcik() {
            console.log("Onrebornlick");
            BannerAndVideo1.ShowVideo(this, isok => {
                if (isok) {
                    this.DofullstarAward();
                } else ViewMgr.instance.ShowToas("看完视频才有奖励哦");
            });
        }
        gotohomeClick() {
            this.CloseLogical();
        }
        DofullstarAward() {
            this.star1.visible = true;
            this.star2.visible = true;
            this.star2.visible = true;
            GameSample.SetLevelStar(Game.instance.challengIdx, 3);
        }
        noclick() {
            console.log("noclick");
            this.CloseLogical();
        }
        CloseLogical() {
            Game.instance.scene.destroy(true);
            xslsdk.ClearYouLike();
            this.close();
            GameSample.GotoHomeLoadEffect();
        }
        onClosed() {
            BannerAndVideo1.Clear();
            this.offAll();
        }
    }
    ChallengeEndView.count = 0;
    class ProgressBarMasK extends Laya.Box {
        constructor() {
            super();
            this._with = 300;
            this._value = 0;
            this.leftToRight = false;
        }
        onAwake() {
            super.onAwake();
            this.font = this.getChildByName("font");
            this.maskImg = Laya.Loader.getRes(this.font.skin);
        }
        onEnable() {}
        onDisable() {}
        get value() {
            return this._value;
        }
        set value(progress) {
            if (progress >= 1) progress = 1;
            this._value = progress;
            if (this.font == null) this.font = this.getChildByName("font");
            this.font.graphics.clear();
            var x = this.font.width * progress;
            if (this.leftToRight) {
                this.font.graphics.drawImage(this.maskImg, progress * this._with, 0, this.font.width, this.font.height);
            } else this.font.graphics.drawImage(this.maskImg, x - this._with, 0, this.font.width, this.font.height);
        }
        set skin(v) {
            this.font.skin = v;
        }
    }
    class XslHomeview extends Laya.Script {
        initUI() {
            xslsdk.OpenMainViewAd();
        }
        close() {
            xslsdk.ClearMainViewAd();
        }
    }
    class HomeView extends BaseView {
        constructor() {
            super(...arguments);
            this.isClick = false;
        }
        onAwake() {
            super.onAwake();
        }
        onOpened(data) {
            this.startImage.on(Laya.Event.CLICK, this, this.OnStartImageClick);
            SceneManager.LoadSceneByNameAtAsset("Home", this, this.OnSceneLoadOk);
            if (Platform.supportSubPackage()) Platform.loadSubpackage_Single("SoundMain", this, this.onsubpackgeLoadOk); else SoundMgr.instance.BgmPlay();
            BannerAndVideo1.OpenBanner();
            BannerAndVideo1.showInterstitialAd();
            this.m_XslHomeview = this.getComponent(XslHomeview);
            this.m_XslHomeview.initUI();
        }
        onClosed() {
            BannerAndVideo1.Clear();
            this.m_XslHomeview.close();
        }
        onsubpackgeLoadOk(isok) {
            if (isok) {
                SoundMgr.instance.BgmPlay();
            }
        }
        OnSceneLoadOk(p_scene3D) {
            console.log("On home Scene LoadOk");
            this.scene3D = p_scene3D;
            Laya.stage.addChildAt(p_scene3D, 0);
            let sky = GameObject.Find(this.scene3D, "MenuEnvironment/Sky");
            VertexColor.initShader();
            sky.meshRenderer.material = new VertexColor();
            if (LoadingView.instance != null) {
                LoadingView.instance.close();
            }
        }
        OnStartImageClick() {
            if (this.isClick) return;
            if (this.scene3D == null) return;
            this.isClick = true;
            console.log("OnStartImageClick");
            GameSample.StartGame_LoadEffect();
            this.scene3D.destroy(true);
            this.scene3D = null;
            this.close();
        }
        onClose() {
            this.offAll();
        }
    }
    class SoundBtn extends Laya.Image {
        onAwake() {
            this.skin = SoundMgr.isPlaySound() ? "Textrue/btn_sound_on.png" : "Textrue/btn_sound_off.png";
            Utils.addClickEvent(this, this, this.OnClick);
        }
        OnClick() {
            let isplay = !SoundMgr.isPlaySound();
            SoundMgr.setPlaySound(isplay);
            this.skin = isplay ? "Textrue/btn_sound_on.png" : "Textrue/btn_sound_off.png";
            if (isplay) SoundMgr.instance.BgmPlaySetting(); else SoundMgr.instance.pauseBgm();
        }
    }
    class VibrateBtn extends Laya.Image {
        onAwake() {
            this.skin = Platform.isPlayVibrate() ? "Textrue/btn_vibrate_on.png" : "Textrue/btn_vibrate_off.png";
            Utils.addClickEvent(this, this, this.OnClick);
        }
        OnClick() {
            let isplay = !Platform.isPlayVibrate();
            Platform.setPlayVibrate(isplay);
            this.skin = isplay ? "Textrue/btn_vibrate_on.png" : "Textrue/btn_vibrate_off.png";
            console.log("Vibrate", isplay);
        }
    }
    class InitView extends BaseView {
        onAwake() {
            super.onAwake();
            GameSample.GotoHomeLoadEffect();
            Wxmgr.instance.init();
            BannerAndVideo1.InitVideo();
            JiujiuhuyuSdk.init();
        }
    }
    class OverView extends BaseView {
        constructor() {
            super();
        }
        onAwake() {
            super.onAwake();
        }
        onOpened(data) {
            Utils.addClickEvent(this.reborn, this, this.rebornclick);
            Utils.addClickEvent(this.no, this, this.noclick);
            Utils.addClickEvent(this.JuZhenCloseImg, this, this.JuZhenCloseImgClick);
            this.wxgamesAd.visible = false;
            OverView.count += 1;
            if (OverView.count % 2 == 0) {
                this.no.skin = "Textrue/gohome.png";
                this.reborn.visible = false;
            }
        }
        JuZhenCloseImgClick() {
            this.wxgamesAd.visible = false;
        }
        rebornclick() {
            console.log("Onrebornlick");
            BannerAndVideo1.ShowVideo(this, isok => {
                if (isok) {
                    Game.instance.player.Reborn();
                    this.close();
                } else ViewMgr.instance.ShowToas("看完视频才有奖励哦");
            });
        }
        noclick() {
            console.log("noclick");
            Game.instance.scene.destroy(true);
            OverView.count = 0;
            this.close();
            GameSample.GotoHomeLoadEffect();
        }
        onClosed() {
            BannerAndVideo1.Clear();
            this.offAll();
        }
    }
    OverView.count = 0;
    class WxappDaochu {
        constructor() {
            this.app_id = "";
            this.app_path = "";
            this.weight = 0;
            this.app_img = "";
            this.appName = "";
        }
    }
    class AdListLoopVerticle extends Laya.Script {
        constructor() {
            super();
            this.colCount = 4;
            this.mask = 0;
            this._cellWidth = 128;
            this._cellHeight = 128;
            this._spaceY = 0;
            this._spaceX = 0;
            this._mouseY = 0;
            this.fristPosY = 0;
            this.endPosY = 0;
            this.startTime = 0;
            this.speedTime = 0;
            this.gridSize = 28;
            this.cellHead2LastDis = 0;
            this._spaceY = 20;
            let log = this._spaceX;
            this.speedTime = 500;
        }
        onAwake() {}
        onStart() {
            return;
            if (Laya.Browser.onPC || true) {
                let data = [];
                for (let index = 0; index < this.gridSize; index++) {
                    data.push(new WxappDaochu());
                    data[index].app_img = "https://mmocgame.qpic.cn/wechatgame/iaG8OsnmtXCzP8CuibpiboUibCmnJo6CRuLyu3IlEVqRBT2U5GSlZibibk6iaUQTFZdj5hs/0.png";
                    data[index].app_id = "wx891a3ecfec2119d0";
                    data[index].app_path = "LanMaoPaoKu";
                }
                this.onHttpCallback(data);
            } else {}
            this.box = this.owner;
            this.box.visible = AdListLoopVerticle.wxappDownLoadOk;
            if (AdListLoopVerticle.wxappDownLoadOk == false) {
                Laya.timer.loop(1e3, this, this.checkDataDownloadProgress);
                return;
            } else {
                this.start();
            }
        }
        onHttpCallback(data) {
            AdListLoopVerticle.wxappList = data;
            AdListLoopVerticle.wxappDownLoadOk = true;
        }
        checkDataDownloadProgress() {
            if (AdListLoopVerticle.wxappDownLoadOk) {
                Laya.timer.clear(this, this.checkDataDownloadProgress);
                this.start();
                this.box.visible = AdListLoopVerticle.wxappDownLoadOk;
            }
        }
        start() {
            console.log("hello");
            let adInfos = AdListLoopVerticle.wxappList;
            let self = this;
            this._cells = [];
            let row = 0;
            let col = -1;
            this.posY = (this.owner.height - this._cellHeight) / 2;
            for (var j = 0; j < this.gridSize; j++) {
                let i = j % adInfos.length;
                var adinfo = adInfos[i];
                let image = new Laya.Image();
                this.owner.addChild(image);
                col += 1;
                if (col >= this.colCount) {
                    col = 0;
                    row += 1;
                }
                image.skin = adinfo.app_img;
                image.width = this._cellWidth;
                image.height = this._cellHeight;
                let pivotY = this._cellHeight * .5;
                let pivotX = this._cellWidth * .5;
                image.pivotY = pivotY;
                image.pivotX = pivotX;
                image.pos(col * (this._cellWidth + this._spaceX) + pivotX, row * (this._cellWidth + this._spaceY) + pivotY);
                let index = i;
                image.on(Laya.Event.MOUSE_DOWN, this, function() {
                    self.startTime = Laya.timer.currTimer;
                });
                image.on(Laya.Event.MOUSE_UP, this, function() {
                    if (Laya.timer.currTimer - self.startTime <= 200) {
                        self.tiaozhuang(adInfos[index], 3);
                    }
                    self.startTime = Laya.timer.currTimer;
                });
                this._cells.push(image);
            }
            this.fristPosY = this._cells[0].y;
            this.endPosY = this._cells[this._cells.length - 1].y;
            this.cellHead2LastDis = this.endPosY - this.fristPosY;
            this._mouseDown = false;
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.owner.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.owner.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            this.owner.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
            this.autoMove();
        }
        tiaozhuang(adInfo, positionIdx) {
            Wxmgr.instance.openOtherApp(adInfo);
        }
        autoMove() {
            if (this._cells.length <= 4) {
                return;
            }
            let sf = this;
            Laya.timer.clearAll(this);
            Laya.timer.loop(10, this, function() {
                sf.move();
            });
        }
        move() {
            this.MoveList(-.5);
        }
        firstMoveToEnd() {
            let currEndCell = this._cells[this._cells.length - 1];
            let cell = this._cells.shift();
            cell.pos(currEndCell.x + this._cellWidth + this._spaceY, this.posY);
            this._cells.push(cell);
        }
        endMoveToFrist() {
            let currFristCell = this._cells[0];
            let cell = this._cells.pop();
            let y = currFristCell.y - this._cellWidth - this._spaceY;
            cell.pos(currFristCell.x, y);
            this._cells.unshift(cell);
        }
        mouseDown() {
            this._mouseDown = true;
            Laya.timer.clearAll(this);
            this._mouseY = this._mouseY = Laya.MouseManager.instance.mouseY;
            Laya.timer.clearAll(this);
            for (var i = 0; i < this._cells.length; i++) {
                let cell = this._cells[i];
                Laya.Tween.clearAll(cell);
            }
        }
        mouseMove() {
            if (this._mouseDown) {
                var dis = Laya.MouseManager.instance.mouseY - this._mouseY;
                this._mouseY = Laya.MouseManager.instance.mouseY;
                this.MoveList(dis);
            }
        }
        MoveList(dis) {
            {
                for (var j = 0; j < this._cells.length; j++) {
                    let cell = this._cells[j];
                    cell.pos(cell.x, cell.y + dis);
                    if (cell.y < this.fristPosY - this._cellHeight && dis < 0) {
                        cell.y += this.cellHead2LastDis + this._cellHeight + this._spaceY;
                    } else if (cell.y > this.endPosY && dis > 0) {
                        cell.y -= this.cellHead2LastDis + (this._cellHeight + this._spaceY);
                    }
                }
            }
        }
        mouseUp(event) {
            this._mouseDown = false;
            this.autoMove();
        }
    }
    AdListLoopVerticle.wxappDownLoadOk = false;
    AdListLoopVerticle.wxappList = [];
    class XslLostView extends Laya.Script {
        onAwake() {}
        onEnable() {
            xslsdk.CreateInterFullLarge();
        }
        onDisable() {}
    }
    class RankItem extends Laya.Box {
        constructor() {
            super();
            this.size(this.width, this.height);
            this.initUI();
        }
        initUI() {
            let prefab = Laya.loader.getRes("prefab/rankItem.json");
            let item = Laya.Pool.getItemByCreateFun("rankItem", prefab.create, prefab);
            this.imgBg = item.getChildByName("bg");
            this.lblName = item.getChildByName("lblName");
            this.lblScore = item.getChildByName("lblScore");
            this.lblRank = item.getChildByName("lblRank");
            this.imgAvatar = item.getChildByName("avatar");
            this.addChild(item);
        }
        setRankItem(itemData) {
            console.log(itemData);
            let name = itemData.user_nickname.length > 6 ? itemData.user_nickname.substr(0, 8) : itemData.user_nickname;
            this.lblName.text = name != "" ? name : "神秘玩家";
            let textSize = 28;
            let textStr = itemData.rank;
            if (itemData.rank == 0) {
                textSize = 24;
                textStr = "未上榜";
            }
            this.lblRank.fontSize = textSize;
            this.lblRank.text = textStr;
            this.lblScore.text = itemData.score;
            let avatarUrl = itemData.avatar != "" ? itemData.avatar : "ui/rank/avater_default.png";
            this.imgBg.loadImage(itemData.bgUrl);
            this.imgAvatar.loadImage(avatarUrl);
        }
        setRankItem_Scut(itemData) {
            if (itemData.world_nickName == null) {
                itemData.world_nickName = "未开启联网";
                itemData.rank = 0;
                if (itemData.score == null) itemData.score = 0;
            }
            let name = itemData.world_nickName.length > 6 ? itemData.world_nickName.substr(0, 8) : itemData.world_nickName;
            this.lblName.text = name != "" ? name : "神秘玩家";
            let textSize = 28;
            let textStr = itemData.rank.toString();
            if (itemData.rank == 0) {
                textSize = 24;
                textStr = "未上榜";
            }
            this.lblRank.fontSize = textSize;
            this.lblRank.text = textStr;
            this.lblScore.text = itemData.score.toString();
            let avatarUrl = itemData.avatar != "" ? itemData.avatar : "ui/rank/avater_default.png";
            if (avatarUrl == null) avatarUrl = "ui/rank/avater_default.png";
            this.imgBg.loadImage(itemData.bgUrl);
            this.imgAvatar.loadImage(avatarUrl);
        }
        setRankItem_Oppo_Hc(itemData, type) {
            if (itemData.nickname == null) {
                itemData.nickname = "未开启联网";
                itemData.rank = 0;
                if (itemData.max_score == null) itemData.max_score = 0;
            }
            let name = itemData.nickname.length > 6 ? itemData.nickname.substr(0, 8) : itemData.nickname;
            this.lblName.text = name != "" ? name : "神秘玩家";
            let textSize = 28;
            let textStr = "";
            if (itemData.rank == null) {
                textSize = 24;
                textStr = "未上榜";
            } else if (itemData.rank == 0) {
                textSize = 24;
                textStr = "未上榜";
            } else {
                textStr = itemData.rank.toString();
            }
            this.lblRank.fontSize = textSize;
            this.lblRank.text = textStr;
            if (itemData.pass != null && type == 2) {
                this.lblScore.text = itemData.pass.toString() + "关";
            } else if (itemData.max_score != null && type == 1) this.lblScore.text = itemData.max_score.toString() + "米"; else {
                this.lblScore.text = "没有记录";
            }
            let avatarUrl = "";
            if (itemData.avatar == null || itemData.avatar == "") {
                avatarUrl = "ui/rank/avater_default.png";
            } else if (Laya.Browser.onMiniGame) {
                avatarUrl = itemData.avatar;
            } else if (itemData.avatar != null && itemData.avatar.endsWith("png") == false) {
                avatarUrl = "ui/rank/avater_default.png";
            } else avatarUrl = itemData.avatar;
            this.imgBg.loadImage(itemData.bgUrl);
            this.imgAvatar.loadImage(avatarUrl);
        }
    }
    class RankView extends Laya.Scene {
        constructor() {
            super();
            this.rankBgList = [ "ui/rank/bg_rank_1.png", "ui/rank/bg_rank_1.png", "ui/rank/bg_rank_1.png" ];
            this.rankMe = null;
            this.btnBack = null;
            this.friendList = null;
            this.worldLoading = 0;
        }
        onAwake() {
            super.onAwake();
            this.initUI();
            this.initEvent();
            this.onRankFriend();
            this.pageWorldRank = 1;
        }
        getChild(p_name, node = null) {
            if (node != null) return node.getChildByName(p_name);
            return this.getChildByName(p_name);
        }
        initUI() {
            let top = this.getChild("topPanel");
            this.touchArea.alpha = 0;
        }
        addClickEvent(btn, self, cb) {
            btn.on(Laya.Event.CLICK, self, cb);
        }
        initEvent() {
            this.addClickEvent(this.btnBack, this, this.onCloseClick);
        }
        onClosed() {
            Laya.loader.clearRes("prefab/rankItem.json");
            this.clear();
        }
        initRankEvent(isOn) {
            if (!isOn) {
                this.touchArea.offAllCaller(this);
                this.touchArea.visible = false;
                this.friendList.visible = false;
                return;
            }
            this.touchArea.visible = true;
            this.friendList.visible = true;
            let startPos = 0;
            let startTime = 0;
            let rangeY = 0;
            let speed = 0;
            let pxRatio = Wxmgr.instance.wxsysInfo.pixelRatio ? Wxmgr.instance.wxsysInfo.pixelRatio : 1;
            if (!Laya.Browser.onWeiXin) return;
            this.touchArea.on(Laya.Event.MOUSE_DOWN, this, function(evt) {
                evt.stopPropagation();
                rangeY = 0;
                startTime = evt.nativeEvent.timeStamp;
                startPos = evt.nativeEvent.changedTouches[0].clientY;
                Wxmgr.instance.onFrientMouseEvent({
                    cmd: "touch_start"
                });
            });
            this.touchArea.on(Laya.Event.MOUSE_MOVE, this, function(evt) {
                evt.stopPropagation();
                rangeY = evt.nativeEvent.changedTouches[0].clientY - startPos;
                Wxmgr.instance.onFrientMouseEvent({
                    cmd: "touch_move",
                    deltaY: rangeY * pxRatio
                });
            });
            this.touchArea.on(Laya.Event.MOUSE_UP, this, function(evt) {
                evt.stopPropagation();
                speed = rangeY / (evt.nativeEvent.timeStamp - startTime);
                Wxmgr.instance.onFrientMouseEvent({
                    cmd: "touch_end",
                    speed: speed
                });
            });
            this.touchArea.on(Laya.Event.MOUSE_OUT, this, function(evt) {
                evt.stopPropagation();
                speed = rangeY / (evt.nativeEvent.timeStamp - startTime);
                Wxmgr.instance.onFrientMouseEvent({
                    cmd: "touch_cancel",
                    speed: speed
                });
            });
        }
        showList(isShow) {
            let show = isShow ? 1 : 0;
            this.rankMe.alpha = show;
        }
        initList() {}
        refreshList() {
            if (this.worldLoading >= 2) {
                if (this.rankMe.numChildren == 0) {
                    let item = new RankItem();
                    this.rankMe.addChild(item);
                    item.setRankItem(this.userRank);
                }
                Laya.timer.clear(this, this.refreshList);
            }
        }
        onRankFriend() {
            this.friend.visible = true;
            this.friendList.visible = true;
            if (!Laya.Browser.onMiniGame) {
                return;
            }
            this.showList(true);
            this.initRankEvent(true);
            Wxmgr.instance.showFriendRank(true);
            if (window["wx"] && window["sharedCanvas"]) {
                var width = this.friendList.width;
                var height = this.friendList.height;
                window["sharedCanvas"].width = width;
                console.log(this.friendList.height);
                window["sharedCanvas"].height = height;
                window["sharedCanvas"].height = 850;
            }
        }
        onCloseClick() {
            this.close();
        }
        clear() {
            Wxmgr.instance.showFriendRank(false);
            this.touchArea.offAllCaller(this);
        }
    }
    class ShopView extends BaseView {
        onAwake() {
            super.onAwake();
            EventMgr.instance.on(EventType.UpdateGoldItemUi, this, this.onUpdateGoldItemUi);
        }
        onEnable() {
            this.coinFont.value = GameSample.GetGoldStr();
            Game.instance.camera.transform.localPositionY = 1;
            Game.instance.camera.transform.localPositionZ = -2.8;
            Game.instance.player.FaceToCamera(true);
        }
        onUpdateGoldItemUi() {
            this.coinFont.value = GameSample.GetGoldStr();
        }
    }
    class CustomTab extends Laya.Script {
        constructor() {
            super(...arguments);
            this.selectres = "";
            this.unselectres = "";
            this.selectFont = "";
            this.unselectFont = "";
            this.childs = [];
            this.childsFont = [];
            this.selectFontarr = [];
            this.unselectFontarr = [];
            this.orgy = 0;
            this.hasClick = false;
            this.ontabSelect = new SystemAcion();
        }
        onEnable() {
            this._onStart();
        }
        _onStart() {
            let root = this.owner;
            this.selectFontarr = this.selectFont.split(",");
            this.unselectFontarr = this.unselectFont.split(",");
            for (let index = 0; index < root.numChildren; index++) {
                if (root.getChildAt(index).name == "tab") {
                    let c = root.getChildAt(index);
                    this.childs.push(c);
                    this.childsFont.push(c.getChildAt(0));
                    Utils.addClickEvent(c, this, () => {
                        this.Select(index);
                    });
                }
            }
        }
        Select(idx) {
            if (this.hasClick == false) {
                this.orgy = this.childs[0].y;
                this.hasClick = true;
            }
            for (let index = 0; index < this.childs.length; index++) {
                this.unSelect(index);
            }
            this.childs[idx].skin = this.selectres;
            this.childsFont[idx].skin = this.selectFontarr[idx];
            this.lastSelect = this.childs[idx];
            this.childs[idx].y = this.orgy;
            this.ontabSelect.Invoke_par(idx);
        }
        unSelect(idx) {
            this.childs[idx].skin = this.unselectres;
            this.childsFont[idx].skin = this.unselectFontarr[idx];
            this.childs[idx].y = this.orgy + this.unselectYoffset;
        }
    }
    class SignModel {
        constructor() {
            this.id = 0;
            this.rewards = 0;
            this.type = "";
        }
    }
    class Level {
        constructor() {
            this.id = 0;
            this.level_data = "";
            this.gold = 0;
        }
    }
    class Theme$1 {
        constructor() {
            this.require_type = 0;
            this.require_num = 0;
            this.name = "";
            this.icon = "";
        }
    }
    class DataControllerExtData {
        constructor() {
            this.signModel = [];
            this.level = [];
            this.theme = [];
        }
    }
    class DataController {}
    class ShopItem {
        constructor() {
            this.type = 0;
        }
    }
    class CustomGrildShopItem extends Laya.Script {
        constructor() {
            super(...arguments);
            this.buyKey = "charater";
            this.theme = [];
            this.selectSkin = "";
            this.unselecSkin = "";
            this.childs = [];
            this.childsCoin = [];
            this.goldsLabel = [];
            this.lastSelectIdx = -1;
            this.lastSelectStr = "";
            this.priecestr = [];
            this.priece = [];
            this.itemBuyType = [];
            this.ontabSelect = new SystemAcion();
            this.videoGroundArry = [];
            this.cotinGroundArry = [];
            this.itemArry = [];
            this.defultIdx = 0;
        }
        Show(visble) {
            let b = this.owner;
            b.visible = visble;
        }
        onEnable() {
            this._onStart();
        }
        initData() {
            let t = new Theme$1();
            t.require_type = 1;
            t.icon = "ui/ShopRope/charater/CatIcone.PNG";
            this.theme.push(t);
            t = new Theme$1();
            t.require_type = 2;
            t.require_num = 2e3;
            t.icon = "ui/ShopRope/charater/RacoonIcone.PNG";
            this.theme.push(t);
        }
        _onStart() {
            this.initData();
            this.root = this.owner;
            this.priecestr = [];
            this.priece = [];
            for (let index = 0; index < this.theme.length; index++) {
                this.priecestr.push(this.theme[index].require_num.toString());
                this.priece.push(this.theme[index].require_num);
            }
            for (let index = 0; index < this.theme.length; index++) {
                {
                    let item = this.root.getChildAt(index);
                    let icon = item.getChildAt(0);
                    icon.skin = this.theme[index].icon;
                    this.childs.push(item);
                    this.itemArry.push(item);
                    let status = item.getChildAt(3);
                    status.visible = false;
                    let isCoin = false;
                    let videoGround = item.getChildByName("video");
                    videoGround.visible = true;
                    let coinGround = item.getChildByName("gold");
                    coinGround.visible = false;
                    if (this.theme[index].require_type == 1) {
                        PlayerPrefs.SetInt(this.buyKey + index, 1);
                    } else if (this.theme[index].require_type == 3) {
                        videoGround.visible = true;
                        coinGround.visible = false;
                        this.itemBuyType[index] = 1;
                    } else this.itemBuyType[index] = 0;
                    this.videoGroundArry.push(videoGround);
                    this.cotinGroundArry.push(coinGround);
                    this.childsCoin.push(coinGround.getChildAt(0));
                    this.goldsLabel.push(coinGround.getChildAt(1));
                    if (index >= this.priece.length) item.visible = false;
                    Utils.addClickEvent(item, this, () => {
                        this.Select(index);
                    });
                }
            }
            this.updateView();
            this.Select(this.defultIdx);
        }
        updateView() {
            let saveData = [];
            for (let index = 0; index < this.theme.length; index++) {
                let isHas = PlayerPrefs.GetInt(this.buyKey + index, 0) == 1;
                this.childsCoin[index].visible = !isHas;
                this.videoGroundArry[index].visible = false;
                this.cotinGroundArry[index].visible = false;
                if (isHas) {
                    this.videoGroundArry[index].visible = false;
                    this.cotinGroundArry[index].visible = false;
                    this.videoGroundArry[index].visible = false;
                    this.cotinGroundArry[index].visible = true;
                    this.setStateText(index, "已拥有");
                    if (this.lastSelectIdx == index) this.setStateText(index, "使用中");
                } else if (this.itemBuyType[index] == 0) {
                    this.cotinGroundArry[index].visible = true;
                    this.goldsLabel[index].value = this.priecestr[index];
                } else {
                    this.videoGroundArry[index].visible = true;
                    let videocount = PlayerPrefs.GetInt("ropeVideo" + index, 0);
                    this.videoGroundArry[index].getChildAt(0).value = videocount + "/" + this.theme[index].require_num;
                }
            }
        }
        onVideoEndRope(idx) {
            ViewMgr.instance.ShowToas("视频奖励+1");
            let videocount = PlayerPrefs.GetInt("ropeVideo" + idx, 0);
            videocount += 1;
            PlayerPrefs.SetInt("ropeVideo" + idx, videocount);
            if (videocount >= this.theme[idx].require_num) {
                PlayerPrefs.SetInt(this.buyKey + idx, 1);
                this.videoGroundArry[idx].visible = false;
                SoundMgr.instance.BuyOk.Play();
            }
            this.updateView();
        }
        Select(idx) {
            let isHas = PlayerPrefs.GetInt(this.buyKey + idx, 0) == 1;
            let getUseVideo = this.itemBuyType[idx] == 1;
            if (getUseVideo && isHas == false) {
                let videocount = PlayerPrefs.GetInt("ropeVideo" + idx, 0);
                BannerAndVideo1.ShowVideo(this, isEnd => {
                    if (isEnd) {
                        this.onVideoEndRope(idx);
                    }
                });
                return;
            }
            if (!isHas) {
                this.buyRope(idx);
                return;
            }
            if (this.lastSelectIdx != -1) {
                this.unSelect(this.lastSelectIdx);
            }
            this.childs[idx].skin = this.selectSkin;
            this.lastSelectIdx = idx;
            this.updateView();
            this.ontabSelect.Invoke_par(idx);
        }
        unSelect(idx) {
            this.childs[idx].skin = this.unselecSkin;
        }
        buyRope(idx) {
            let gold = GameSample.GetGold();
            let priece = this.priece[idx];
            if (gold >= this.priece[idx]) {
                PlayerPrefs.SetInt(this.buyKey + idx, 1);
                this.updateView();
                ViewMgr.instance.ShowToas("购买成功");
                SoundMgr.instance.BuyOk.Play();
            } else {
                ViewMgr.instance.ShowToas("金币不足");
                return;
            }
            gold -= priece;
            GameSample.SetGold(gold);
            EventMgr.instance.event(EventType.UpdateGoldItemUi);
        }
        setStateText(index, str) {
            let item = this.itemArry[index];
            let statusFont = item.getChildAt(3);
            statusFont.visible = true;
            if (str == "使用中") statusFont.value = "1"; else statusFont.value = "2";
            let icon = item.getChildAt(2);
            icon.visible = false;
            let video = item.getChildAt(1);
            video.visible = false;
        }
    }
    class HatShopGrid extends CustomGrildShopItem {
        initData() {
            let t = new Theme$1();
            t.require_type = 1;
            t.icon = "";
            this.theme.push(t);
            t = new Theme$1();
            t.require_type = 3;
            t.require_num = 2;
            t.icon = "ui/ShopRope/hat/WorkerHat.PNG";
            this.theme.push(t);
            t = new Theme$1();
            t.require_type = 2;
            t.require_num = 2e3;
            t.icon = "ui/ShopRope/hat/FancyHat.PNG";
            this.theme.push(t);
            t = new Theme$1();
            t.require_type = 2;
            t.require_num = 3e3;
            t.icon = "ui/ShopRope/hat/PartyHat.PNG";
            this.theme.push(t);
        }
    }
    class ShopCtrl extends Laya.Script {
        onAwake() {
            this.shopView = this.owner;
            Utils.addClickEvent(this.btnBack, this, this.onBackClick);
            this.customTab.ontabSelect.regiser(this, this.ontabSelect);
            let itemKey = this.customGrildShopItem.buyKey;
            let dfidx = PlayerPrefs.GetInt("shopSelect" + itemKey, 0);
            this.customGrildShopItem.defultIdx = dfidx;
            this.customGrildShopItem.ontabSelect.regiser(this, this.onSelectChrater);
            itemKey = this.hatShopGrid.buyKey;
            let dfidx2 = PlayerPrefs.GetInt("shopSelect" + itemKey, 0);
            this.hatShopGrid.defultIdx = dfidx2;
            this.hatShopGrid.ontabSelect.regiser(this, this.onSelectHat);
            this.ontabSelect(0);
        }
        onEnable() {
            let dfidx = PlayerPrefs.GetInt("shopSelectRope", 0);
            this.customGrildShopItem.defultIdx = dfidx;
            let dfidx2 = PlayerPrefs.GetInt("shopSelectAnniu", 0);
            this.hatShopGrid.defultIdx = dfidx2;
        }
        onSelectHat(idx) {
            console.log("Hat", idx);
            PlayerPrefs.SetInt("shopSelectHat", idx);
            EventMgr.instance.event(EventType.ShopSelectHat, idx);
        }
        onBackClick() {
            this.shopView.close();
            Game.instance.camera.transform.localPositionY = 4;
            Game.instance.camera.transform.localPositionZ = -5;
            GameView.instance.visible = true;
        }
        ontabSelect(idx) {
            console.log("tab", idx);
            if (idx == 0) {
                this.hatShopGrid.Show(false);
                this.customGrildShopItem.Show(true);
            } else {
                this.hatShopGrid.Show(true);
                this.customGrildShopItem.Show(false);
            }
        }
        onSelectChrater(idx) {
            console.log("onSelectChrater", idx);
            PlayerPrefs.SetInt("onSelectChrater", idx);
            EventMgr.instance.event(EventType.ShopSelectChrater, idx);
        }
        onDisable() {}
    }
    class ToastView extends BaseView {
        constructor() {
            super(...arguments);
            this.toasMgsarr = [];
            this.toasShowing = false;
        }
        onAwake() {
            super.onAwake();
        }
        Pushtoas(str) {
            this.toasMgsarr.push(str);
            this.Showtoas();
        }
        Showtoas() {
            let time = 2500;
            if (this.toasShowing) return;
            this.toastImg.visible = true;
            this.toasShowing = true;
            let item = this.toasMgsarr.shift();
            if (this.toasMgsarr.length >= 2) time = 1e3;
            if (item == null) {
                this.toasShowing = false;
                this.toastImg.visible = false;
                return;
            }
            this.toasText.text = item;
            Laya.timer.once(time, this, this.distoasImg, null, true);
        }
        distoasImg() {
            this.toasShowing = false;
            this.toastImg.visible = false;
            this.Showtoas();
        }
    }
    class GameConfig {
        constructor() {}
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scripts/views/challengeView.ts", ChallengeView);
            reg("scripts/views/componets/ChallengeGrid.ts", ChallengeGrid);
            reg("scripts/views/componets/ChallengeCtrl.ts", ChallengeCtrl);
            reg("scripts/views/ChallengeEndView.ts", ChallengeEndView);
            reg("scripts/views/BaseView.ts", BaseView);
            reg("scripts/views/GameView.ts", GameView);
            reg("scripts/UIcomponent/progressBar/ProgressBarMasK.ts", ProgressBarMasK);
            reg("scripts/views/HomeView.ts", HomeView);
            reg("scripts/UIcomponent/Btn/Soundbtn.ts", SoundBtn);
            reg("scripts/UIcomponent/Btn/VibrateBtn.ts", VibrateBtn);
            reg("scripts/uiComp/XslHomeview.ts", XslHomeview);
            reg("scripts/views/InitView.ts", InitView);
            reg("scripts/views/LoadingView.ts", LoadingView);
            reg("scripts/views/OverView.ts", OverView);
            reg("script/UIcomponent/AdListLoopVerticle.ts", AdListLoopVerticle);
            reg("scripts/uiComp/XslLostView.ts", XslLostView);
            reg("script/views/RankView.ts", RankView);
            reg("scripts/views/ShopView.ts", ShopView);
            reg("scripts/views/componets/CustomTab.ts", CustomTab);
            reg("scripts/views/componets/CustomGrid.ts", CustomGrildShopItem);
            reg("scripts/views/componets/HatShopGrid.ts", HatShopGrid);
            reg("scripts/views/componets/ShopCtrl.ts", ShopCtrl);
            reg("scripts/views/ToastView.ts", ToastView);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "views/InitView.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();
    class UnityEnagine extends Laya.Script {
        constructor() {
            super(...arguments);
            this.logFps = false;
            this.openAppTimeSc = 0;
            this.fpsTime = 0;
            this.framCount = 0;
            this.fps = 0;
            this.fpsmin = 9999;
            this.fpsMax = 0;
        }
        onAwake() {
            this.owner.addComponent(Input);
            this.openAppTimeSc = Laya.timer.currTimer * .001;
        }
        onUpdate() {
            Time.fixedDeltaTime = Laya.timer.delta;
            Time.deltaTime = Laya.timer.delta * .001;
            if (this.logFps) this.calFps();
            Time.time = Laya.timer.currTimer * .001 - this.openAppTimeSc;
        }
        calFps() {
            this.framCount += 1;
            this.fpsTime += Time.deltaTime;
            if (this.fpsTime > 1) {
                this.fps = this.framCount;
                this.fpsTime = 0;
                this.framCount = 0;
                this.fpsMax += this.fps;
                if (this.fps < this.fpsmin) this.fpsmin = this.fps;
                console.log("fps 当前=", this.fps, "最小=", this.fpsmin, "总帧数", this.fpsMax);
            }
        }
    }
    class Main {
        constructor() {
            if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height); else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat) Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            let node = new Laya.Node();
            Laya.stage.addChild(node);
            node.addComponent(UnityEnagine);
            Platform.setplatformInfo();
            Laya.SoundManager.autoReleaseSound = false;
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();
})();
//# sourceMappingURL=bundle.js.map