
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


    // Submit 1 Button
    function Submit1() {
        var tStoreID = document.getElementById("StoreID").value;
        var tSalesPersonID = document.getElementById("SalesPersonID").value;
        var tCdID = document.getElementById("CdID").value;
        var tPricePaid = document.getElementById("PricePaid").value;
        var tHourPurch = GetHour();
        var tDayPurch = GetDay();
        //possibly add the hourPurch and dayPurch here too
        
        var oneMusic = new Music(tStoreID, tSalesPersonID, tCdID, tPricePaid, tHourPurch, tDayPurch);
        console.log(oneMusic);

        // Fill out
        function GetHour()
        {
            return 1;
        }

        // Fill out
        function GetDay()
        {
            return 1;
        }

        $.ajax({
            url: '/NewMusic' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneMusic),
            success: function (result) {
                console.log("added new music data!")
            }
        });
    }

    


