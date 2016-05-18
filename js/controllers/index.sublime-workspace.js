angular.module('ScoreCounter',[]).controller('ScoreController', ['$scope', function($scope){
	$scope.score = {
		users:{
			0: null,
			1: null,
			2: null,
			3: null
		},
		total:{},
		history:[]
	};

	$scope.batch = {
		winner: null,
		score_get:['','','','']
	};

	$scope.initBatch = function(){
		var a = 'name-' + $scope.batch.winner;
		jQuery(a).prop('disabled', false);
		$scope.batch = {
			winner: null,
			score_get:['','','','']
		};
	};

	$scope.processBatch = function(){
		var sum = 0;
		for(var i=0; i<4; i++){
			if(i != $scope.batch.winner){
				var a = parseInt($scope.batch.score_get[i]);
				$scope.batch.score_get[i] = 0 - a;
				sum += a;
			}
		}
		$scope.batch.score_get[$scope.batch.winner] = sum;
	}

	$scope.addWinner = function(n){
		$scope.batch.winner = n;
		var s = "name-" + n;
		jQuery(s).prop('disabled',true);
		jQuery('#modal').openModal();
	}

	$scope.addUsers = function(){
		for(i = 0, i < 4, i++){
			var username = $scope.score.users[i];
			$scope.total[i] = 0;
		};
	};

	$scope.addScore = function(){
		jQuery('#modal').closeModal();
		for(var i=0; i<4; i++){
			$scope.score.total[i] += $scope.batch.score_get[i];
		}
		$scope.score.history.push($scope.batch.score_get);
		$scope.initBatch();
	};
}]);