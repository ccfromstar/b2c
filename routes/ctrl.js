module.exports = function (app, routes) {
    app.get('/homepage',routes.home);
	app.get('/mycurise',routes.mycurise);
    app.get('/productlist', routes.productlist);
    app.post('/productlist', routes.productlist);

	app.get('/destination',routes.destination);

    app.get('/c_destination',routes.c_destination);

    app.post('/curiseship', routes.curiseshipdo);

    app.get('/adv',routes.adv);
    app.get('/advmerchants',routes.advmerchants);

    app.get('/cbmpay',routes.cbmpay);

    app.get('/advdetail1',routes.advdetail1);
    app.get('/advdetail2',routes.advdetail2);
    app.get('/advdetail3',routes.advdetail3);
    app.get('/advdetail4',routes.advdetail4);

    app.get('/wechat',routes.wechat);
    app.post('/wechat',routes.wechatdo);

    app.post('/cds-agent/pbdo',routes.productbookingdo);

	app.get('/curisecompany',routes.curisecompany);
	app.get('/theme',routes.theme);
	app.get('/loading',routes.loading);
	app.get('/share',routes.share);
	app.get('/sales',routes.sales);
	app.get('/help',routes.help);
    app.get('/',routes.home);
	app.post('/',routes.homedo);
    app.get('/reg', routes.reg);
	app.post('/reg', routes.regdo);
	app.get('/login', routes.login);
    app.get('/test', routes.test);
	app.post('/login', routes.logindo);
	app.get('/logout', routes.logout);
    app.get('/welcome',routes.welcome);
    app.post('/welcome',routes.logindo);
	app.get('/post', routes.post);
	app.post('/post', routes.postdo);
	app.get('/mycuriseresult', routes.mycuriseresult);
	app.post('/mycuriseresult', routes.mycuriseresultdo);
	app.post('/mycurise', routes.mycuriseresultdo);
	
	app.get('/curiseshipmid/:id', routes.curiseship_mid);
	app.get('/curiseship', routes.curiseship);

    app.get('/sharemid/:id', routes.share_mid);
    app.get('/sharemid1/:id', routes.share_mid1);
    app.get('/share_sec', routes.share_sec);
    app.get('/theme1', routes.theme1);

	app.get('/destination/:id', routes.destination_sec_mid);
    app.get('/destination_sec', routes.destination_sec);

    app.get('/curisecompany/:id', routes.curisecompany_sec_mid);
    app.get('/curisecompany_sec', routes.curisecompany_sec);

	app.get('/destinationsp/:id', routes.destination_sp_mid);
    app.get('/destinationsp_sec', routes.destinationsp_sec);

    app.get('/curisecompanysp/:id', routes.curisecompany_sp_mid);
    app.get('/curisecompanysp_sec', routes.curisecompanysp_sec);

    app.get('/destinationport/:id', routes.destination_port_mid);
	app.get('/destinationport_sec', routes.destinationport_sec);

    app.get('/curisecompanyship/:id', routes.curisecompany_ship_mid);
    app.get('/curisecship_sec', routes.curisecship_sec);

    app.get('/sharetheme_sec', routes.sharetheme_sec);
    app.get('/theme_sec', routes.theme_sec);

    app.post('/destination',routes.destinationdo);
    app.post('/destination_sec',routes.destinationdo);
    app.post('/destinationsp_sec',routes.destinationdo);
    app.post('/destinationport_sec',routes.destinationdo);
    app.post('/curisecompany',routes.destinationdo1);
    app.post('/curisecompany_sec',routes.destinationdo1);
    app.post('/curisecompanysp_sec',routes.destinationdo1);

    app.post('/curisecship_sec',routes.destinationdo2);

    app.get('/privacy',routes.privacy);
    app.get('/user',routes.user);

    app.get('/admin',routes.admin);
    app.get('/b_home',routes.b_home);

    app.get('/b_youji',routes.b_youji);

    app.get('/useradmin',routes.useradmin);

    app.get('/b_shipservice',routes.b_shipservice);
    app.get('/b_product',routes.b_product);

    app.post('/b_youji',routes.b_youjido);
    app.post('/b_product',routes.b_productdo);

    app.get('/b_newyouji',routes.b_newyouji);
    app.post('/b_newyouji',routes.b_newyoujido);

    app.get('/b_newproduct',routes.b_newproduct);
    app.post('/b_newproduct',routes.b_newproductdo);

    app.get('/sales_sec',routes.sales_sec);

    app.post('/getdata',routes.getdata);
    app.post('/getdata4',routes.getdata4);
    app.post('/getdata19',routes.getdata19);

    app.post('/getsearchdata',routes.getsearchdata);
    app.post('/getsearchdata19',routes.getsearchdata19);

    app.post('/help',routes.helpdo);

    app.get('/calendar12months', routes.calendar12months);

    //后台操作
    app.get('/getprice',routes.getprice);
    app.get('/filtertime',routes.filtertime);
};