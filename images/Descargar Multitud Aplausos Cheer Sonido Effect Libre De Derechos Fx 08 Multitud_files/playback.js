if($(".is_loading").length>0)
$(".is_loading").removeClass("is_loading");if($(".is-mobile .is-mobile-loading").length>0)
$(".is-mobile .is-mobile-loading").removeClass("is-mobile-loading");if(typeof(isAudioPage)=="undefined"){var isAudioPage=0;}
var clipsPerRowGlobal=0;var addingToCollection=false;var timeoutRequest;var randomString="?v="+(Math.floor(Math.random()*1000000)+1000000);var playTime=0;XMLHttpRequest.prototype._originalOpen=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(method,url,async,user,password){if(url.indexOf('Collection')>0){clearTimeout(timeoutRequest);addingToCollection=true;timeoutRequest=setTimeout(function(){addingToCollection=false;},1000);}
this._originalOpen(method,url,async,user,password);}
$(".video-thumb-inner").click(function(){var link=$(this).find("a").attr("href");if(link=="#next")
return;if(typeof videvo_widget==="undefined"||!videvo_widget){if(!isAudioPage&&!$(this).parents('.video-listing-item').is('.audio')){window.location=$(this).find("a").attr("href");}
return false;}})
var playPromise=undefined;var currentPlaybackId="";var lastClipAudio;var audioMuted=' muted ';var timeoutPlayback=0,timeoutStop=0;var playbackTimeoutInterval=150;var notShownPlayButton=true;var args=JSON.parse(window.videvoParameters);var isSponsored;function startVideoPreview()
{if(currentPlaybackId=="")
{return;}
if(playPromise!=undefined)
{return;}
var localPlaybackId=currentPlaybackId;var args=JSON.parse(window.videvoParameters);element=$("#"+currentPlaybackId);isAudio=element.is('.audio');isSponsored=element.is('.video-responsive-sponsored');if(isSponsored){videoPathWebm=element.find('.preview').attr('data-webm-video');videoPathmp4=element.find('.preview').attr('data-mp4-video');if(videoPathWebm.length==0)
videoPathWebm=videoPathmp4;}else{videoPathWebm=element.find('img.preview').attr('data-video-preview');if(isAudio||args.clip_type=='Music'||args.clip_type=='Sound Effects'||args.page_slug=='sound-effect'||args.page_slug=='royalty-free-music-track'||$(this).hasClass('audio')||element.hasClass('audio')){videoPathWebm=element.find('img.preview').attr('data-video-source');}
videoPathmp4=videoPathWebm.slice(0,-4)+'mp4';if(videoPathWebm.indexOf("converted")>0){videoPathmp4=videoPathWebm.replace("preview","videos").slice(0,-4)+'mp4';}
if(videoPathWebm.indexOf("cdn.videvo.net")==-1){videoPathWebm+=randomString;videoPathmp4+=randomString;}}
{audioMuted=' muted ';if(isAudio||args.clip_type=='Music'||args.clip_type=='Sound Effects'||args.page_slug=='sound-effect'||args.page_slug=='royalty-free-music-track'||$(this).hasClass('audio')||element.hasClass('audio')){if($("#preview_player").length==0)
{element.find('.video-thumb-inner').append('<video playsinline id="preview_player" ref="video" class="inv" autoplay preload="none" loop '+audioMuted+' >'+
'<source src="'+(videoPathWebm.startsWith("http")?'':'https://www.videvo.net/')+videoPathWebm+'" type="audio/mp3">Your browser does not support the html video player.</video><div class="custom-seekbar-container"><div></div></div>');}
else
{$("#preview_player").detach().appendTo(element.find('.video-thumb-inner'));$("#preview_player").after('<div class="custom-seekbar-container"><div></div></div>');$("#preview_player source").remove();$("#preview_player").prepend('<source src="'+(videoPathWebm.startsWith("http")?'':'https://www.videvo.net/')+videoPathWebm+'" type="audio/mp3">');}
element.find('video')[0].ontimeupdate=function(){var percentage=($(this)[0].currentTime/$(this)[0].duration)*100;playTime=$(this)[0].currentTime;$(this).parent().find('.custom-seekbar-container').find('div').css("width",percentage+"%");}
var vid=element.find('video')[0];lastClipAudio=true;element.find(".custom-seekbar-container").on("click",function(e){var offset=$(this).offset();var left=(e.pageX-offset.left);var totalWidth=$(this).width();var percentage=(left/totalWidth);var vidTime=vid.duration*percentage;vidTime=parseInt(vidTime);vid.currentTime=vidTime;vid.muted=false;audioMuted='';});}else{if($("#preview_player").length==0)
{element.find('.video-thumb-inner > a').append('<video id="preview_player" playsinline ref="video" class="" preload="auto" loop muted>'+
'<source src="'+(videoPathWebm.startsWith("http")?'':'https://www.videvo.net/')+videoPathWebm+'" type="video/webm">'+
'<source src="'+(videoPathmp4.startsWith("http")?'':'https://www.videvo.net/')+videoPathmp4+'" type="video/mp4">Your browser does not support the html video player.</video>');}else{$("#preview_player").detach().appendTo(element.find('.video-thumb-inner > a'));$("#preview_player source").remove();$("#preview_player").prepend('<source src="'+(videoPathWebm.startsWith("http")?'':'https://www.videvo.net/')+videoPathWebm+'" type="video/webm">'+
'<source src="'+(videoPathmp4.startsWith("http")?'':'https://www.videvo.net/')+videoPathmp4+'" type="video/mp4">');}
element.find('video')[0].ontimeupdate=function(){var percentage=($(this)[0].currentTime/$(this)[0].duration)*100;playTime=$(this)[0].currentTime;$(this).closest(".video-listing-item").find('.progress_bar_seek').css("width",percentage+"%");}
lastClipAudio=false;element.find('video').get(0).muted=true;}
playPromise=element.find('video').show().get(0).play();playPromise.then(function(){if(isAudioPage)
{if($(".audioplayer").length>0)
$(".audioplayer")[0].pause();}
if(localPlaybackId!=currentPlaybackId)
{endVideoPreview(localPlaybackId);if(currentPlaybackId!="")
{timeoutPlayback=setTimeout(startVideoPreview,10);}}
playPromise=undefined;if(lastClipAudio==true){element.find('video')[0].muted=false;}}).catch(function(error){playPromise=undefined;});}}
function endVideoPreview(element)
{player=$("#"+element).find('video').not(".ref-video");if(player.length>0)
{player[0].muted=true;player[0].pause();$("#preview_player source").remove();player.attr('muted',true);player.prop('muted',true);player[0].load();}}
$(document).ready(function(){$(document).on("mouseenter",".video-listing-item",function(e){var _self=$(this);if(currentPlaybackId==$(this).attr("id")||window.mobileAndTabletCheck())
{return;}
if(typeof window.mobileAndTabletCheck==="function"){if(window.mobileAndTabletCheck())
{return;}}
currentPlaybackId=$(this).attr("id");if((isAudioPage||$(this).is('.audio'))&&notShownPlayButton){notShownPlayButton=false;audioMuted='';$('.custom-seekbar-container div').css('width','0%');startVideoPreview();return;}
else{if(args.page_slug!=='collection'&&args.page_slug!==""){notShownPlayButton=false;}}
timeoutPlayback=setTimeout(startVideoPreview,playbackTimeoutInterval);return;}).on("mouseleave",".video-listing-item",function(){if(currentPlaybackId=="")
{return;}
playPromise=undefined;$('.play-button').remove();eventType="Play preview ";videoId=$("#"+currentPlaybackId+" .preview")[0].id;videoTitle=$("#"+currentPlaybackId+" .preview")[0].title;notShownPlayButton=true;if(playTime>3&&!isSponsored)
$.ajax({type:'GET',url:'/api/?path=errorHandler/logs-for-statistics&params={"eventType":"'+eventType+'","playTime":"'+playTime+'","videoId":"'+videoId+'","title":"'+videoTitle+'","url":"'+element[0].baseURI+'"}',}).done(function(response){});currentPlaybackId="";if(timeoutPlayback!=0)
{clearTimeout(timeoutPlayback);timeoutPlayback=0;}
if(playPromise==undefined)
{endVideoPreview($(this).attr("id"));}
$(this).find('.custom-seekbar-container').remove();});if(window.outerWidth<767){function isAppleDevice(){return((navigator.userAgent.toLowerCase().indexOf("ipad")>-1)||(navigator.userAgent.toLowerCase().indexOf("iphone")>-1)||(navigator.userAgent.toLowerCase().indexOf("ipod")>-1));}
$(document).on('mouseover','.video-responsive',function(){if(isAppleDevice()&&$('.mobile-play-button').is(':visible')){$(this).find('.mobile-play-button')[0].click();}});}
$(document).on('click','.mobile-play-button',function(e){var videoItem=$(this).parents('.video-listing-item');if(videoItem.is('.active')){return}
$('.video-listing-item.active').removeClass('active');videoItem.addClass('active');if(currentPlaybackId==$(this).parents('.video-listing-item').attr("id"))
{return;}
if(playPromise==undefined)
{endVideoPreview(videoItem.attr("id"));}
$('.custom-seekbar-container').remove();currentPlaybackId="";$('#shutterstock-results video, #preview_player').remove();currentPlaybackId=videoItem.attr("id");if((isAudioPage||videoItem.is('.audio'))){audioMuted='';$('.custom-seekbar-container div').css('width','0%');startVideoPreview();return;}
if(timeoutPlayback!=0)
{clearTimeout(timeoutPlayback);timeoutPlayback=0;}
timeoutPlayback=setTimeout(startVideoPreview,playbackTimeoutInterval);return})})
function is_touch_device(){return!!('ontouchstart'in window||navigator.maxTouchPoints);};function initAudioControls(){if(window.audioControlsInitialized){return}
if(!window.audioControlsInitialized){window.audioControlsInitialized=true;}
setTimeout(function(){$(".audio-player .add-to-collection.lazyLoad").removeClass("lazyLoad");})
$.fn.isInViewport=function(){var elementTop=$(this).offset().top;var elementBottom=elementTop+$(this).outerHeight();var viewportTop=$(window).scrollTop();var viewportBottom=viewportTop+$(window).height();return(elementBottom>viewportTop&&elementTop<viewportBottom&&elementBottom<viewportBottom&&elementTop>viewportTop);};$(document).on("click",".audio-player [data-action^='play']",function(){if($(this).parents(".audio-player").hasClass("in-focus")){startStopPlay($(this));}else{song=$(this).parents(".audio-player").find("audio[id^='linkAudio']")[0];song.currentTime=0;startStopPlay($(this));}})
$(window).keydown(function(e){if(e.keyCode==32&&$(".audio-player.in-focus").length>0){if($(':focus').is("input")){return}
e.preventDefault();playButton=$(".audio-player.in-focus [data-action^='play']");song=$(playButton).parents(".audio-player").find("audio[id^='linkAudio']")[0];if(song.ended){song.currentTime=0;song.play();return;}
startStopPlay(playButton);}
console.log(e.keyCode);if(e.keyCode==40&&$(".audio-player.in-focus").length>0){if($(':focus').is("input")){return}
e.preventDefault();allAudios=$(".audio-player");currentAudio=$(".audio-player.in-focus");currentAudioId=$(currentAudio).attr("audio-id");currentAudioIndex=-1;$.each(allAudios,function(k,v){if($(v).attr("audio-id")==currentAudioId){currentAudioIndex=k;}})
if(currentAudioIndex!=allAudios.length-1){nextAudio=$(allAudios)[currentAudioIndex+1]}else{return;nextAudio=$(allAudios)[0];}
jumpToActiveAudio(nextAudio,function(){song=$(nextAudio).find("audio[id^='linkAudio']")[0];song.currentTime=0;playButton=$(nextAudio).find("[data-action^='play']");startStopPlay(playButton);})}
if(e.keyCode==38&&$(".audio-player.in-focus").length>0){if($(':focus').is("input")){return}
e.preventDefault();allAudios=$(".audio-player");currentAudio=$(".audio-player.in-focus");currentAudioId=$(currentAudio).attr("audio-id");currentAudioIndex=-1;$.each(allAudios,function(k,v){if($(v).attr("audio-id")==currentAudioId){currentAudioIndex=k;}})
if(currentAudioIndex!=0){prevAudio=$(allAudios)[currentAudioIndex-1]}else{return;prevAudio=$(allAudios)[$(allAudios).length-1];}
jumpToActiveAudio(prevAudio,function(){song=$(prevAudio).find("audio[id^='linkAudio']")[0];song.currentTime=0;playButton=$(prevAudio).find("[data-action^='play']");startStopPlay(playButton);})}
if(e.keyCode==39&&$(".audio-player.in-focus").length>0){if($(':focus').is("input")){return}
e.preventDefault();currentAudio=$(".audio-player.in-focus");jumpToActiveAudio(currentAudio,function(){song=$(".audio-player.in-focus").find("audio[id^='linkAudio']")[0];song.currentTime+=10;})}
if(e.keyCode==37&&$(".audio-player.in-focus").length>0){if($(':focus').is("input")){return}
e.preventDefault();currentAudio=$(".audio-player.in-focus");jumpToActiveAudio(currentAudio,function(){song=$(".audio-player.in-focus").find("audio[id^='linkAudio']")[0];song.currentTime-=10;})}
if(e.keyCode==70&&$(".audio-player.in-focus").length>0){if($(':focus').is("input")){return}
e.preventDefault();currentAudio=$(".audio-player.in-focus");jumpToActiveAudio(currentAudio,function(){if($(currentAudio).parents(".main-audio").length>0){$(".main-video-info .add-to-collection").trigger("click");}else{$(currentAudio).find(".add-to-collection").trigger("click");}})}
if(e.keyCode==73&&$(".audio-player.in-focus").length>0){if($(':focus').is("input")){return}
e.preventDefault();currentAudio=$(".audio-player.in-focus");jumpToActiveAudio(currentAudio,function(){if($(currentAudio).parents(".main-audio").length>0){$('[data-more-info]').toggle();}else{$(currentAudio).find(".more-info").toggle();$(currentAudio).toggleClass("more-info-open");}})}
if(e.keyCode==67&&$(".audio-player.in-focus").length>0){if($("#category-collection-popover").length>0){return;}
if($(':focus').is("input")){return}
e.preventDefault();currentAudio=$(".audio-player.in-focus");jumpToActiveAudio(currentAudio,function(){if($(currentAudio).parents(".main-audio").length>0){$(".main-video-info .open-collection-category-popover").trigger("click");}else{$(currentAudio).find(".open-collection-category-popover > .action-button").trigger("click");}})}});jumpToActiveAudio=function(currentAudio,callback){equalizeWaveformDimensions();waitForScroll=0;if(!$(currentAudio).isInViewport()){waitForScroll=300;windowThird=$(window).height()/3;window.scroll({top:$(currentAudio).offset().top-windowThird,behavior:'smooth'});}
if(callback){setTimeout(function(){callback();},waitForScroll)}}
$(document).on("mouseenter",".waveform-container",function(){$(this).parents(".audio-player").addClass("hoverState");}).on("mouseleave",".waveform-container",function(){$(this).parents(".audio-player").removeClass("hoverState");})
startStopPlay=function(playButton){identifier=$(playButton).attr("data-action").split("-")[1];song=$("#linkAudio-"+identifier)[0];$.each($("audio[id^='linkAudio']"),function(k,v){if($(v)[0]!=song){$(v)[0].pause();}})
$(".audio-player").removeClass("in-focus");$(playButton).parents(".audio-player").addClass("in-focus");if(!$("#linkAudio-"+identifier).attr("src")){audioSrc=$(playButton).attr("audio-source")
$("#linkAudio-"+identifier).attr("src",audioSrc);$(playButton).children("source[type='audio/mpeg']").attr("src",audioSrc);}
if(song.duration>0&&!song.paused){song.pause();}else{song.play();}
initAudioProgress();}
pauseAllAudioPlayers=function(){$.each($("audio[id^='linkAudio']"),function(k,v){$(v)[0].pause();})}
initAudioProgress=function(){if(window.audioProgressInitiated){return;}
window.audioProgressInitiated=true;$.each($("audio[id^='linkAudio']"),function(k,v){var currentActiveSong=$(v)[0];currentActiveSong.ontimeupdate=function(){progress=currentActiveSong.currentTime*100/currentActiveSong.duration;progressLeft=100-progress;$(this).parents(".audio-player").find(".blue-waveform-container").css("width",progress+"%");$(this).parents(".audio-player").find(".blue-waveform-container .overlay").css("display","block");if($(this).parents(".audio-player").find("canvas:hover").length===0){drawWaveformItem($(this).parents(".audio-player").find("canvas")[0],$(this).parents(".audio-player").find(".blue-waveform-container").width());}
if(($(this).parents(".audio-player").find(".waveform-container:hover").length==0&&!is_touch_device())||is_touch_device()){$(this).parents(".audio-player").find(".blue-waveform-holder").css("width",progress+"%");}
let blueWaveformContainer=$(".audio-player:not(.in-focus) .blue-waveform-container");for(let index=0;index<blueWaveformContainer.length;index++){if(blueWaveformContainer[index].style.width!=="0px"){drawWaveformItem(blueWaveformContainer[index].previousElementSibling);}}
$(".audio-player:not(.in-focus)").find(".blue-waveform-container").css("width","0");$(".audio-player:not(.in-focus):not(.hoverState)").find(".blue-waveform-holder").css("width","0");if(!currentActiveSong.paused){$(this).parents(".audio-player").find("[data-action^='play']").addClass("inPlay");audioId=$(this).parents(".audio-player").attr("audio-id");saveAudioVisited(audioId);$(this).parents(".audio-player").addClass("visited");}};currentActiveSong.onpause=function(){$(this).parents(".audio-player").find("[data-action^='play']").removeClass("inPlay");$(".audio-player:not(.in-focus)").find(".blue-waveform-container").css("width","0");$(".audio-player:not(.in-focus)").find(".blue-waveform-holder").css("width","0");}})}
saveAudioVisited=function(audioId){if(!localStorage.getItem("playedAudio")){localStorage.setItem("playedAudio","[]")
playedAudio=JSON.parse(localStorage.getItem("playedAudio"));}
if(playedAudio.indexOf(audioId)==-1){playedAudio.push(audioId);console.log(playedAudio);localStorage.setItem("playedAudio",JSON.stringify(playedAudio));}}
markVisitedAudio=function(){if(!localStorage.getItem("playedAudio")){localStorage.setItem("playedAudio","[]")}
playedAudio=JSON.parse(localStorage.getItem("playedAudio"));$.each(playedAudio,function(k,v){if($(".audio-player[audio-id='"+v+"']").length>0){$(".audio-player[audio-id='"+v+"']").addClass("visited");}})}
markVisitedAudio();equalizeWaveformDimensions=function(){$.each($(".audio-player"),function(k,v){$(v).find(".blue-waveform-holder img").css("width",function(){return $(this).parents(".waveform-container").find(".grey-waveform:visible")[0].getBoundingClientRect().width;}).css("height",function(){return $(this).parents(".waveform-container").find(".grey-waveform:visible")[0].getBoundingClientRect().height;})})}
equalizeWaveformDimensions();$(window).on("resize",function(){equalizeWaveformDimensions();});$(document).on("mousemove",".audio-player .waveform-container",function(e){domAudioElement=$(this).parents(".audio-player").find("audio[id^='linkAudio']");equalizeWaveformDimensions();markVisitedAudio();if(!$(domAudioElement).attr("src")){audioSrc=$(domAudioElement).attr("audio-source")
$(domAudioElement).attr("src",audioSrc);$(domAudioElement).children("source[type='audio/mpeg']").attr("src",audioSrc);}
var parentOffset=$(this).offset();var relX=e.pageX-parentOffset.left;progress=relX*100/$(this).width();$(this).parents(".audio-player").find(".blue-waveform-holder").css("width",progress+"%");}).on("mouseleave",".audio-player .waveform-container",function(){song=$(this).parents(".audio-player").find("audio[id^='linkAudio']")[0];audioProgress=song.currentTime*100/song.duration;if(isNaN(audioProgress)){audioProgress=0;}
if($(this).parents(".audio-player").hasClass("in-focus")){$(this).parents(".audio-player").find(".blue-waveform-holder").css("width",audioProgress+"%");}else{$(this).parents(".audio-player").find(".blue-waveform-holder").css("width","0%");}}).on("click",".audio-player .waveform-container",function(e){song=$(this).parents(".audio-player").find("audio[id^='linkAudio']")[0];if($(this).parents(".audio-player").hasClass("in-focus")){if(song.ended){progress=0;}else{var parentOffset=$(this).offset();var relX=e.pageX-parentOffset.left;progress=relX*100/$(this).width();}
$(this).parents(".audio-player").find(".blue-waveform-container").css("width",progress+"%");song.currentTime=progress/100*song.duration;playButton=$(this).parents(".audio-player").find("[data-action^='play']");if(!$(this).parents(".audio-player").hasClass("playing")){pauseAllAudioPlayers()
song.play();}}else{$(this).parents(".audio-player").addClass("in-focus")
playButton=$(this).parents(".audio-player").find("[data-action^='play']");song.currentTime=0;startStopPlay(playButton);}})
$(document).on("click",".audio-player .toggle-more-info",function(){$(this).parents(".audio-player").find(".more-info").toggle();$(this).parents(".audio-player").toggleClass("more-info-open");})}
jQuery(document).on("click touchstart scroll",function(){initAudioControls();});jQuery(document).ready(function(){initAudioControls();});