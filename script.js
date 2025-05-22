const form = document.getElementById("lookup-form");
const resultsDiv = document.getElementById("results");
const loading = document.getElementById("loading");
const downloadBtn = document.getElementById("download");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const idNumber = document.getElementById("idNumber").value;
  resultsDiv.innerHTML = "";
  loading.style.display = "block";
  downloadBtn.style.display = "none";

  const apiKey = "AAPTxy8BH1VEsoebNVZXo8HurDOX8MVyCb_dbn99eZGxwizKZdHxKriGoodAC-X1Tio6BtM0bNqcepyh1pm2JEnP2KpMyoiJvEJWpIseZuE3H6mzuYqo35u3EKAAgTEwkLAD_HWpEL4PZ9vxuZM46UJGf20IKVsa89aQ9HjeeAyPen43Bp7pr_epR9YcfsoaO1FxksPrp3I8fEGEsO3PhYDxiaEvytU0Xh_tN6jAQ-RlWMTtZlt6Fc20zZqNXEjZtEn2AT1_IUAjw0JB";
  const layerUrl = "https://services7.arcgis.com/2QnOkWUxsp4IWuaT/arcgis/rest/services/SOKONI_CADASTRE_WFL1/FeatureServer";

  const { ApiKeyManager } = arcgisRest;
  const { queryFeatures } = arcgisRest.featureLayer;

  const authentication = ApiKeyManager.fromKey(apiKey);

  queryFeatures({
    url: layerUrl,
    where: `ID = ${idNumber}`, // no quotes for Double
    outFields: [
      "Parcel", "Block_No", "SHAPE__Length", "SHAPE__Area", "Land_Owner",
      "Contact", "Land_Value", "Rate", "Rate_Paid", "Rate_Balance",
      "Date_Paid", "Land_Use"
    ],
    authentication
  })
    .then((response) => {
      loading.style.display = "none";
      if (response.features.length === 0) {
        resultsDiv.innerHTML = "<p>No parcel found for this ID.</p>";
        return;
      }

      const f = response.features[0].attributes;

      const formatNumber = (num) => {
        return num ? Number(num).toLocaleString() : "N/A";
      };

      const tableHTML = `
        <h3>Parcel Details</h3>
        <table id="parcelTable">
          <tr><th>Field</th><th>Value</th></tr>
          <tr><td>Parcel</td><td>${f.Parcel}</td></tr>
          <tr><td>Block No</td><td>${f.Block_No}</td></tr>
          <tr><td>Length</td><td>${formatNumber(f.SHAPE__Length)}</td></tr>
          <tr><td>Area</td><td>${formatNumber(f.SHAPE__Area)}</td></tr>
          <tr><td>Land Owner</td><td>${f.Land_Owner}</td></tr>
          <tr><td>Contact</td><td>${f.Contact}</td></tr>
          <tr><td>Land Value</td><td>${formatNumber(f.Land_Value)}</td></tr>
          <tr><td>Rate</td><td>${formatNumber(f.Rate)}</td></tr>
          <tr><td>Rate Paid</td><td>${formatNumber(f.Rate_Paid)}</td></tr>
          <tr><td>Rate Balance</td><td>${formatNumber(f.Rate_Balance)}</td></tr>
          <tr><td>Date Paid</td><td>${f.Date_Paid}</td></tr>
          <tr><td>Land Use</td><td>${f.Land_Use}</td></tr>
        </table>
      `;

      resultsDiv.innerHTML = tableHTML;
      downloadBtn.style.display = "inline-block";
    })
    .catch((err) => {
      loading.style.display = "none";
      console.error(err);
      resultsDiv.innerHTML = "<p>Error fetching parcel details.</p>";
    });
});

// PDF Download Function
downloadBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Parcel Details", 14, 15);
  doc.autoTable({ html: '#parcelTable', startY: 20 });
  doc.save("parcel_details.pdf");
});

