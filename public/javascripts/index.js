
// Music Data constructor for all IDs
function Music(pStoreID, pSalesPersonID, pCdID, pPricePaid, pHourPurch, pDayPurch) 
{
    this.storeID= pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.hourPurch = pHourPurch;
    this.dayPurch = pDayPurch;
}

  // our local copy of the cloud data
  var ClientNotes = [];  

  // our local psuedotime
  var hour = 0;
  var day = 0;

    // Create Button
    function CreateRandom()
    {
        if (hour < 23) 
        {
            var randomTime = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            hour = hour + randomTime;
        }
        else
        {
            hour = 0;
            day++;
        } 

        var aStoreID = document.getElementById("StoreID").value;
        var aSalesPersonID = document.getElementById("SalesPersonID").value;
        var aCdID = document.getElementById("CdID").value;
        var aPricePaid = document.getElementById("PricePaid").value;
        var aHourPurch = hour;
        var aDayPurch = day;

        var salespersonIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
        var storeIds = [98053,98053,98053,98053,98007,98007,98007,98007,98077,98077,98077,98077,98055,98055,98055,98055,98011,98011,98011,98011,98046,98046,98046,98046];
        var cds = [123456,123654,321456,321654,654123,654321,543216,354126,621453,623451]
        var prices = [5,6,7,8,9,10,11,12,13,14,15]

        const randomPerson = salespersonIds[Math.floor(Math.random() * salespersonIds.length)];
        const randomStore = storeIds[(randomPerson.valueOf() -1)];
        const randomCD = cds[Math.floor(Math.random() * cds.length)];
        const randomPrice = prices[Math.floor(Math.random() * prices.length)];

        rStoreID = randomStore;
        rSalesPersonID = randomPerson;
        rCdID = randomCD;
        rPricePaid = randomPrice;

        document.getElementById("StoreID").value = rStoreID;
        document.getElementById("SalesPersonID").value = rSalesPersonID;
        document.getElementById("CdID").value = rCdID;
        document.getElementById("PricePaid").value = rPricePaid;

        console.log("Store ID: " + randomStore);
        console.log("SalesPerson ID: " + randomPerson);
        console.log("CdID: " + randomCD);
        console.log("PricePaid: " + randomPrice);
        console.log("Hour Purchased: "+ aHourPurch );
        console.log("Day Purchased: " + aDayPurch);
        console.log("");
    }


    // Submit 1 Button
    function Submit1() 
    {
        var tStoreID = document.getElementById("StoreID").value;
        var tSalesPersonID = document.getElementById("SalesPersonID").value;
        var tCdID = document.getElementById("CdID").value;
        var tPricePaid = document.getElementById("PricePaid").value;
        var tHourPurch = hour;
        var tDayPurch = day;
        
        var oneMusic = new Music(tStoreID, tSalesPersonID, tCdID, tPricePaid, tHourPurch, tDayPurch);
        console.log(oneMusic);

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

    const timer = ms => new Promise(res => setTimeout(res, ms))

    //Submit 500 Button
    async function Submit500()
    {
        for (let index = 0; index < 500; index++) {
            CreateRandom();
            Submit1();
            await timer(600);
        }
    }

    


