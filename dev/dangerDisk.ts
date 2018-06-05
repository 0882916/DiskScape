///<reference path="disk.ts"/>
// flying sheep with disk properties, but clicking it is bad

class DangerDisk extends Disk {
    constructor(g:Game) {

        super(g, "sheep");
    }
}