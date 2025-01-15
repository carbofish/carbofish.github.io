KEEP.initUtils=()=>{KEEP.utils={rootHtmlDom:document.querySelector("html"),pageTopDom:document.querySelector(".page-main-content-top"),scrollProgressBarDom:document.querySelector(".scroll-progress-bar"),pjaxProgressBarDom:document.querySelector(".pjax-progress-bar"),pjaxProgressIcon:document.querySelector(".pjax-progress-icon"),back2TopBtn:document.querySelector(".tool-scroll-to-top"),headerWrapperDom:document.querySelector(".header-wrapper"),innerHeight:window.innerHeight,pjaxProgressBarTimer:null,prevScrollValue:0,fontSizeLevel:0,isHasScrollProgressBar:!1,isHasScrollPercent:!1,isHeaderTransparent:!1,isHideHeader:!0,hasToc:!1,formatDatetime(e=KEEP.themeInfo.defaultDatetimeFormat,t=Date.now()){function o(e){return`00${e}`.substring(e.length)}const s=new Date(t);(/(y+)/.test(e)||/(Y+)/.test(e))&&(e=e.replace(RegExp.$1,`${s.getFullYear()}`.substr(4-RegExp.$1.length)));const r={"M+":s.getMonth()+1,"D+":s.getDate(),"d+":s.getDate(),"H+":s.getHours(),"h+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds()};for(const t in r)if(new RegExp(`(${t})`).test(e)){const s=`${r[t]}`;e=e.replace(RegExp.$1,1===RegExp.$1.length?s:o(s))}return e},setHowLongAgoLanguage:(e,t)=>t.replace(/%s/g,e),getHowLongAgo(e){const t=KEEP.language_ago,o=Math.floor(e/2592e3/12),s=Math.floor(e/2592e3),r=Math.floor(e/86400/7),i=Math.floor(e/86400),a=Math.floor(e/3600%24),n=Math.floor(e/60%60),l=Math.floor(e%60);return o>0?this.setHowLongAgoLanguage(o,t.year):s>0?this.setHowLongAgoLanguage(s,t.month):r>0?this.setHowLongAgoLanguage(r,t.week):i>0?this.setHowLongAgoLanguage(i,t.day):a>0?this.setHowLongAgoLanguage(a,t.hour):n>0?this.setHowLongAgoLanguage(n,t.minute):l>0?this.setHowLongAgoLanguage(l,t.second):void 0},initData(){const e=KEEP.theme_config?.scroll||{},t=KEEP.theme_config?.first_screen||{};this.isHasScrollProgressBar=!0===e?.progress_bar,this.isHasScrollPercent=!0===e?.percent,this.isHeaderTransparent=!0===t?.enable&&!window.location.pathname.includes("/page/"),this.isHeaderTransparent||this.headerWrapperDom.classList.remove("transparent-1","transparent-2"),this.isHideHeader=!1!==e?.hide_header},styleHandleWhenScroll(){const e=this.getScrollTop(),t=document.body.scrollHeight||document.documentElement.scrollHeight,o=window.innerHeight||document.documentElement.clientHeight,s=Math.round(e/(t-o)*100)||0;if(e>10?this.back2TopBtn.classList.add("show"):this.back2TopBtn.classList.remove("show"),this.isHasScrollProgressBar&&this.scrollProgressBarDom){const r=(e/(t-o)*100).toFixed(3);this.scrollProgressBarDom.style.visibility=0===s?"hidden":"visible",this.scrollProgressBarDom.style.width=`${r}%`}if(this.isHasScrollPercent&&this.back2TopBtn){this.back2TopBtn.classList.add("show-percent");const e=this.back2TopBtn.querySelector(".percent");0===s||void 0===s?this.back2TopBtn.classList.remove("show"):(this.back2TopBtn.classList.add("show"),e.innerHTML=s.toFixed(0),s>99?this.back2TopBtn.classList.add("show-arrow"):this.back2TopBtn.classList.remove("show-arrow"))}e>this.prevScrollValue&&e>this.innerHeight?(this.isHideHeader&&this.pageTopDom.classList.add("hide"),this.isHeaderTransparent&&this.headerWrapperDom.classList.remove("transparent-1","transparent-2")):(this.isHideHeader&&this.pageTopDom.classList.remove("hide"),this.isHeaderTransparent&&(e<=this.headerWrapperDom.getBoundingClientRect().height?(this.headerWrapperDom.classList.remove("transparent-2"),this.headerWrapperDom.classList.add("transparent-1")):e<this.innerHeight&&this.headerWrapperDom.classList.add("transparent-2"))),!0===KEEP.theme_config?.first_screen?.enable&&(e>this.innerHeight-this.pageTopDom.getBoundingClientRect().height?this.pageTopDom.classList.add("reset-color"):this.pageTopDom.classList.remove("reset-color")),this.prevScrollValue=e},registerWindowScroll(){window.addEventListener("scroll",(()=>{this.styleHandleWhenScroll(),!0===KEEP.theme_config?.toc?.enable&&KEEP.utils?.tocHelper&&KEEP.utils.tocHelper.activeNav(),KEEP.utils.headerShrink.headerShrink(),KEEP.utils.headerShrink.sideToolsBarShowHandle()}))},toggleShowToolsList(){const e=document.querySelector(".side-tools-list"),t=document.querySelector(".tool-toggle-show");t?.hasClickListener||(t.addEventListener("click",(t=>{e.classList.toggle("show"),t.stopPropagation()})),t.hasClickListener=!0),e.querySelectorAll(".tools-item").forEach((e=>{e.addEventListener("click",(e=>{e.stopPropagation()}))})),document.addEventListener("click",(()=>{e.classList.contains("show")&&e.classList.remove("show")}))},globalFontAdjust(){const e=document.defaultView.getComputedStyle(document.body).fontSize,t=parseFloat(e),o=e=>{this.rootHtmlDom.style.setProperty("font-size",t*(1+.05*e)+"px","important"),KEEP.themeInfo.styleStatus.fontSizeLevel=e,KEEP.setStyleStatus()};(()=>{const e=KEEP.getStyleStatus();e&&(this.fontSizeLevel=e.fontSizeLevel,o(this.fontSizeLevel))})(),document.querySelector(".tool-font-adjust-plus").addEventListener("click",(()=>{5!==this.fontSizeLevel&&(this.fontSizeLevel++,o(this.fontSizeLevel))})),document.querySelector(".tool-font-adjust-minus").addEventListener("click",(()=>{this.fontSizeLevel<=0||(this.fontSizeLevel--,o(this.fontSizeLevel))}))},initHasToc(){document.querySelectorAll(".post-toc-wrap .post-toc li").length>0?(this.hasToc=!0,document.body.classList.add("has-toc")):(this.hasToc=!1,document.body.classList.remove("has-toc"))},getZoomValueOfDom(e){const t=Number((e.style?.zoom||"1").replace("%",""));return t>1?t/100:t},zoomInImage(){let e=40,t=!1,o=0,s=null;const r=document.querySelector(".zoom-in-image-mask"),i=r?.querySelector(".zoom-in-image"),a=[...document.querySelectorAll(".keep-markdown-body img"),...document.querySelectorAll(".photo-album-box img")],n=()=>{t&&(t=!1,o=0,i&&(i.style.transform="scale(1)"),r&&r.classList.remove("show"),setTimeout((()=>{s&&s.classList.remove("hide")}),300))};a.length&&(r&&r.addEventListener("click",(()=>{n()})),document.addEventListener("scroll",(()=>{t&&Math.abs(o-window.scrollY)>=50&&n()})),a.forEach((a=>{a.addEventListener("click",(()=>{if(o=window.scrollY,t=!t,(()=>{const t=document.body.offsetWidth;e=t<=500?10:t<=800?20:40})(),i.setAttribute("src",a.getAttribute("src")),s=a,t){const t=s.getBoundingClientRect(),o=this.getZoomValueOfDom(s);for(let e in t)t[e]=t[e]*o;const a=t.width,n=t.height,l=t.left,c=t.top,d=document.body.offsetWidth-2*e,h=document.body.offsetHeight-2*e,m=d/a,u=h/n,g=(m<u?m:u)||1,p=d/2-(t.x+a/2)+e,E=h/2-(t.y+n/2)+e;s.classList.add("hide"),r.classList.add("show"),i.style.top=c+"px",i.style.left=l+"px",i.style.width=a+"px",i.style.height=n+"px",i.style.transform=`translateX(${p}px) translateY(${E}px) scale(${g}) `}}))})))},pjaxProgressBarStart(){this.pjaxProgressBarTimer&&clearInterval(this.pjaxProgressBarTimer),this.isHasScrollProgressBar&&this.scrollProgressBarDom.classList.add("hide"),this.pjaxProgressBarDom.style.width="0",this.pjaxProgressIcon.classList.add("show");let e=1;this.pjaxProgressBarDom.classList.add("show"),this.pjaxProgressBarDom.style.width=e+"%",this.pjaxProgressBarTimer=setInterval((()=>{e+=5,e>99&&(e=99),this.pjaxProgressBarDom.style.width=e+"%"}),100)},pjaxProgressBarEnd(){this.pjaxProgressBarTimer&&clearInterval(this.pjaxProgressBarTimer),this.pjaxProgressBarDom.style.width="100%";const e=setTimeout((()=>{this.pjaxProgressBarDom.classList.remove("show"),this.pjaxProgressIcon.classList.remove("show"),this.isHasScrollProgressBar&&this.scrollProgressBarDom.classList.remove("hide");const t=setTimeout((()=>{this.pjaxProgressBarDom.style.width="0",clearTimeout(e),clearTimeout(t)}),200)}),200)},insertTooltipContent(){const{root:e}=KEEP.theme_config,t=!0===KEEP.theme_config?.lazyload?.enable,o=()=>{document.querySelectorAll(".tooltip").forEach((e=>{const{tooltipContent:t,tooltipOffsetX:o,tooltipOffsetY:s}=e.dataset;let r="";o&&(r+=`left: ${o};`),s&&(r+=`top: ${s};`),r&&(r=`style="${r}"`),t&&e.insertAdjacentHTML("afterbegin",`<span class="tooltip-content" ${r}>${t}</span>`)}));const o={};document.querySelectorAll(".tooltip-img").forEach(((s,r)=>{const{tooltipImgName:i,tooltipImgUrl:a,tooltipImgTip:n,tooltipImgTrigger:l="click",tooltipImgStyle:c}=s.dataset;let d="";c&&(d=`style="${c}"`);let h="";if(n&&(h=`<div class="tip">${n}</div>`),a){const n=`tooltip-img-${r}-${i||Date.now()}`,c=`${i}-${r}`,m=(/^(https?:\/\/)/.test(a)?"":e)+a,u=`<div ${d} class="tooltip-img-box ${h?"has-tip":""}">${`<img class="${n}"\n                              ${t?"lazyload":""}\n                              ${t?"data-":""}src="${m}"\n                              alt="${n}"\n                            >`}${h}</div>`;o[c]={imgLoaded:!1,isShowImg:!1},s.insertAdjacentHTML("afterbegin",u);let g="click";"hover"===l&&(g="mouseover"),s?.hasEventListener||(s.addEventListener(g,(e=>{t&&!o[c].imgLoaded&&(e=>{const t=new Image,{src:o}=e.dataset;t.src=o,t.onload=()=>{e.src=o,e.removeAttribute("lazyload")}})(document.querySelector(`.tooltip-img-box img.${n}`),o[c].imgLoaded),o[c].isShowImg=!o[c].isShowImg,s.classList.toggle("show-img"),e.stopPropagation()})),s.hasEventListener=!0),((e,t,s="click")=>{"hover"===s&&(s="mouseout"),document.addEventListener(s,(()=>{o[t].isShowImg&&(e.classList.remove("show-img"),o[t].isShowImg=!1)}))})(s,c,l)}}))};setTimeout((()=>{o()}),1e3)},siteCountInitialize(){if(!0===KEEP.theme_config?.website_count?.busuanzi_count?.enable){const e="busuanzi-js";let t=document.body.querySelector(`#${e}`);t||(t=document.createElement("script"),t.setAttribute("data-pjax",""),t.setAttribute("id",e),t.async=!0,t.src="https://cn.vercount.one/js",document.body.appendChild(t));const o=e=>document.querySelector(e)?.innerText;t.onload=()=>{setTimeout((()=>{if(o("#vercount_value_site_uv")||o("#vercount_value_site_pv")||o("#vercount_value_page_pv")){const e=document.querySelector(".footer .count-info .uv"),t=document.querySelector(".footer .count-info .pv"),o=document.querySelector(".post-meta-info .post-pv");e&&(e.style.display="flex"),t&&(t.style.display="flex"),o&&(o.style.display="inline-block")}}),1e3)}}},pageNumberJump(){const e=document.querySelector(".paginator .page-number-input");if(!e)return;const t=document.querySelector(".paginator .first-page"),o=document.querySelector(".paginator .last-page"),s=Number(e.min),r=Number(e.max),i="not-allow";t.addEventListener("click",(()=>{t.classList.contains(i)||(e.value=s,a())})),o.addEventListener("click",(()=>{o.classList.contains(i)||(e.value=r,a())}));const a=()=>{let t=Number(e.value);t<=0&&(e.value=s,t=s),t>r&&(e.value=r,t=r);const o=window.location.href.replace(/\/$/,"").split("/page/")[0];window.location.href=1===t?o:o+"/page/"+t};e.addEventListener("change",(e=>{a()}))},tabsActiveHandle(){const e=document.querySelectorAll(".keep-tabs");e.length&&e.forEach((e=>{const t=e.querySelectorAll(".tabs-nav .tab"),o=e.querySelectorAll(".tabs-content .tab-pane");t.forEach((e=>{e.addEventListener("click",(()=>{var s,r;s=o,r=e,t.forEach((e=>{r.dataset.href===e.dataset.href?e.classList.add("active"):e.classList.remove("active")})),s.forEach((e=>{r.dataset.href===e.id?e.classList.add("active"):e.classList.remove("active")}))}))}))}))},removeWhitespace(e){if(!e)return;const t=e.childNodes,o=[];for(let e=0;e<t.length;e++){const s=t[e];3===s.nodeType&&/^\s*$/.test(s.nodeValue)&&o.push(s)}for(const t of o)e.removeChild(t)},trimPostMetaInfoBar(){this.removeWhitespace(document.querySelector(".post-meta-info-container .post-category-ul")),this.removeWhitespace(document.querySelector(".post-meta-info-container .post-tag-ul"))},wrapTableWithBox(){document.querySelectorAll("table").forEach((e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)}))},title2Top4HTag(e,t,o,s){e&&t&&(e?.hasEventListener||(e.addEventListener("click",(r=>{r.preventDefault(),s&&s();let i=window.scrollY;i=i<=1?-19:i;let a=t.getBoundingClientRect().top+i;const n=this.headerWrapperDom.getBoundingClientRect().height;this.isHideHeader||(a-=n);this.getFullPageHeight()<=window.innerHeight||window.anime({targets:document.scrollingElement,duration:o,easing:"linear",scrollTop:a,complete:()=>{history.pushState(null,document.title,e.href),this.isHideHeader&&setTimeout((()=>{this.pageTopDom.classList.add("hide")}),160)}})})),e.hasEventListener=!0))},aAnchorJump(){document.querySelectorAll("a.headerlink").forEach((e=>{this.title2Top4HTag(e,e.parentNode,10)})),document.querySelectorAll("a.markdownIt-Anchor").forEach((e=>{this.title2Top4HTag(e,e.parentNode,10)}))},getScrollTop:()=>document.body.scrollTop||document.documentElement.scrollTop,getFullPageHeight:()=>Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},KEEP.utils.initData(),KEEP.utils.registerWindowScroll(),KEEP.utils.toggleShowToolsList(),KEEP.utils.globalFontAdjust(),KEEP.utils.initHasToc(),KEEP.utils.siteCountInitialize(),KEEP.utils.pageNumberJump(),KEEP.utils.trimPostMetaInfoBar(),KEEP.utils.insertTooltipContent(),KEEP.utils.zoomInImage(),KEEP.utils.tabsActiveHandle(),KEEP.utils.wrapTableWithBox(),KEEP.utils.aAnchorJump()};