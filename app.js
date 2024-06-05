const accessKey = "WnjLVVeR0pQwjD6C399uDZbhR31nX6vWPAKQgTBjTuU";
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const loadMoreBtn = document.querySelector(".loadMoreBtn");
let page=1;


const fetchImages= async (query,pageNo)=>{
    if(pageNo === 1){
        imagesContainer.innerHTML = '';
    }
    
    const url = `https://api.unsplash.com/search/photos?query= ${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const p = await fetch(url);
    const data = await p.json();
    

   if (data.results.length > 0){
    data.results.forEach(photo => {
        const imageElement = document.createElement("div")
        imageElement.classList.add("imageDiv")
        imageElement.innerHTML= `<img src = "${photo.urls.regular}"/>`
    
    
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");
    
    const overlayText = document.createElement("h3")
    overlayText.innerText= `${photo.alt_description}`;
    
    overlayElement.appendChild(overlayText);
    imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
       });
    
    if(data.total_pages === pageNo){
        loadMoreBtn.style.display ="none";
    }else{
        loadMoreBtn.style.display="block";
    }
   }else{
    imagesContainer.innerHTML= `<h2>No image found..</h2>`
     loadMoreBtn.style.display ="none";
   }

   

}



searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText!==""){
        page=1;

        fetchImages(inputText, page);
    }else{
        imagesContainer.innerHTML= `<h2>Please enter a search query..</h2>`
        loadMoreBtn.style.display ="none";
    }
}) ;

loadMoreBtn.addEventListener("click", () => {
    fetchImages(searchInput.value.trim(), ++page);
})