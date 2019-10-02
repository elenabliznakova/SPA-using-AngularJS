app.controller('ImagesCtrl', ['$scope', '$q', '$compile', '$window', '$http', '$localstorage',
	function ($scope, $q, $compile, $window, $http, $localstorage) {
		$scope.inputField = '';

		$scope.setLocalStorage = function (){
			if (Object.keys($localstorage.getObject('Teams')).length == 0){
				$localstorage.setObject('Teams', {
					Milan: 365,
					Inter: 289,
					Juventus: 370
				});
			}
			$scope.favoriteTeams = $localstorage.getObject('Teams')
		}

		$scope.saveData = function (inputTeam) {
			if(inputTeam == 1){
				$scope.favoriteTeams.Milan = $scope.favoriteTeams.Milan + 1;
			} else if (inputTeam == 2){
				$scope.favoriteTeams.Inter = $scope.favoriteTeams.Inter + 1;
			}else {
				$scope.favoriteTeams.Juventus = $scope.favoriteTeams.Juventus + 1;
			}
			$localstorage.setObject('Teams', $scope.favoriteTeams);
			$scope.inputTeam = ''
		}


		$http({method : 'GET',url : 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=Italy'})
			.success(function(data, status) {
				$scope.teams = data.teams;
				console.log($scope.teams)
			}).error(function (data) {
			$scope.images = "Request failed";
			$scope.loading = false;
		});
	}
]);
