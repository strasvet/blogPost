const card = (post) =>{
    return `
    
            <div class="card blue-grey darken-1 z-depth-4">
            <div class="card-content white-text">
                <span class="card-title">${post.title}</span>
                <p style="white-space: pre-line">${post.text}</p>
                <small>${new Date(post.date).toLocaleDateString()}</small>
            </div>
            <div class="card-action">
                

               <!-- <a class="waves-effect waves-light btn modal-trigger js-remove2" data-target="confirm" data-id2="${post._id}" data-ti2="${post.title}" id="deleteMe">DeleteMe</a> -->
               <!-- <a class="waves-effect waves-light btn modal-trigger js-remove2" data-target="confirm" data-id2="${post._id}" data-ti2="${post.title}" id="deleteMe">DeleteMe</a> -->
               
                <!--<button class="btn btn-small red modal-trigger js-remove2"  data-target="confirm" data-id2="${post._id}" data-ti2="${post.title}" id="deleteMe">DELETE</button>-->
                <button class="btn btn-small red modal-trigger js-remove2"  data-target="confirm" data-id2="${post._id}" data-ti2="${post.title}">DELETE</button>
            
                <!--<button class="btn btn-small red js-remove" data-id="${post._id}"> 
                    <!--<i class="material icons">Delete</i>-->
                    <!-- delete -->
                 <!-- </button> -->
            </div>
            

            
            
        </div>
    
    `
};

const BASE_URL = "/api/post";
let posts = [];
let modal;

//ajax
class PostApi{
    static getAllData(){
      return fetch(BASE_URL,{method: "get"}).then(res=>res.json()); //json method ot fetch
    }

    static create(post){
        return fetch(BASE_URL,{
            method: "post",
            body:JSON.stringify(post),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(res=>res.json()); //json method ot fetch
    }

    static remove(id){
        return fetch(`${BASE_URL}/${id}`,{method: "delete"}).then(res=>res.json()); //json method ot fetch
    }
}


document.addEventListener("DOMContentLoaded",()=>{
        PostApi.getAllData().then(backendPosts=>{
            posts = backendPosts.concat();
            renderPosts(posts);
        });
    //M.AutoInit();

    //ver two
    //elems = [];
    elems = document.querySelectorAll(".modal");
    //elems[1].options({opacity:0.9,inDuration:250});
    myModal = M.Modal.init(elems);
    //myModal[1].options({opacity:0.9,inDuration:250});

    //ver one
    //modal = M.Modal.init(document.querySelector(".modal"));
    //modalConfirm = M.Modal.init(document.querySelector("#confirm"),({opacity:0.9,inDuration:250}));

    document.querySelector("#createPost").addEventListener("click", onCreatePost); //on modal form
         document.querySelector("#posts").addEventListener("click", onDeletePost); //v pole gde vse posti
    //document.querySelector("#agree").addEventListener("click",onDeletePost);
         //document.querySelector("#confirm").addEventListener("click", onDconf); //v pole gde vse posti
         //document.querySelector("#confirm").addEventListener("click", onDconf); //v pole gde vse posti
         //document.querySelector("#posts").addEventListener("click", onDeletePost2); //v pole gde vse posti
    /*modalConfirm for delete*/

});

function renderPosts(arr = []) {
    const el = document.querySelector("#posts");
    if(arr.length>0){
        el.innerHTML=posts.map(post=>card(post)).join(" "); //cherez probel " " sobiraem v stroku
    }else{
        el.innerHTML = `<div class="center">No result</div>`
    }
}
//for modal form
function onCreatePost() {
    const elTitle = document.querySelector("#title");
    const elText = document.querySelector("#text");
    if(elTitle.value && elText.value){
        const newPost={
            title: elTitle.value,
            text: elText.value
        };
        PostApi.create(newPost).then(post=>{
            posts.push(post);
            renderPosts(posts);
        });
        myModal[0].close(); //method from materialize
        //Materialize.updateTextFields();
        elText.value="";
        elTitle.value="";

        //const formForReset = document.querySelector("#createForm");
        //formForReset.reset();
        M.updateTextFields(); //pereinicialize materialize inputs //recommends

    }
}
function onDeletePost(event) {
    if(event.target.classList.contains("js-remove")){
        const decision = confirm("Are you sure to delete?");
        if(decision){
            const id = event.target.getAttribute("data-id");
            PostApi.remove(id).then(()=>{
                const postIndex = posts.findIndex(post=>post._id===id);
                posts.splice(postIndex,1); //was slice! warning!!!
                renderPosts(posts);
            })
        }
    }
    if(event.target.classList.contains("js-remove2")){
        //console.log(myModal[1]);
        //console.log(elems);
        let id2 = event.target.getAttribute("data-id2");
        let ti2 = event.target.getAttribute("data-ti2");

        //console.log(id2,ti2);

        //document.querySelector("js-remove3").addEventListener("click",()=> alert("clicked agree!"));
        //myModal[1].querySelector("js-remove3").addEventListener("click",()=> alert("clicked agree!"));
        datamy = document.querySelector("#datamy");
        datamy.innerText = ti2;
        document.querySelector("#agree").addEventListener("click", (()=> {
                datamy.innerText = "";
                PostApi.remove(id2).then(() => {
                    const postIndex = posts.findIndex(post => post._id === id2);
                    posts.splice(postIndex, 1); //was slice! warning!!!
                    renderPosts(posts);
                })
            }
        ));
        myModal[1].close();
        /*
        agreeButton = document.querySelector("#agree");
        agreeButton.onclick = ()=> {
            PostApi.remove(id2).then(()=>{
                const postIndex = posts.findIndex(post=>post._id===id2);
                posts.splice(postIndex,1); //was slice! warning!!!
                renderPosts(posts);
            })
        };*/


    }

}
