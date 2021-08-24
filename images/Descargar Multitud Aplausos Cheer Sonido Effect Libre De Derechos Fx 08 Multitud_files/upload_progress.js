$.fn.uploadProgress=function(options){$(this).each(function(){var form=$(this)
var action=form.attr('action')||window.location.href
var setDownloadedContents=function(contents){if(contents.responseText)
contents=contents.responseText
if(!opts.onBeforeComplete(contents))
return;try{$('body').html($('<body>').html(contents))}
catch(e){action=action.split('#')[0]
window.location_=action}}
var opts
opts=jQuery.extend({onProgress:function(p){},onBeforeSend:function(){},onBeforeComplete:function(){return true;},onComplete:setDownloadedContents,onError:setDownloadedContents,onStart:function(){}},options)
opts.form=form
form.submit(function(ev){if(ev.isDefaultPrevented())
return false
if(opts.form.find('[type=file]').filter(function(){return $(this).val()!=''}).length==0)
return true
opts.onStart()
var formData=new FormData(form[0]);$.ajax({url:action,type:'POST',xhr:function(){myXhr=$.ajaxSettings.xhr();if(myXhr.upload){myXhr.upload.addEventListener('progress',function(ev){opts.onProgress(Math.round(ev.loaded*10000.0/ev.total)/100.0,ev)},false);}
return myXhr;},beforeSend:opts.onBeforeSend,success:opts.onComplete,error:opts.onError,data:formData,cache:false,contentType:false,processData:false})
ev.preventDefault()})})}