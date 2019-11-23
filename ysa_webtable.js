/* 
 *	YSA WEBTABLE <https://github.com/yadieet/bbwa-misc>
 *   Copyright (C) 2018-2019  Yadieet SA <qts19bit@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, version 3 of the License.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>
 *
 */


/*
	TODO :
	- Filter, Search
	- Fullscreen view feature
*/
var table;

(function ( $ ) {
	$.fn.ysa_webtable = function( options ) {

		var THIS = this;

		THIS.html("<div class='tb-title'>" + options.title + "</div>\
					<div class='tb-control'>\
					<button class='xlsx-export-bt'><i class='fa fa-download'></i> Export to Excel file</button>\
					<button class='reload-bt'><i class='fa fa-redo'></i> Reload</button>\
					<select class='numrow-bt'>\
						<option value='10'>10</option>\
						<option value='15'>15</option>\
						<option value='20'>20</option>\
						<option value='25'>25</option>\
						<option value='50'>50</option>\
						<option value='100'>100</option>\
						<option value='200'>200</option>\
						<option value='500'>500</option>\
						<option value='1000'>1000</option>\
					</select>\
					<button class='fullscreen-bt'><i class='fa fa-window-maximize'></i></button>\
				</div>\
				<div class='tb-data'></div>");

		var defaults = {
			//ajaxURLGenerator: function(url, config, params){
				//url - the url from the ajaxURL property or setData function
				//config - the request config onject from the ajaxConfig property
				//params - the params object from the ajaxParams property, this will also include any pagination, filter and sorting properties based on table setup

				//alert("!!!");

				//return request url
				//return url + "?params=" + encodeURI( JSON.stringify(params) ); //encode paramters as a json object
			//},
			virtualDomBuffer: 1000, //or virtualDom: false //patch maxrow=20 problem at first load
			columns: [{title:"ID", field:"id", editor:false, align:"center"},],
			ajaxURL: "",
			columnVertAlign: "middle",
			layout: "fitColumns",
			layoutColumnsOnNewData: true,
			tooltips: true,
			addRowPos: "top",
			history: false,
			pagination: "remote",
			ajaxURL: "",
			paginationSize: 1,
			paginationButtonCount:1,
			movableColumns: false,
			responsiveLayout: "hide",
			resizableRows: false,			
			ajaxSorting: true,
			ajaxParams:{},
			paginationDataSent:{
		        "page":"page",
				"sorters":"sort",
				"size":"nrow",
		    },
			paginationAddRow: "page",
			initialSort: [{column:"id", dir:"asc"},],
			placeholder: "Tidak ada data.",
			excelfilename: "file",
			onTest: function(){alert("Testing");},
		};

		var settings = $.extend( {}, defaults, options );

		var tbcontrol = THIS.find(".tb-control");
		var tbtitle = THIS.find(".tb-title");
		var tbdata = THIS.find(".tb-data");

		var exportbt = tbcontrol.find("button.xlsx-export-bt");
		var reloadbt = tbcontrol.find("button.reload-bt");
		var numrowbt = tbcontrol.find("select.numrow-bt");
		var fullscreenbt = tbcontrol.find("button.fullscreen-bt");

		table = new Tabulator(".tb-data", settings);
		
		numrowbt.val(settings.paginationSize);

		exportbt.on("click", function() {
			table.download( "xlsx", settings.excelfilename + ".xlsx" );
		});
		reloadbt.on("click", function() {
			var url = table.getAjaxUrl();
			table.setData(url);
		});
		numrowbt.change(function() {
			table.setPageSize( $( this ).val() );
		});
		fullscreenbt.on("click", function() {
			alert("Maaf, fitur belum tersedia.");
		});

		tbdata.resizable( {
			stop: function( event, ui ) {
				tbcontrol.width(tbdata.width());
				tbtitle.width(tbdata.width());
			}
		} );

		$(window).resize(function(){ table.redraw()});

		return THIS;
    };
	

}( jQuery ));


