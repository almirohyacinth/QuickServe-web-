document.addEventListener("DOMContentLoaded", function () {

  // Show/Hide sections 
  const showSection = (sectionId) => { 
      document.querySelectorAll('.content-section').forEach(section => { 
          section.style.display = 'none'; 
      }); 
      document.getElementById(sectionId).style.display = 'block'; 
  };

  // Event listeners for navigation buttons 
  document.querySelectorAll('.button').forEach(button => { 
      button.addEventListener('click', function () { 
          const sectionId = this.getAttribute('onclick').split("'")[1]; 
          showSection(sectionId); 
      }); 
  });

  // Notification Bell Handling
  const notificationBell = document.getElementById("notificationBell");
  const notificationSection = document.getElementById("notifications");
  notificationBell.addEventListener("click", function () {
      showSection("notifications");
  });

  // Logout icon click event 
  document.getElementById('logoutIcon').addEventListener('click', function () { 
      console.log('Logging out...'); 
      window.location.href = 'mainIndex.html'; // Redirect to login page 
  });

  // Handling status buttons in Order Section
  const statusButtons = document.querySelectorAll(".status"); 

  statusButtons.forEach(button => { 
      button.addEventListener("click", function() { 
          if (button.classList.contains("preparing")) { 
              button.classList.remove("preparing"); 
              button.classList.add("ready"); 
              button.textContent = "Ready"; 
          } else if (button.classList.contains("ready")) { 
              button.classList.remove("ready"); 
              button.classList.add("claimed"); 
              button.textContent = "Claimed"; 
          } else if (button.classList.contains("claimed")) { 
              button.classList.remove("claimed"); 
              button.classList.add("preparing"); 
              button.textContent = "Preparing"; 
          } 
      }); 
  });

  // Handling availability buttons in Menu Section
  document.querySelectorAll(".availability").forEach(button => {
      button.addEventListener("click", function() {
          if (button.classList.contains("available")) {
              button.classList.remove("available");
              button.classList.add("not-available");
              button.textContent = "Not Available";
          } else {
              button.classList.remove("not-available");
              button.classList.add("available");
              button.textContent = "Available";
          }
      });
  });

  // Handling inventory status buttons in Inventory Section
  document.querySelectorAll(".inventory-status").forEach(button => {
      button.addEventListener("click", function() {
          if (button.classList.contains("high")) {
              button.classList.remove("high");
              button.classList.add("low");
              button.textContent = "Low";
          } else {
              button.classList.remove("low");
              button.classList.add("high");
              button.textContent = "High";
          }
      });
  });

  // Handling delete buttons in Inventory Section
  document.querySelectorAll(".delete-item-btn").forEach(button => {
      button.addEventListener("click", function() {
          const item = button.closest(".inventory-item");
          if (item) {
              item.remove();
          }
      });
  });

  // Utility function to toggle payment status
  function togglePaymentStatus(button) {
      if (button.classList.contains("paid")) {
          button.classList.remove("paid");
          button.classList.add("not-paid");
          button.textContent = "Not Paid";
      } else {
          button.classList.remove("not-paid");
          button.classList.add("paid");
          button.textContent = "Paid";
      }
  }

  // Add event listener for payment status buttons
  document.querySelectorAll(".payment-status").forEach(button => {
      button.addEventListener("click", function() {
          togglePaymentStatus(button);
      });
  });

  // Add Item Modal Handling
  const addItemModal = document.getElementById("addItemModal");
  const addItemForm = document.getElementById("addItemForm");

  document.querySelector(".add-item-btn").addEventListener("click", () => {
      addItemModal.style.display = "block";
  });

  addItemModal.querySelectorAll(".close-btn, .cancel-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
          addItemModal.style.display = "none";
      });
  });

  window.addEventListener("click", (event) => {
      if (event.target === addItemModal) {
          addItemModal.style.display = "none";
      }
  });

  // Add Item Form Submission
  addItemForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Input Validation
      const itemName = document.getElementById("itemName").value.trim();
      const itemPrice = document.getElementById("itemPrice").value.trim();
      const itemImage = document.getElementById("itemImage").value.trim();

      if (!itemName || !itemPrice || !itemImage || isNaN(itemPrice)) {
          alert("Please fill out all fields correctly.");
          return;
      }

      // Create Menu Item
      const menuSection = document.querySelector("#menu");
      const newItem = document.createElement("div");
      newItem.classList.add("menu-item");
      newItem.innerHTML = `
          <img src="${itemImage}" alt="${itemName}" class="item-image">
          <div class="item-details">
              <h3>${itemName}</h3>
              <p class="price"> ₱${itemPrice}</p>
              <p>Sold: 0</p>
              <button class="availability available">Available</button>
              <button class="delete-item-btn">Delete</button>
          </div>
      `;
      menuSection.appendChild(newItem);

      // Add event listener for the availability button
      newItem.querySelector(".availability").addEventListener("click", function() {
          if (this.classList.contains("available")) {
              this.classList.remove("available");
              this.classList.add("not-available");
              this.textContent = "Not Available";
          } else {
              this.classList.remove("not-available");
              this.classList.add("available");
              this.textContent = "Available";
          }
      });

      // Create Inventory Item
      const inventorySection = document.querySelector("#inventory");
      const newInventoryItem = document.createElement("div");
      newInventoryItem.classList.add("inventory-item");
      newInventoryItem.innerHTML = `
          <img src="${itemImage}" alt="${itemName}" class="item-image">
          <div class="item-details">
              <h3>${itemName}</h3>
              <p class="stocks">Stocks: 50</p> 
              <button class="inventory-status high">High</button>
              <button class="delete-item-btn">Delete</button>
          </div>
      `;
      inventorySection.appendChild(newInventoryItem);

      // Add event listener for the inventory status button
      newInventoryItem.querySelector(".inventory-status").addEventListener("click", function() {
          if (this.classList.contains("high")) {
              this.classList.remove("high");
              this.classList.add("low");
              this.textContent = "Low";
          } else {
              this.classList.remove("low");
              this.classList.add("high");
              this.textContent = "High";
          }
      });

      // Add event listener for the delete button 
      newInventoryItem.querySelector('.delete-item-btn').addEventListener('click', function () { 
          newInventoryItem.remove(); 
      });

      // Reset and Close Modal
      addItemForm.reset();
      addItemModal.style.display = "none";
  });

  // Edit Stocks Modal Handling
  const editStocksModal = document.getElementById("editStocksModal");
  const editStocksForm = document.getElementById("editStocksForm");

  document.addEventListener("click", function (event) {
      if (event.target.classList.contains("edit-stocks-btn")) {
          editStocksModal.style.display = "block";
      }
  });

  editStocksModal.querySelectorAll(".close-btn, .cancel-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
          editStocksModal.style.display = "none";
      });
  });

  window.addEventListener("click", (event) => {
      if (event.target === editStocksModal) {
          editStocksModal.style.display = "none";
      }
  });

  // Handle form submissions
  document.getElementById('addItemForm').addEventListener('submit', function (event) {
      event.preventDefault(); 
      const itemName = document.getElementById('itemName').value; 
      
      // Check if item already exists 
      const existingItem = [...document.querySelectorAll('.menu-item')].find(item => { 
          return item.querySelector('h3').textContent === itemName; 
      }); 
      
      if (existingItem) { 
          alert('Item already exists'); 
      } else { 
          // Handle form submission for adding new item 
          modal('addItemModal', 'none'); 
      } 
  });

  document.getElementById('editStocksForm').addEventListener('submit', function (event) { 
      event.preventDefault(); 
         // Edit Stocks Modal Handling
      const editStocksModal = document.getElementById("editStocksModal");
      const editStocksForm = document.getElementById("editStocksForm");
  
      document.addEventListener("click", function (event) {
          if (event.target.classList.contains("edit-stocks-btn")) {
              editStocksModal.style.display = "block";
          }
      });
  
      editStocksModal.querySelectorAll(".close-btn, .cancel-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
              editStocksModal.style.display = "none";
          });
      });
  
      window.addEventListener("click", (event) => {
          if (event.target === editStocksModal) {
              editStocksModal.style.display = "none";
          }
      });
  
      // Handle form submissions
      document.getElementById('addItemForm').addEventListener('submit', function (event) {
          event.preventDefault(); 
          const itemName = document.getElementById('itemName').value; 
          
          // Check if item already exists 
          const existingItem = [...document.querySelectorAll('.menu-item')].find(item => { 
              return item.querySelector('h3').textContent === itemName; 
          }); 
          
          if (existingItem) { 
              alert('Item already exists'); 
          } else { 
              // Handle form submission for adding new item 
              modal('addItemModal', 'none'); 
          } 
      });
  
      document.getElementById('editStocksForm').addEventListener('submit', function (event) { 
          event.preventDefault(); 
          // Handle form submission for editing stocks 
          const itemName = document.getElementById('stkItemName').value; 
          const newStocks = document.getElementById('newStocks').value; 
          
          // Find the inventory item to update 
          const inventoryItem = [...document.querySelectorAll('.inventory-item')].find(item => { 
              return item.querySelector('h3').textContent === itemName; 
          }); 
          
          if (inventoryItem) { 
              inventoryItem.querySelector('.stocks').textContent = `Stocks: ${newStocks}`; 
              document.getElementById('editStocksModal').style.display = 'none'; // Close the modal after updating stocks 
          } else { 
              alert('Item not found in inventory.'); 
          } 
      });
  });
});
  