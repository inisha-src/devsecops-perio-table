const table = document.querySelector(".table");
const search = document.getElementById("search");

const modal = document.getElementById("modal");
const title = document.getElementById("modal-title");
const desc = document.getElementById("modal-desc");
const visitBtn = document.getElementById("visit-btn");
const closeBtn = document.getElementById("close-btn");

let toolsData = [];

// LOAD JSON
fetch("tools.json")
    .then(res => res.json())
    .then(data => {
        toolsData = data;
        renderTools(data);
    });

// RENDER
function renderTools(data){
    table.innerHTML = "";

    data.forEach(tool => {
        const div = document.createElement("div");
        div.classList.add("tool", tool.category);

        div.innerHTML = `
            <h3>${tool.name}</h3>
            <p>${tool.desc}</p>
        `;

        div.addEventListener("click", () => {
            modal.style.display = "flex";
            title.innerText = tool.name;
            desc.innerText = tool.desc;

            visitBtn.onclick = () => {
                window.open(tool.url, "_blank");
            };
        });

        table.appendChild(div);
    });
}

// SEARCH
search.addEventListener("input", () => {
    const value = search.value.toLowerCase();

    const filtered = toolsData.filter(t =>
        t.name.toLowerCase().includes(value) ||
        t.desc.toLowerCase().includes(value)
    );

    renderTools(filtered);
});

// CLOSE
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});
