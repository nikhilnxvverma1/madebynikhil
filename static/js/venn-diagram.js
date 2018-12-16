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
    fadeAllExplainers(0,0);
});


function hoveringOnVenn(event){
    var id=revisedIdForVenn($(this).attr('id'));

    fadeAllVennsTo(0.5,0);
    fadeTheseIds(0.3,0,vennTitles);
    fadeAllExplainers(0,0);
    
    $('#'+id).fadeTo(0,1);
    var titlesToShow=qualifyingTitlesForId(id);
    fadeTheseIds(1,0,titlesToShow);
    fadeExplainersCorrespondingTo(id,1,0);
}

function deHoveringOnVenn(event){
    //reset everything back to normal
    fadeAllVennsTo(1,0);
    fadeTheseIds(1,0,vennTitles);
    $('#vennDiagramContainer .explainer').remove();
    fadeAllExplainers(0,0);
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

function fadeAllExplainers(fadeTo,duration){
    for(var i=0;i<allVenn.length;i++){
        fadeExplainersCorrespondingTo(allVenn[i],fadeTo,duration);
    }
}

function fadeExplainersCorrespondingTo(vennId,fadeTo,duration){
    var withoutVenn=vennId.slice(4);//remove the word 'venn' from each id
    var till=4;
    if((withoutVenn=='LeftRight')||(withoutVenn=='RightBottom')||(withoutVenn=='LeftBottom')){
        till=2;
    }
    for(var j=1;j<=till;j++){
        var explainerId='explain'+withoutVenn+j;
        $('#'+explainerId).fadeTo(duration,fadeTo);
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

/**constructs a div containing a heading and a paragraph element sized just appropriately to be displyed next to a venn
element
@param vennIndex : tells the index of the venn element this explainer is for
@param n : the explainer number
*/
function explainerSection(vennIndex,n){
    
    //TOOD get Heading from data structure
    var heading='Heading';
    //TODO get description from data structure
    var desc='Lorem ipsum dolor sit amet, ius no movet epicuri temporibus, solum graeco albucius nec cu. Percipitur cotidieque mei in, eu sit illud augue tamquam. Quo complectitur comprehensam ut. Id ancillae inimicus complectitur per, vis partem postea in.';
    
    var explainer=`
        <div class="explainer" 
style="
width:25%;
position:absolute;
">
            <h3>`+heading+`</h3>
            <p>`+desc+`</p>
        </div>
    `;
    return explainer;
}