// Extract queryFeatures from arcgis-rest-feature-layer UMD module
const { queryFeatures } = arcgisRestFeatureLayer;

document.getElementById('idForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = parseFloat(document.getElementById("idNumber").value);

  if (isNaN(id)) {
    document.getElementById("results").innerHTML = "❌ Please enter a valid ID number.";
    return;
  }

  document.getElementById("results").innerHTML = "🔍 Searching...";

  queryFeatures({
    url: "https://services7.arcgis.com/2QnOkWUxsp4IWuaT/arcgis/rest/services/SOKONI_CADASTRE_WFL1/FeatureServer/0",
    where: `ID = ${id}`,  // Update this field name if necessary
    outFields: [
      "Parcel", "Block_No", "SHAPE__Length", "SHAPE__Area", "Land_Owner", "Contact",
      "Land_Value", "Rate", "Rate_Paid", "Rate_Balance", "Date_Paid", "Land_Use"
    ],
    returnGeometry: false,
    f: "json"
  }).then(response => {
    if (response.features.length === 0) {
      document.getElementById("results").innerHTML = "❌ No parcel found for that ID.";
    } else {
      const attrs = response.features[0].attributes;
      let table = `<table><tr><th>Field</th><th>Value</th></tr>`;
      for (const key in attrs) {
        table += `<tr><td>${key}</td><td>${attrs[key]}</td></tr>`;
      }
      table += "</table>";
      document.getElementById("results").innerHTML = table;
    }
  }).catch(error => {
    console.error("Query error:", error);
    document.getElementById("results").innerHTML = "❌ Error fetching data.";
  });
});
