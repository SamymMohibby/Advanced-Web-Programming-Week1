// fetching the dog 
const fetchDogImage = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random")
    const data = await res.json();

    const imageUrl = data.message;
    const breedPart = data.message.split("/")[4]
    const parts = breedPart.split("-")
     const wikiTitle = parts.length === 2
        ? `${capitalize(parts[1])} ${capitalize(parts[0])}` 
        : capitalize(parts[0]);
    
        return {wikiTitle, imageUrl}
}

//Capitalization for searching through wikipedia API
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const fetchWikipedia = async (title) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });

    if(!res.ok) {
        console.error("Error")
    }

    const data = await res.json();
    return data.extract;

}

const documentBody = async () => {
    //Creating th element
    const {wikiTitle, imageUrl }= await fetchDogImage();
    const summary =  await fetchWikipedia(wikiTitle)

    //console.log("Wikipedia summary:", summary);

    const container = document.createElement("div")
    container.className = "container"

    const wrapper = document.createElement("div")
    wrapper.className= "wiki-item";
    container.appendChild(wrapper)

    const h2 = document.createElement("h2")
    h2.className = "wiki-header"
    h2.textContent = wikiTitle
    wrapper.appendChild(h2)

    const content = document.createElement("div")
    content.className = "wiki-content"
    wrapper.appendChild(content)

    const p = document.createElement("p");
    p.className = "wiki-text"
    p.textContent = summary
    content.appendChild(p)

    const imageContainer = document.createElement("div")
    imageContainer.className = "img-container"
    content.appendChild(imageContainer)

    const image = document.createElement("img")
    image.className = "wiki-img"
    image.src = imageUrl
    imageContainer.appendChild(image)
    
    document.body.appendChild(wrapper)
}


const main = async () => {
    //clear document first
    document.body.innerHTML = ""; 
    for(let i=0; i < 5; i++) {
        await documentBody()
    }
};

document.addEventListener("DOMContentLoaded", main)