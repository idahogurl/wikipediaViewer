// Type definitions for axios 0.9.1
// Project: https://github.com/mzabriskie/axios
// Definitions by: Marcel Buesing <https://github.com/marcelbuesing>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArticleSearch = (function (_super) {
    __extends(ArticleSearch, _super);
    function ArticleSearch(props) {
        var _this = _super.call(this, props) || this;
        _this.requestUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=";
        _this.state = { searchResults: [] };
        _this.search = _this.search.bind(_this);
        _this.setResultList = _this.setResultList.bind(_this);
        return _this;
    }
    ArticleSearch.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "well text-center center-block" },
                React.createElement("i", { className: "fa fa-wikipedia-w fa-4x" }),
                React.createElement("h5", null, "Wikipedia Article Viewer"),
                React.createElement("div", { className: "input-group" },
                    React.createElement("input", { type: "text", className: "form-control", "aria-label": "search input", id: "searchText", placeholder: "Search for..." }),
                    React.createElement("div", { className: "input-group-btn" },
                        React.createElement("button", { type: "button", name: "search", className: "btn btn-default", "aria-label": "search", onClick: this.search },
                            React.createElement("span", { className: "fa fa-search", "aria-hidden": "true" })))),
                React.createElement("a", { className: "btn btn-default", id: "random", href: "https://en.wikipedia.org/wiki/Special:Random" }, "Random Article")),
            React.createElement(ArticleList, { results: this.state.searchResults })));
    };
    ArticleSearch.prototype.search = function (searchClick) {
        var searchText = encodeURI($("#searchText").val());
        axios.get(this.requestUrl + searchText).then(this.setResultList);
    };
    ArticleSearch.prototype.setResultList = function (response) {
        var result = response.data;
        var results = [];
        for (var i = 0; i < result[1].length; i++) {
            results.push(new Article(result[1][i], result[2][i], result[3][i]));
        }
        this.setState({
            searchResults: results
        });
    };
    return ArticleSearch;
}(React.Component));
var ArticleList = (function (_super) {
    __extends(ArticleList, _super);
    function ArticleList() {
        return _super.apply(this, arguments) || this;
    }
    ArticleList.prototype.render = function () {
        var results = this.props.results.map(function (article) {
            return (React.createElement("li", null,
                React.createElement("div", null,
                    React.createElement("a", { href: article.url }, article.title)),
                article.summary));
        });
        return (React.createElement("div", null,
            React.createElement("ul", null, results)));
    };
    return ArticleList;
}(React.Component));
var Article = (function () {
    function Article(title, summary, url) {
        this.title = title;
        this.summary = summary;
        this.url = url;
        this.title = title;
        this.summary = summary;
        this.url = url;
    }
    return Article;
}());
ReactDOM.render(React.createElement(ArticleSearch, null), document.getElementById("articleSearch"));
//w/api.php?action=opensearch&format=json&search=Hitler&namespace=