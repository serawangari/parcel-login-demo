async function checkParcel() {
  const idNumber = document.getElementById("idNumber").value.trim();
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = "";

  if (!idNumber) {
    errorDiv.textContent = "Please enter your ID number.";
    return;
  }

  // ArcGIS REST JS Configuration
  const apiKey = "AAPTxy8BH1VEsoebNVZXo8HurDOX8MVyCb_dbn99eZGxwizKZdHxKriGoodAC-X1Tio6BtM0bNqcepyh1pm2JEnP2KpMyoiJvEJWpIseZuE3H6mzuYqo35u3EKAAgTEwkLAD_HWpEL4PZ9vxuZM46UJGf20IKVsa89aQ9HjeeAyPen43Bp7pr_epR9YcfsoaO1FxksPrp3I8fEGEsO3PhYDxiaEvytU0Xh_tN6jAQ-RlWMTtZlt6Fc20zZqNXEjZtEn2AT1_IUAjw0JB"; // Replace with your API key
  const featureLayerUrl = "https://services7.arcgis.com/2QnOkWUxsp4IWuaT/arcgis/rest/services/SOKONI_CADASTRE_WFL1/FeatureServer/0";

  try {
    // Query the feature layer using ArcGIS REST JS
    const response = await arcgisRest.queryFeatures({
      url: featureLayerUrl,
      where: `ID='${idNumber}'`, // Use exact field name
      outFields: ["*"],
      authentication: arcgisRest.ApiKeyManager.fromKey(apiKey)
    });

    console.log("API Response:", response); // Debugging

    if (response.features.length > 0) {
      sessionStorage.setItem("parcelData", JSON.stringify(response.features[0].attributes));
      window.location.href = "dashboard.html";
    } else {
      errorDiv.textContent = "No parcel found for this ID number.";
    }
  } catch (err) {
    errorDiv.textContent = "Error connecting to parcel database.";
    console.error("ArcGIS Error:", err);
  }
}
