let e=document.querySelector(".contact-form"),t=document.querySelector("#first-name"),n=document.querySelector("#second-name"),u=document.querySelector("#phone"),l=document.querySelector("#email"),r=document.querySelector("#addBookmarkBtn"),a=document.querySelector("#bookmarkList"),o=document.createElement("button");o.type="button",o.id="cancelEditBtn",o.textContent="Скасувати",o.hidden=!0,r.insertAdjacentElement("afterend",o);let i=JSON.parse(localStorage.getItem("contacts"))||[],c=null;function s(e){a.innerHTML=e.map(({name:e,surname:t,phoneNumber:n,userEmail:u},l)=>`
      <li class="item" data-index="${l}">
        <p>${e}</p>
        <p>${t}</p>
        <p>${n}</p>
        <p>${u}</p>
        <button type="button" class="edit-btn">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
        <button type="button" class="delete-btn">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </li>`).join("")}function m(){localStorage.setItem("contacts",JSON.stringify(i)),s(i)}function d(){c=null,r.textContent="Додати",o.hidden=!0,e.reset()}e.addEventListener("submit",e=>{e.preventDefault();let r=t.value.trim(),a=n.value.trim(),o=u.value.trim(),s=l.value.trim();if(!r||!a||!o||!s)return void alert("Будь ласка, заповніть усі поля!");{let e={name:r,surname:a,phoneNumber:o,userEmail:s};null!==c?i[c]=e:i.push(e)}m(),d()}),a.addEventListener("click",a=>{let s=a.target.closest("li");if(!s)return;let b=Number(s.dataset.index);if(a.target.classList.contains("delete-btn")){i.splice(b,1),m(),c===b&&d();return}if(a.target.classList.contains("edit-btn")){let a=i[b];t.value=a.name,n.value=a.surname,u.value=a.phoneNumber,l.value=a.userEmail,c=b,r.textContent="Зберегти",o.hidden=!1,e.scrollIntoView({behavior:"smooth",block:"start"})}}),o.addEventListener("click",()=>{d()}),s(i);
//# sourceMappingURL=js-homework9-from-part4.ee443392.js.map
