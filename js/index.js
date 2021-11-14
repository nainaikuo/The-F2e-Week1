const map = document.querySelector(".map")
const cityTitle = document.querySelector(".city-title")
const cityCards = document.querySelector(".cards");
let citySpot ;
let preRenderSpot;

function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
        let AppID = '4b8f2a32ce3a4595bf371d2624835e8d';
        let AppKey = 'rIpLauVouObdoZ09CCJaYTdWszQ';
    //  填入自己 ID、KEY 結束
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        return { 'Authorization': Authorization, 'X-Date': GMTString }; 
    }

    function preRender() {
        let preRenderCards = "" ;
    
        preRenderSpot.forEach((i,index) => {
            if(!i.Class1){
                preRenderCards +=`
            <div class="card">
                <img class="card-img" src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }else if(!i.Class2){
                preRenderCards +=`
            <div class="card">
                <img class="card-img" src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                    <div class="card-tags">
                    <div class="card-tag">#${i.Class1}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }else if(!i.Class3){
                preRenderCards +=`
            <div class="card">
                <img class="card-img" src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                    <div class="card-tags">
                    <div class="card-tag">#${i.Class1}</div>
                    <div class="card-tag">#${i.Class2}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }else{
                preRenderCards +=`
            <div class="card">
                <img class="card-img" src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                    <div class="card-tags">
                    <div class="card-tag">#${i.Class1}</div>
                    <div class="card-tag">#${i.Class2}</div>
                    <div class="card-tag">#${i.Class3}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }
        });
        cityCards.innerHTML = preRenderCards
      }
    function render(e){
    
        let nowShowCity  = e.target.dataset.city ;
        if(!nowShowCity){
            return;
        }
        axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${nowShowCity}?$top=3&$format=JSON
        `,{
            headers: getAuthorizationHeader()
         })
    .then(res => {
        citySpot = res.data ;
        console.log(citySpot);
        cityTitle.textContent = citySpot[0].City
        let cards = "" ;
        citySpot.forEach((i,index) => {
            if(!i.Picture.PictureUrl1){
                cards +=`
            <div class="card">
                <img class="card-img" src="https://fakeimg.pl/300/" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }else if(!i.Class1){
                cards +=`
            <div class="card">
                <img class="card-img" src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }else if(!i.Class2){
                cards +=`
            <div class="card">
                <img class="card-img" src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                    <div class="card-tags">
                    <div class="card-tag">#${i.Class1}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }else if(!i.Class3){
                cards +=`
            <div class="card">
                <img class="card-img" src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                    <div class="card-tags">
                    <div class="card-tag">#${i.Class1}</div>
                    <div class="card-tag">#${i.Class2}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }else{
                cards +=`
            <div class="card">
                <img class="card-img" src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                    <div class="card-tags">
                    <div class="card-tag">#${i.Class1}</div>
                    <div class="card-tag">#${i.Class2}</div>
                    <div class="card-tag">#${i.Class3}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >0人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>
            `
            }
        });
        cityCards.innerHTML = cards
    })
        
    }
    let recommendNum = 0 ;
function cardClick(e) {

    if(e.target.nodeName==="I"){
        recommendNum += 1
    }else{
        return
    }
    const recommendTotalNum = document.querySelectorAll(".card-recommend");
    // console.log(recommendTotalNum,e.target)
    recommendTotalNum[e.target.dataset.id].textContent = `${recommendNum}人推薦`
  }



axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=3&$format=JSON",{
    headers: getAuthorizationHeader()
 })
    .then(res => {
        preRenderSpot = res.data;
        preRender()
    })




map.addEventListener("click",render)
cityCards.addEventListener("click",cardClick)


