/** Dependency on jquery 2.1.1*/

var allVenn=['vennLeft','vennRight','vennBottom','vennLeftRight','vennRightBottom','vennLeftBottom','vennCore'];
var vennTitles=['vennLeftTitle','vennRightTitle','vennBottomTitle'];

var currentHover=null;

$(document).ready(function(){
   console.log("dom is ready now") ;
    for(var i=0;i<allVenn.length;i++){
        var selector='svg #'+allVenn[i];
        $(selector).on('mouseover',hoveringOnVenn);
        $(selector).on('mouseout',deHoveringOnVenn);
    }
    
    for(var i=0;i<vennTitles.length;i++){
        var selector='svg #'+vennTitles[i];
        $(selector).on('mouseover',hoveringOnVenn);
        $(selector).on('mouseout',deHoveringOnVenn);
    }
});


function hoveringOnVenn(event){
    var id=revisedIdForVenn($(this).attr('id'));

    fadeAllVennsTo(0.5,0);
    fadeTheseIds(0.5,0,vennTitles);
    
    $('#'+id).fadeTo(0,1);
    var titlesToShow=qualifyingTitlesForId(id);
    fadeTheseIds(1,0,titlesToShow);
    
}

function deHoveringOnVenn(event){
    //reset everything back to normal
    fadeAllVennsTo(1,0);
    fadeTheseIds(1,0,vennTitles);
}

function fadeAllVennsTo(fadeTo,duration,except){
    for(var i=0;i<allVenn.length;i++){
        var vennId=allVenn[i];
        if(vennId!=except){
            $('#'+vennId).fadeTo(duration,fadeTo);
        }
    }
}

function fadeTheseIds(fadeTo,duration,ids){
    for(var i=0;i<ids.length;i++){
        $('#'+ids[i]).fadeTo(duration,fadeTo);
    }
}



function qualifyingTitlesForId(vennId,fadeTo,duration){
    var titles=[];
    if(vennId=='vennLeft'){
        titles.push('vennLeftTitle');
    }else if(vennId=='vennRight'){
        titles.push('vennRightTitle');
    }else if(vennId=='vennBottom'){
        titles.push('vennBottomTitle');
    }else if(vennId=='vennLeftRight'){
        titles.push('vennLeftTitle');
        titles.push('vennRightTitle');
    }else if(vennId=='vennRightBottom'){
        titles.push('vennRightTitle');
        titles.push('vennBottomTitle');
    }else if(vennId=='vennLeftBottom'){
        titles.push('vennLeftTitle');
        titles.push('vennBottomTitle');
    }else if(vennId=='vennCore'){
        titles.push('vennLeftTitle');
        titles.push('vennRightTitle');
        titles.push('vennBottomTitle');
    }
    return titles;   
}

/**
returns a corresponding venn diagram element id , incase the supplied id belongs to the venn diagram's title
*/
function revisedIdForVenn(id){
    for(var i=0;i<vennTitles.length;i++){
        if(vennTitles[i]==id){
            return id.slice(0,-5);//-5 because we want to remove 'title' from the id
        }
    }
    return id;
}