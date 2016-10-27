'use strict'

import { Inject } from 'ng-decorators-utils'

@Inject('$scope')
class AppCtrl {
  $onInit () {
    this.$scope.title = 'Using Decorators with AngularJS'
  }
}

angular
  .module('app')
  .controller('AppCtrl', AppCtrl)
