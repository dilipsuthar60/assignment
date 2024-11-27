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
      //   editButton.addEventListener("click", () => this.editAnimal(index));

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

const bigCatsData = [
  {
    species: "Big Cats",
    name: "Tiger",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 10,
    location: "Asia",
  },
  {
    species: "Big Cats",
    name: "Lion",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 8,
    location: "Africa",
  },
  {
    species: "Big Cats",
    name: "Leopard",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 5,
    location: "Africa and Asia",
  },
  {
    species: "Big Cats",
    name: "Cheetah",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 5,
    location: "Africa",
  },
  {
    species: "Big Cats",
    name: "Caracal",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 3,
    location: "Africa",
  },
  {
    species: "Big Cats",
    name: "Jaguar",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 5,
    location: "Amazon",
  },
]; // Big Cats JSON
const dogsData = [
  {
    species: "Dog",
    name: "Rotwailer",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 2,
    location: "Germany",
  },
  {
    species: "Dog",
    name: "German Shepherd",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 2,
    location: "Germany",
  },
  {
    species: "Dog",
    name: "Labrodar",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 2,
    location: "UK",
  },
  {
    species: "Dog",
    name: "Alabai",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 4,
    location: "Turkey",
  },
]; // Dogs JSON
const bigFishData = [
  {
    species: "Big Fish",
    name: "Humpback Whale",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 15,
    location: "Atlantic Ocean",
  },
  {
    species: "Big Fish",
    name: "Killer Whale",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 12,
    location: "Atlantic Ocean",
  },
  {
    species: "Big Fish",
    name: "Tiger Shark",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 8,
    location: "Ocean",
  },
  {
    species: "Big Fish",
    name: "Hammerhead Shark",
    image:
      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
    size: 8,
    location: "Ocean",
  },
];
// Big Fish JSON
// Instantiate Tables
const bigCatsTable = new AnimalTable("big-cats", "Big Cats", bigCatsData, [
  "species",
  "name",
  "size",
  "location",
]);
bigCatsTable.renderTable();

const dogsTable = new AnimalTable("dogs", "Dogs", dogsData, [
  "name",
  "location",
]);

dogsTable.renderTable();

const bigFishTable = new AnimalTable(
  "big-fish",
  "Big Fish",
  bigFishData,
  ["size"],
  { bold: true, italic: true, blue: true }
);
bigFishTable.renderTable();
