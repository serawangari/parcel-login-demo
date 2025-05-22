document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("id-input").value;
  const resultsDiv = document.getElementById("results-container");
  resultsDiv.innerHTML = "Searching...";

  const apiKey = "AAPTxy8BH1VEsoebNVZXo8HurDOX8MVyCb_dbn99eZGxwizKZdHxKriGoodAC-X1Tio6BtM0bNqcepyh1pm2JEnP2KpMyoiJvEJWpIseZuE3H6mzuYqo35u3EKAAgTEwkLAD_HWpEL4PZ9vxuZM46UJGf20IKVsa89aQ9HjeeAyPen43Bp7pr_epR9YcfsoaO1FxksPrp3I8fEGEsO3PhYDxiaEvytU0Xh_tN6jAQ-RlWMTtZlt6Fc20zZqNXEjZtEn2AT1_IUAjw0JB"; // Replace with your actual key
  const url = "https://services7.arcgis.com/2QnOkWUxsp4IWuaT/arcgis/rest/services/SOKONI_CADASTRE_WFL1/FeatureServer/0"; // Replace with actual URL

  const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);

  arcgisRestFeatureLayer.queryFeatures({
    url,
    where: `ID = ${id}`,
    outFields: [
      "Parcel", "Block_No", "SHAPE__Length", "SHAPE__Area", "Land_Owner",
      "Contact", "Land_Value", "Rate", "Rate_Paid", "Rate_Balance", 
      "Date_Paid", "Land_Use"
    ],
    authentication: authentication,
    returnGeometry: false
  }).then((response) => {
    if (response.features.length > 0) {
      displayResults(response.features);
    } else {
      resultsDiv.innerHTML = "No data found.";
    }
  }).catch((err) => {
    console.error("Query failed:", err);
    resultsDiv.innerHTML = "Error fetching parcel data.";
  });
});

function displayResults(features) {
  const container = document.getElementById("results-container");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Parcel</th><th>Block No</th><th>Length</th><th>Area</th>
      <th>Owner</th><th>Contact</th><th>Value</th><th>Rate</th>
      <th>Paid</th><th>Balance</th><th>Date Paid</th><th>Land Use</th>
    </tr>
  `;

  features.forEach(({ attributes }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${attributes.Parcel}</td>
      <td>${attributes.Block_No}</td>
      <td>${attributes.SHAPE__Length}</td>
      <td>${attributes.SHAPE__Area}</td>
      <td>${attributes.Land_Owner}</td>
      <td>${attributes.Contact}</td>
      <td>${attributes.Land_Value}</td>
      <td>${attributes.Rate}</td>
      <td>${attributes.Rate_Paid}</td>
      <td>${attributes.Rate_Balance}</td>
      <td>${attributes.Date_Paid}</td>
      <td>${attributes.Land_Use}</td>
    `;
    table.appendChild(row);
  });

  container.appendChild(table);
}


