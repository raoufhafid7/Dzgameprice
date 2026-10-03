const products = [
 {id:1,name:"PlayStation 5 Slim 1TB",category:"console",label:"كونسول",price:112000,icon:"🎮",desc:"جهاز ألعاب من الجيل الحالي، سعة 1TB.",offers:[["عرض تجريبي A",112000],["عرض تجريبي B",118000],["عرض تجريبي C",125000]]},
 {id:2,name:"Xbox Series S 512GB",category:"console",label:"كونسول",price:69000,icon:"🕹️",desc:"كونسول رقمي صغير للألعاب.",offers:[["عرض تجريبي A",69000],["عرض تجريبي B",74000]]},
 {id:3,name:"PlayStation 4 Pro",category:"console",label:"كونسول",price:58000,icon:"🎮",desc:"كونسول PlayStation بدقة محسّنة في الألعاب المدعومة.",offers:[["عرض تجريبي A",58000],["عرض تجريبي B",65000]]},
 {id:4,name:"Grand Theft Auto V — PC",category:"game",label:"لعبة",price:4500,icon:"🚘",desc:"لعبة عالم مفتوح. السعر المعروض تجريبي.",offers:[["متجر تجريبي A",4500],["متجر تجريبي B",5200]]},
 {id:5,name:"Resident Evil 4 Remake — PC",category:"game",label:"لعبة",price:6200,icon:"🧟",desc:"لعبة رعب وبقاء. السعر المعروض تجريبي.",offers:[["متجر تجريبي A",6200],["متجر تجريبي B",7000]]},
 {id:6,name:"NVIDIA GeForce RTX 4060",category:"gpu",label:"كرت شاشة",price:65000,icon:"🧩",desc:"كرت شاشة للألعاب بدقة 1080p.",offers:[["عرض تجريبي A",65000],["عرض تجريبي B",71000]]},
 {id:7,name:"NVIDIA GeForce RTX 3060 12GB",category:"gpu",label:"كرت شاشة",price:45000,icon:"🧩",desc:"كرت شاشة بذاكرة 12GB.",offers:[["عرض تجريبي A",45000],["عرض تجريبي B",49000]]},
 {id:8,name:"AMD Ryzen 5 5600",category:"cpu",label:"معالج",price:22000,icon:"⚙️",desc:"معالج مكتبي بستة أنوية.",offers:[["عرض تجريبي A",22000],["عرض تجريبي B",25000]]},
 {id:9,name:"GameSir X5 Lite",category:"accessory",label:"إكسسوار",price:5500,icon:"🎮",desc:"يد تحكم للألعاب على الهاتف المتوافق.",offers:[["عرض تجريبي A",5500],["عرض تجريبي B",6500]]},
 {id:10,name:"DualSense Wireless Controller",category:"accessory",label:"إكسسوار",price:14500,icon:"🎮",desc:"يد تحكم لاسلكية لـ PlayStation 5.",offers:[["عرض تجريبي A",14500],["عرض تجريبي B",16000]]},
 {id:11,name:"Intel Core i5-12400F",category:"cpu",label:"معالج",price:30000,icon:"⚙️",desc:"معالج مكتبي للألعاب والاستخدام العام.",offers:[["عرض تجريبي A",30000],["عرض تجريبي B",33000]]},
 {id:12,name:"NVIDIA GeForce RTX 4070 SUPER",category:"gpu",label:"كرت شاشة",price:105000,icon:"🧩",desc:"كرت شاشة قوي للألعاب الحديثة.",offers:[["عرض تجريبي A",105000],["عرض تجريبي B",112000]]}
];
const $ = s => document.querySelector(s);
const money = n => new Intl.NumberFormat("fr-DZ").format(n) + " دج";
const categoryNames = {console:"كونسول",game:"لعبة",gpu:"كرت شاشة",cpu:"معالج",accessory:"إكسسوار"};
function filteredProducts(){
 const q=$("#searchInput").value.trim().toLocaleLowerCase("ar");
 const cat=$("#categoryFilter").value;
 let list=products.filter(p=>(cat==="all"||p.category===cat)&&(!q||(p.name+" "+p.label+" "+p.desc).toLocaleLowerCase("ar").includes(q)));
 const sort=$("#sortFilter").value;
 if(sort==="low") list.sort((a,b)=>a.price-b.price);
 if(sort==="high") list.sort((a,b)=>b.price-a.price);
 if(sort==="az") list.sort((a,b)=>a.name.localeCompare(b.name));
 return list;
}
function render(){
 const list=filteredProducts();
 $("#resultCount").textContent=`${list.length} منتج`;
 $("#emptyState").classList.toggle("hidden",list.length!==0);
 $("#productGrid").innerHTML=list.map(p=>`<article class="product-card">
   <div class="product-visual"><span class="product-label">${p.label}</span><span class="product-icon">${p.icon}</span><span class="visual-glow"></span></div>
   <div class="product-info"><span class="muted">${categoryNames[p.category]}</span><h3>${p.name}</h3><p>${p.desc}</p>
   <div class="product-bottom"><strong>${money(p.price)}</strong><button class="details-btn" data-id="${p.id}">قارن الأسعار <span>←</span></button></div>
   <small class="demo-tag">سعر تجريبي</small></div></article>`).join("");
}
function showProduct(id){
 const p=products.find(x=>x.id===Number(id)); if(!p)return;
 const sorted=[...p.offers].sort((a,b)=>a[1]-b[1]);
 $("#modalContent").innerHTML=`<span class="eyebrow">${p.label}</span><h2 id="modalTitle">${p.name}</h2><p>${p.desc}</p><div class="modal-price">أقل سعر تجريبي: <strong>${money(sorted[0][1])}</strong></div><h3>مقارنة العروض التجريبية</h3><div class="offer-list">${sorted.map((o,i)=>`<div class="offer"><span>${o[0]}${i===0?' <b class="lowest">الأقل</b>':''}</span><strong>${money(o[1])}</strong></div>`).join("")}</div><p class="modal-note">هذه بيانات توضيحية فقط وليست عروضًا حقيقية. أضف أسعار المتاجر وروابطها قبل نشر الموقع كمقارن أسعار فعلي.</p>`;
 $("#productModal").classList.remove("hidden"); document.body.classList.add("modal-open");
}
function closeModal(){ $("#productModal").classList.add("hidden");document.body.classList.remove("modal-open");}
$("#searchInput").addEventListener("input",render);
$("#categoryFilter").addEventListener("change",render);
$("#sortFilter").addEventListener("change",render);
$("#productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)showProduct(b.dataset.id);});
$("#productModal").addEventListener("click",e=>{if(e.target.matches("[data-close]"))closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
$("#gpuSelect").addEventListener("change",updateBuild);
$("#cpuSelect").addEventListener("change",updateBuild);
function updateBuild(){ $("#buildTotal").textContent=money(Number($("#gpuSelect").value)+Number($("#cpuSelect").value));}
$("#menuBtn").addEventListener("click",()=>document.querySelector("nav").classList.toggle("nav-open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("nav").classList.remove("nav-open")));
$("#year").textContent=new Date().getFullYear();
render();updateBuild();