const authentication = arcgisRest.ApiKeyManager.fromKey("AAPTxy8BH1VEsoebNVZXo8HurDOX8MVyCb_dbn99eZGxwizKZdHxKriGoodAC-X1Tio6BtM0bNqcepyh1pm2JEnP2KpMyoiJvEJWpIseZuE3H6mzuYqo35u3EKAAgTEwkLAD_HWpEL4PZ9vxuZM46UJGf20IKVsa89aQ9HjeeAyPen43Bp7pr_epR9YcfsoaO1FxksPrp3I8fEGEsO3PhYDxiaEvytU0Xh_tN6jAQ-RlWMTtZlt6Fc20zZqNXEjZtEn2AT1_IUAjw0JB");

  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = parseFloat(document.getElementById("idNumber").value); // ID as double

    arcgisRestFeatureLayer.queryFeatures({
      url: "https://services7.arcgis.com/2QnOkWUxsp4IWuaT/arcgis/rest/services/SOKONI_CADASTRE_WFL1/FeatureServer/0",
      where: `ID = ${id}`,
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
