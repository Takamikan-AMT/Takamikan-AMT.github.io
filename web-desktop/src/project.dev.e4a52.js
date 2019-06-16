window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  audio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7d26kujOdPCqhMZ4LGFubu", "audio");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        musicAudio: {
          default: null,
          type: cc.AudioClip
        },
        playMark: false
      },
      playAudio: function playAudio() {
        if (false == this.playMark) {
          this.currentPlay = cc.audioEngine.play(this.musicAudio, false, 1);
          this.playMark = true;
        }
      },
      pauseAudio: function pauseAudio() {
        cc.audioEngine.pause(this.currentPlay);
      },
      resumeAudio: function resumeAudio() {
        cc.audioEngine.resume(this.currentPlay);
      },
      stopAudio: function stopAudio() {
        cc.audioEngine.stop(this.currentPlay);
      }
    });
    cc._RF.pop();
  }, {} ],
  background: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a32e2SbZONJDbUUzcaQa4cK", "background");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onload: function onload() {
        this.isTouch = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on("touchstart", this.onTouchStart, this);
        this.node.on("touchend", this.onTouchEnd, this);
      },
      onDestory: function onDestory() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.off("touchstart", this.onTouchStart, this);
        this.node.off("touchend", this.onTouchEnd, this);
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.space:
          this.node.parent.getComponent("game").move();
        }
      },
      onTouchStart: function onTouchStart(event) {
        if (true == this.isTouch) {
          this.node.parent.getComponent("game").move();
          this.isTouch = false;
        }
      },
      onTouchEnd: function onTouchEnd(event) {
        this.isTouch = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  ball: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e3f9zuTS9Jf5aHSIq3cpi5", "ball");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        isRotated: false,
        otherBall: {
          default: null,
          type: cc.Node
        },
        grade: {
          default: null,
          type: cc.Node
        },
        audio: {
          default: null,
          type: cc.Node
        },
        rotationSpeed: 0,
        centerPosition: cc.v2(0, 0),
        nextPosition: cc.v2(40, 0),
        oldPosition: cc.v2(-40, 0)
      },
      onLoad: function onLoad() {
        this.timer = 0;
        this.rotationSpeed = this.node.parent.getComponent("game").bpm * Math.PI / 60;
        this.bpm = this.node.parent.getComponent("game").bpm;
        this.i = this.node.parent.getComponent("game").i;
        this.nextTime = 60 / this.bpm;
        this.pre = 60 / this.bpm;
      },
      judgePosition: function judgePosition(index, now, pre) {
        now %= 10;
        pre %= 10;
        if (this.isRotated) {
          if (0 == index) var correctTime = 60 / this.bpm; else if (1 == now && 4 == pre || 4 == now && 3 == pre || 3 == now && 2 == pre || 2 == now && 1 == pre) var correctTime = 90 / this.bpm; else if (1 == now && 2 == pre || 2 == now && 3 == pre || 3 == now && 4 == pre || 4 == now && 1 == pre) var correctTime = 30 / this.bpm; else var correctTime = 60 / this.bpm;
          if (this.timer < .5 * correctTime) {
            this.node.parent.getComponent("game").gameOver();
            console.log(this.timer, correctTime);
          }
          if (this.timer >= correctTime - .025 && this.timer <= correctTime + .025) {
            this.grade.getComponent("grade").returnPerfect();
            this.node.parent.getComponent("game").complete += 1;
            this.node.parent.getComponent("game").score += 1.05 / this.node.parent.getComponent("game").length;
          } else if (this.timer < correctTime - .025 && this.timer >= correctTime - .075) {
            this.grade.getComponent("grade").returnEPerfect();
            this.node.parent.getComponent("game").complete += 1;
            this.node.parent.getComponent("game").score += 1.03 / this.node.parent.getComponent("game").length;
          } else if (this.timer > correctTime + .025 && this.timer <= correctTime + .075) {
            this.grade.getComponent("grade").returnLPerfect();
            this.node.parent.getComponent("game").complete += 1;
            this.node.parent.getComponent("game").score += 1.03 / this.node.parent.getComponent("game").length;
          } else if (this.timer > correctTime + .075 && this.timer < correctTime + .125) {
            this.grade.getComponent("grade").returnLate();
            this.node.parent.getComponent("game").complete += 1;
            this.node.parent.getComponent("game").score += .97 / this.node.parent.getComponent("game").length;
          } else if (this.timer < correctTime - .075 && this.timer > correctTime - .125) {
            this.grade.getComponent("grade").returnEarly();
            this.node.parent.getComponent("game").complete += 1;
            this.node.parent.getComponent("game").score += .97 / this.node.parent.getComponent("game").length;
          } else {
            this.grade.getComponent("grade").returnBad();
            this.node.parent.getComponent("game").complete += 1;
            this.node.parent.getComponent("game").score += .95 / this.node.parent.getComponent("game").length;
          }
        }
      },
      changeStatus: function changeStatus(next, now) {
        if (now > 20) {
          this.bpm *= 2;
          this.rotationSpeed = this.bpm * Math.PI / 60;
        } else if (now > 10) {
          this.bpm *= .5;
          this.rotationSpeed = this.bpm * Math.PI / 60;
          console.log(this.bpm, this.rotationSpeed);
        }
        next %= 10;
        now %= 10;
        this.nextTime = 4 == next && 1 == now || 1 == next && 2 == now || 2 == next && 3 == now || 3 == next && 4 == now ? 30 / this.bpm : 2 == next && 1 == now || 3 == next && 2 == now || 4 == next && 3 == now || 1 == next && 4 == now ? 90 / this.bpm : 60 / this.bpm;
        if (this.isRotated) {
          this.node.position = this.centerPosition;
          this.isRotated = false;
          this.timer = 0;
        } else this.isRotated = true;
      },
      update: function update(dt) {
        if (!this.node.parent.getComponent("game").pause && this.isRotated) {
          this.timer += dt;
          this.node.x = (this.oldPosition.x - this.centerPosition.x) * Math.cos(this.timer * this.rotationSpeed) + (this.oldPosition.y - this.centerPosition.y) * Math.sin(this.timer * this.rotationSpeed) + this.centerPosition.x;
          this.node.y = (this.oldPosition.y - this.centerPosition.y) * Math.cos(this.timer * this.rotationSpeed) - (this.oldPosition.x - this.centerPosition.x) * Math.sin(this.timer * this.rotationSpeed) + this.centerPosition.y;
          this.timer > 1.5 * this.nextTime && this.node.parent.getComponent("game").gameOver();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  camera: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b4d1TeIDhLG4xAYbuwacag", "camera");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        yinBall: {
          default: null,
          type: cc.Node
        },
        yangBall: {
          default: null,
          type: cc.Node
        },
        moveCameraSpeed: 1,
        shakeStatus: false,
        shakeZoomRation: 1.03,
        normalZoomRation: 1
      },
      onLoad: function onLoad() {
        this.timer = 0;
        this.camera = this.getComponent(cc.Camera);
      },
      moveCamera: function moveCamera() {
        if (this.yinBall.getComponent("ball").isRotated) var nextPosition = this.yangBall.getPosition(); else var nextPosition = this.yinBall.getPosition();
        var action = cc.moveTo(this.moveCameraSpeed, nextPosition);
        this.node.runAction(action);
      },
      snakeCamera: function snakeCamera() {
        this.camera.zoomRatio = this.shakeZoomRation;
        this.shakeStatus = true;
      },
      update: function update(dt) {
        if (this.shakeStatus) {
          this.timer += dt;
          if (this.timer > .03) {
            this.camera.zoomRatio = this.normalZoomRation;
            this.timer = 0;
            this.shakeStatus = false;
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  countDown: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7f14H2mqNC7qHzYZ5anPT5", "countDown");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        game: {
          default: null,
          type: cc.Node
        },
        audio: {
          default: null,
          type: cc.Node
        },
        title: {
          default: null,
          type: cc.Node
        },
        quit: {
          default: null,
          type: cc.Node
        },
        pause: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.timer = 0;
        this.label = this.getComponent(cc.Label);
        this.duration = 60 / this.game.getComponent("game").bpm;
      },
      update: function update(dt) {
        this.timer += dt;
        if (this.timer >= 0 && this.timer < this.duration) {
          this.label.string = "";
          this.title.active = true;
        } else if (this.timer >= this.duration && this.timer < 2 * this.duration) {
          this.label.string = "3!";
          this.node.opacity = 255 * (2 * this.duration - this.timer);
          this.audio.getComponent("audio").playAudio();
        } else if (this.timer >= 2 * this.duration && this.timer < 3 * this.duration) {
          this.label.string = "2!";
          this.node.opacity = 255 * (3 * this.duration - this.timer);
        } else if (this.timer >= 3 * this.duration && this.timer < 4 * this.duration) {
          this.label.string = "1!";
          this.node.opacity = 255 * (4 * this.duration - this.timer);
        } else if (this.timer >= 4 * this.duration && this.timer < 5 * this.duration) {
          this.label.string = "go!";
          this.node.opacity = 255 * (5 * this.duration - this.timer);
          this.game.getComponent("game").pause = false;
          this.title.active = false;
          this.pause.active = true;
          this.quit.active = false;
        } else this.timer >= 5 * this.duration && (this.label.fontSize = 20);
      }
    });
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b71e6FGNMVNA7Ug2UKMbCxl", "game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        camera: {
          default: null,
          type: cc.Node
        },
        yinBall: {
          default: null,
          type: cc.Node
        },
        yangBall: {
          default: null,
          type: cc.Node
        },
        map: {
          default: null,
          type: cc.Node
        },
        audio: {
          default: null,
          type: cc.Node
        },
        tabs: {
          default: null,
          type: cc.Node
        },
        grade: {
          default: null,
          type: cc.Node
        },
        label: {
          default: null,
          type: cc.Node
        },
        completetion: {
          default: null,
          type: cc.Node
        },
        pause: true,
        fail: false,
        isEnd: false,
        localscene: "",
        prescene: "",
        nextscene: "",
        i: 0,
        score: 0,
        complete: 0,
        length: 0,
        bpm: 0
      },
      onLoad: function onLoad() {
        0 == this.prescene;
        0 == this.nextscene;
        this.length = this.map.getComponent("map").directions.length - 1;
      },
      move: function move() {
        if (true == this.fail) {
          this.label.active = false;
          cc.director.loadScene(this.localscene);
        }
        if (true == this.isEnd) if (0 != this.nextscene) {
          this.label.active = false;
          cc.director.loadScene(this.nextscene);
        } else {
          this.label.active = false;
          cc.director.loadScene("menu");
        }
        if (!this.pause && false == this.fail) {
          this.yinBall.getComponent("ball").judgePosition(this.i, this.map.getComponent("map").directions[this.i], this.map.getComponent("map").directions[this.i - 1]);
          this.yangBall.getComponent("ball").judgePosition(this.i, this.map.getComponent("map").directions[this.i], this.map.getComponent("map").directions[this.i - 1]);
          this.map.getComponent("map").createMap(this.i + 3);
          this.map.getComponent("map").returnPosition(this.i + 1);
          this.i++;
          if (0 == this.map.getComponent("map").directions[this.i]) {
            this.isEnd = true;
            this.label.getComponent(cc.Label).string = "\u6210\u529f";
            this.completetion.getComponent(cc.Label).string = "\u5b8c\u6210\u5ea6\uff1a " + (100 * this.score).toFixed(2) + "%";
            this.label.color = new cc.Color(255, 215, 0, 0);
            this.completetion.color = new cc.Color(205, 173, 0, 0);
            this.label.active = true;
            this.completetion.active = true;
            this.pause = true;
          }
          this.yinBall.getComponent("ball").changeStatus(this.map.getComponent("map").directions[this.i], this.map.getComponent("map").directions[this.i - 1]);
          this.yangBall.getComponent("ball").changeStatus(this.map.getComponent("map").directions[this.i], this.map.getComponent("map").directions[this.i - 1]);
          this.camera.getComponent("camera").moveCamera();
          this.camera.getComponent("camera").snakeCamera();
        }
      },
      gameOver: function gameOver() {
        if (!this.fail && true != this.isEnd) {
          this.label.getComponent(cc.Label).string = "\u8d25\u5317";
          this.completetion.getComponent(cc.Label).string = "\u5b8c\u6210\u5ea6\uff1a " + (this.complete / this.length * 100).toFixed(2) + "%";
          this.label.color = new cc.Color(139, 58, 58, 0);
          this.completetion.color = new cc.Color(139, 69, 19, 0);
          this.label.active = true;
          this.completetion.active = true;
          this.pause = true;
          this.fail = true;
          this.audio.getComponent("audio").stopAudio();
        }
      },
      toPreScene: function toPreScene() {
        cc.director.loadScene(this.prescene);
      },
      toNextScene: function toNextScene() {
        cc.director.loadScene(this.nextscene);
      },
      tobePause: function tobePause() {
        if (false == this.isEnd) {
          this.pause = true;
          this.tabs.active = true;
          this.audio.getComponent("audio").pauseAudio();
        }
      },
      tobeContinue: function tobeContinue() {
        if (false == this.fail) {
          this.pause = false;
          this.tabs.active = false;
          this.audio.getComponent("audio").resumeAudio();
        } else this.tabs.active = false;
      },
      toquit: function toquit() {
        this.audio.getComponent("audio").stopAudio();
        cc.director.loadScene("menu");
      }
    });
    cc._RF.pop();
  }, {} ],
  grade: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e07b678k9xCT4FZmMHCAh/4", "grade");
    "use strict";
    cc.Class({
      extends: cc.Component,
      onLoad: function onLoad() {
        this.label = this.getComponent(cc.Label);
      },
      returnEarly: function returnEarly() {
        this.label.string = "Early";
        this.node.color = cc.Color.RED;
      },
      returnLate: function returnLate() {
        this.label.string = "Late";
        this.node.color = cc.Color.RED;
      },
      returnEPerfect: function returnEPerfect() {
        this.label.string = "EPerfect";
        this.node.color = cc.Color.CYAN;
      },
      returnLPerfect: function returnLPerfect() {
        this.label.string = "LPerfect";
        this.node.color = cc.Color.CYAN;
      },
      returnPerfect: function returnPerfect() {
        this.label.string = "perfect";
        this.node.color = cc.Color.GREEN;
      },
      returnBad: function returnBad() {
        this.label.string = "bad";
      },
      returnFail: function returnFail() {
        this.label.string = "FAILUR";
        this.node.color = cc.Color.BLACK;
      }
    });
    cc._RF.pop();
  }, {} ],
  map: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0000HwsupM4IwobDOzNbGH", "map");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        directions: [ cc.Integer ],
        square: {
          default: null,
          type: cc.Prefab
        },
        yinBall: {
          default: null,
          type: cc.Node
        },
        yangBall: {
          default: null,
          type: cc.Node
        },
        grade: {
          default: null,
          type: cc.Node
        },
        squares: {
          default: [],
          type: cc.Node
        },
        nextPosition: cc.v2(0, 0)
      },
      start: function start() {
        this.squares.length = this.directions.length;
        this.createMap(0);
        this.createMap(1);
        this.createMap(2);
      },
      createMap: function createMap(i) {
        var newSquare = cc.instantiate(this.square);
        this.node.addChild(newSquare);
        this.squares[i] = newSquare;
        newSquare.setPosition(this.nextPosition);
        this.directions[i] % 10 == 1 ? this.nextPosition.y += 40 : this.directions[i] % 10 == 2 ? this.nextPosition.x += 40 : this.directions[i] % 10 == 3 ? this.nextPosition.y -= 40 : this.directions[i] % 10 == 4 && (this.nextPosition.x -= 40);
      },
      returnPosition: function returnPosition(i) {
        this.yinBall.getComponent("ball").centerPosition = this.squares[i].getPosition();
        this.yangBall.getComponent("ball").centerPosition = this.squares[i].getPosition();
        this.grade.position = this.squares[i].getPosition().add(cc.v2(0, 25));
        if (i < this.squares.length) {
          this.yinBall.getComponent("ball").nextPosition = this.squares[i + 1].getPosition();
          this.yangBall.getComponent("ball").nextPosition = this.squares[i + 1].getPosition();
          this.yinBall.getComponent("ball").oldPosition = this.squares[i - 1].getPosition();
          this.yangBall.getComponent("ball").oldPosition = this.squares[i - 1].getPosition();
          this.squares[i - 1].destroy();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  menu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18d4fatpvtHC7QrRXMZi4Ap", "menu");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        b1: cc.Node,
        b2: cc.Node,
        b3: cc.Node,
        b4: cc.Node,
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0
      },
      onLoad: function onLoad() {
        this.nodePos = this.node.getPosition();
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.winSize = cc.director.getWinSize();
      },
      onTouchMove: function onTouchMove(event) {
        var self = this;
        var touches = event.getTouches();
        var oldPos = self.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        var newPos = self.node.parent.convertToNodeSpaceAR(touches[0].getLocation());
        var subPos = oldPos.sub(newPos);
        self.node.x = self.nodePos.x - subPos.x;
        self.node.y = self.nodePos.y - subPos.y;
        var minX = -471;
        var maxX = 471;
        var minY = 0;
        var maxY = Math.abs(minY);
        var nPos = self.node.getPosition();
        nPos.x < minX && (nPos.x = minX);
        nPos.x > maxX && (nPos.x = maxX);
        nPos.y < minY && (nPos.y = minY);
        nPos.y > maxY && (nPos.y = maxY);
        self.node.setPosition(nPos);
      },
      onTouchEnd: function onTouchEnd() {
        this.nodePos = this.node.getPosition();
      },
      onTouchCancel: function onTouchCancel() {
        this.nodePos = this.node.getPosition();
      }
    });
    cc._RF.pop();
  }, {} ],
  sceneButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35b1eKXoOBKrYteaA1oomhX", "sceneButton");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      toScene1: function toScene1() {
        cc.director.loadScene("scene1_1");
      },
      toScene2: function toScene2() {
        cc.director.loadScene("scene2_1");
      },
      toScene3: function toScene3() {
        cc.director.loadScene("scene3_1");
      },
      toScene4: function toScene4() {
        cc.director.loadScene("scene4_1");
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "audio", "background", "ball", "camera", "countDown", "game", "grade", "map", "menu", "sceneButton" ]);