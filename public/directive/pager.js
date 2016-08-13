/**
 * Created by Administrator on 2016/8/13 0013.
 */
;angular.module('app.Pager', [])
    .directive('pager', function () {
        return {
            restrict: 'EA',
            scope: {
                pageOption: '=pageOption',
                search: '=search'
            },
            controller: ['$scope', function ($scope) {
                var pageOption = $scope.pageOption;
                $scope.$watch('pageOption',function(){
                    var totalPages = Math.ceil(pageOption.totalCounts / pageOption.pageSize);
                    var region = Math.floor(pageOption.showPages / 2);
                    beginPage = pageOption.currentPage - region;
                    beginPage = beginPage > 0 ? beginPage : 1;
                    endPage = beginPage+pageOption.showPages-1;
                    $scope.endPage = endPage > totalPages ? totalPages : endPage;
                    if (endPage >= totalPages) {
                        endPage = totalPages;
                        beginPage = endPage - pageOption.showPages;
                        beginPage = beginPage > 0 ? beginPage : 1;

                    }
                    $scope.beginPage = beginPage;
                    $scope.endPage = endPage;
                    $scope.totalPages=totalPages;
                    $scope.pages=[];
                    for(var index=beginPage;index<=endPage;index++){
                        $scope.pages.push(index);
                    }
                },true);

                $scope.searchPage=function(pageIndex){
                    if(pageIndex<1||pageIndex>$scope.totalPages){
                        return false;
                    }
                        $scope.search(pageIndex);
                        //$scope.pageOption.currentPage=pageIndex;
                }
            }],
            templateUrl:'/static/template/pager.html',
            replace:true
        }
    })