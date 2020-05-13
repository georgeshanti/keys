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
const synth = new Tone.Synth().toMaster();
var playing = false;
var started = false;
//play a middle 'C' for the duration of an 8th note

document.querySelector('button').addEventListener('click', async () => {
	await Tone.start();
    console.log('audio is ready');
    document.getElementById("disclaimer").style.display="none";
    var notes = {
        "a": new Note("C4"),
        "w": new Note("Db4"),
        "s": new Note("D4"),
        "e": new Note("Eb4"),
        "d": new Note("E4"),
        "f": new Note("F4"),
        "t": new Note("Gb4"),
        "g": new Note("G4"),
        "y": new Note("Ab4"),
        "h": new Note("A4"),
        "u": new Note("Bb4"),
        "j": new Note("B4"),
        "k": new Note("C5")
    }
    document.addEventListener('keydown', function (e) {
        if(notes[e.key]!=undefined){
            document.getElementById(e.key).classList.add("selected");
            notes[e.key].play()
        }
    });
    document.addEventListener('keyup', function (e) {
        if(notes[e.key]!=undefined){
            document.getElementById(e.key).classList.remove("selected");
            notes[e.key].stop();
        }
    });
});