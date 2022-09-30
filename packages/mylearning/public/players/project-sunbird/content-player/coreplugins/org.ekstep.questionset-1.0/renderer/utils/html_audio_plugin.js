var HTMLAudioPlayer = {
    _audios : {},
    _audioLimit : 25,
    removeOldest: function() { 
        //equvalent of _.sortBy(this._audios['lastUsed'])  and removes first one in _audios)
        var oldestAudio = Object.keys(this._audios)[0];
        for(var audio in this._audios) {
            if(this._audios[audio].lastUsed < this._audios[oldestAudio].lastUsed){
                oldestAudio = audio;
            }
        }
        delete this._audios[oldestAudio];
    },
    getInstance: function(url, loop) {
        if(!this._audios[url]) {
            if(Object.keys(this._audios).length == this._audioLimit) {
                this.removeOldest();
            }
            this._audios[url] = new Audio(url);
        }
        if(typeof(loop) === "boolean")
            this._audios[url].loop = loop;
        this._audios[url].lastUsed = + new Date() //returns current timestamp
        return this._audios[url];
    },
    play: function (url) {
        this.getInstance(url, false).play();
    },
    pause: function(url) {
        this.getInstance(url).pause();
    },
    loop: function(url) {
        this.getInstance(url, true).play();
    },
    togglePlay: function(url) {
        var audioIns = this.getInstance(url);
        if(audioIns.paused){
            this.pauseAll();
            audioIns.play()
        }else{
            audioIns.pause()
        }
    },
    stop: function(url) {
        var audioIns = this.getInstance(url);
        audioIns.pause();
        audioIns.currentTime = 0;
    },
    pauseAll: function() {
        _.each(this._audios, function(audioIns){
            if(!audioIns.paused){
                audioIns.pause();
            }
        })
    }
}

