function skillsMember() {
  return {
    restrict: 'E',
    scope: {
      member: '='
    },
    template: '<h3>{{member.name}}</h3>' +
              '<ul>' +
                '<li ng-repeat="skill in member.skills">{{skill}}</li>' +
              '</ul>'
  };
}