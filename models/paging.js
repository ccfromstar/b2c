/**
 * Created by teng on 16.06.2014.
 */
var MAX_PAGES = 10; //最多显示１０页
var pageMaxSize = 10;//每页最多显示１０个
var totalCount = 0;//总共多少条数据
var currentPage = 1;
var totalPage = 1;
var sortedColumnId;//TODO 排序的列的ID设值
var pageOffset = 0;

function goToPage(page) {
    var offset = (page - 1) * this.pageMaxSize;
    fillData(offset, pageMaxSize);
    setCurrentPage(page);
}

/* 根据所给参数查询数据　*/
function fillData(offset, pageMaxSize){

    //TODO 数据库查询
    //SELECT * FROM ( SELECT i.id as id FROM " + tableName + " i ORDER BY i." + sortedColumn + ascOrDesc
    //+ " LIMIT " + offset + ", " + limit + ") u1 JOIN " + tableName + " u2 on u2.id = u1.id ORDER BY u2."
    //+ sortedColumn + ascOrDesc
    
    //TODO totalCount设值

    calculateTotalPages();
}

function setCurrentPage(page){
    currentPage = page;
    updatePages();
}

/* 计算总共多少页 */
function calculateTotalPages(){
    totalPage = Math.ceil(totalCount / pageMaxSize);
    /*if (totalPage < 1) {
        totalPage = 1;
    } else if (totalCount % pageMaxSize != 0) {
        totalPage++;
    }*/
}

/*更新页码条*/
function updatePages() {
    //TODO 删除所有页码

    if (totalPage == 1) {
        //　只有一页，所以不显示页码
        return;
    }

    //TODO 首先显示 "第" 字

    var page2IsAdded = false;
    var pageFrom, pageTo;

    if (pageOffset > 0) {
        // 加第一页
        if (currentPage == 1) {
            //TODO 加页码 "1",　并显示为当前页的样式, 不可以点击
            // pageLabel = new Label("1");
            // pageLabel.setStyleName("current_page_link");
        } else {
            //TODO 加页码"1", 可以点击, 点击后执行 goToPage(1)
            // pageLink = new LinkStyleButton(String.valueOf(1), new PageClickListener(1));
            // pageLink.addStyleName("page_link");
            // this.pages.addComponent(pageLink);
        }

        // 加隐藏的页（省略号）
        if ((pageOffset == 1 || pageOffset == 2) && !page2IsAdded) {
            if (currentPage == 2) {
                //TODO　加页码　"2"　并显示为当前页, 不可以点击
                //pageLabel = new Label("2");
                //pageLabel.setStyleName("current_page_link");
                //this.pages.addComponent(pageLabel);
            } else {
                //TODO　加页码　"2"　可以点击, 点击后执行 goToPage(2)
                //pageLink = new LinkStyleButton(String.valueOf(2), new PageClickListener(2));
                //pageLink.addStyleName("page_link");
                //this.pages.addComponent(pageLink);
            }
            page2IsAdded = true;
        } else if (pageOffset > 2) {
            pageFrom = pageOffset;
            pageTo = pageOffset + 2;
            //TODO　加隐藏页码"...", 鼠标挪到上面tooltip:"2..."+pageOffset, 可以点击,　点击后执行　morePageClicked(pageFrom, pageTo)
            //pageLink = new LinkStyleButton("...", new MorePageClickListener(pageFrom, pageTo));
            //pageLink.addStyleName("page_link");
            //this.pages.addComponent(pageLink);
            //pageLink.setDescription(String.valueOf(2) + "..." + String.valueOf(this.pageOffset));
        }
    }

    var page;
    var max = totalPage > MAX_PAGES ? MAX_PAGES : totalPage;
    for (var i = 1; i <= max; i++) {
        page = i + this.pageOffset;
        if (page == 2 && page2IsAdded) {
            continue;
        }
        if (page == currentPage) {
            //TODO 加当前页, 号码=page,　当前页样式, 不可点击
            //Label pageLabel = new Label(String.valueOf(page));
            //pageLabel.setStyleName("current_page_link");
            //pages.addComponent(pageLabel);
            if (page > 999) {
                //TODO 页码数字太长-> 显示tooltip: page
                //pageLabel.setDescription(String.valueOf(page));
            }
        } else {
           //TODO 加页码,　号码=page, 点击后执行　goToPage(page)
           //LinkStyleButton pageLink = new LinkStyleButton(String.valueOf(page), new PageClickListener(page));
           //pageLink.addStyleName("page_link");
           //pages.addComponent(pageLink);
            if (page > 999) {
                //TODO 页码数字太长-> 显示tooltip: page
                //pageLink.setDescription(String.valueOf(page));
            }
        }
    }

    if (totalPage > MAX_PAGES) {

        var restPages = totalPage - MAX_PAGES - pageOffset;

        if (restPages > 2) {

            pageLink = new LinkStyleButton("...", null);
            if (restPages == 3) { // MAX_PAGES pages + 2 hided pages + last
                pageFrom = pageOffset + MAX_PAGES + 1;
                pageTo = pageOffset + MAX_PAGES + 2;
                //TODO 加隐藏页码"...", 鼠标挪到上面tooltip:　pageFrom+" "+pageTo, 点击后执行　morePageClicked(pageFrom, pageTo)
                //pageLink.addListener(new MorePageClickListener(pageFrom, pageTo));
                //pageLink.setDescription(String.valueOf(pageFrom) + " " + String.valueOf(pageTo));
            } else if (restPages > 3) {
                pageFrom = this.pageOffset + MAX_PAGES + 1;
                pageTo = this.pageOffset + MAX_PAGES + 3;
                //TODO 加隐藏页码"...", 鼠标挪到上面tooltip:　pageFrom+"..."+(totalPage - 1), 点击后执行　morePageClicked(pageFrom, pageTo)
                //pageLink.addListener(new MorePageClickListener(pageFrom, pageTo));
                //pageLink.setDescription(String.valueOf(pageFrom) + "..." + String.valueOf(this.totalPage - 1));
            }
        } else if (restPages == 2) { // MAX_PAGES pages + 1 page + last page
            page = totalPage - 1;
            pageFrom = pageOffset + MAX_PAGES + 1;
            pageTo = pageOffset + MAX_PAGES + 2;
            //TODO 加页码, 号码=page, 点击后执行 morePageClicked(pageFrom, pageTo)
            //pageLink = new LinkStyleButton(String.valueOf(page), new MorePageClickListener(pageFrom, pageTo));
            //pageLink.addStyleName("page_link");
            //this.pages.addComponent(pageLink);
            if (page > 999) {
                //TODO 页码数字太长-> 显示tooltip: page
                //pageLink.setDescription(String.valueOf(page));
            }
        }
        if (currentPage == totalPage) {
            //TODO 加页码, 号码=totalPage, 显示为当前页样式, 不可点击
            //Label pageLabel = new Label(String.valueOf(this.totalPage));
            //pageLabel.setStyleName("current_page_link");
            //pages.addComponent(pageLabel);
            if (totalPage > 999) {
                //TODO 页码数字太长-> 显示tooltip: totalPage
                //pageLabel.setDescription(String.valueOf(this.totalPage));
            }
        } else {
            //TODO 加页码, 号码=totalPage, 点击后执行　goToPage(totalPage)
            //pageLink = new LinkStyleButton(String.valueOf(this.totalPage), new PageClickListener(this.totalPage));
            //pageLink.addStyleName("page_link");
            //pages.addComponent(pageLink);
            if (this.totalPage > 999) {
                //TODO 页码数字太长-> 显示tooltip: totalPage
                //pageLink.setDescription(String.valueOf(this.totalPage));
            }
        }
    }

    //TODO 最后显示 "页" 字
    //this.pages.addComponent(new Label("页"));
}

function morePageClicked(pageFrom, pageTo){
    if (pageFrom > MAX_PAGES + pageOffset) {
        pageOffset += (pageTo > 0 ? (pageTo - pageFrom) : 1);
    } else {
        pageOffset -= (pageTo > 0 ? (pageTo - pageFrom) : 1);
    }
    goToPage(pageFrom);
    updatePages();
}