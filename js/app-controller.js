app.controller('myCtrl', function ($scope, $http, $location, $routeParams, myAppServicePDF) {
	$http.get("http://nextgenbank-techcielo.rhcloud.com/nav/fundType/all").then(
		function (response) {
			$scope.fundTypeList = response.data;
		});

	$scope.searchFundHouseForType = function () {
		myAppServicePDF.searchFundsHouseForType($scope.selectedFundType).then(function (result) {
			console.log(result);
			$scope.fundHouseList = result.data;
		});
	}
	$scope.searchFundsForHouseAndType = function () {
		myAppServicePDF.searchFundsForHouseAndType($scope.selectedFundHouse, $scope.selectedFundType).then(function (result) {
			console.log("Got list of funds for House and Type");
			$scope.navList = result.data;
			$location.path("listing");
		});
	};
})
	.controller('detailCtrl', function ($scope, $http, $filter, $routeParams) {
		$http.get("http://nextgenbank-techcielo.rhcloud.com/nav/schemeCode/" + $routeParams.schemeCode).then(function (response) {
			var respData = response.data[0];
			var lablesArr = [];
			var priceArr = [];
			$scope.schemeName = respData.schemeName;
			$scope.fundPriceList = respData.fundPriceList;
			for (i = 0; i < respData.fundPriceList.length; i++) {
				var date = new Date(respData.fundPriceList[i].fundPK.prc_date);
				console.log(date.toLocaleDateString('de-DE', {month:'short', year:'numeric'}));
				lablesArr.push(i);
				priceArr.push(respData.fundPriceList[i].navVal);
			}
			$scope.lablesArr = lablesArr;
			$scope.priceArr = priceArr;
		});
		$scope.schemeCode = $routeParams.schemeCode;
		$scope.fundPriceList = $routeParams.fundPriceList;

		$scope.options = {
			scales: {
				yAxes: [
					{
						id: 'y-axis-1',
						type: 'linear',
						display: true,
						position: 'left'
					}
				]
			}
		}


	})
	.controller('graphController', function ($scope, graphService) {
		console.log("Getting data for graph");
		graphService.getResults().then(function (result) {
			console.log("Set graph data:" + result);
			$scope.labels = result.labels;
			$scope.data = result.data;
			$scope.options = {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	})
	;
