angular.module('ionicApp', ['ionic', 'ionic.ui.modalService'])
        .factory('modalsService', ['appModalService', function (appModalService) {
                // all app modals here
                var service = {
                    datePicker: datePicker
                };

                return service;

                function datePicker(parameters) {
                    return appModalService.show('templates/modal.html', 'ModalDialogCtrl as vm', parameters);
                }

            }])
        .controller('AppCtrl', ['$scope', 'modalsService', function ($scope, modalsService) {

                var vm = this;

                vm.openDateDialog = function () {
                    modalsService.datePicker({
                        events: {
                            ok: 'date-modal:ok',
                            cancel: 'date-modal:cancel'
                        }
                    });
                };

                $scope.$on("date-modal:ok", function (event, data) {
                    console.log("ok", event, data)
                    vm.selectedDate = data.selectedDate;
                });

                $scope.$on("date-modal:cancel", function (event, data) {
                    console.log("cancel", event, data)
                });

            }])
        .controller('ModalDialogCtrl', ['$rootScope', 'parameters', function ($rootScope, parameters) {

                var vm = this;

                vm.okButton = function (data) {
                    if (parameters.events.ok)
                        $rootScope.$broadcast(parameters.events.ok, data);
                    vm.closeModal();
                }

                vm.cancelButton = function (data) {
                    if (parameters.events.cancel)
                        $rootScope.$broadcast(parameters.events.cancel, data);
                    vm.closeModal();
                }
            }]);