var app = angular.module("myApp", ["ngRoute","chart.js"]);
app.config(function ($routeProvider){
	$routeProvider
	.when("/listing",{
		//controller:"listingController",
		templateUrl:"listing.html",
		contoller:"myCtrl"
		
	})
	.when("/details/:schemeCode",{
		templateUrl:"details.html",
		contoller:"detailCtrl"
	})
	.when("/graph",{
		templateUrl:"graph.html",
		contoller:"graphController"
	})	
})
.config(['ChartJsProvider',function(ChartJsProvider){
	ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts 
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
}]);