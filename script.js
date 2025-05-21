async function checkParcel() {
  const idNumber = document.getElementById("idNumber").value;
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = "";

  if (!idNumber) {
    errorDiv.textContent = "Please enter your ID number.";
    return;
  }

  // Replace with your Feature Layer details
  const featureLayerUrl = "https://services7.arcgis.com/2QnOkWUxsp4IWuaT/arcgis/rest/services/SOKONI_CADASTRE_WFL1/FeatureServer/0"; // Note the "/0" for the first layer
  const params = new URLSearchParams({
    where: `ID='${idNumber}'`, // Replace "IDNumber" with your actual field name
    outFields: '*', // Return all fields
    f: 'json' // Response format
  });

  try {
    const response = await fetch(`${featureLayerUrl}/query?${params}`);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      sessionStorage.setItem("parcelData", JSON.stringify(data.features[0].attributes));
      window.location.href = "dashboard.html";
    } else {
      errorDiv.textContent = "No parcel found for this ID number.";
    }
  } catch (err) {
    errorDiv.textContent = "Error connecting to the parcel database.";
    console.error("ArcGIS Error:", err);
  }
}
