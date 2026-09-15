const side=document.querySelector('.sidebar');document.querySelector('[data-sidebar-toggle]')?.addEventListener('click',()=>side?.classList.toggle('open'));
const fileInput=document.querySelector('#prescription');fileInput?.addEventListener('change',()=>{const out=document.querySelector('#fileName');if(out)out.textContent=fileInput.files[0]?.name||'No file selected'});
