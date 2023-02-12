const url = window.location.href.split("?");
const id = parseInt(url[url.length - 1]);

async function some() 
 {
    let result;

    await fetch(`http://localhost:3000/books/${id}`)
    .then(response => response.json())
    .then(data => {
        result = data;
    });

    return result;
 }


async function main() {   
    const data = await some();
    console.log(data);
    
    const bookTitle = document.getElementById("bookTitle");
    bookTitle.innerHTML = data.title;
}

main()