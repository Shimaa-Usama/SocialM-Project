$( document ).ready(function() {
    $(".parent-spinner").fadeOut(1000)
 });

 function getID(id){
     console.log(id);
    document.getElementById('deletePost').value = id
    document.getElementById('updatePost').value = id


}

function getTitle(title){
    
    document.getElementById('updatePostTitle').value = title

}

function getText(text){

    document.getElementById('updatePostText').value = text

}