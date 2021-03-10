function CompareWishlist(compareElem, wishlistElem){
    this.compareElem = JSON.parse(compareElem);
    this.wishlistElem = JSON.parse(wishlistElem);
    this.totalCompareCount = this.compareElem.length;
    this.totalWishlistCount = this.wishlistElem.length;
    this.serverRequestParams = {
        'compare':{
          'url': '/product/compare.php',
          'on': 'ADD_TO_COMPARE_ANIART',
          'off': 'DELETE_FROM_COMPARE_ANIART'
        },
        'wishlist':{
            'url': '/personal/wishlist.php',
            'on': 'ADD_TO_WISHLIST_ANIART',
            'off': 'DELETE_FROM_WISHLIST_ANIART'
        }
    };

    this.init();

}
CompareWishlist.prototype.init = function () {
    if(this.totalWishlistCount > 0 || this.totalCompareCount > 0)
    {
        this.updateHeader('all');
        this.getBlocksToUpdate();

        if(this.sectionElements.length > 0)
            this.iterateSectionElements();

        if(this.detailElements.length > 0)
            this.iterateDetailElements();
    }
};
CompareWishlist.prototype.getBlocksToUpdate = function(){
    var sections = document.getElementsByClassName("section-has-buttons");
    var elements = document.getElementsByClassName("element-has-buttons");
    var ids = this.getUniqueArrayValues(this.compareElem.concat(this.wishlistElem));
    this.sectionElements = [];
    this.detailElements = [];

    if(sections.length > 0){
        for (var i = 0; i < sections.length; i++) {
            for(var e = 0; e < ids.length; e++ ){
                var container = sections[i].getElementsByClassName('button-container-'+ids[e]);
                if(container.length > 0)
                    this.sectionElements.push(container);
            }
        }
    }

    if(elements.length > 0){
        for (var i = 0; i < elements.length; i++) {
            for(var e = 0; e < ids.length; e++ ){
                var container = elements[i].getElementsByClassName('button-container-'+ids[e]);
                if(container.length > 0)
                    this.detailElements.push(container);
            }
        }
    }
};
CompareWishlist.prototype.updateHeader = function(type){
    switch(type){
        case 'compare':
            if(this.totalCompareCount > 1) {
                var compareCountPlaceholder = document.getElementsByClassName("total-compare-count");
                for (var i in compareCountPlaceholder) {
                    compareCountPlaceholder[i].innerHTML = this.totalCompareCount;
                }
            } else {
                var compareCountPlaceholder = document.getElementsByClassName("total-compare-count");
                for (var i in compareCountPlaceholder) {
                    compareCountPlaceholder[i].innerHTML = 0;
                }
            }
            break;
        case 'wishlist':
            var wishlistCountPlaceholder = document.getElementsByClassName("total-wishlist-count");
            for (var i in wishlistCountPlaceholder) {
                wishlistCountPlaceholder[i].innerHTML = this.totalWishlistCount;
            }
            break;
        case 'all':
            if(this.totalCompareCount > 1) {
                var compareCountPlaceholder = document.getElementsByClassName("total-compare-count");
                for (var i in compareCountPlaceholder) {
                    compareCountPlaceholder[i].innerHTML = this.totalCompareCount;
                }
            }
            else {
                var compareCountPlaceholder = document.getElementsByClassName("total-compare-count");
                for (var i in compareCountPlaceholder) {
                    compareCountPlaceholder[i].innerHTML = 0;
                }
            }
            var wishlistCountPlaceholder = document.getElementsByClassName("total-wishlist-count");
            for (var i in wishlistCountPlaceholder) {
                wishlistCountPlaceholder[i].innerHTML = this.totalWishlistCount;
            }
            break;
    }
};

CompareWishlist.prototype.iterateSectionElements = function(){

    for (var s = 0; s < this.sectionElements.length; s++) {
        var collection = this.sectionElements[s];
        for (var c = 0; c < collection.length; c++) {
            var container = collection[c];
            var containerId = container.getAttribute("data-id");
            for(var comp = 0; comp < this.compareElem.length; comp++){
                if(this.compareElem[comp] == containerId)
                    this.updateSectionElement(container.getElementsByClassName('add-to-compare').item(0), 'compare', 'on');
            }
            for(var wish = 0; wish < this.wishlistElem.length; wish++){
                if(this.wishlistElem[wish] == containerId)
                    this.updateSectionElement(container.getElementsByClassName('add-to-wishlist').item(0), 'wishlist', 'on');
            }
        }
    }
};
CompareWishlist.prototype.updateSectionElement = function(item, type, mode){
    if(typeof item == 'undefined')
        return false;

    if(type == 'compare'){
        if(mode == 'on') {
            item.classList.add("in-compare");
        } else {
            item.classList.remove("in-compare");
        }
    }
    else if(type == 'wishlist'){
        if(mode == 'on') {
            item.classList.add("in-wishlist");
        } else {
            item.classList.remove("in-wishlist");
        }
    }
};

CompareWishlist.prototype.iterateDetailElements = function(){
    for (var s = 0; s < this.detailElements.length; s++) {
        var collection = this.detailElements[s];
        for (var c = 0; c < collection.length; c++) {
            var container = collection[c];
            var containerId = container.getAttribute("data-id");
            for(var comp = 0; comp < this.compareElem.length; comp++){
                if(this.compareElem[comp] == containerId)
                    this.updateDetailElement(container.getElementsByClassName('add-to-compare').item(0), 'compare', 'on');
            }
            for(var wish = 0; wish < this.wishlistElem.length; wish++){
                if(this.wishlistElem[wish] == containerId)
                    this.updateDetailElement(container.getElementsByClassName('add-to-wishlist').item(0), 'wishlist', 'on');
            }
        }
    }
};
CompareWishlist.prototype.updateDetailElement = function(item, type, mode){
    if(typeof item == 'undefined')
        return false;

    if(type == 'compare'){
        if(mode == 'on') {
            item.classList.add("in-compare");
            item.innerHTML = 'В сравнении';
        } else {
            item.classList.remove("in-compare");
            item.innerHTML = 'К сравнению';
        }
    }
    else if(type == 'wishlist'){
        if(mode == 'on') {
            item.classList.add("in-wishlist");
            item.innerHTML = 'В списке желаний';
        } else {
            item.classList.remove("in-wishlist");
            item.innerHTML = 'В список желаний';
        }
    }
};

CompareWishlist.prototype.itemAction = function(item, productId){
    productId = String(productId);
    var type = item.classList.contains('add-to-compare') ? 'compare' : 'wishlist';
    var mode = (item.classList.contains('in-compare') || item.classList.contains('in-wishlist'))  ? 'off' : 'on';
    var itemType = (item.classList.contains('section-button'))  ? 'section' : 'element';

    var url = this.serverRequestParams[type].url;
    var requestMethod = this.serverRequestParams[type][mode];
    
    var updateCallback = function(data) {
        if(type == 'compare') {
            this.totalCompareCount = data.COUNT;
            this.updateHeader('compare');

            if(itemType == 'section')
                this.updateSectionElement(item, type, mode);
            else if(itemType == 'element')
                this.updateDetailElement(item, type, mode);

            if(mode == 'on') {
                this.compareElem = this.getUniqueArrayValues(this.compareElem.concat(productId));
            }
            else {
                this.compareElem = this.compareElem.filter(function (item) {
                    return item !== productId;
                });
            }
        }
        else if(type == 'wishlist') {
            this.totalWishlistCount = data.COUNT;
            this.updateHeader('wishlist');

            if(itemType == 'section')
                this.updateSectionElement(item, type, mode);
            else if(itemType == 'element')
                this.updateDetailElement(item, type, mode);

            if(mode == 'on') {
                this.wishlistElem = this.getUniqueArrayValues(this.wishlistElem.concat(productId));
            }
            else {
                this.wishlistElem = this.wishlistElem.filter(function (item) {
                    return item !== productId;
                });
            }
        }
    }.bind(this);


    var handleRequest = function(data){
        updateCallback(data);
    };
    
    $.ajax({
        type: "POST",
        url: url+'?action='+requestMethod+'&id='+productId,
        data: { ajax: "Y" },
        dataType: 'json',
        success: handleRequest
    });
};

CompareWishlist.prototype.getUniqueArrayValues = function(array)
{
    var n = {}, r=[];
    for(var i = 0; i < array.length; i++)
    {
        if (!n[array[i]])
        {
            n[array[i]] = true;
            r.push(array[i]);
        }
    }
    return r;
};

