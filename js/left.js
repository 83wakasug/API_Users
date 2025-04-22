const url = 'https://jsonplaceholder.typicode.com/users';

async function fetchUsers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderUsers(data);
  } catch (error) {
    console.log(error);
  }
}

function renderUsers(data) {
  const con_left = document.getElementById("container_left");
  const table_title = document.createElement("div");
  table_title.className = "div_table_title";
  table_title.innerHTML =
    `  
     <table>   
      <tr>
        <th colspan="5">Name</th>
        <th colspan="4">Username</th>
        <th colspan="6">email</th> 
        <th colspan="2"></th> 
      </tr>
      </table>   
    `

  con_left.appendChild(table_title);

  data.forEach(info => {

    const name = info.name;
    const username = info.username;
    const email = info.email;

    const container = document.createElement("div");
    container.className = "div_container";
    container.innerHTML = `
    <table>
        <tr>
        <td colspan="5">${name}</td>
        <td colspan="4">${username}</td>
        <td colspan="6">${email}</td>
        <td colspan="2"><button class="icon-btn" type="button">Details</button></td>
      </tr>
    </table>
    `;
    con_left.appendChild(container);

    // クリックイベントを追加
    container.querySelector(".icon-btn").addEventListener("click", function() {
      menuForDetails(info); 
    });
  });
}

function menuForDetails(info) {
  try {
    const menu = document.createElement("div");

    if (document.querySelector("#container_right .div_con")) {
      return;
    }

    menu.className = "div_con";
    menu.innerHTML = `
      <div class="div_detail_title">
        <h2>Details</h2>
        <i class="fa-solid fa-xmark cross"></i>
      </div>
      <ul>
        <div class="box box1">
          <li>Contact Information <i id="con_plus" class="fa-solid fa-plus"></i></li>
        </div>
        <div class="box box2"><li>Todo List <i id="to_plus" class="fa-solid fa-plus"></i></li></div>
        <div class="box box3"><li>Comment <i id="com_plus" class="fa-solid fa-plus"></i></li></div>
      </ul>
    `;

    const container = document.getElementById("container_right");
    container.appendChild(menu);

    let plus = document.getElementById("con_plus");
    if (plus) {
      plus.addEventListener("click", function() {
        userDetails(info);
        getPost(info.id);
        
      });
    }

    let plusTodo = document.getElementById("to_plus");
    if (plusTodo) {
      plusTodo.addEventListener("click", function() {
        getTodo(info.id);
      });

    let plusCon = document.getElementById("com_plus");
    if(plusCon){
       plusCon.addEventListener("click",function(){
        getComment(info.id);

       })  
      }
    }

    

    const cross = menu.querySelector(".cross");
    cross.addEventListener("click", () => {
      menu.remove();
    });
  } catch (ex) {
    console.log(ex);
  }
}

function userDetails(info) {
  try {
    let box1 = document.querySelector(".box1");

    const city = info.address.city;
    const phone = info.phone;
    const companyName = info.company.name;

    const div = document.createElement("div");
    if (document.querySelector(".div_contactInformation")) {
      return; // 既に情報が表示されている場合は再表示しない
    }
    div.className = "div_contactInformation";

    div.innerHTML = `
    <div class="div_contact">
      <span><strong>City:</strong> ${city}<br></span>
      <span><strong>Phone:</strong> ${phone}<br></span>
      <span><strong>Company Name:</strong> ${companyName}<br></span>
    </div>
    `;

    box1.appendChild(div);
    
   
    changeIconFromPlustoMinus("#con_plus");
   
     // ここでアイコンの切り替えと詳細情報の削除処理を追加
     const minus = document.querySelector(".con_minus");
     if (minus) {
       minus.addEventListener("click", () => {
         const div_contactInformation = document.querySelector(".div_contactInformation");
         if (div_contactInformation) {
           div_contactInformation.remove();
         }

                 // Post 情報削除
        const posts = document.querySelectorAll(".post_container");
        posts.forEach(p => p.remove());

      
        
        // アイコン切り替えと再表示
        changeIconFromminusToplus("#con_plus", () => userDetails(info));
      });
    
     }
     
  } catch (ex) {
    console.log(ex);
  }
}

function changeIconFromPlustoMinus(className) {
  let plus = document.querySelector(`${className}`);
  plus.classList.remove("fa-solid", "fa-plus");
  plus.classList.add("fa-solid", "fa-minus", "con_minus");
}

function changeIconFromminusToplus(className,callback) {
  let plus = document.querySelector(`${className}`);
  plus.classList.remove("fa-solid", "fa-minus", "con_minus");
  plus.classList.add("fa-solid", "fa-plus");
  plus.addEventListener("click", function handler(e) {
    // 一度使ったイベントリスナーを削除して、再登録防止
    e.target.removeEventListener("click", handler);
    callback();
  }, { once: true }); 
}

function getPost(userid){
 try{
  const urlPost =`https://jsonplaceholder.typicode.com/posts?userId=${userid}`

   const box1 = document.querySelector(".box1");

  const existing = box1.querySelector(".post_container");

  // すでに表示されている場合 → 閉じる
  if (existing) {

    return;
  }

  
  fetch(urlPost)
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const li = document.createElement('li');
        li.className = "post_container";
        li.innerHTML = `
          <table>
            <tr>
              <td>${post.title}</td>
              <td>${post.body}</td>
            </tr>
          </table>
        `;
        box1.appendChild(li);
      });
    });
  }catch(e){
    console.log(e);
  }

}

fetchUsers(); // ユーザー情報を取得して表示

function getTodo(userid){
  const urlTodo = `https://jsonplaceholder.typicode.com/todos?userId=${userid}`;
  const box2 = document.querySelector(".box2");

  const existing = box2.querySelector(".todo_Container");

  // すでに表示されている場合 → 閉じる
  if (existing) {
    box2.querySelectorAll(".todo_Container").forEach(el => el.remove());
    changeIconFromminusToplus("#to_plus", () => getTodo(userid));
    return;
  }

  // なければ表示
  changeIconFromPlustoMinus("#to_plus");

  fetch(urlTodo)
    .then(response => response.json())
    .then(todos => {
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = "todo_Container";
        li.innerHTML = `
          <table>
            <tr>
              <td>${todo.title}</td>
              <td>${todo.completed ? '✅ true' : '❌ false'}</td>
            </tr>
          </table>
        `;
        box2.appendChild(li);
      });
    });
}

function getComment(userid){

  try{
  const urlComment = `https://jsonplaceholder.typicode.com/comments?userId=${userid}`;
  const box3 = document.querySelector(".box3");

  const existing = box3.querySelector(".comment_Container");

  // すでに表示されている場合 → 閉じる
  if (existing) {
    box3.querySelectorAll(".comment_Container").forEach(el => el.remove());
    changeIconFromminusToplus("#com_plus", () => getComment(userid));
    return;
  }

  // なければ表示
  changeIconFromPlustoMinus("#com_plus");

  fetch(urlComment)
    .then(response => response.json())
    .then(todos => {
       let i =0;
       while(i<3){
        const li = document.createElement('li');
        li.className = "comment_Container";
        li.innerHTML =
        `
          <table>
            <tr>
              <td>${todos[i].body}</td>
            </tr>
          </table>
        `
         i++;
         box3.appendChild(li);
       }
       
        
     
    });
  }catch(e){
    console.log(e);
  }
}



  
  



