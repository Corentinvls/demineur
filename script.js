var setTm = 0;
var tmStart = 0;
var tmNow = 0;
var tmInterv = 0;
var tTime = [];
var nTime = 0;
function affTime(tm) {
      var vMin = tm.getMinutes();
      var vSec = tm.getSeconds();
      if (vMin < 10) {
            vMin = "0" + vMin;
      }
      if (vSec < 10) {
            vSec = "0" + vSec;
      }

      document.getElementById("chronotime").innerHTML = vMin + ":" + vSec;
}
function fChrono() {
      tmNow = new Date();
      Interv = tmNow - tmStart;
      tmInterv = new Date(Interv);
      affTime(tmInterv);
}
function chronoStart() {
      fReset();
      if (tmInterv == 0) {
            tmStart = new Date();
      } else {
            tmNow = new Date();
            Pause = tmNow - tmInterv;
            tmStart = new Date(Pause);
      }
      setTm = setInterval(fChrono, 50);
}
function fReset() {
      tmStart = 0;
      tmInterv = 0;
      tTime = [];
      nTime = 0;
      document.getElementById("chronotime").innerHTML = "00:00";
}