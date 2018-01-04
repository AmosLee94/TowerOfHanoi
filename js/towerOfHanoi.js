var Disk = /** @class */ (function () {
    function Disk(size) {
        this.size = size;
    }
    return Disk;
}());
var Pole = /** @class */ (function () {
    function Pole(diskTotal) {
        if (diskTotal === void 0) { diskTotal = 0; }
        this.disks = new Array();
        for (; diskTotal > 0; diskTotal--) {
            this.disks.push(new Disk(diskTotal));
        }
    }
    Pole.prototype.push = function (disk) {
        this.disks.push(disk);
    };
    Pole.prototype.pop = function () {
        var disk = this.disks.pop();
        return disk;
    };
    Pole.prototype.topDiskSize = function () {
        return this.disks.length == 0 ? null : this.disks[this.disks.length - 1].size;
    };
    Pole.prototype.isEmpty = function () {
        return this.disks.length == 0;
    };
    Pole.prototype.diskTotal = function () {
        return this.disks.length;
    };
    return Pole;
}());
var Tower = /** @class */ (function () {
    function Tower(diskTotal) {
        if (diskTotal === void 0) { diskTotal = 3; }
        this.poles = new Array();
        this.moveRecorde = "";
        this.diskTotal = diskTotal;
        this.poles['a'] = new Pole(diskTotal);
        this.poles['b'] = new Pole();
        this.poles['c'] = new Pole();
    }
    Tower.prototype.moveOneDisk = function (aPoleName, bPoleName) {
        //判断aPole，和aPole是否合法,现在先忽略
        var aTopDiskSize = this.poles[aPoleName].topDiskSize();
        var bTopDiskSize = this.poles[bPoleName].topDiskSize();
        if (!bTopDiskSize || aTopDiskSize < bTopDiskSize) {
            this.poles[bPoleName].push(this.poles[aPoleName].pop());
            this.moveRecorde += aPoleName + "->" + bPoleName + ";";
            return true;
        }
        else {
            return false;
        }
    };
    Tower.prototype.moveDisks = function (aPoleName, bPoleName, tempPoleName, disTotal) {
        if (disTotal === void 0) { disTotal = this.diskTotal; }
        if (disTotal == 1) {
            this.moveOneDisk(aPoleName, bPoleName);
        }
        else {
            this.moveDisks(aPoleName, tempPoleName, bPoleName, disTotal - 1);
            this.moveOneDisk(aPoleName, bPoleName);
            this.moveDisks(tempPoleName, bPoleName, aPoleName, disTotal - 1);
        }
    };
    Tower.prototype.checkSucceed = function () {
        return this.poles['a'].isEmpty() && this.poles['b'].isEmpty();
    };
    return Tower;
}());
var tower = new Tower(10);
console.log(tower);
tower.moveDisks('a', 'c', 'b');
console.log(tower.moveRecorde);
//# sourceMappingURL=towerOfHanoi.js.map