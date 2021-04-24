
// Music Data constructor for all IDs
function Music(pStoreID, pSalesPersonID, pCdID, pPricePaid, pHourPurch, pDayPurch) {
    this.storeID= pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.hourPurch = pHourPurch;
    this.dayPurch = pDayPurch;
  }

  // our local copy of the cloud data
  var ClientNotes = [];  

  

// Create 1 Button
function CreateVal() {
    var tStoreID = document.getElementById("StoreID").value;
    var tSalesPersonID = document.getElementById("SalesPersonID").value;
    var tCdID = document.getElementById("CdID").value;
    var tPricePaid = document.getElementById("PricePaid").value;
    var oneCD = new Music(tStoreID, tSalesPersonID, tCdID, tPricePaid);
    //possibly add the hourPurch and dayPurch here too

    $.ajax({
        url: '/NewCD' ,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(oneCD),
        success: function (result) {
            console.log("added new music data!")
        }
    });
}
