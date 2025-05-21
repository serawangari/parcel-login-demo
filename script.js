async function checkParcel() {
  const idNumber = document.getElementById("idNumber").value;
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = "";

  if (!idNumber) {
    errorDiv.textContent = "Please enter your ID number.";
    return;
  }

  const featureLayerUrl = "https://services7.arcgis.com/2QnOkWUxsp4IWuaT/arcgis/rest/services/SOKONI_CADASTRE_WFL1/FeatureServer/0";
  const params = new URLSearchParams({
    where: `ID='${idNumber}'`, // Use correct field name
    outFields: '*',
    f: 'json',
    token: '3NKHt6i2urmWtqOuugvr9UMm2p1e3MFoJLiRuL07Loq8jd2jmQlI675K_ae72BaSWoWx3P1HLbYZ9w9G1Sb2K-OzXCI85LBMYXGslszRVYAG-bhtBg7tNC_mPUuMRYzK' // API key added here
  });

  try {
    const response = await fetch(`${featureLayerUrl}/query?${params}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    
    const data = await response.json();
    if (data.features?.length > 0) {
      sessionStorage.setItem("parcelData", JSON.stringify(data.features[0].attributes));
      window.location.href = "dashboard.html";
    } else {
      errorDiv.textContent = "No parcel found for this ID number.";
    }
  } catch (err) {
    errorDiv.textContent = "Error connecting to parcel database.";
    console.error("ArcGIS Error:", err);
  }
}
