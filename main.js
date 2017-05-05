/**
 * Created by prima on 5/4/2017.
 */
var aircraftApp = angular.module('aircraftApp', []);


aircraftApp.controller('AirCraftController', function AirCraftController($scope) {
    $scope.aircrafts = [];  // array of aircraft objects
    $scope.managingAircraft = true;  //used to locate what tab you are on
    $scope.systemLaunched = false;  // boolean to check for whether to display launch system button
    $scope.aircraftTypes = ['Cargo', 'Passenger'];  //populates select menu for aircraft type
    $scope.aircraftSizes = ['Small', 'Large']; //populates select menu for aircraft size

    $scope.queueAircraft = function() {
        var error = document.getElementById('error-message');
        if ($scope.chosenType && $scope.chosenSize){ //check that user selected a aircraft type and aircraft size
            error.innerHTML = '';
            var message =  document.getElementById('message');
            $scope.aircrafts.unshift({size: $scope.chosenSize.toLowerCase(), type: $scope.chosenType.toLowerCase()}); //unshift will add to beginning of aircraft list
            message.innerHTML = $scope.chosenSize + ' ' + $scope.chosenType + ' plane has been added to the aircraft queue.';  // message tells you plane has been added
        }else {
            error.innerHTML = 'You did not select a type or size. Must select both to queue aircraft!'; //error if you did not select an aircraft type and size
        }
    };

    // the button to call this function will disappear from UI if no aircrafts are in the queue
    $scope.deQueueAircraft = function() {
        // creating these variables made it straightforward to overwrite them based on index, and allowed me to set all of them in just 1 loop
        var lastLargePassengerAircraft = false;
        var lastPassengerAircraft = false;
        var lastLargeCargoAircraft = false;
        var lastCargoAircraft = false;
        angular.forEach($scope.aircrafts, function(aircraft, index){ // index is needed for splicing aircraft from the array
            if(aircraft.type == 'passenger'){
                lastPassengerAircraft = index; //updates to last passenger aircraft in the queue. overwriting by index guarantees earliest added to queue will be removed
                if(aircraft.size == 'large'){
                    lastLargePassengerAircraft = index;
                }
            }
            if(aircraft.type == 'cargo'){
                lastCargoAircraft = index;
                if(aircraft.size == 'large') {
                    lastLargeCargoAircraft = index;
                }
            }
        });

        // originally I had simply created the var without setting it to false, but there was a problem where if large passenger plane was added to the beginning and rest was cargo planes, it wouldn't get removed
        var removedAircraft = false;
        var index;
        if(lastLargePassengerAircraft !== false){ // the !== false is a safeguard to prevent error where large passenger plane at beginning of array would not get removed
            removedAircraft = $scope.aircrafts[lastLargePassengerAircraft];
            index = lastLargePassengerAircraft;
            $scope.aircrafts.splice(lastLargePassengerAircraft, 1);
        }else {
            if(lastPassengerAircraft!== false && !removedAircraft){  //if aircraft has not already been removed and small passenger exists, remove last one in queue
                removedAircraft = $scope.aircrafts[lastPassengerAircraft];
                index = lastPassengerAircraft;
                $scope.aircrafts.splice(lastPassengerAircraft, 1);
            } else {
                if(lastLargeCargoAircraft!== false && !removedAircraft){ //if aircraft still has not been removed and large cargo exists, remove last one in queue
                    removedAircraft = $scope.aircrafts[lastLargeCargoAircraft];
                    index = lastLargeCargoAircraft;
                    $scope.aircrafts.splice(lastLargeCargoAircraft, 1);
                } else if(!removedAircraft){  // if aircraft still has not been removed, small cargo plane must exist, remove last one in queue
                    removedAircraft = $scope.aircrafts[lastCargoAircraft];
                    index = lastCargoAircraft;
                    $scope.aircrafts.splice(lastCargoAircraft, 1);
                }
            }
        }
        var message =  document.getElementById('message');
        // message will indicate what plane has been removed based on removed aircraft variable .
        message.innerHTML = removedAircraft.size.charAt(0).toUpperCase() + removedAircraft.size.substr(1, removedAircraft.size.length-1) + ' ' + removedAircraft.type + ' plane has been removed from spot ' + (index+1) + ' in the queue.' ;

    };

});