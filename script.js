const authentication = arcgisRest.ApiKeyManager.fromKey("YOUR_API_KEY_HERE");

  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = parseFloat(document.getElementById("idNumber").value); // ID as double

    arcgisRestFeatureLayer.queryFeatures({
      url: "https://services7.arcgis.com/2QnOkWUxsp4IWuaT/arcgis/rest/services/SOKONI_CADASTRE_WFL1/FeatureServer/0",
      where: `ID_Number = ${id}`,
      outFields: [
        "Parcel", "Block_No", "SHAPE__Length", "SHAPE__Area", "Land_Owner", "Contact",
        "Land_Value", "Rate", "Rate_Paid", "Rate_Balance", "Date_Paid", "Land_Use"
      ],
      authentication: authentication,
      returnGeometry: false,
      f: "json"
    }).then(response => {
      // handle results (e.g. show in a table)
    }).catch(error => {
      console.error("Error:", error);
    });
  });
