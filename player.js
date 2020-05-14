class Note{
    constructor(note){
        this.note = note;
        this.synth = new Tone.Synth().toMaster();
        this.playing = false;
    }
    play = ()=>{
        if(!this.playing){
            this.playing = true;
            this.synth.triggerAttack(this.note);
        }
    }
    stop = ()=>{
        if(this.playing){
            this.playing = false;
            this.synth.triggerRelease();
        }
    }
}

//create a synth and connect it to the master output (your speakers)
//play a middle 'C' for the duration of an 8th note

document.querySelector('button').addEventListener('click', async () => {
    var colors = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
    }

    function colorize(){
        var ov1 = document.getElementById("overlay-1");
        var ov2 = document.getElementById("overlay-2");
        var ov3 = document.getElementById("overlay-3");
        var ov4 = document.getElementById("overlay-4");
        ov1.style.background = "hsl("+((colors["1"]+1)*5*(360/128))%360+", 100%, 50%)";
        ov2.style.background = "hsl("+((colors["4"]+1)*5*(360/128))%360+", 100%, 50%)";
        ov3.style.background = "hsl("+((colors["2"]+1)*5*(360/128))%360+", 100%, 50%)";
        ov4.style.background = "hsl("+((colors["3"]+1)*5*(360/128))%360+", 100%, 50%)";
    }
    colorize();
	await Tone.start();
    console.log('audio is ready');
    document.getElementById("disclaimer").style.display="none";
    var keys = document.getElementsByClassName("key")
    var notes = {}
    for( key of keys ){
        notes[key.getAttribute("id")] = new Note(key.getAttribute("note"));
    }
    selected = [];
    document.addEventListener('keydown', function (e) {
        e.preventDefault();
        if(notes[e.key]!=undefined && selected.indexOf(e.key)==-1){
            selected.push(e.key);
            var key = document.getElementById(e.key)
            key.classList.add("selected");
            colors[key.getAttribute("sec")] += parseInt(key.getAttribute("c"));
            colorize();
            notes[e.key].play()
        }
    });
    document.addEventListener('keyup', function (e) {
        e.preventDefault();
        if(notes[e.key]!=undefined && selected.indexOf(e.key)!=-1){
            selected.splice(selected.indexOf(e.key), 1);
            var key = document.getElementById(e.key)
            key.classList.remove("selected");
            colors[key.getAttribute("sec")] -= parseInt(key.getAttribute("c"));
            colorize();
            notes[e.key].stop();
        }
    });
});