const map = document.querySelector(".map")

map.addEventListener("click",mapClick)

function mapClick(e){
    const info = document.querySelector(".info")
    let city = e.target.dataset.city
    let nowShowData;
    if(!city){
        return
    }
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?$top=3&$format=JSON`)
    .then(res => {
        nowShowData = res.data

        let cardContent = "";
        info.innerHTML = 
        `<h4 class="city-title">${nowShowData[0].City}</h4>
        <h6 class="city-subtitle">熱門景點Top3</h6>
        <div class="cards">
        </div>
        <div class="more">
            <p>不只這些？</p>
            <button class="more-btn">探索更多</button>
        </div>`
        const cardsArea = document.querySelector(".cards")
        nowShowData.forEach((i,index)=>{
            i.recommendNum = 10
    
            cardContent +=`
            <div class="card">
                <div class="card-img">
                <img src="${i.Picture.PictureUrl1}" alt="${i.Picture.PictureDescription1}">
                </div>
                <div class="card-content">
                    <h5 class="card-title">${i.Name}</h5>
                    <div class="card-tags">
                        <div class="card-tag">${i.Class1}</div>
                        <div class="card-tag">${i.Class2}</div>
                        <div class="card-tag">${i.Class3}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <p class="card-recommend" >${i.recommendNum}人推薦</p>
                    <i class="fa fa-heart recommend-btn" data-id=${index}></i>
                </div>
            </div>`
        })

        cardsArea.innerHTML=cardContent
        
    })
    .catch(err => {
        console.error(err); 
    })
}