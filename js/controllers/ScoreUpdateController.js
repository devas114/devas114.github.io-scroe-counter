angular.module('ScoreCounter').controller("scoreCtrl", ["$scope", function($scope){
	$scope.initBatch = function(){
		$scope.batch = {
			winner: null,
			score_get: ['','','','']
		};
	};
	$scope.initBatch();
}]);
