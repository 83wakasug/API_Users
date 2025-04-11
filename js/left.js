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
  const table_title=document.createElement("div");
  table_title.className = "div_table_title";
table_title.innerHTML=
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
  let index =0;
  data.forEach(info => {

    const name = info.name;
    const username = info.username;
    const email = info.email;



    const container = document.createElement("div");
    container.className = "div_container";
    container.innerHTML=`
    <table>
        <tr>
        <td  colspan="5">${name}</td>
        <td colspan="4">${username}</td>
        <td colspan="6">${email}</td>
        <td colspan="2"><button class = "icon-btn" type="button">Details</button></td>
      </tr>
    </table>
    `;
    con_left.appendChild(container);
    clickedButton(index);
    index++;
  });



}
fetchUsers(); 


function clickedButton(index){
  
  let buttons =document.querySelectorAll(".icon-btn");
  buttons[index].addEventListener("click", menuForDetails);


}


function menuForDetails(){
   
 try{  
  const menu = document.createElement("div");
  
  if(document.querySelector("#container_right .div_container")){
    return;
  } 

  menu.className = "div_container";
  menu.innerHTML=
  `
   <ol>
    <li>Contact Information <i class="fa-solid fa-bars"></i> </li>
    <li>Todo List <i class="fa-solid fa-bars"></i></li>
    <li>Comment <i class="fa-solid fa-bars"></i></li>
  </ol>
  `;

  const container = document.getElementById("container_right");

  container.appendChild(menu);
    


 

}
catch(ex){
 console.log(ex);

}

}



// function detail(info, card, btn, container) {
//   const existingDetails = card.querySelector(".div_details");

//   if (existingDetails) {
//     existingDetails.remove();
//     container.appendChild(btn); 
//     return;
//   }

//   container.removeChild(btn); 

//   const city = info.address.city;
//   const phone = info.phone;
//   const companyName = info.company.name;

//   const div = document.createElement("div");
//   div.className = "div_details";

//   const sCity = document.createElement("span");
//   sCity.innerHTML = `<strong>City:</strong> ${city}<br>`;
//   const sPhone = document.createElement("span");
//   sPhone.innerHTML = `<strong>Phone:</strong> ${phone}<br>`;
//   const sCompanyName = document.createElement("span");
//   sCompanyName.innerHTML = `<strong>Company Name:</strong> ${companyName}<br>`;

//   const closeBtn = document.createElement("button");
//   closeBtn.textContent = "close";
//   closeBtn.className = "close-btn"; 

//   div.appendChild(sCity);
//   div.appendChild(sPhone);
//   div.appendChild(sCompanyName);
//   div.appendChild(closeBtn);
//   card.appendChild(div);

//   closeBtn.addEventListener("click", () => {
//     div.remove();
//     container.appendChild(btn);
//   });
// }
