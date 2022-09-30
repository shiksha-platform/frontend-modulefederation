(function($, window, document) {
    window.Karaoke = function() {
        this.steps = ['NORMAL', 'SLOW', 'SLOWER'];
        this.wordIdx = 0;
        this.scrolled = 0;
        this.duration = null;
        this.sync_in_progress = false;
        this.audio_layer = null;
        this.highlightColor = '#FFFF00';
        this.dragSrcEl = null;
        this.defaultWidth = null;
        this.audioObj = {
            wordMap: [],
            wordTimes: [],
            url: ""
        };
        this.textBox = $('.textWrapper');
        this.fc_template = '';

        // Color pallete template
        this.fc_template = '<div class="highlight-color-picker">'
        this.fc_template += '<button class="picker" style="background:#FFFF00;"></button>'
        this.fc_template += '<button class="picker" style="background:#FF0000;"></button>'
        this.fc_template += '<button class="picker" style="background:#336666;"></button>'
        this.fc_template += '<button class="picker" style="background:#000099;"></button>'
        this.fc_template += '<button class="picker" style="background:#333399;"></button>'
        this.fc_template += '<button class="picker" style="background:#663366;"></button>'
        this.fc_template += '<button class="picker" style="background:#330000;"></button>'
        this.fc_template += '<button class="picker" style="background:#663300;"></button>'
        this.fc_template += '<button class="picker" style="background:#333300;"></button>'
        this.fc_template += '<button class="picker" style="background:#003300;"></button>'
        this.fc_template += '<button class="picker" style="background:#003333;"></button>'
        this.fc_template += '<button class="picker" style="background:#330099;"></button>'
        this.fc_template += '<button class="color-reset">reset</button>'
        this.fc_template += '</div>';
    };

    Karaoke.prototype.startSync = function() {
        $('#syncStart').hide();
        $('#stopAudio').show();
        //$('#sync-play').css('display', 'none');
        //$('.sync-play-disable').css('display', 'inline-block');
        this.initPlayer(false);
        return this.initSplit();
    };

    Karaoke.prototype.initSplit = function() {
        var self = this;
        this.audioObj.wordMap = [];
        this.audioObj.wordTimes = [];
        this.resetSteps();
        this.wordIdx = 1;
        this.splitwords(this.textBox);
        $(this.textBox, this.stage_obj).attr('wordSplit', 'true');
        $('.word', this.textBox).each(function(idx) {
            return $(this).prop('id', 'word-' + (idx + 1));
        });
        var wordLength = 0;
        $('#addLesson').attr('disabled', 'disabled');
        $(document).unbind('keypress');
        $(document).keypress((function(_this) {
            return function(e) {
                var play_time, word;
                if (e.which === 32) {
                    e.preventDefault();
                    $('.word', _this.textBox).css('background-color', '');
                    if ($("#word-" + self.wordIdx, _this.textBox).length > 0) {
                        $("#word-" + self.wordIdx, _this.textBox).css('background-color', self.highlightColor);
                        if ((_this.wordIdx + 1) > (wordLength * 10)) {
                            $(".textWrapper").scrollTo("#word-" + (_this.wordIdx + 1), _this.textBox);
                            wordLength += 1;
                        }
                        word = $("#word-" + self.wordIdx, _this.textBox).text();
                        play_time = $("#jplayerSync").data("jPlayer").status.currentTime;
                        $('#addLesson').removeAttr('disabled');
                        return self.addWordTimes(word, play_time);
                    } else {
                        return $('.word', _this.textBox).css('background-color', '');
                    }
                }
            };
        })(this));
        this.sync_in_progress = true;
        this.textBox.append($('<div class="open-audio" ><i class="icon-headphones"></i></li>'));
        $("#jplayerSync").jPlayer('play');
        $('.io-output').html(JSON.stringify(this.audioObj.wordTimes));

        var words = document.querySelectorAll('.stepMiddle');
        [].forEach.call(words, function(word) {
            word.addEventListener('dragstart', self.handleWordDragStart, false);
        });

        var steps = document.querySelectorAll('.slideStep');
        [].forEach.call(steps, function(step) {
            step.addEventListener('dragenter', self.handleDragEnter, false);
            step.addEventListener('dragover', self.handleDragOver, false);
            step.addEventListener('dragleave', self.handleDragLeave, false);
            step.addEventListener('drop', self.handleWordDrop, false);
        });

        $('.slideStep').on('click', function() { self.playFromTheStep(this); });
    };

    Karaoke.prototype.resetSteps = function() {
        $('.slideStep').removeClass('played');
        $('.slideStep .stepMiddle').empty();
        $('.slideStep').css('width', '20px');
        $("#slideTbl").css('width', ($('.slideStep').length * 21) + 'px');
        $("#syncBar").scrollTo('#slideStep-' + 1);
        $(".textWrapper").scrollTo("#word-" + 1);
        return this.scrolled = 1;
    };

    Karaoke.prototype.reset = function() {
        this.audioObj = {
            wordMap: [],
            wordTimes: [],
            url: ""
        };
        $("#jplayerSync").jPlayer( "destroy" );
        $("#jplayerSync").unbind($.jPlayer.event.loadedmetadata);
        $("#slideTbl").html('');
    };

    Karaoke.prototype.splitwords = function(element) {
        var splitted, text, textArray;
        text = $(element).find('.text-box')[0].innerText.replace(/\s*$/, "");
        textArray = text.split('\n');
        splitted = _.map(textArray, function(text) {
            var formatted, splitted_text;
            splitted_text = _.compact(text.split(' '));
            formatted = '';
            if (splitted_text.length > 1) {
                formatted = (_.reduce(splitted_text, function(acc, item, idx) {
                    if ($.trim(item) === "") {
                        return acc + '<br>';
                    } else {
                        if (idx === 1) {
                            return '<span class="word">' + acc + ' </span>' + ' <span class="word">' + item + '</span>';
                        } else {
                            return acc + ' <span class="word">' + item + '</span>';
                        }
                    }
                })) + '<br>';
            } else {
                if ($.trim(text) === "") {
                    formatted = '<br>';
                } else {
                    formatted = '<span class="word">' + text + '</span>' + '<br>';
                }
            }
            return formatted;
        });
        return $(element).find('.text-box').html(splitted.join(''));
    };

    Karaoke.prototype.playFromTheStep = function(elem) {
        var play_head, step;
        this.initPlayer(false);
        $('.slideStep').removeClass('played');
        step = $(elem).data('step');
        play_head = (step / this.duration_in_split_seconds) * 100;
        $("#jplayerSync").jPlayer('playHead', play_head);
        if ($("#jplayerSync").data('jPlayer').status.paused) {
            $("#syncBar").scrollTo('#slideStep-' + step);
            this.scrolled = Math.round(step / 37);
            return $("#jplayerSync").jPlayer('play');
        }
    };

    Karaoke.prototype.setColor = function(color) {
        var self;
        if ($('.highlight-color-picker').length === 0) {
            $('.highlight-parent', this.el).append(this.fc_template);
            self = this;
            $('.highlight-color-picker .picker', this.el).on("click", function() {
                $('#pick-hcolor').css({ 'background-color': this.style.backgroundColor });
                self.highlightColor = this.style.backgroundColor;
                $('.highlight-color-picker').hide();
            });
            return $('.highlight-color-picker .color-reset', this.el).on("click", function() {
                $('#pick-hcolor').css({ 'background-color': 'yellow' });
                self.highlightColor = 'yellow';
                $('.highlight-color-picker').hide();
            });
        } else {
            return $('.highlight-color-picker').show();
        }
    };

    Karaoke.prototype.stopAudio = function() {
        this.sync_in_progress = false;
        $("#jplayerSync").jPlayer('stop');
        //$('#syncStart').text('RE-TAKE').show();
        $('#syncStart').show();
        return $('#stopAudio').hide();
    };

    Karaoke.prototype.handleWordDragStart = function(e) {
        var elem, step, word_idx;
        elem = $(this);
        self.karaoke.dragSrcEl = elem;
        elem.css('font-size', '30px');
        self.karaoke.defaultWidth = elem.width();
        elem.css('width', self.karaoke.getTextWidth(elem));
        elem.css('background', 'transparent');
        self.karaoke.dragSrcEl.addClass('selected');
        step = elem.parent().data('step');
        word_idx = elem.data('wordidx');
        if (navigator && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            e.dataTransfer.effectAllowed = 'move';
            return e.dataTransfer.setData('text/html', null);
        }
    };

    Karaoke.prototype.handleDragOver = function(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
        return false;
    };

    Karaoke.prototype.handleDragEnter = function(e) {
        this.classList.add('dragActive');
    };

    Karaoke.prototype.handleDragLeave = function(e) {
        this.classList.remove('dragActive');
        self.karaoke.dragSrcEl.css('background', 'transparent');
        self.karaoke.dragSrcEl.css('font-size', '12px');
        return self.karaoke.dragSrcEl.width(self.karaoke.defaultWidth);
    };

    Karaoke.prototype.handleWordDrop = function(e) {
        var audio_obj, elem, wmap, word_idx;
        elem = $(this);
        elem.removeClass('dragActive');
        if (self.karaoke.dragSrcEl.parent().attr('id') !== elem.attr('id')) {
            elem.css('width', '45px');
            word_idx = self.karaoke.dragSrcEl.data('wordidx');
            self.karaoke.dragSrcEl.css('width', '20px');
            self.karaoke.dragSrcEl.parent().css('width', '');
            $('.stepMiddle', elem).html(self.karaoke.dragSrcEl.html());
            $('.stepMiddle', elem).attr('draggable', 'true');
            $('.stepMiddle', elem).attr('data-wordIdx', word_idx);
            self.karaoke.dragSrcEl.empty();
            self.karaoke.dragSrcEl.removeAttr('draggable');
            audio_obj = this.audio_layer;
            wmap = _.find(self.karaoke.audioObj.wordMap, function(wobj) {
                return wobj.wordIdx === word_idx;
            });
            wmap.stepNo = parseInt(elem.data('step'));
            wmap.step = parseInt(elem.data('step'));
            self.karaoke.audioObj.wordTimes[wmap.wordIdx - 1] = wmap.step * 0.1;

            $('.io-output').html(JSON.stringify(self.karaoke.audioObj.wordTimes));
        }
    };

    Karaoke.prototype.addWordTimes = function(word, play_time) {
        var sliWidth, stepNo, timing, words;
        timing = JSON.parse(JSON.stringify(this.audioObj.wordTimes));
        timing || (timing = []);
        words = JSON.parse(JSON.stringify(this.audioObj.wordMap));
        words || (words = []);
        if (!$("#jplayerSync").data("jPlayer")) {
            return;
        }
        stepNo = parseFloat(play_time.toFixed(1)) * 10;
        sliWidth = $('#slideTbl').width() + 31;
        $('#slideTbl').css('width', sliWidth + 'px');
        $('#slideStep-' + stepNo).css('width', '45px');
        $('.stepMiddle', '#slideStep-' + stepNo).html(word);
        $('.stepMiddle', '#slideStep-' + stepNo).data('wordidx', this.wordIdx);
        $('.stepMiddle', '#slideStep-' + stepNo).attr('draggable', 'true');

        if (!play_time) {
            return;
        }
        timing.push(play_time);
        words.push({
            word: word,
            stepNo: stepNo,
            wordIdx: this.wordIdx
        });
        this.audioObj.wordTimes = timing
        this.audioObj.wordMap = words
        this.wordIdx += 1;
    };

    Karaoke.prototype.markWords = function() {
        var play_time, word;
        $('.word', this.text_box).css('background-color', '');
        if ($("#word-" + this.wordIdx, this.text_box).length > 0) {
            $("#word-" + this.wordIdx, this.text_box).css('background-color', this.highlightColor);
            word = $("#word-" + this.wordIdx, this.text_box).text();
            play_time = $("#jplayerSync").data("jPlayer").status.currentTime;
            $('#addLesson').removeAttr('disabled');
            return this.addWordTimes(word, play_time);
        } else {
            return $('.word', this.text_box).css('background-color', '');
        }
    };

    Karaoke.prototype.playSyncedLayer = function() {
        this.wordIdx = 0;
        $(".textWrapper").scrollTo("#word-" + 1);
        this.initPlayer(true);
        $('#sync-play').css('display', 'none');
        $('#sync-pause').css('display', 'inline-block');
        return $("#jplayerSync").jPlayer('play');
    };

    Karaoke.prototype.pauseAudio = function() {
        $('#sync-play').css('display', 'inline-block');
        $('#sync-pause').css('display', 'none');
        return $("#jplayerSync").jPlayer('pause');
    };

    Karaoke.prototype.getTextWidth = function(elem) {
        var html_calc, html_org, width;
        html_org = elem.html();
        html_calc = "<span>" + html_org + "</span>";
        elem.html(html_calc);
        width = elem.find("span:first").width();
        elem.html(html_org);
        return width;
    };

    Karaoke.prototype.initPlayer = function(play_synced) {
        var audio_obj, audio_url, self;

        if (this.audioObj.wordTimes.length > 0) {
            //$('#syncStart').text('RE-TAKE').show();
        }
        audio_obj = this.audioObj;
        if (this.highlightColor === '#FFFF00') {
            this.highlightColor = audio_obj.highlightColor ? audio_obj.highlightColor : this.highlightColor;
        }
        $('#pick-hcolor').css({ 'background-color': this.highlightColor });
        if (!audio_obj) {
            return;
        }
        audio_url = audio_obj.url;
        self = this;
        if (!($("#jplayerSync", this.$el).data('jPlayer'))) {
            $("#jplayerSync", this.$el).jPlayer({
                wmode: "window",
                swfPath: "/assets/plugins/Jplayer.swf",
                supplied: "mp3",
                solution: "html, flash",
                errorAlerts: true,
                ready: function() {
                    $(this).jPlayer("setMedia", { mp3: audio_url });
                    return $(this.text_box, self.stage_obj).removeAttr('contenteditable');
                },
                ended: function(event) {
                    if (self.sync_in_progress) {
                        // self.audio_layer.save();
                        self.sync_in_progress = false;
                        $(document).unbind('keypress');
                    }
                    $(this.text_box, self.stage_obj).attr('contenteditable', true);
                    $('#syncReset').removeAttr('disabled');
                    //$('#stopAudio').attr('disabled', 'disabled');
                    $('#syncStart').removeAttr('disabled');
                    $('#justPlay').removeAttr('disabled');
                    $('#syncPlay').removeAttr('disabled');
                    $('#stopAudio').hide();
                    $('#syncStart').show();
                    $('#sync-play').css('display', 'inline-block');
                    //$('.sync-play-disable').css('display', 'none');
                    $('#sync-pause').css('display', 'none');
                }
            });
            $("#jplayerSync", this.$el).bind($.jPlayer.event.loadedmetadata, function(event) {
                self.duration = $.jPlayer.convertTime(event.jPlayer.status.duration);
                $('.endTime', self.el).text(self.duration);
                self.duration_in_split_seconds = parseInt(parseFloat(event.jPlayer.status.duration.toFixed(1)) / 0.1);

                var slideTabWidth = (self.duration_in_split_seconds * 21) + 21
                var words = {};
                if (audio_obj.wordMap.length > 0) {
                    words = _.keyBy(audio_obj.wordMap, 'stepNo');
                }
                _.times(self.duration_in_split_seconds, function(step) {
                    var slideStep = 'slideStep-' + (step + 1)
                    var word_in_step = _.find(null, function(word_step) {
                        if (word_step.step) {
                            return (step + 1) == word_step.step
                        }
                    });
                    var wordPos = (word_in_step) ? 'wordIn' : '';
                    var wordPosBool = (word_in_step) ? 'true' : 'false';
                    var wordPosIdx = (word_in_step) ? word_in_step.wordIdx : '';
                    var wordPosWord = (word_in_step) ? word_in_step.word : '';
                    html = "<div id=" + slideStep + " class='slideStep' data-step=" + (step + 1) + ">"
                    html += "<span class='stepTop'>" + ((step + 1) * 0.1).toFixed(1) + "</span>"
                    html += "<span class='stepMiddle' draggable='" + wordPosBool + "' data-wordidx='" + wordPosIdx + "'>" + wordPosWord + "</span>"
                    html += "</div>"
                    $('#slideTbl').append(html);

                    if (!_.isEmpty(words)) {
                        $('.slideStep').addClass('played');
                        var word = words[(step + 1)];
                        if (!_.isEmpty(word)) {
                            $('#' + slideStep).css('width', '45px');
                            slideTabWidth = slideTabWidth + 25;
                            $('#' + slideStep + ' span.stepMiddle').attr("draggable", true);
                            $('#' + slideStep + ' span.stepMiddle').html(word.word);
                            $('#' + slideStep + ' span.stepMiddle').data('wordidx', word.wordIdx);
                        }
                    }
                });
                self.splitwords(self.textBox);
                $('.word', this.textBox).each(function(idx) {
                    return $(this).prop('id', 'word-' + (idx + 1));
                });

                var words = document.querySelectorAll('.stepMiddle');
                [].forEach.call(words, function(word) {
                    word.addEventListener('dragstart', self.handleWordDragStart, false);
                });

                var steps = document.querySelectorAll('.slideStep');
                [].forEach.call(steps, function(step) {
                    step.addEventListener('dragenter', self.handleDragEnter, false);
                    step.addEventListener('dragover', self.handleDragOver, false);
                    step.addEventListener('dragleave', self.handleDragLeave, false);
                    step.addEventListener('drop', self.handleWordDrop, false);
                });

                $('.slideStep').on('click', function() { self.playFromTheStep(this); });
                $('#slideTbl').css('width', slideTabWidth);

                return $('.wordIn', self.$el).each(function() {
                    var sliWidth;
                    sliWidth = $('#slideTbl', self.$el).width() + 31;
                    $('#slideTbl', self.$el).css('width', sliWidth + 'px');
                    return $(this).parent().css('width', '45px');
                });
            });
        }

        if (!play_synced) {
            $("#jplayerSync", this.$el).unbind($.jPlayer.event.timeupdate);
            $("#jplayerSync", this.$el).bind($.jPlayer.event.timeupdate, function(event) {
                var stepNo;
                stepNo = parseFloat(event.jPlayer.status.currentTime.toFixed(1)) * 10;
                if (stepNo > 0) {
                    if (stepNo > (self.scrolled * 37)) {
                        $("#syncBar").scrollTo('#slideStep-' + stepNo);
                        self.scrolled += 1;
                    }
                }
                return _.times(parseInt(stepNo), function(step) {
                    return $('#slideStep-' + (step + 1)).addClass('played');
                });
            });
        } else {
            $("#jplayerSync", this.$el).unbind($.jPlayer.event.timeupdate);
            var wordLength = 0;
            $("#jplayerSync", this.$el).bind($.jPlayer.event.timeupdate, (function(_this) {
                return function(event) {
                    var timings;
                    timings = audio_obj.wordTimes;
                    if (!timings) {
                        return;
                    }
                    if (_this.wordIdx >= timings.length) {
                        return;
                    }
                    if (event.jPlayer.status.currentTime >= timings[_this.wordIdx]) {
                        $('.word', _this.text_box).css('background-color', '');
                        $("#word-" + (_this.wordIdx + 1), _this.text_box).css('background-color', _this.highlightColor);
                        if ((_this.wordIdx + 1) > (wordLength * 10)) {
                            $(".textWrapper").scrollTo("#word-" + (_this.wordIdx + 1), _this.textBox);
                            wordLength += 1;
                        }
                        return _this.wordIdx++;
                    }
                };
            })(this));
        }

        if (this.audioObj.wordMap) {
            $('#sync-play', this.$el).css('display', 'inline-block');
            $('#addLesson').removeAttr('disabled');
            $('#sync-pause').css('display', 'none');
            //$('.sync-play-disable', this.$el).css('display', 'none');
        }
    };

    Karaoke.prototype.changePlaybackRate = function() {
        //getting slider selected value and assigning to variable
        var value = ecEditor.jQuery('#syncSlider').val();
        $('.ui-slider-legend p').css('color', 'black');
        $('.ui-slider-legend p:eq(' + (value - 1) + ')').css('color', 'grey');
        //basedon user selection we are changing playbackrate of audio
        if (parseInt(value) === 2) {
            return $("#jplayerSync").jPlayer('option', 'playbackRate', 0.7);
        } else if (parseInt(value) === 3) {
            return $("#jplayerSync").jPlayer('option', 'playbackRate', 0.5);
        } else {
            return $("#jplayerSync").jPlayer('option', 'playbackRate', 1);
        }
    };
}(window.jQuery, window, document));
//# sourceURL=karaokeplugin.js
