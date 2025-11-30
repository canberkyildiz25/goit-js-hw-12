import{a as b,i as f,S as w}from"./vendor-BkVuWn-o.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}})();const C="53374655-fbc0401583ed3cb1d1d3b0e8e",v=b.create({baseURL:"https://pixabay.com/api/",params:{key:C,image_type:"photo",orientation:"horizontal",safesearch:!0}});async function g(s,r=1,e=40){try{const{data:o}=await v.get("",{params:{q:s,page:r,per_page:e}});return o}catch(o){const t=o.response&&`HTTP error! status: ${o.response.status} ${o.response.statusText||""}`.trim()||o.message||"Unknown error";throw console.error("Error fetching images:",t),o}}const L=document.getElementById("searchForm"),E=document.querySelector(".search-input"),a=document.getElementById("loadingMessage"),m=document.getElementById("searchResults"),i=document.getElementById("loadMoreBtn");let p=null,y="",l=1;const d=40;let c=0;L.addEventListener("submit",async s=>{s.preventDefault();const r=E.value.trim();if(r){m.innerHTML="",a.style.display="block",i.style.display="none",y=r,l=1,c=0;try{const e=await g(y,l,d);if(a.style.display="none",e.hits.length===0){f.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3,backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#fff"});return}c=e.totalHits||0,h(e.hits);const o=l*d<c;i.style.display=o?"inline-block":"none"}catch{a.style.display="none",f.error({title:"Error",message:"Sorry, something went wrong. Please try again later.",position:"topRight",timeout:5e3,backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#fff"})}}});i==null||i.addEventListener("click",async()=>{l+=1,a.style.display="block";try{const s=await g(y,l,d);if(a.style.display="none",s.hits.length===0){i.style.display="none",f.info({title:"Info",message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:5e3});return}h(s.hits);const r=document.querySelector(".gallery-item");if(r){const{height:o}=r.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}const e=l*d<(s.totalHits||c);c=s.totalHits||c,i.style.display=e?"inline-block":"none",e||f.info({title:"Info",message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:5e3})}catch{a.style.display="none",f.error({title:"Error",message:"Sorry, something went wrong. Please try again later.",position:"topRight",timeout:5e3,backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#fff"})}});function h(s){const r=s.map(e=>`
        <div class="gallery-item">
          <a href="${e.largeImageURL}" class="gallery-link">
            <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${e.likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${e.views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${e.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${e.downloads}
            </p>
          </div>
        </div>
      `).join("");m.insertAdjacentHTML("beforeend",r),p?p.refresh():p=new w(".gallery-link",{captionsData:"alt",captionDelay:250})}
//# sourceMappingURL=main-iFH_DNUS.js.map
