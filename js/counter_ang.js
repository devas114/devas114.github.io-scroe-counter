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

		var s = "#modal1 #name-" + n;

		jQuery(s).prop('disabled',true).prop('required',false);
		jQuery('#modal1').openModal({
			complete: $scope.formInit
		});
	}

	$scope.addUsers = function(){
		if($scope.checkUsers()){
			for(i = 0; i < 4; i++){
				var username = $scope.score.users[i];
				$scope.score.total[i] = 0;
			};
		};
	};

	$scope.addScore = function(){
		if($scope.checkForm()){
			jQuery('#modal1').closeModal();
			$scope.formInit();
			$scope.processBatch();
			for(var i=0; i<4; i++){
				$scope.score.total[i] += $scope.batch.score_get[i];
			}
			$scope.score.history.push($scope.batch.score_get);
			$scope.updateLocal();
			$scope.initBatch();
		}
	};

	//validate socres before submit
	$scope.checkForm = function(){
		var result = true;
		for(var i=0; i<4; i++){
			if(i != $scope.batch.winner){
				var a = "#modal1 #name-" + i;
				var s = jQuery(a);
				if(isNaN(parseInt(s.val()))){
					s.addClass('invalid');
					result = false;
				}
			}
		}
		return result;
	};

	//validate usernames before sumbit
	$scope.checkUsers = function(){
		var result = true;
		for(var i=0; i<4; i++){
			var a = ".btn-back #name-" + i;
			var s = jQuery(a);
			if(!s.val()){
				s.addClass('invalid');
				result = false;
			}
		}
		return result;
	}

	//Initialize score form when closed
	$scope.formInit = function(){
		jQuery('#modal1 input').prop('disabled', false).removeClass('valid').prop('required',true);
	};

	$scope.checkLocal = function(){
		var b = parseInt(window.localStorage.getItem('t'));
		var a = Date.now();
		if(a - b < 86400000){
			jQuery('#modal2').openModal()
		}
	};

	$scope.restoreLocal = function(){
		var u = window.localStorage.getItem('users').split(','),
			t = window.localStorage.getItem('total').split(','),
			h0 = window.localStorage.getItem('h0').split(','),
			h1 = window.localStorage.getItem('h1').split(','),
			h2 = window.localStorage.getItem('h2').split(','),
			h3 = window.localStorage.getItem('h3').split(',');
		
		for(var i=0; i<4; i++){
			$scope.score.users[i] = u[i];
			$scope.score.total[i] = parseInt(t[i]);
		}
		for(var i=0; i<h0.length; i++){
			var s = [];
			s.push(parseInt(h0[i]));
			s.push(parseInt(h1[i]));
			s.push(parseInt(h2[i]));
			s.push(parseInt(h3[i]));
			$scope.score.history.push(s);
		}
		jQuery(".start").removeClass('is-open')
		jQuery(".main-content").css("left","0%");
	}

	$scope.clearLocal = function(){
		window.localStorage.setItem('t', 0);
		window.localStorage.setItem('users', '');
		window.localStorage.setItem('total', '');
		window.localStorage.setItem('h0', '');
		window.localStorage.setItem('h1', '');
		window.localStorage.setItem('h2', '');
		window.localStorage.setItem('h3', '');
		jQuery(".main-content").css("left", "200%");
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
	}

	$scope.updateLocal = function(){
		var u = '';
		var s = '';
		var t = Date.now();
		var h0 = window.localStorage.getItem('h0') || '',
			h1 = window.localStorage.getItem('h1') || '',
			h2 = window.localStorage.getItem('h2') || '',
			h3 = window.localStorage.getItem('h3') || '';
		for(var i=0; i<4; i++){
			u += $scope.score.users[i];
			s += $scope.score.total[i];
			if(i<3){
				u += ',';
				s += ',';
			}
		}
		if(h0 !== ''){ 
			h0 += ',';
			h1 += ',';
			h2 += ',';
			h3 += ',';
		}

		h0 += $scope.batch.score_get[0];
		h1 += $scope.batch.score_get[1];
		h2 += $scope.batch.score_get[2];
		h3 += $scope.batch.score_get[3];

		window.localStorage.setItem('users', u);
		window.localStorage.setItem('total', s);
		window.localStorage.setItem('t', Date.now());
		window.localStorage.setItem('h0', h0);
		window.localStorage.setItem('h1', h1);
		window.localStorage.setItem('h2', h2);
		window.localStorage.setItem('h3', h3);
	}






}]);