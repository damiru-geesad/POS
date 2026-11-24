
//Product page (Add , Edit, Delete Btns)
const addProductBtn = document.getElementById("addProductBtn");
const productModal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModalBtn");

addProductBtn.addEventListener("click",function(){
    productModal.style.display = "flex";
});

closeModalBtn.addEventListener("click",function(){
    productModal.style.display = "none";
});


const productForm = document.getElementById("productForm");

const saveProductBtn = document.getElementById("saveProductBtn");
let editingRow = null;

const productTableBody = document.getElementById("productTableBody");

productForm.addEventListener("submit",function(event){

    event.preventDefault();

    const name = document.getElementById("productName").value;
    const code = document.getElementById("productCode").value;
    const category = document.getElementById("productCategory").value;
    const price = document.getElementById("productPrice").value;
    const quantity = document.getElementById("productQuantity").value;

    const newRow = document.createElement("tr");

    
    
    if(editingRow){
        const cells = editingRow.querySelectorAll("td");
        cells[0].textContent = code;
        cells[1].textContent = name;
        cells[2].textContent = category;
        cells[3].textContent = "Rs. " + Number(price).toFixed(2);
        cells[4].textContent = quantity;
    }else{
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${code}</td>
            <td>${name}</td>
            <td>${category}</td>
            <td>Rs. ${Number(price).toFixed(2)}</td>
            <td>${quantity}</td>
            <td>
                <button class="edit-btn" title="Edit Product">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-btn" title="Delete Product">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        productTableBody.appendChild(newRow);
  
    }

    productForm.reset();

    editingRow = null;
    saveProductBtn.textContent = "Add Product";

    productModal.style.display = "none";

});

productTableBody.addEventListener("click",function(event){
    const deleteBtn = event.target.closest(".delete-btn");

    if(deleteBtn){

        const row = deleteBtn.closest("tr");

        const confirmDelete = confirm("Are you sure you want to delete this product?");

        if(confirmDelete){
            row.remove();
        }
    }
});

productTableBody.addEventListener("click",function(event){
    const editBtn = event.target.closest(".edit-btn");

    if(editBtn){
        editingRow = editBtn.closest("tr");

        const cells = editingRow.querySelectorAll("td");

        document.getElementById("productCode").value = cells[0].textContent;
        document.getElementById("productName").value = cells[1].textContent;
        document.getElementById("productCategory").value = cells[2].textContent;
        document.getElementById("productPrice").value = cells[3].textContent.replace("Rs.", "").trim();
        document.getElementById("productQuantity").value = cells[4].textContent;

        saveProductBtn.textContent = "Update Product";

        productModal.style.display = "flex";
    }
});

//Products page Search and Filter


const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");

productSearch.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

function filterProducts() {

    const searchValue = productSearch.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const rows = productTableBody.querySelectorAll("tr");

    rows.forEach(function(row) {

        const productCode = row.cells[0].textContent.toLowerCase();
        const productName = row.cells[1].textContent.toLowerCase();
        const productCategory = row.cells[2].textContent;

        const matchesSearch =
            productName.includes(searchValue) ||
            productCode.includes(searchValue);

        const matchesCategory =
            selectedCategory === "" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}