import { bigFishData, dogsData, bigCatsData } from "./data.js";

class AnimalTable {
  tableId;
  title;
  jsonData;
  sortConfig;
  renderConfig;

  constructor(tableId, title, jsonData, sortConfig, renderConfig = {}) {
    this.tableId = tableId;
    this.title = title;
    this.jsonData = jsonData;
    this.sortConfig = sortConfig;
    this.renderConfig = renderConfig;
    this.currentSortOrder = {}; // To track sorting order for each column
  }

  renderTable() {
    const tableContainer = document.getElementById("table-container");
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "my-4";

    // Table
    const table = document.createElement("table");
    table.id = this.tableId;
    table.className = "table table-striped table-bordered";

    // Header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Species", "Name", "image", "Size", "Location", "Actions"].forEach(
      (col) => {
        const th = document.createElement("th");
        th.textContent = col;
        if (this.sortConfig.includes(col.toLowerCase())) {
          th.classList.add("sortable");
          th.style.cursor = "pointer";
          th.addEventListener("click", () => this.sortTable(col.toLowerCase()));
        }
        headerRow.appendChild(th);
      }
    );
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement("tbody");
    this.jsonData.forEach((animal, index) => {
      const row = document.createElement("tr");

      // Render each column
      Object.entries(animal).forEach(([key, value]) => {
        const td = document.createElement("td");
        if (key === "name" && this.renderConfig) {
          td.innerHTML = `<span class="${
            this.renderConfig.blue ? "blue-text" : ""
          }">${value}</span>`;
        } else if (key == "image") {
          console.log("======", value);
          td.innerHTML = `<img src="${value}" class="image hover-image" alt="Animal Image">`;
        } else if (key == "size") {
          td.textContent = `${value} ft`;
        } else {
          td.textContent = value;
        }
        row.appendChild(td);
      });

      // Actions
      const actionTd = document.createElement("td");
      // Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger btn-sm mx-1";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => this.deleteAnimal(index));

      // Edit Button
      const editButton = document.createElement("button");
      editButton.className = "btn btn-warning btn-sm mx-1";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => this.editAnimal(index));

      actionTd.appendChild(deleteButton);
      actionTd.appendChild(editButton);
      row.appendChild(actionTd);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableWrapper.appendChild(table);
    tableContainer.appendChild(tableWrapper);
  }
  deleteAnimal(index) {
    if (confirm("Are you sure you want to delete this animal?")) {
      this.jsonData.splice(index, 1); // Remove animal from the lis
      this.renderInsideTableContain();
    }
  }
  editAnimal(index) {
    const animal = this.jsonData[index]; // Get the selected animal

    // Create Bootstrap Modal
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "editModal";
    modal.tabIndex = "-1";
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Animal</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="editForm">
              <div class="mb-3">
                <label for="edit-species" class="form-label">Species</label>
                <input type="text" class="form-control" id="edit-species" value="${animal.species}" />
              </div>
              <div class="mb-3">
                <label for="edit-name" class="form-label">Name</label>
                <input type="text" class="form-control" id="edit-name" value="${animal.name}" />
              </div>
              <div class="mb-3">
                <label for="edit-image" class="form-label">Image URL</label>
                <input type="text" class="form-control" id="edit-image" value="${animal.image}" />
              </div>
              <div class="mb-3">
                <label for="edit-size" class="form-label">Size (ft)</label>
                <input type="number" class="form-control" id="edit-size" value="${animal.size}" />
              </div>
              <div class="mb-3">
                <label for="edit-location" class="form-label">Location</label>
                <input type="text" class="form-control" id="edit-location" value="${animal.location}" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="save-edit">Save Changes</button>
          </div>
        </div>
      </div>
    `;

    // Append Modal to Body
    document.body.appendChild(modal);

    // Initialize Bootstrap Modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    // Save Changes
    document.getElementById("save-edit").addEventListener("click", () => {
      const updatedAnimal = {
        species: document.getElementById("edit-species").value,
        name: document.getElementById("edit-name").value,
        image: document.getElementById("edit-image").value,
        size: parseFloat(document.getElementById("edit-size").value),
        location: document.getElementById("edit-location").value,
      };

      // Update the JSON data
      this.jsonData[index] = updatedAnimal;

      // Hide and remove modal
      bootstrapModal.hide();
      modal.remove();

      // Re-render the table
      this.renderInsideTableContain();
    });

    // Remove modal from DOM after hiding
    modal.addEventListener("hidden.bs.modal", () => {
      modal.remove();
    });
  }
  renderInsideTableContain() {
    // Get the table's tbody element
    const table = document.getElementById(this.tableId);
    const tbody = table.querySelector("tbody");

    // Clear the existing tbody rows
    tbody.innerHTML = "";

    // Re-render the sorted rows
    this.jsonData.forEach((animal, index) => {
      const row = document.createElement("tr");

      // Render each column
      Object.entries(animal).forEach(([key, value]) => {
        const td = document.createElement("td");
        console.log("key and value", key, value);
        if (key === "name" && this.renderConfig) {
          td.innerHTML = `<span class="${
            this.renderConfig.blue ? "blue-text" : ""
          }">${value}</span>`;
        } else if (key == "image") {
          console.log("======", value);
          td.innerHTML = `<img src="${value}" class="image hover-image" alt="Animal Image">`;
        } else if (key == "size") {
          td.textContent = `${value} ft`;
        } else {
          td.textContent = value;
        }
        row.appendChild(td);
      });

      // Actions
      const actionTd = document.createElement("td");
      // Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger btn-sm mx-1";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => this.deleteAnimal(index));

      // Edit Button
      const editButton = document.createElement("button");
      editButton.className = "btn btn-warning btn-sm mx-1";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => this.editAnimal(index));

      actionTd.appendChild(deleteButton);
      actionTd.appendChild(editButton);
      row.appendChild(actionTd);

      tbody.appendChild(row);
    });
  }
  sortTable(column) {
    // Determine sort order for the column
    const currentOrder = this.currentSortOrder[column] || "asc";
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    this.currentSortOrder[column] = newOrder;

    this.jsonData.sort((a, b) => {
      if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
      if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
      return 0;
    });
    this.renderInsideTableContain();
  }
}

// Instantiate Big Cats Tables
const bigCatsTable = new AnimalTable("big-cats", "Big Cats", bigCatsData, [
  "species",
  "name",
  "size",
  "location",
]);
bigCatsTable.renderTable();


// Instantiate Dogs Tables
const dogsTable = new AnimalTable("dogs", "Dogs", dogsData, [
  "name",
  "location",
]);
dogsTable.renderTable();

// Instantiate Bigs Fish Tables
const bigFishTable = new AnimalTable(
  "big-fish",
  "Big Fish",
  bigFishData,
  ["size"],
  { bold: true, italic: true, blue: true }
);
bigFishTable.renderTable();
