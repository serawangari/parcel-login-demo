async function checkParcel() {
  const idNumber = document.getElementById("idNumber").value;
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = "";

  if (!idNumber) {
    errorDiv.textContent = "Please enter your ID number.";
    return;
  }

  const url = "https://services.arcgis.com/YOUR_ORG/arcgis/rest/services/Parcels/FeatureServer/0/query";
  const params = new URLSearchParams({
    where: `ID='${idNumber}'`,
    outFields: '*',
    f: 'json'
  });

  try {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    if (data.features.length > 0) {
      sessionStorage.setItem("parcelData", JSON.stringify(data.features[0].attributes));
      window.location.href = "dashboard.html";
    } else {
      errorDiv.textContent = "No parcel found for this ID number.";
    }
  } catch (err) {
    errorDiv.textContent = "Error connecting to parcel database.";
    console.error(err);
  }
}
