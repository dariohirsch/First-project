var flag,value,ctrid,errid,errmsg,res,valuelen,ch;function Focus(ctrid)
{document.getElementById(ctrid).focus();}
function IsVideoValid(ctrid,errid,errmsg)
{value=document.getElementById(ctrid).value;if(value!="")
{document.getElementById(errid).innerHTML="";valuelen=value.length;var dotpos=value.lastIndexOf('.');if(dotpos==-1)
{document.getElementById(errid).innerHTML=errmsg;flag=false;}
else if(dotpos!=-1)
{var ext=value.substring(dotpos+1,valuelen);var final_ext=ext.toLowerCase();if(final_ext!="flv"&&final_ext!="mov"&&final_ext!="wmv"&&final_ext!="mp4")
{document.getElementById(errid).innerHTML=errmsg;flag=false;}}}}
function IsAudioValid(ctrid,errid,errmsg)
{value=document.getElementById(ctrid).value;if(value!="")
{document.getElementById(errid).innerHTML="";valuelen=value.length;var dotpos=value.lastIndexOf('.');if(dotpos==-1)
{document.getElementById(errid).innerHTML=errmsg;flag=false;}
else if(dotpos!=-1)
{var ext=value.substring(dotpos+1,valuelen);var final_ext=ext.toLowerCase();if(final_ext!="mp3")
{document.getElementById(errid).innerHTML=errmsg;flag=false;}}}}
function IsTagsValid(ctrid,errid,errmsg)
{value=document.getElementById(ctrid).value.trim();if(value!="")
{document.getElementById(errid).innerHTML="";valuelen=value.length;ch=value.charAt(valuelen-1);if(ch!=",")
{flag=false;document.getElementById(errid).innerHTML=errmsg;return;}}}
function IsDelete()
{res=confirm("Do you really want to delete?");if(res==true)
{return true;}
else
{return false;}}
function RequiredField(ctrid,errid,errmsg)
{value=document.getElementById(ctrid).value;document.getElementById(errid).innerHTML="";if(value.length==0)
{document.getElementById(errid).innerHTML=errmsg;flag=false;}}
function IsValid()
{flag=true;RequiredField("txtvidtitle","errvidtitle","Please enter video title.");RequiredField("txtvideo","errvideo","Please browse a video.");IsVideoValid("txtvideo","errvideo","Please upload only flv/mov/wmv video.");IsTagsValid("txttags","errtags","Please enter comma at the end of each tag.");return flag;}
function IsValidAudio()
{flag=true;RequiredField("txtvidtitle","errvidtitle","Please enter audio title.");RequiredField("txtvideo","errvideo","Please browse a audio.");IsAudioValid("txtvideo","errvideo","Please upload only mp3 audio.");IsTagsValid("txttags","errtags","Please enter comma at the end of each tag.");return flag;}
function IsUpdValid()
{flag=true;RequiredField("txtvidtitle","errvidtitle","Please enter video title.");IsVideoValid("txtvideo","errvideo","Please upload only flv/mov/wmv video.");IsTagsValid("txttags","errtags","Please enter comma at the end of each tag.");return flag;}
function IsUpdValidAudio()
{flag=true;RequiredField("txtvidtitle","errvidtitle","Please enter audio title.");IsVideoValid("txtvideo","errvideo","Please upload only mp3 audio.");IsTagsValid("txttags","errtags","Please enter comma at the end of each tag.");return flag;}
function SubmitForm(url)
{document.frmaddedit.action=url;document.frmaddedit.submit();}
function SubmitFormFrontSearch(url)
{document.frmfrontsearch.action=url;document.frmfrontsearch.submit();}
function SubmitSearchResVidID(url)
{document.frmsearchresvidtitle.action=url;document.frmsearchresvidtitle.submit();}
function SubmitCatVidID(url)
{document.frmcatvidtitle.action=url;document.frmcatvidtitle.submit();}