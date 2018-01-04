class Disk {
	public size : number;
	constructor(size) {
		this.size = size;
	}
}
class Pole{
	public disks : Disk[] = new Array();
	constructor(diskTotal:number = 0){
		for(;diskTotal > 0;diskTotal --){
			this.disks.push(new Disk(diskTotal));
		}
	}
	public push(disk:Disk){
		this.disks.push(disk);
	}
	public pop(){
		let disk = this.disks.pop();
		return disk;
	}
	public topDiskSize(){
		return this.disks.length == 0?null:this.disks[this.disks.length - 1].size;
	}
	public isEmpty(){
		return this.disks.length == 0;
	}
	public diskTotal(){
		return this.disks.length;
	}
}
class Tower{
	public poles : Pole[] = new Array();
	public diskTotal : number;
	public moveRecorde = "";
	constructor(diskTotal:number = 3){
		this.diskTotal = diskTotal;
		this.poles['a'] = new Pole(diskTotal);
		this.poles['b'] = new Pole();
		this.poles['c'] = new Pole();
	}
	public moveOneDisk(aPoleName:string,bPoleName:string):boolean{ //从a移动到b,返回是否成功
		 //判断aPole，和aPole是否合法,现在先忽略
		let aTopDiskSize = this.poles[aPoleName].topDiskSize();
		let bTopDiskSize = this.poles[bPoleName].topDiskSize();
		if(!bTopDiskSize || aTopDiskSize < bTopDiskSize){
			this.poles[bPoleName].push(this.poles[aPoleName].pop());
			this.moveRecorde += `${aPoleName}->${bPoleName};`;
			return true;
		}else{
			return false;
		}
	}
	public moveDisks(aPoleName:string,bPoleName:string,tempPoleName:string,disTotal:number = this.diskTotal){ //从a移动到b,返回是否成功
		if(disTotal == 1){
			this.moveOneDisk(aPoleName,bPoleName);
		}else{
			this.moveDisks(aPoleName,tempPoleName,bPoleName,disTotal-1);
			this.moveOneDisk(aPoleName,bPoleName);
			this.moveDisks(tempPoleName,bPoleName,aPoleName,disTotal-1);
		}
	}
	public checkSucceed(){//全部盘子移动到C为成功
		return this.poles['a'].isEmpty() && this.poles['b'].isEmpty();
	}
}