var nameOffset,verOffset,ix,nVer=navigator.appVersion,nAgt=navigator.userAgent,browserName=navigator.appName,fullVersion=""+parseFloat(navigator.appVersion),majorVersion=parseInt(navigator.appVersion,10);-1!=(verOffset=nAgt.indexOf("OPR/"))?(browserName="Opera",fullVersion=nAgt.substring(verOffset+4)):-1!=(verOffset=nAgt.indexOf("Opera"))?(browserName="Opera",fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("MSIE"))?(browserName="Microsoft Internet Explorer",fullVersion=nAgt.substring(verOffset+5)):-1!=(verOffset=nAgt.indexOf("Chrome"))?(browserName="Chrome",fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?(browserName="Safari",fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(browserName="Firefox",fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(browserName=nAgt.substring(nameOffset,verOffset),fullVersion=nAgt.substring(verOffset+1),browserName.toLowerCase()==browserName.toUpperCase()&&(browserName=navigator.appName)),-1!=(ix=fullVersion.indexOf(";"))&&(fullVersion=fullVersion.substring(0,ix)),-1!=(ix=fullVersion.indexOf(" "))&&(fullVersion=fullVersion.substring(0,ix)),majorVersion=parseInt(""+fullVersion,10),isNaN(majorVersion)&&(fullVersion=""+parseFloat(navigator.appVersion),majorVersion=parseInt(navigator.appVersion,10));var OSName=navigator.appVersion,data={resolution:window.screen.availWidth+"x"+window.screen.availHeight,os:OSName,browser:browserName+" "+fullVersion,screen_size:window.innerWidth+"x"+window.innerHeight,adblocker:adblock,js:!0};$.post("https://"+window.location.hostname+"/user_info_store.php",data).done(function(e){}),$(window).resize(function(){var e={resolution:window.screen.availWidth+"x"+window.screen.availHeight,os:OSName,browser:browserName+" "+fullVersion,screen_size:window.innerWidth+"x"+window.innerHeight,adblocker:adblock,js:!0};$.post("https://"+window.location.hostname+"/user_info_store.php",e).done(function(e){})});