angular.module('myApp').factory('myAppServicePDF', function ($http) {
	return {
		searchFundsForHouseAndType: function (fundHouse, fundType) {
			var url = "http://nextgenbank-techcielo.rhcloud.com/nav/fundType/" + fundType + "/fundHouse/" + fundHouse;
			alert(url);
			return $http.get(url).then(function (response) {
				return response;
			});
		},
		searchFundsHouseForType: function (fundType) {
			var url = "http://nextgenbank-techcielo.rhcloud.com/nav/fundHouse/fundType/" + fundType;
			return $http.get(url).then(function (response) {
				return response;
			});
		}
	};
});
angular.module('myApp').factory('graphService', function ($http) {
	var service = {
		getResults: fnGetResults,
		processResults: fnProcessResults
	}
	return service;
	function fnGetResults() {
		var url = 'http://localhost/keyur/mf-app-fe/testresults.json';
		return $http.get(url).then(function (response) {
			return service.processResults(response.data);
		})
	}
	function fnProcessResults(result) {
		var labelsArr = [];
		var dataSet = [];
		for (i = 0; i < result.length; i++) {
			labelsArr.push("Test " + result[i].testid);
			dataSet.push(result[i].result);
		}
		var resp = { labels: labelsArr, label: "Test Scores", data: dataSet, borderWidth: 1 };
		return resp;
	}

});